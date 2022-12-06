from laboratory import views
from django.urls import path, include
from rest_framework import routers

patient_router = routers.DefaultRouter()
patient_router.register(r'prescriptions',views.PatientPrescriptionView,basename='laboratory-prescription')

general_router = routers.DefaultRouter()
general_router.register(r'prescription-pic',views.PatientPrescriptionPicView,basename='laboratory-prescription-pic')

urlpatterns = [

    path('patient/<int:patient_id>/', include(patient_router.urls)),
    path('', include(general_router.urls)),
]
