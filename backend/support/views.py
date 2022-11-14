from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from support.models import Ticket
from support.serializers import TicketSerializer, MessageSerializer, CreateMessageSerializer, CreateTicketSerializer, \
    CloseTicketSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import LimitOffsetPagination

# Create your views here.
class TicketView(mixins.ListModelMixin,mixins.CreateModelMixin,mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = {
        'status': ['exact', 'in'],
        'created_at': ['date__lte', 'date__gte'],
    }
    search_fields = ['subject',  'id', 'created_at']
    ordering_fields = ['created_at', 'id', 'subject', 'status']
    # pagination
    pagination_class = LimitOffsetPagination
    def get_queryset(self):
        user = self.request.user
        if user.type == User.SUPPORT:
            return Ticket.objects.all()
        else:
            return Ticket.objects.filter(user=user)
class CreateTicketView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = CreateTicketSerializer
    permission_classes = [IsAuthenticated]



class MessageView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = CreateMessageSerializer
    permission_classes = [IsAuthenticated]

class CloseTicket(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = CloseTicketSerializer
    permission_classes = [IsAuthenticated]

# with destroy(front patch to delete)
# class CloseTicket(mixins.DestroyModelMixin, viewsets.GenericViewSet):
#     serializer_class = CloseTicketSerializer
#     permission_classes = [IsAuthenticated, IsSupport]
#     def get_queryset(self):
#         return Ticket.objects.all()
#
#     def perform_destroy(self, instance):
#         instance.status = Ticket.Status.closed
#         instance.save()