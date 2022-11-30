from django.urls import include, path
from rest_framework import routers
from pharmacy import views

router = routers.DefaultRouter()
# patient
router.register(r'prescription',views.PatientPrescriptionView,basename='prescription')
router.register(r'prescription-pic',views.PatientPrescriptionPicView,basename='prescription-pic')

# pharmacy
router.register(r'prescription-pharmacy',views.PharmacyView,basename='prescription-pharmacy')
router.register(r'prescription-pic-pharmacy',views.PharmacyPrescriptionPicView,basename='prescription-pic-pharmacy')

urlpatterns = [
    # patient
    path('prescription/patient/<int:patient_id>/', views.PatientPrescriptionView.as_view({'get': 'list'}), name='prescription-patient-list'),
    path('prescription/patient/<int:patient_id>/<int:pk>/', views.PatientPrescriptionView.as_view({'get': 'retrieve'}),
         name='prescription-patient-retrieve'),
    # set time date  by patient
    path('prescription/patient/payment/<int:patient_id>/<int:pk>/', views.PatientDatePrescriptionView.as_view({'put': 'update'}),
         name='prescription-patient-update'),
    path('', include(router.urls)),
]
