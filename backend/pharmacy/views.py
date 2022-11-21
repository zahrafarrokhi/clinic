from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from pharmacy.serializers import PharmacyPrescriptionSerializer, PrescriptionPic


# Create your views here.
class PharmacyPrescriptionView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = PharmacyPrescriptionSerializer
    permission_classes = [IsAuthenticated]


class PharmacyPrescriptionPicView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = PrescriptionPic
    permission_classes = [IsAuthenticated]