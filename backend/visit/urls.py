from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
# get create
router.register(r'visit',views.VisitView,basename='visit')
# profile
router.register(r'profile',views.ProfileView,basename='profile')
# create prescription for doci
router.register(r'doctor-prescription',views.DoctorPrescriptionView,basename='doctor-prescription')
# create prescription pic for doci
router.register(r'doctor-prescription-pic',views.DoctorPicView,basename='doctor-prescription-pic')
urlpatterns = [
    # list
    path('visit/patient/<int:patient_id>/',views.VisitView.as_view({'get': 'list'}),name='visit-patient-list'),
    path('visit/patient/<int:patient_id>/<int:pk>/', views.VisitView.as_view({'get': 'retrieve'}), name='visit-patient-retrieve'),
    path('visit/patient/<int:patient_id>/prescription/', views.PatientPrescriptionView.as_view({'get': 'list'}),
         name='visit-patient-prescriptions-list'),

    path('', include(router.urls)),
]