from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
router.register('visit/doctor',views.VisitView,basename='visit')
router.register('visit/patient/<int:patient_id>',views.VisitView,basename='visit')
urlpatterns = [

    path('', include(router.urls)),
]