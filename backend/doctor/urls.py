from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('doctor', views.DoctorView, basename='doctors')
router.register('department', views.DepartmentView, basename='departments')
urlpatterns = [
    path('', include(router.urls)),
]
