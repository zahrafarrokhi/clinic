from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from payment.models import Payment
from payment.serializers import PaymentSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import OrderingFilter, SearchFilter


# update
# Create your views here.
class PaymentVerifyView(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = PaymentSerializer
    permission_classes = []
    queryset = Payment.objects.all()

# list
class PaymentListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend,OrderingFilter,SearchFilter]
    # ordering
    ordering_fields = ['created_at', 'id', 'amount', 'status']
    # filtering
    filterset_fields = {
        'status': ['exact', 'in'],
        'created_at': ['date__lte', 'date__gte'],
    }
    # search
    search_fields = ['amount', 'created_at', 'id']
    def get_queryset(self):
        user = self.request.user
        return Payment.objects.filter(user=user)
