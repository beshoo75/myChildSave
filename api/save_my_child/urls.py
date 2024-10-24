"""
URL configuration for save_my_child project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include

# from rest_framework import routers
from users import urls as user_url

# from students.views import StudentViewSet
from students import urls as student_url
from buses import urls as bus_url
from chatting import urls as chat_url
from notifications import urls as chat_url
from django.conf import settings
from django.conf.urls.static import static

# from users.views import admin_login, admin_logout
# from .views import dashboard

# app_name = "save_my_child"
# router = routers.DefaultRouter()
# router.register(r'students', StudentViewSet)

urlpatterns = [
    # path('', admin_login, name='login'),
    # path('logout/', admin_logout, name='logout'),
    # path('dashboard/', dashboard, name="dashboard"),
    path("api/users/", include(user_url)),
    path("api/students/", include(student_url)),
    path("api/buses/", include(bus_url)),
    path("api/chatting/", include(chat_url)),
    path("api/notifications/", include(chat_url)),
    # path('', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
