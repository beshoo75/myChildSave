from django.forms import ValidationError
from rest_framework.serializers import ModelSerializer, Serializer, CharField, IntegerField
from django.contrib.auth import authenticate
from .models import User, ParentHomeLocation


class UserCreateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
            "email",
            "password",
            "home_address",
            "nationality",
            "phone_number",
            "id_doc",
            "photo",
        ]

    def create(self, data):
        user_obj = User.objects.create_user(**data)
        user_obj.save()
        return user_obj


class UserLoginSerializer(Serializer):
    username = CharField(required=True)
    password = CharField(required=True, write_only=True)

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data["username"],
            password=clean_data["password"],
        )
        print(f"{clean_data['username']} {clean_data['password']}")
        if user is None:
            raise ValidationError("User not found")
        return user


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserDataSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
            "email",
            "home_address",
            "nationality",
            "phone_number",
            "id_doc",
        ]


class UserDetailsSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
            "email",
            "home_address",
            "nationality",
            "phone_number",
            "id_doc",
            "photo",
        ]


class UserNamesSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name"]


class UserContactsSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
        ]


# class UserNamesSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'first_name', 'last_name']


class UserChangePasswordSerializer(Serializer):
    old_password = CharField(required=True)
    new_password = CharField(required=True)

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise ValidationError("Old password is not correct")
        return value

    def valiadte_new_password(self, value):
        if len(value) < 8:
            raise ValidationError("New password must be at least 8 characters long.")
        return value

class ResetPasswordSerializer(Serializer):
    user_id = IntegerField()
    default_password = CharField()

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise ValidationError("User does not exist.")
        return value


class ParentHomeLocationSerializer(ModelSerializer):
    class Meta:
        model = ParentHomeLocation
        fields = "__all__"


class CreateParentHomeLocationSerializer(ModelSerializer):
    class Meta:
        model = ParentHomeLocation
        fields = ["parent", "lat", "lang"]

    def create(self, data):
        print('////////////////////////////////////////////')
        print(data)
        print('////////////////////////////////////////////')
        location_obj = ParentHomeLocation.objects.create(**data)
    #         parent=User.objects.get(id=int(data["parent"])),
    #         lat=data["lat"],
    #         lng=data["lng"],
    #     )
        location_obj.save()
        return location_obj
