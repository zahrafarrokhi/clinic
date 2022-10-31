from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
# router.register('', views.GetToken, basename='doctors')

urlpatterns = [
    path('chat-token/', views.GetToken.as_view(), name='get-token'), # doctor
    path('chat-token/<int:patient_id>/', views.GetToken.as_view(), name='get-token-m2m'), # patient
    path('send-message/<int:visit_id>/', views.SendMessage.as_view(), name='message'), # message
    path('send-message/<int:visit_id>/<int:patient_id>/', views.SendMessage.as_view(), name='message'), # message
    path('list-messages/<int:visit_id>/', views.ListMessages.as_view(), name='message'), # list message
    path('list-messages/<int:visit_id>/<int:id>/', views.ListMessages.as_view(), name='message'), # list message
    path('upload-file/<int:visit_id>/', views.UploadFile.as_view(), name='message'), # upload file
    path('upload-file/<int:visit_id>/<int:patient_id>/', views.UploadFile.as_view(), name='message'), # upload file
    # path('', include(router.urls)),
]

