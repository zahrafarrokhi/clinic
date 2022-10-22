from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
# get create
router.register(r'visit',views.VisitView,basename='visit')
urlpatterns = [
    # list
    path('visit/patient/<int:patient_id>/',views.VisitView.as_view({'get': 'list'}),name='visit-patient-list'),
    path('visit/patient/<int:patient_id>/<int:pk>/', views.VisitView.as_view({'get': 'retrieve'}), name='visit-patient-retrieve'),

    path('', include(router.urls)),
]