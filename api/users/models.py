from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password
from app_utils.random_file_name import get_random_profile_photo_name

class UserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("You did not entered a valid username")
        user = self.model(username=username, **extra_fields)
        user.password = make_password(  password)
        user.save(using=self._db)
        return user

    def create_supervisor(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        return self.create_user(username, password, **extra_fields)

    def create_superuser(self, username, password=None, **extra_fields):
        # extra_fields.setdefault("user_type", 0)
        # extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    """Model that represents the table of users"""

    # USER_TYPE_CHOISES = [
    #     (0, "Adminstrator"),
    #     (1, "Supervisor"),
    #     (2, "Parents")
    # ]

    first_name = models.CharField(max_length=16, null=False)
    last_name = models.CharField(max_length=16, null=False)
    username = models.CharField(max_length=32, null=False, unique=True)
    email = models.CharField(max_length=64, null=False, unique=True)
    password = models.CharField(
        max_length=128,
        null=False,
    )
    phone_number = models.CharField(max_length=24, null=False)
    nationality = models.CharField(max_length=32, null=False)
    id_doc = models.CharField(max_length=32, null=False)
    home_address = models.CharField(max_length=256)
    photo = models.ImageField(
        get_random_profile_photo_name,
        null=False,
        default="user_photo/ca9575cc-e80e-46de-bc89-1d2bbb57b44b.png",
    )
    # user_type = models.IntegerField(choices=USER_TYPE_CHOISES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "email",
        "password",
        "nationality",
        "id_doc",
        "home_address",
        "phone_number",
        "is_staff",
        "is_superuser",
    ]

    def __str__(self) -> str:
        return str(self.username)


class ParentHomeLocation(models.Model):
    parent = models.OneToOneField(
        User,
        limit_choices_to={"is_superuser": False, "is_staff": False},
        related_name="parent_location",
        on_delete=models.CASCADE,
    )

    lat = models.FloatField()
    lng = models.FloatField()
