from django.urls import re_path
from .consumer import ChatConsumer

# app_name = 'chatting'
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', ChatConsumer.as_asgi())
    # path(r'ws/chat/Ezz12/', ChatConsumer.as_asgi())
]