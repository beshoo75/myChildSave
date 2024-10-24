from django.db import models
from datetime import date
from users.models import User
from buses.models import Bus
from app_utils.random_file_name import get_random_student_photo_name


# Create your models here.
class Student(models.Model):

    GENDER_CHOISES = [
        ("M", "Male"),
        ("F", "Female"),
    ]

    DEFAULT_DATE = date(year=2000, month=1, day=1)

    student_name = models.CharField(max_length=128, null=False, unique=True)
    age = models.IntegerField(null=False)
    gender = models.CharField(max_length=2, null=False, choices=GENDER_CHOISES)
    date_of_birth = models.DateField(null=False, default=DEFAULT_DATE)
    grade = models.IntegerField(null=False)
    contact_information = models.CharField(max_length=128, null=True)
    health_state = models.TextField(null=False)
    student_photo = models.ImageField(
        upload_to=get_random_student_photo_name,
        null=True,
        blank=True,
        default="student_photo/ca9575cc-e80e-46de-bc89-1d2bbb57b44b.png",
    )
    parent = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="student_parent",
        limit_choices_to={"is_staff": False, "is_superuser": False},
    )
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name="student_bus")

    REQUIRED_FIELDS = [
        "student_name",
        "bus",
        "parent",
        "age",
        "gender",
        "date_of_birth",
        "grade",
        "health_state",
        "contact_information",
    ]

    def __str__(self) -> str:
        return str(self.student_name)


# class StudentPhotos(models.Model):
#     student_id = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="student_photo")
#     student_photo = models.ImageField(upload_to=get_random_student_photo_name, null=True, blank=True, default="student_photo/ca9575cc-e80e-46de-bc89-1d2bbb57b44b.png")


# class StudentRelations(models.Model):
#     """
#     Model to link student with it's parent in relationship
#     """
#     student = models.ForeignKey(Student, on_delete=models.CASCADE)
#     parent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_parent', limit_choices_to={'is_staff': False, 'is_superuser': False})
#     supervisor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_supervisor', limit_choices_to={'is_staff': True, 'is_superuser': False})
#     supervisor = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='student_bus')

#     def __str__(self):
#         return self.student.student_name

# class StudentBusRelations(models.Model):
#     """
#     Model to link student with it's parent in relationship
#     """
#     student = models.ForeignKey(Student, on_delete=models.CASCADE)
#     parent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_parent', limit_choices_to={'is_staff': False, 'is_superuser': False})
#     supervisor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_supervisor', limit_choices_to={'is_staff': True, 'is_superuser': False})
#     supervisor = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='student_bus')

#     def __str__(self):
#         return self.student.student_name


class StudentBusAttendance(models.Model):
    student = models.ForeignKey(
        Student, related_name="student_attendance", on_delete=models.CASCADE
    )
    check_time = models.TimeField(null=False, auto_now=True)
    shift_type = models.BooleanField(
        default=True, null=False
    )  # morning = True, afternoon = False
    check_date = models.DateField(null=False)
    check_type = models.BooleanField(
        default=True, null=False
    )  # Onboard = True, dropoff = False
    attendance = models.BooleanField(
        default=False, null=False
    )  # attendance = True, absence = False
    user = models.ForeignKey(
        User,
        related_name="checker_user",
        on_delete=models.CASCADE,
        limit_choices_to={"is_superuser": False},
    )
    reason = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.check_date)
