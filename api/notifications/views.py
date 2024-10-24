from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)
from .serializers import NotificationSerializer

from rest_framework import permissions
from .models import Notification


class UpdateNotificationView(RetrieveUpdateAPIView):
    """
    Updating user data by admin
    """

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)


# class GetAllNotificationsView(ListAPIView):
#     queryset = Notification.objects.all()
#     serializer_class = NotificationSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_queryset(self):
#         user = self.request.query_params.get("user", None)
#         if user:
#             self.queryset = self.queryset.filter(user=user)
#         temp = []
#         for query in self.queryset:
#             temp.append({
#                 "id": query.id,
#                 "user": query.user,
#                 "message": query.message,
#                 "notif_timestamp": query.notif_timestamp.isoformat(),
#                 "read": query.read,
#                 "title": query.title
#             })
#         self.queryset = temp
#         return self.queryset

class GetAllNotificationsView(ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.query_params.get("user", None)
        if user:
            return self.queryset.filter(user=user)
        return self.queryset


class GetNotificationView(RetrieveAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)
