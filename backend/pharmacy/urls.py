from django.urls import include, path
from rest_framework import routers
from pharmacy import views

router = routers.DefaultRouter()
router.register(r'prescription',views.PatientPrescriptionView,basename='prescription')
router.register(r'prescription-pic',views.PharmacyPrescriptionPicView,basename='prescription-pic')
router.register(r'prescription-pharmacy',views.PharmacyView,basename='prescription-pharmacy')

urlpatterns = [
    path('prescription/patient/<int:patient_id>/', views.PatientPrescriptionView.as_view({'get': 'list'}), name='prescription-patient-list'),
    path('prescription/patient/<int:patient_id>/<int:pk>/', views.PatientPrescriptionView.as_view({'get': 'retrieve'}),
         name='prescription-patient-retrieve'),

    path('', include(router.urls)),
]
