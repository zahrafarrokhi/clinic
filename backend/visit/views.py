from django.db.models import Q
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated

from visit.models import Visit, DoctorPrescription
from visit.serializers import VisitSerializer, ProfileSerializer, DoctorPrescriptionSerializer, DoctorPicSerializer, \
    PatientPrescriptionSerializer


# Create your views here.
class VisitView(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    serializer_class = VisitSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = {
        'status': ['exact', 'in'],
        'created_at': ['date__lte', 'date__gte'],
    }
    search_fields = ['doctor__first_name', 'doctor__last_name', 'id', 'created_at']
    ordering_fields = ['created_at', 'id', 'doctor__last_name', 'status']
    # pagination
    pagination_class = LimitOffsetPagination

    # authentication middleware checked token and put on self.request.user
    # the person who has logged in(self.request.user)
    # user pateint who has logged in or user doctor ... == self.request.user
    def get_queryset(self):
        patient_id = self.kwargs.get('patient_id', None)
        queryset = Visit.objects.filter(
            Q(patient__user=self.request.user, patient=patient_id) | Q(doctor__user=self.request.user))

        return queryset

class ProfileView(mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Visit.objects.filter(doctor=self.request.user.doctor)
        return queryset


# doctor create that
class DoctorPrescriptionView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = DoctorPrescriptionSerializer
    permission_classes = [IsAuthenticated]

class DoctorPicView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = DoctorPicSerializer
    permission_classes = [IsAuthenticated]

# patient see list prescription
class PatientPrescriptionView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = PatientPrescriptionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'type': ['exact', 'in'],
    }

    def get_queryset(self):
        patient_id = self.kwargs.get('patient_id', None)
        queryset = DoctorPrescription.objects.filter(visit__patient__user=self.request.user, visit__patient=patient_id)
        return queryset