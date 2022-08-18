from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'sms', views.PhoneView, basename='sms')
router.register(r'email', views.EmailView, basename='email')

urlpatterns = [
    path('login', include(router.urls)),
]