from django.db import models
from users.models import User


# Create your models here.
class Notification(models.Model):
    notif_timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_notification",
    )
    title = models.CharField(max_length=128, null=False)
    message = models.CharField(max_length=1024, null=False)
    read = models.BooleanField(default=False)
