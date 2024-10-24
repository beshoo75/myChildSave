# from rest_framework.views import APIView
# from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, DestroyAPIView, CreateAPIView, UpdateAPIView, GenericAPIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
)

# from rest_framework.response import Response
# from rest_framework import permissions, status
from rest_framework import permissions

# from django.db.models import Q
from .models import Bus

# from .serializers import BusCreateSerializer, BusSerializer, BusListSerializer
from .serializers import BusSerializer, BusListSerializer, BusNumbersSerializer
from app_utils.users_permissions import AdminPermissions


class CreateBusView(CreateAPIView):
    permission_classes = (AdminPermissions,)
    serializer_class = BusSerializer

    # def post(self, request):
    #     clean_data = request.data
    #     serializer = BusCreateSerializer(data=clean_data)
    #     if serializer.is_valid(raise_exception=True):
    #         bus = serializer.create(clean_data)
    #         if bus is None:
    #             return Response(status=status.HTTP_400_BAD_REQUEST)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateBusView(RetrieveUpdateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = (AdminPermissions,)

    # def get_object(self):
    #     user_id = self.kwargs['pk']
    #     return self.queryset.get(pk=user_id)


class GetAllBusesView(ListAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # def get_queryset(self):
    #     search_param = self.request.query_params.get('search', None)
    #     user_type_param = self.request.query_params.get('type', None)
    #     if search_param is not None:
    #         self.queryset = self.queryset.filter(
    #             Q(first_name__icontains = search_param)|  # check if the first name contains the search value in insensetive case
    #             Q(last_name__icontains = search_param)|   # or last name
    #             Q(username__icontains = search_param)   # or username
    #         )

    #     if user_type_param is not None:
    #         if user_type_param == 0:
    #             self.queryset=self.queryset.filter(is_superuser =True)
    #         elif user_type_param == 1:
    #             self.queryset=self.queryset.filter(is_staff =True)
    #         else:
    #             self.queryset=self.queryset.filter(is_superuser =False).filter(is_staff=False)

    #     return self.queryset.all()


class GetBusView(RetrieveAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    permission_classes = (permissions.IsAuthenticated,)


class BusDeleteView(DestroyAPIView):
    queryset = Bus.objects.all()
    permission_classes = (AdminPermissions,)

    # def get_object(self):
    #     user_id = self.kwargs['pk']
    #     return self.queryset.get(pk=user_id)


class BusesNamesView(ListAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusNumbersSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        supervisor_id = self.request.query_params.get("supervisor", None)
        if supervisor_id:
            self.queryset = self.queryset.filter(supervisor=supervisor_id)
        return self.queryset.all()
