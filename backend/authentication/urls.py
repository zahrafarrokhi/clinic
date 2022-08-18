from django.urls import path
from . import views
urlpatterns = [
   
    path('login/email/',views.EmailView.as_view()),
    path('login/sms/',views.PhoneView.as_view())
]