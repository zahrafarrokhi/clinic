from django.urls import include, path
from rest_framework import routers
from patient import views

router = routers.DefaultRouter()

router.register(r'patient', views.PatientView, basename='patients')
router.register(r'address', views.AddressView, basename='addresses')

urlpatterns = [
    path('', include(router.urls)),
]
