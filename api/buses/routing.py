from django.urls import re_path
from .consumer import TrafficConsumer

app_name = "buses"
websocket_urlpatterns = [
    re_path(r"ws/traffic/(?P<room_name>\w+)/$", TrafficConsumer.as_asgi())
    # re_path('ws/traffic/', TrafficConsumer.as_asgi())
    # path(r'ws/chat/Ezz12/', ChatConsumer.as_asgi())
]
