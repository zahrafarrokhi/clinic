from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import OTP, User
from . import serializers
from datetime import timedelta, datetime
from datetime import datetime
from django.utils import timezone

class EmailView(generics.GenericAPIView):
  serializer_class = serializers.EmailSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.serializer_class(data=request.data, context={'request': request})

    if serializer.is_valid():
      user = serializer.validated_data['user']
      token = OTP.objects.create(user=user, type=OTP.EMAIL, is_active=True,
                               exp_date=(timezone.now() +
                                         timedelta(minutes=2)))

     
    else:
      return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

