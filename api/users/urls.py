from django.urls import path

# from .views import UserLoginView,GetAllUsersNamesView, UserCreateView, UserLogoutView, GetAllUsersView, GetUserView, UserChangePasswordView, AdminResetUserPasswordView ,UserDeleteView,UserProfileView, UserUpdateView, UserProfileView, UserProfileUpdateView, GetUserNameView, SessionCheckView
from .views import (
    UserLoginView,
    GetAllUsersNamesView,
    UserCreateView,
    UserLogoutView,
    GetAllUsersView,
    GetUserView,
    UserChangePasswordView,
    AdminResetUserPasswordView,
    UserDeleteView,
    UserProfileView,
    UserUpdateView,
    UserProfileView,
    UserProfileUpdateView,
    SessionCheckView,
    GetAllUsersContactsView,
    UserDataCreateView,
    UserDataUpdateView,
    ParentHomeLocationView,
    ParentsHomeLocationsView,
    CreateParentHomeLocationView,
    UpdateParentHomeLocationView,
    DeleteParentHomeLocationView,
)

app_name = "users"

urlpatterns = [
    path("", GetAllUsersView.as_view(), name="get-all-users"),
    path("<int:pk>/", GetUserView.as_view(), name="get-user-details"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("check-auth/", SessionCheckView.as_view(), name="check-auth"),
    path("create/", UserCreateView.as_view(), name="create-user"),
    path("create-data/", UserDataCreateView.as_view(), name="create-user"),
    path("update/<int:pk>/", UserUpdateView.as_view(), name="update-user"),
    path("update-data/<int:pk>/", UserDataUpdateView.as_view(), name="update-user"),
    path("delete/<int:pk>/", UserDeleteView.as_view(), name="delete-user"),
    path(
        "reset-password/",
        AdminResetUserPasswordView.as_view(),
        name="reset-user-password",
    ),
    path("users-names", GetAllUsersNamesView.as_view(), name="get-users-names"),
    path(
        "users-contacts", GetAllUsersContactsView.as_view(), name="get-users-contacts"
    ),
    # path('users-names/<int:pk>', GetUserNameView.as_view(), name='get-user-name'),
    # profile = the user its self
    path("profile/<int:pk>/", UserProfileView.as_view(), name="user-profile"),
    path(
        "profile/update/<int:pk>/",
        UserProfileUpdateView.as_view(),
        name="update-profile",
    ),
    path(
        "profile/change-password/",
        UserChangePasswordView.as_view(),
        name="change-user-password",
    ),
    path(
        "location",
        ParentsHomeLocationsView.as_view(),
        name="all-parent-locations",
    ),
    path(
        "location/<int:pk>/",
        ParentHomeLocationView.as_view(),
        name="parent-location",
    ),
    path(
        "location/create/",
        CreateParentHomeLocationView.as_view(),
        name="create-parent-location",
    ),
    path(
        "location/update/<int:pk>/",
        UpdateParentHomeLocationView.as_view(),
        name="update-parent-location",
    ),
    path(
        "location/delete/<int:pk>/",
        DeleteParentHomeLocationView.as_view(),
        name="delete-parent-location",
    ),
]
