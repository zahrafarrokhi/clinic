from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
# router.register('', views.GetToken, basename='doctors')

urlpatterns = [
    path('chat-token/', views.GetToken.as_view(), name='get-token'), # doctor
    path('chat-token/<int:patient_id>/', views.GetToken.as_view(), name='get-token-m2m'), # patient
    # path('', include(router.urls)),
]

