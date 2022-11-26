from django.urls import include, path
from rest_framework import routers
from pharmacy import views

router = routers.DefaultRouter()
router.register(r'prescription',views.PharmacyPrescriptionView,basename='prescription')
router.register(r'prescription-pic',views.PharmacyPrescriptionPicView,basename='prescription-pic')


urlpatterns = [
    path('prescription/patient/<int:patient_id>/', views.PharmacyPrescriptionView.as_view({'get': 'list'}), name='prescription-patient-list'),
    # path('prescription/patient/<int:patient_id>/<int:pk>/', views.PharmacyPrescriptionView.as_view({'get': 'retrieve'}),
    #      name='visit-patient-retrieve'),

    path('', include(router.urls)),
]
