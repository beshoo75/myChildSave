from django.urls import re_path
from .consumer import AttendanceNotificationConsumer

app_name = "buses"
websocket_urlpatterns = [
    re_path(r"ws/notification/(?P<user_id>\w+)/$", AttendanceNotificationConsumer.as_asgi())
    # re_path('ws/traffic/', TrafficConsumer.as_asgi())
    # path(r'ws/chat/Ezz12/', ChatConsumer.as_asgi())
]
