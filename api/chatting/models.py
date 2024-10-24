from django.db import models
from users.models import User

# Create your models here.
class Messages(models.Model):
    room_name = models.CharField(max_length=128 ,null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.room_name}: {self.user}'