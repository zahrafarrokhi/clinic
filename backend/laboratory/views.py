from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from laboratory.models import LaboratoryPrescription
from laboratory.serializers import PatientPrescriptionSerializer, PatientPrescriptionPicSerializer
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
        queryset = LaboratoryPrescription.objects.filter(patient__user=self.request.user, patient=patient_id)

        return queryset

class PatientPrescriptionPicView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = PatientPrescriptionPicSerializer
    permission_classes = [IsAuthenticated]
