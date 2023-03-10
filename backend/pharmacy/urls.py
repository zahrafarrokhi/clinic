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
router.register(r'pharmacy-deliver',views.PharmacyDeliver,basename='pharmacy-deliver')
# chart
router.register(r'pharmacy-chart',views.Chart,basename='pharmacy-chart')
# fields
router.register(r'pharmacy-fields',views.ReportFields,basename='pharmacy-fields')
urlpatterns = [
    # patient
    path('prescription/patient/<int:patient_id>/', views.PatientPrescriptionView.as_view({'get': 'list'}), name='prescription-patient-list'),
    path('prescription/patient/<int:patient_id>/<int:pk>/', views.PatientPrescriptionView.as_view({'get': 'retrieve'}),
         name='prescription-patient-retrieve'),
    # set time date  by patient
    path('prescription/patient/payment/<int:patient_id>/<int:pk>/', views.PatientDatePrescriptionView.as_view({'put': 'update'}),
         name='prescription-patient-update'),
    # cancel perscription
    path('prescription/patient/cancel/<int:patient_id>/<int:pk>/',
         views.PatientCancelView.as_view({'patch': 'update'}),
         name='prescription-patient-cancel'),
    path('', include(router.urls)),
]
