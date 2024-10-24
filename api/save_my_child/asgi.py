# """
# ASGI config for save_my_child project.

# It exposes the ASGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
# """

# import os

# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from chatting.routing import websocket_urlpatterns

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "save_my_child.settings")

# # application = get_asgi_application()#default application
# application = ProtocolTypeRouter(
#     {
#         "http": get_asgi_application(),
#         "websocker": AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
#     }
# )

# import ssl
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from chatting.routing import websocket_urlpatterns as chatting_urls
from buses.routing import websocket_urlpatterns as bus_urls
from notifications.routing import websocket_urlpatterns as notif_urls

# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "save_my_child.settings")

# socket_urls = chatting_urls.extend(bus_urls)

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                # routes=[
                chatting_urls + bus_urls + notif_urls,
                # bus_urls,
                # ]
            )
        ),
    }
)

# ASGI_APPLICATION = 'save_my_child.asgi.application'
