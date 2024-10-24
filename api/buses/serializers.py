from django.forms import ValidationError
from rest_framework.serializers import ModelSerializer
from .models import Bus
from users.serializers import UserNamesSerializer

# class BusCreateSerializer(ModelSerializer):
#     class Meta:
#         model = Bus
#         fields = '__all__'
# fields = ["bus_number",  "driver_name", "license_plate", "bus_details",'bus_routes',
#           "contact_info", "bus_capacity"
#           ]

# def create(self, data):
#     bus_obj = Bus(
#         bus_number=data['bus_number'],
#         driver_name=data['driver_name'],
#         license_plate=data['license_plate'],
#         bus_details=data['bus_details'],
#         bus_routes=data['bus_routes'],
#         contact_info=data['contact_info'],
#         bus_capacity=data['bus_capacity'],
#     )
#     bus_obj.save()
#     return bus_obj


class BusSerializer(ModelSerializer):
    # supervisor = UserNamesSerializer()

    class Meta:
        model = Bus
        fields = "__all__"
        # fields = [
        #     "id",
        #     "bus_number",
        #     "driver_name",
        #     "license_plate",
        #     "bus_details",
        #     "bus_routes",
        #     "contact_info",
        #     "bus_capacity",
        #     "supervisor",
        # ]


class BusListSerializer(ModelSerializer):
    class Meta:
        model = Bus
        fields = [
            "id",
            "bus_number",
            "driver_name",
            "license_plate",
            "bus_routes",
        ]


class BusNumbersSerializer(ModelSerializer):
    class Meta:
        model = Bus
        fields = ["id", "bus_number"]
