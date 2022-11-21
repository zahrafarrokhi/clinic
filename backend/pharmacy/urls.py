from django.urls import include, path
from rest_framework import routers
from pharmacy import views

router = routers.DefaultRouter()
router.register(r'prescription',views.PharmacyPrescriptionView,basename='prescription')
router.register(r'prescription-pic',views.PharmacyPrescriptionPicView,basename='prescription-pic')


urlpatterns = [
    path('', include(router.urls)),
]
