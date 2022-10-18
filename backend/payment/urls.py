from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
# update
router.register(r'payment-verify',views.PaymentVerifyView,basename='payment-verify')
urlpatterns = [

    path('', include(router.urls)),
]