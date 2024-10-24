from django.urls import path

# from .views import StudentCreateView, StudentUpdateView, StudentDeleteView, GetAllStudentsView, GetStudentView, CreateStudentRelationView
from .views import (
    StudentCreateView,
    StudentUpdateView,
    StudentDeleteView,
    GetAllStudentsView,
    GetStudentView,
    StudentNamesView,
    AddStudentAttendanceView,
    GetAllStudentsAttendanceView,
    UpdateStudentAttendanceView,
    DeleteStudentAttendanceView,
    AddStudentAttendanceByCameraView,
    GetStudentAttendanceDetailsView,
    StudentUpdateDataView,
    GetStudentBusForParentView,
    GetStudentHomeLocationView,
    AddStudentAbsenceView,
    StudentDataCreateView,
)

urlpatterns = [
    path("", GetAllStudentsView.as_view(), name="get-all-student"),
    path("<int:pk>/", GetStudentView.as_view(), name="get-student-details"),
    path("create/", StudentCreateView.as_view(), name="create-student"),
    path("create-data/", StudentDataCreateView.as_view(), name="create-student"),
    path("update/<int:pk>/", StudentUpdateView.as_view(), name="update-student"),
    path(
        "update-data/<int:pk>/",
        StudentUpdateDataView.as_view(),
        name="update-student-data",
    ),
    path("delete/<int:pk>/", StudentDeleteView.as_view(), name="student-delete"),
    path("names", StudentNamesView.as_view(), name="students-names"),
    # path(
    #     "get-student-photo/<int:pk>/",
    #     GetStudentPhotoView.as_view(),
    #     name="get-student-photo",
    # ),
    # path(
    #     "add-student-photo/",
    #     AddStudentPhotoView.as_view(),
    #     name="add-student-photo",
    # ),
    # path(
    #     "update-student-photo/<int:pk>/",
    #     UpdateStudentPhotoView.as_view(),
    #     name="update-student-photo",
    # ),
    path("attendance", GetAllStudentsAttendanceView.as_view(), name="attendance-get"),
    path(
        "attendance/<int:pk>/",
        GetStudentAttendanceDetailsView.as_view(),
        name="attendance-details",
    ),
    path(
        "attendance/camera/",
        AddStudentAttendanceByCameraView.as_view(),
        name="attendance-camera",
    ),
    path(
        "attendance/create/",
        AddStudentAttendanceView.as_view(),
        name="attendance-create",
    ),
    path(
        "absence/create/",
        AddStudentAbsenceView.as_view(),
        name="absence-create",
    ),
    path(
        "attendance/update/<int:pk>/",
        UpdateStudentAttendanceView.as_view(),
        name="attendance-update",
    ),
    path(
        "attendance/delete/<int:pk>/",
        DeleteStudentAttendanceView.as_view(),
        name="attendance-delete",
    ),
    path(
        "traffic-parent",
        GetStudentBusForParentView.as_view(),
    ),
    path(
        "traffic-supervisor",
        GetStudentHomeLocationView.as_view(),
    ),
]
