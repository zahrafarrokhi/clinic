from django.shortcuts import render
from rest_framework import viewsets, mixins

from payment.models import Payment
from payment.serializers import PaymentSerializer


# Create your views here.
class PaymentVerifyView(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = PaymentSerializer
    permission_classes = []
    queryset = Payment.objects.all()



