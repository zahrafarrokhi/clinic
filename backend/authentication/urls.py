from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'sms', views.PhoneView, basename='sms')
router.register(r'email', views.EmailView, basename='email')

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login', include(router.urls)),
]