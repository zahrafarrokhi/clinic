from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from pharmacy.models import PharmacyPrescription
from pharmacy.serializers import PrescriptionPic, PatientPrescriptionSerializer, PharmacyPre
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import LimitOffsetPagination

# Create your views here.
class PatientPrescriptionView(mixins.CreateModelMixin, mixins.ListModelMixin,
        mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = PatientPrescriptionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = {
        'status': ['exact', 'in'],
        'created_at': ['date__lte', 'date__gte'],
    }
    search_fields = ['description', 'id', 'created_at']
    ordering_fields = ['created_at', 'id', 'status']
    # pagination
    pagination_class = LimitOffsetPagination


    def get_queryset(self):
        patient_id = self.kwargs.get('patient_id', None)
        queryset = PharmacyPrescription.objects.filter(patient__user=self.request.user, patient=patient_id)

        return queryset
class PharmacyPrescriptionPicView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = PrescriptionPic
    permission_classes = [IsAuthenticated]


class PharmacyView(mixins.ListModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,viewsets.GenericViewSet):
    serializer_class = PharmacyPre
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = {
        'status': ['exact', 'in'],
        'created_at': ['date__lte', 'date__gte'],
    }
    search_fields = ['description', 'id', 'created_at']
    ordering_fields = ['created_at', 'id', 'status', 'patient__last_name']
    # pagination
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        # list of prescription
        user = self.request.user
        if user.type == User.PHARMACY:
            queryset = PharmacyPrescription.objects.all()
            return queryset
        else:
            return []
