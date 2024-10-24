# from django.forms import ValidationError
# from rest_framework.serializers import ModelSerializer, CharField
from rest_framework.serializers import ModelSerializer

# from .models import Student, StudentRelations
from .models import Student, StudentBusAttendance

# from .models import Student, StudentBusAttendance, StudentPhotos

# from users.serializers import UserNamesSerializer
from buses.serializers import BusNumbersSerializer
from rest_framework.serializers import CharField
from users.serializers import ParentHomeLocationSerializer

# class StudentCreateSerializer(ModelSerializer):
#     class Meta:
#         model = Student
#         # feilds ='__all__'
#         # fields = ['student_name', 'gender', 'age', 'grade', 'contact_information', 'date_of_birth', 'health_state', 'parent']
#         fields = ['student_name', 'gender', 'age', 'grade', 'contact_information', 'date_of_birth', 'health_state']

#     def create(self, data):
#         # validating for already existing data
#         # if Student.objects.filter(data).exists():
#         #     raise ValidationError('This student profile already exists')
#         student_obj = Student(
#             student_name = data['student_name'],
#             gender = data['gender'],
#             age = data['age'],
#             grade = data['grade'],
#             contact_information = data['contact_information'],
#             date_of_birth = data['date_of_birth'],
#             health_state = data['health_state'],
#             # parent = data['parent']
#         )
#         student_obj.save()
#         return student_obj

# class StudentDetailsSerializer(ModelSerializer):
#     # username = CharField(source='User.username', read_only=True)
#     # first_name = CharField(source='User.first_name', read_only=True)
#     # last_name = CharField(source='User.last_name', read_only=True)
#     parent = UserNamesSerializer()
#     bus = BusNumbersSerializer()
#     class Meta:
#         model = Student
#         fields = ["id", 'student_name','age', 'gender', "grade", 'contact_information', 'date_of_birth','health_state','parent', 'bus']


class StudentSerializer(ModelSerializer):
    #     # username = CharField(source='User.username', read_only=True)
    #     # first_name = CharField(source='User.first_name', read_only=True)
    #     # last_name = CharField(source='User.last_name', read_only=True)
    #     # parent = UserNamesSerializer()
    #     # bus = BusNumbersSerializer()
    class Meta:
        model = Student
        fields = "__all__"


class StudentDataSerializer(ModelSerializer):
    #     # username = CharField(source='User.username', read_only=True)
    #     # first_name = CharField(source='User.first_name', read_only=True)
    #     # last_name = CharField(source='User.last_name', read_only=True)
    #     # parent = UserNamesSerializer()
    #     # bus = BusNumbersSerializer()
    class Meta:
        model = Student
        fields = [
            "id",
            "student_name",
            "age",
            "gender",
            "grade",
            "health_state",
            "contact_information",
            "date_of_birth",
            "parent",
            "bus",
        ]

    #         def save(self):
    # def create(self, validated_data):
    #     # Custom logic before saving

    #     # if validated_data:
    #     # Check if student already exists or create a new one
    #     gender = validated_data.get("gender", "false").lower() == "true"
    #     # student, created = Student.objects.get_or_create(
    #     #     student_name=validated_data["name"]
    #     # )

    #     # Now create the student with the parent instance
    #     student = Student.objects.create(
    #         student_name=validated_data["student_name"],
    #         age=int(validated_data["age"]),
    #         gender=gender,
    #         grade=int(validated_data["grade"]),
    #         bus=validated_data["bus"],
    #         parent=validated_data["parent"],
    #         student_photo=validated_data["student_photo"],
    #         health_state=validated_data["health_state"],
    #         contact_information=validated_data["contact_information"],
    #         date_of_birth=validated_data["date_of_birth"],
    #     )
    #     if student:
    #         return student
    #     # else:
    #     # Handle the case where no parent data is provided
    #     raise ValidationError("student data is required.")

    # def update(self, instance, validated_data):
    #     # Custom logic before updating
    #     parent_data = validated_data.pop("parent", None)

    #     if parent_data:
    #         # Update or create parent
    #         parent, created = Parent.objects.get_or_create(name=parent_data["name"])
    #         instance.parent = parent

    #     # Update student instance fields
    #     instance.student_name = validated_data.get(
    #         "student_name", instance.student_name
    #     )
    #     instance.age = validated_data.get("age", instance.age)

    #     # Save the updated instance
    #     instance.save()
    #     return instance


class AllStudentsSerializer(ModelSerializer):
    # username = CharField(source='User.username', read_only=True)
    # first_name = CharField(source='User.first_name', read_only=True)
    # last_name = CharField(source='User.last_name', read_only=True)
    bus = BusNumbersSerializer()

    class Meta:
        model = Student
        fields = ["id", "student_name", "grade", "gender", "bus", "student_photo"]


# class AllStudentsWithoutPhotoSerializer(ModelSerializer):
#     # username = CharField(source='User.username', read_only=True)
#     # first_name = CharField(source='User.first_name', read_only=True)
#     # last_name = CharField(source='User.last_name', read_only=True)

#     class Meta:
#         model = Student
#         fields = [
#             "id",
#             "student_name",
#             "bus",
#             "parent",
#             "age",
#             "gender",
#             "date_of_birth",
#             "grade",
#             "health_state",
#             "contact_information",
#         ]


class StudentNameSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "student_name"]


# class StudentRelationsSerializer(ModelSerializer):
#     student = StudentSerializer()
#     parent = UserNamesSerializer()
#     supervisor = UserNamesSerializer()
#     bus = BusListSerializer()
#     class Meta:
#         model = StudentRelations
#         fields = ['id', 'student', 'parent', 'supervisor', 'bus']


class StudentBusAttendanceSerializer(ModelSerializer):
    class Meta:
        model = StudentBusAttendance
        fields = "__all__"


class ListStudentBusAttendanceSerializer(ModelSerializer):
    student_name = CharField(source="student.student_name", read_only=True)
    bus_number = CharField(source="student.bus.bus_number", read_only=True)

    class Meta:
        model = StudentBusAttendance
        fields = [
            "shift_type",
            "check_date",
            "check_type",
            "student_name",
            "bus_number",
            "id",
            "attendance",
        ]


# class StudentPhotoSerializer(ModelSerializer):
#     class Meta:
#         model = StudentPhotos
#         fields = "__all__"
class StudentBusForParentSerializer(ModelSerializer):
    bus_number = CharField(source="bus.bus_number", read_only=True)
    # bus = BusNumbersSerializer()

    class Meta:
        model = Student
        fields = ["id", "student_name", "bus", "bus_number"]


class StudentHomeLocationSerializer(ModelSerializer):
    bus_number = CharField(source="bus.bus_number", read_only=True)
    location = ParentHomeLocationSerializer(
        source="parent.parent_location", read_only=True
    )

    class Meta:
        model = Student
        fields = ["id", "student_name", "bus", "bus_number", "parent", "location"]
