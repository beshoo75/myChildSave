from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
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
    UserNamesSerializer,
    UserCreateSerializer,
    UserChangePasswordSerializer,
    UserLoginSerializer,
    UserSerializer,
    UserContactsSerializer,
    UserDetailsSerializer,
    UserDataSerializer,
    ParentHomeLocationSerializer,
    ResetPasswordSerializer,
)
from rest_framework import permissions, status
from django.db.models import Q
from .models import User, ParentHomeLocation
from app_utils.users_permissions import AdminPermissions, ParentPermission
from rest_framework.parsers import MultiPartParser, FormParser


class UserCreateView(CreateAPIView):
    permission_classes = (AdminPermissions,)
    serializer_class = UserCreateSerializer
    parser_classes = (
        MultiPartParser,
        FormParser,
    )


class UserDataCreateView(CreateAPIView):
    permission_classes = (AdminPermissions,)
    serializer_class = UserDataSerializer
    # serializer_class = UserSerializer

    # def post(self, request):
    #     clean_data = request.data
    #     serializer = UserCreateSerializer(data=clean_data)
    #     if serializer.is_valid(raise_exception=True):
    #         user = serializer.create(clean_data)
    #         if user:
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


class UserUpdateView(RetrieveUpdateAPIView):
    """
    Updating user data by admin
    """

    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (
        MultiPartParser,
        FormParser,
    )


class UserDataUpdateView(RetrieveUpdateAPIView):
    """
    Updating user data by admin
    """

    queryset = User.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = (permissions.IsAuthenticated,)


# def get_object(self):
#     user_id = self.kwargs['pk']
#     return User.objects.get(pk=user_id)


class UserProfileUpdateView(RetrieveUpdateAPIView):
    """
    Updating user data by admin
    """

    queryset = User.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # def get_object(self):
    #     return self.request.user


class UserProfileView(RetrieveAPIView):
    """
    User update his data by it's self
    """

    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # def get_object(self):
    #     return self.request.user


class GetAllUsersNamesView(ListAPIView):
    serializer_class = UserNamesSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()

    def get_queryset(self):
        try:
            user_type_param = int(self.request.query_params.get("type", None))
            if user_type_param is not None:
                if user_type_param == 0:
                    self.queryset = self.queryset.filter(is_staff=True).filter(
                        is_superuser=False
                    )
                elif user_type_param == 1:
                    self.queryset = self.queryset.filter(is_superuser=False).filter(
                        is_staff=False
                    )
        except Exception as e:
            print(e)
        finally:
            return self.queryset.all()


class GetAllUsersContactsView(ListAPIView):
    serializer_class = UserContactsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.all()

    def get_queryset(self):
        try:
            user_type_param = int(self.request.query_params.get("type", None))
            if user_type_param is not None:
                if user_type_param == 0:
                    self.queryset = self.queryset.filter(is_staff=True).filter(
                        is_superuser=False
                    )
                elif user_type_param == 1:
                    self.queryset = self.queryset.filter(is_superuser=False).filter(
                        is_staff=False
                    )
        except Exception as e:
            print(e)
        finally:
            return self.queryset.all()


class GetUserNameView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserNamesSerializer
    permission_classes = (AdminPermissions,)


class GetAllUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AdminPermissions,)

    def get_queryset(self):
        search_param = self.request.query_params.get("search", None)
        user_type_param = self.request.query_params.get("type", None)
        if search_param is not None:
            self.queryset = self.queryset.filter(
                Q(
                    first_name__icontains=search_param
                )  # check if the first name contains the search value in insensetive case
                | Q(last_name__icontains=search_param)  # or last name
                | Q(username__icontains=search_param)  # or username
            )
        if user_type_param is not None:
            if user_type_param == "0":
                self.queryset = self.queryset.filter(is_superuser=True).filter(
                    is_staff=False
                )
            elif user_type_param == "1":
                self.queryset = self.queryset.filter(is_staff=True).filter(
                    is_superuser=False
                )
            elif user_type_param == "2":
                self.queryset = self.queryset.filter(is_superuser=False).filter(
                    is_staff=False
                )

        return self.queryset.all()


class GetUserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = (permissions.IsAuthenticated,)

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


class UserDeleteView(DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = (AdminPermissions,)

    # def delete(self, request, *args, **kwargs):
    #     user = self.get_object()
    #     user.delete()
    #     return Response(status=status.HTTP_204_NO_CONT    ENT)

    # def get_object(self):
    #     user_id = self.kwargs['pk']
    #     return User.objects.get(pk=user_id)


# class UserLoginView(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication,)
#     # serializer_class = UserLoginSerializer

#     def post(self, request, *args, **kwargs):
#         # assert validate_username(request.data)
#         # assert validate_password(request.data)
#         serializer = UserLoginSerializer(data=request.data)
#         # data = request.data
#         if serializer.is_valid(raise_exception=True):
#             username = serializer.validated_data['username']
#             password = serializer.validated_data['password']
#             user = serializer.check_user(request.data)
#             login(request=request, user=user)
#         # print(f"{clean_data['username']} {clean_data['password']}")
#             if user is None:
#                 return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#         # token, created = Token.objects.get_or_create(user=user)
#             print(user)
#             return Response(serializer.data, status=status.HTTP_200_OK)
# return Response({"message": 'Login Successful', 'token':token.key}, status=status.HTTP_200_OK)
# serializer = UserLoginSerializer(data=data)
#     user = serializer.check_user(data)


class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)

        # Validate the serializer
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            # Check user credentials
            user = serializer.check_user(request.data)

            if user is None:
                return Response(
                    {"error": "Invalid Credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # Log the user in
            login(request=request, user=user)

            # Prepare user data to send in response
            user_data = {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff,
            }

            return Response(user_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        # request.user.auth_token.delete()
        logout(request)
        response = Response(
            {"details": "Loged out successfully"}, status=status.HTTP_200_OK
        )
        response.delete_cookie("sessionid")
        response.delete_cookie("csrftoken")
        # return Response(status=status.HTTP_200_OK)
        return response


class UserChangePasswordView(UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data["new_password"])
            user.save()
            return Response(
                {"details": "Password Updated Successfully"}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminResetUserPasswordView(RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (AdminPermissions,)
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data["user_id"]
            default_password = serializer.validated_data["default_password"]
            try:
                user = User.objects.get(id=user_id)
                user.set_password(default_password)  # Set to default password
                user.save()
                return Response(
                    {"detail": "Password reset to default successfully."},
                    status=status.HTTP_200_OK,
                )
            except User.DoesNotExist:
                return Response(
                    {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SessionCheckView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        # If user is authenticated, return a success response
        return Response({"isAuthenticated": True}, status=status.HTTP_200_OK)


class ParentsHomeLocationsView(ListAPIView):
    serializer_class = ParentHomeLocationSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = ParentHomeLocation.objects.all()

    def get_queryset(self):
        parent_id = self.request.query_params.get("parent", None)
        if parent_id:
            self.queryset = self.queryset.filter(parent=parent_id)
        return self.queryset.all()


class ParentHomeLocationView(RetrieveAPIView):
    serializer_class = ParentHomeLocationSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = ParentHomeLocation.objects.all()


class CreateParentHomeLocationView(CreateAPIView):
    permission_classes = (ParentPermission,)
    # serializer_class = CreateParentHomeLocationSerializer
    serializer_class = ParentHomeLocationSerializer


class UpdateParentHomeLocationView(RetrieveUpdateAPIView):
    serializer_class = ParentHomeLocationSerializer
    permission_classes = (ParentPermission,)
    queryset = ParentHomeLocation.objects.all()


class DeleteParentHomeLocationView(DestroyAPIView):
    serializer_class = ParentHomeLocationSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = ParentHomeLocation.objects.all()
