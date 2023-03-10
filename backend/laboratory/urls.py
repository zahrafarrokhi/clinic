from laboratory import views
from django.urls import path, include
from rest_framework import routers

patient_router = routers.DefaultRouter()
patient_router.register(r'prescriptions',views.PatientPrescriptionView,basename='laboratory-patient-prescription')

general_router = routers.DefaultRouter()
general_router.register(r'prescription-pic',views.PatientPrescriptionPicView,basename='laboratory-prescription-pic')
# laboratory
general_router.register(r'laboratory-prescription',views.LaboratoryPrescriptionView,basename='laboratory-prescription')
# laboratory status
general_router.register(r'laboratory-status',views.LaboratoryStatusView,basename='laboratory-status')
# laboratory status result
general_router.register(r'laboratory-status-result',views.LaboratoryStatusResultView,basename='laboratory-status-result')
# laboratory result image
general_router.register(r'laboratory-result-image',views.LaboratoryResultPicView,basename='laboratory-result-image')
# patient
patient_router.register(r'prescription-payment', views.PatientPaymentPrescriptionView, basename='patient-prescription-payment')
urlpatterns = [

    path('patient/<int:patient_id>/', include(patient_router.urls)),
    path('', include(general_router.urls)),
]
