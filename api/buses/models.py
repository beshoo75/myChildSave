from django.db import models
from users.models import User

# from students.models import Student
# from users.models import User

class Bus(models.Model):
    bus_number = models.CharField(max_length=24, null=False, unique=True)
    driver_name = models.CharField(max_length=128, null=False)
    license_plate = models.CharField(max_length=12, null=False)
    bus_details = models.TextField(null=True)
    bus_routes = models.TextField(null=False)
    contact_info = models.CharField(max_length=256, null=False)
    bus_capacity = models.IntegerField(null=True)
    supervisor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bus_supervisor",
        limit_choices_to={"is_staff": True, "is_superuser": False},
    )

    def __str__(self):
        return self.bus_number


class Traffic(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name="bus_traffic")
    lat = models.FloatField()
    lng = models.FloatField()
    traffic_timestamp = models.DateTimeField(auto_now_add=True)