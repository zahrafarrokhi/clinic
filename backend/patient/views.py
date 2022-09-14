from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from patient import models, serializers
from patient.models import Patient


# Create your views here.
class PatientView(viewsets.ModelViewSet):
    serializer_class = serializers.PatientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Patient.obejcts.filter(user=self.request.user)

class AddressView(viewsets.ModelViewSet) :
    serializer_class = serializers.AddressSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.obejcts.filter(user=self.request.user)