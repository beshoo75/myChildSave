from django.urls import path

from .views import GetAllNotificationsView, UpdateNotificationView, GetNotificationView

urlpatterns = [
    path("", GetAllNotificationsView.as_view(), name="get-all-notifications"),
    path("<int:pk>/", GetNotificationView.as_view(), name="get-notification-details"),
    path(
        "update/<int:pk>/", UpdateNotificationView.as_view(), name="update-notification"
    ),
]
