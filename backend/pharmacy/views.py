from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from pharmacy.models import PharmacyPrescription, PharmacyPrescriptionPic, PharmacyPayment
from pharmacy.serializers import PrescriptionPic, PatientPrescriptionSerializer, PharmacyPre, \
    PharmacyPrescriptionPicSerializer, PatientDatePrescriptionSerializer, PatientCancelPrescriptionSerializer, \
    PharmacyDeliverPrescription, ChartSerializer, ReportFieldsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import LimitOffsetPagination

from django.db.models import F, Count, Sum
# Create your views here.
# patient
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
class PatientPrescriptionPicView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = PrescriptionPic
    permission_classes = [IsAuthenticated]


class PatientDatePrescriptionView(mixins.UpdateModelMixin,viewsets.GenericViewSet):
    serializer_class = PatientDatePrescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        patient_id = self.kwargs.get('patient_id', None)
        queryset = PharmacyPrescription.objects.filter(patient__user=self.request.user, patient=patient_id)

        return queryset
class PatientCancelView(mixins.UpdateModelMixin,viewsets.GenericViewSet):
    serializer_class = PatientCancelPrescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        patient_id = self.kwargs.get('patient_id', None)
        queryset = PharmacyPrescription.objects.filter(patient__user=self.request.user, patient=patient_id)
        return queryset
# pharmacy
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

class PharmacyPrescriptionPicView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = PharmacyPrescriptionPicSerializer
    permission_classes = [IsAuthenticated]

class PharmacyDeliver(mixins.UpdateModelMixin,viewsets.GenericViewSet):
    serializer_class = PharmacyDeliverPrescription
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # list of prescription
        user = self.request.user
        if user.type == User.PHARMACY:
            queryset = PharmacyPrescription.objects.all()
            return queryset
        else:
            return []

class Chart(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = ChartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # list of prescription
        user = self.request.user
        if user.type == User.PHARMACY:
            queryset = PharmacyPrescription.objects.\
                annotate(date=F("created_at__date")).\
                values("date").\
                annotate(prescription=Count('date'))
            return queryset
        else:
            return []

class ReportFields(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = ReportFieldsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # list of prescription
        user = self.request.user
        Status = PharmacyPrescription.Status
        if user.type == User.PHARMACY:
            return [
                {
                    'title': 'تعداد کل سفارش‌ها',
                    'value': PharmacyPrescription.objects.count(),
                },
                {
                    'title': 'تعداد سفارش‌های باز',
                    'value': PharmacyPrescription.objects.filter(status__in=[
                        Status.waiting_for_payment,
                        Status.waiting_for_delivery,
                        Status.waiting_for_response
                    ]).count(),
                },
                {
                    'title': 'تعداد سفارش‌های بسته',
                    'value': PharmacyPrescription.objects.filter(status__in=[
                        Status.delivered,
                    ]).count(),
                },
                {
                    'title': 'درآمد کل',
                    'value': (PharmacyPrescription.objects.filter(status__in=[
                                                            Status.delivered,
                                                            Status.waiting_for_delivery,
                                                        ])
                                                        .annotate(total=F('price') + F('delivery_price'))
                                                        .aggregate(Sum('total')))['total__sum'],
                },
                {
                    'title': 'درآمد قابل برداشت',
                    'value': (PharmacyPrescription.objects.filter(status__in=[
                        Status.delivered,
                    ])
                              .annotate(total=F('price') + F('delivery_price'))
                              .aggregate(Sum('total'))['total__sum'] - (PharmacyPayment.objects.aggregate(Sum('amount'))['amount__sum'] or 0)
                    ),
                },
                {
                    'title': 'درآمد پرداخت شده',
                    'value': (PharmacyPayment.objects.aggregate(Sum('amount')))['amount__sum'] or 0,
                },
                {
                    'title': 'درآمد بلوکه شده',
                    'value': (PharmacyPrescription.objects.filter(status__in=[
                                    Status.waiting_for_delivery,
                                ])
                                .annotate(total=F('price') + F('delivery_price'))
                                .aggregate(Sum('total')))['total__sum'],
                },
            ]
        else:
            return []