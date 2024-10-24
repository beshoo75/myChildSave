from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
    UpdateAPIView,
)
from rest_framework.response import Response
from .serializers import (
    StudentSerializer,
    AllStudentsSerializer,
    StudentNameSerializer,
    StudentBusAttendanceSerializer,
    ListStudentBusAttendanceSerializer,
    StudentDataSerializer,
    StudentBusForParentSerializer,
    StudentHomeLocationSerializer,
)
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from notifications.models import Notification
from buses.models import Bus

# import os
from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions, status
from .models import Student, StudentBusAttendance
from app_utils.users_permissions import (
    AdminPermissions,
    SupervisorPermissions,
    ParentPermission,
)
from app_utils.face_detector import FaceDetector
from save_my_child.settings import MEDIA_ROOT
from users.models import User
from datetime import timedelta, date
import logging

logger = logging.getLogger(__name__)

# class StudentCreateView(CreateAPIView):
#     permission_classes = (AdminPermissions,)
#     serializer_class = StudentSerializer
#     # queryset = Student.objects.all()
#     parser_classes = (
#         MultiPartParser,
#         FormParser,
#     )

#     def post(self, request, *args, **kwargs):
#         self.serializer = self.get_serializer(data=request.data)
#         student = self.serializer.save()
#         # img = request.FILES[0].file
#         self.face_detector = FaceDetector(MEDIA_ROOT)
#         self.face_detector.train_model(Student, student.id, student.student_photo.name)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


class StudentCreateView(CreateAPIView):
    permission_classes = (AdminPermissions,)
    serializer_class = StudentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        self.serializer = self.get_serializer(data=request.data)
        self.serializer.is_valid(raise_exception=True)  # Validate serializer data

        student = self.serializer.save()  # Save the student instance

        # Check if the student's photo exists
        if hasattr(student, "student_photo"):
            self.face_detector = FaceDetector(photos_path=MEDIA_ROOT)
            self.face_detector.train_model(student.id, student.student_photo.name)

        return Response(self.serializer.data, status=status.HTTP_201_CREATED)


class StudentDataCreateView(CreateAPIView):
    permission_classes = (AdminPermissions,)
    serializer_class = StudentSerializer


class StudentUpdateView(RetrieveUpdateAPIView):
    """
    Updating user data by admin
    """

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request, *args, **kwargs):
        student = self.get_object()  # Retrieve the student instance
        self.serializer = self.get_serializer(student, data=request.data)  # Pass the instance and data

        self.serializer.is_valid(raise_exception=True)  # Validate serializer data
        student = self.serializer.save()  # Save the student instance

        # Check if the student's photo exists
        if hasattr(student, "student_photo") and student.student_photo:
            try:
                self.face_detector = FaceDetector(photos_path=MEDIA_ROOT)
                self.face_detector.train_model(student.id, student.student_photo.name)
                logger.info(f"Successfully trained model for student ID {student.id}.")
            except Exception as e:
                logger.error(f"Failed to train model for student ID {student.id}: {e}")

        return Response(self.serializer.data, status=status.HTTP_200_OK)

class StudentUpdateDataView(RetrieveUpdateAPIView):
    """
    Updating user data by admin
    """

    queryset = Student.objects.all()
    serializer_class = StudentDataSerializer
    permission_classes = (permissions.IsAuthenticated,)


# class UserProfileUpdateView(RetrieveUpdateAPIView):
#     """
#     Updating user data by admin
#     """
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_object(self):
#         return self.request.user

# class UserProfileView(RetrieveAPIView):
#     """
#     User update his data by it's self
#     """
#     # queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_object(self):
#         return self.request.user


class GetAllStudentsView(ListAPIView):
    """
    accepts
    @param search for searching all types of names for the specified word
    @param type = specify type of user
    Get all students or
    if there is a parameter in the url it will return
    all users with same student name letters contained and gender as specified in the parameter
    """

    queryset = Student.objects.all()
    # serializer_class = StudentDetailsSerializer
    serializer_class = AllStudentsSerializer
    # permission_classes = (AdminPermissions,)

    # def get_queryset(self):
    #     name_param = self.request.query_params.get('name', None)
    #     gender_param = self.request.query_params.get('gender', None)
    #     if name_param is not None:
    #         self.queryset = self.queryset.filter(student_name__icontains = name_param)  # check if the first name contains the search value in insensetive case
    #     if gender_param is not None:     # if there is a parameter in the url return all users with the same type
    #         self.queryset = self.queryset.filter(gender = gender_param)
    #     return self.queryset.all()


class GetStudentView(RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (AdminPermissions,)

    # def get(self, request, *args, **kwargs):
    #     user = self.get_object()
    #     serializer = self.get_serializer(user)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    #     serializer = UserGetDataSerializer(data)
    #     # if serializer.is_valid(raise_exception=True):
    #     users = serializer.get_all()
    #     if users:
    #         return Response(users, status=status.HTTP_200_OK)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


class StudentDeleteView(DestroyAPIView):
    queryset = Student.objects.all()
    permission_classes = (AdminPermissions,)
    # serializer_class = StudentSerializer

    # def delete(self, request, *args, **kwargs):
    #     student = self.get_object()
    #     student.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # def get_object(self):
    #     student_id = self.kwargs['pk']
    #     return Student.objects.get(pk=student_id)


class StudentNamesView(ListAPIView):
    queryset = Student.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = StudentNameSerializer

    # def get_queryset(self):
    #     bus_id_param = self.request.query_params.get("bus", None)
    #     parent_param = self.request.query_params.get("parent", None)
    #     print(type(bus_id_param))
    #     if bus_id_param:
    #         id = int(bus_id_param)
    #         self.queryset = self.queryset.filter(bus=Bus.objects.get(id=id))
    #     if parent_param:
    #         self.queryset = self.queryset.filter(parent=int(parent_param))
    #     return self.queryset.all()
    def get_queryset(self):
        # queryset = super().get_queryset()
        bus_id_param = self.request.query_params.get("bus", None)
        parent_param = self.request.query_params.get("parent", None)

        if bus_id_param:
            # try:
            #     bus_id = int(bus_id_param)
            return self.queryset.filter(bus=int(bus_id_param))
            # except (ValueError, TypeError):
            #     return Response(
            #         {"error": "Invalid bus ID."}, status=status.HTTP_400_BAD_REQUEST
            #     )

        if parent_param:
            # try:
            #     parent_id = int(parent_param)
            #     self.queryset = self.queryset.filter(parent=parent_id)
            # except (ValueError, TypeError):
            #     return Response(
            #         {"error": "Invalid parent ID."}, status=status.HTTP_400_BAD_REQUEST
            #     )
            return self.queryset.filter(parent=int(parent_param))

        return self.queryset.all()


# class CreateStudentRelationView(CreateAPIView):
#     serializer_class = StudentRelationsSerializer
#     permission_classes = (AdminPermissions, )


# class GetStudentAttendanceView(ListAPIView):
#     queryset = StudentBusAttendance.objects.all()
#     permission_classes = (AdminOrSupervisorPermissions, )
#     serializer_class = StudentBusAttendanceSerializer


# class AddStudentPhotoView(CreateAPIView):
#     serializer_class = StudentPhotoSerializer
#     permission_classes = (AdminPermissions,)
#     parser_classes = (
#         MultiPartParser,
#         FormParser,
#     )


# class GetStudentPhotoView(RetrieveAPIView):
#     queryset = StudentPhotos.objects.all()
#     serializer_class = StudentPhotoSerializer
#     permission_classes = (AdminPermissions,)


# class UpdateStudentPhotoView(UpdateAPIView):
#     queryset = StudentPhotos.objects.all()
#     serializer_class = StudentPhotoSerializer
#     permission_classes = (AdminPermissions,)
#     parser_classes = (
#         MultiPartParser,
#         FormParser,
#     )

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         old_photo_path = instance.student_photo.path  # Get the current photo path

#         # Call the serializer to validate and save the new data
#         serializer = self.get_serializer(instance, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)

#         # Remove the old photo from the media directory
#         if os.path.exists(old_photo_path):
#             default_storage.delete(old_photo_path)

#         return Response(serializer.data, status=status.HTTP_200_OK)


class AddStudentAbsenceView(CreateAPIView):
    serializer_class = StudentBusAttendanceSerializer
    permission_classes = (ParentPermission,)

    def post(self, request, *args, **kwargs):
        data = request.data

        start_date = date.fromisoformat(data["start_date"])  # Parse start_date
        end_date = date.fromisoformat(data["end_date"])  # Parse end_date
        days_length = (end_date - start_date).days + 1  # Include end date
        current_day = start_date

        for day in range(0, days_length):
            # print(day)
            current_day = start_date + timedelta(days=day)
            # current_day = (start_date.day + day)
            # current_day = start_date
            for counter in range(4):  # Loop 4 times for each day
                StudentBusAttendance.objects.create(
                    student=Student.objects.get(id=data["student"]),
                    shift_type=(counter % 2 == 0),  # True for counter 0, 2
                    check_type=(counter % 2 == 1),  # True for counter 1, 3
                    user=User.objects.get(id=int(data["user"])),
                    check_date=current_day,
                    attendance=False,
                    reason=data["reason"],
                )
            # current_day = start_date.day + 1    # Increase to next day date

        return Response(
            {"message": "Attendance records created successfully."}, status=201
        )


class AddStudentAttendanceView(CreateAPIView):
    serializer_class = StudentBusAttendanceSerializer
    permission_classes = (SupervisorPermissions,)

    def post(self, request, *args, **kwargs):
        data = request.data
        if data:
            student = Student.objects.get(id=data["student"])
            StudentBusAttendance.objects.create(
                student=student,
                shift_type=data["shift_type"],
                check_type=data["check_type"],
                attendance=data["attendance"],
                check_date=data["check_date"],
                user=User.objects.get(id=int(data["user"])),
                # attendance,
            )

            # send notification
            send_student_attendance_notification(
                user=student.parent,
                notif_type=data["check_type"],
            )

            return Response(
                student.__str__(),
                status=status.HTTP_201_CREATED,
            )
        return Response("Student not found", status=status.HTTP_404_NOT_FOUND)


class UpdateStudentAttendanceView(UpdateAPIView):
    queryset = StudentBusAttendance.objects.all()
    permission_classes = (SupervisorPermissions,)
    serializer_class = StudentBusAttendanceSerializer


class DeleteStudentAttendanceView(DestroyAPIView):
    queryset = StudentBusAttendance.objects.all()
    permission_classes = (SupervisorPermissions,)


class GetAllStudentsAttendanceView(ListAPIView):
    queryset = StudentBusAttendance.objects.all().order_by("-id")
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ListStudentBusAttendanceSerializer

    def get_queryset(self):
        supervisor_id = self.request.query_params.get("supervisor", None)
        parent_id = self.request.query_params.get("parent", None)

        if supervisor_id:
            return self.queryset.filter(user=int(supervisor_id))

        if parent_id:
            # Get all students associated with the parent
            students = Student.objects.filter(parent=int(parent_id)).values_list(
                "pk", flat=True
            )
            return self.queryset.filter(student__in=students)

        return self.queryset.all()


class GetStudentAttendanceDetailsView(RetrieveAPIView):
    queryset = StudentBusAttendance.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = StudentBusAttendanceSerializer


class AddStudentAttendanceByCameraView(CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (SupervisorPermissions,)
    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def post(self, request, *args, **kwargs):
        image = request.FILES.get("face_image")
        data = request.data
        print(data)
        face_detector = FaceDetector(None)
        student_id = face_detector.check_face(img=image)
        if student_id:
            student = Student.objects.get(id=student_id)
            StudentBusAttendance.objects.create(
                student=student,
                shift_type=(data["shift_type"] == "true"),
                check_type=(data["check_type"] == "true"),
                check_date=data["check_date"],
                user=User.objects.get(id=int(data["user"])),
                attendance=True,
            )

            # send notification
            send_student_attendance_notification(
                user=student.parent,
                notif_type=data["check_type"],
            )

            return Response(
                student.__str__(),
                status=status.HTTP_201_CREATED,
            )
        return Response("Student not found", status=status.HTTP_404_NOT_FOUND)


def send_student_attendance_notification(user, notif_type):
    # notif_type_number = 1 if notif_type == "true" else 2
    message = f"{"صعد الطالب الى" if notif_type else "نزل الطالب من"} الحافلة."
    Notification.objects.create(
        user=user,
        title="الحضور",
        message=message,
    )
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"notifications_{user}",
        {
            "type": "send_notification",
            "user": user,
        },
    )


class GetStudentBusForParentView(ListAPIView):
    permission_classes = (ParentPermission,)
    serializer_class = StudentBusForParentSerializer
    queryset = Student.objects.all()

    def get_queryset(self):
        parent_id = int(self.request.query_params.get("parent", None))
        print(parent_id)
        if parent_id:
            self.queryset = self.queryset.filter(parent=parent_id)
        return self.queryset.all()


class GetStudentHomeLocationView(ListAPIView):
    permission_classes = (SupervisorPermissions,)
    serializer_class = StudentHomeLocationSerializer
    queryset = Student.objects.all()

    def get_queryset(self):
        supervisor_id = int(self.request.query_params.get("supervisor", None))
        if supervisor_id:
            bus = Bus.objects.get(supervisor=supervisor_id)
            self.queryset = self.queryset.filter(bus=bus.id)
        return self.queryset.all()
