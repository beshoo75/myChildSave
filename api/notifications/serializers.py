from rest_framework.serializers import ModelSerializer,  DateTimeField
from .models import Notification


# class NotificationSerializer(ModelSerializer):
#     class Meta:
#         model = Notification
#         fields = "__all__"

class NotificationSerializer(ModelSerializer):
    notif_timestamp = DateTimeField(format="%Y-%m-%d %H:%M:%SZ")  # ISO format

    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'notif_timestamp', 'read', 'title']
