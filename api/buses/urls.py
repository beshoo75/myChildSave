from django.urls import path
from .views import CreateBusView, UpdateBusView,  BusDeleteView, GetAllBusesView, GetBusView, BusesNamesView

urlpatterns = [
    path('',GetAllBusesView.as_view(), name='bus-create'),
    path('<int:pk>/',GetBusView.as_view(), name='bus-create'),
    path('create/',CreateBusView.as_view(), name='bus-create'),
    path('update/<int:pk>/',UpdateBusView.as_view(), name='bus-create'),
    path('delete/<int:pk>/',BusDeleteView.as_view(), name='bus-create'),
    path('names', BusesNamesView.as_view(), name='buses-names')
]