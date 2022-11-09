from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from support.models import Ticket
from support.serializers import TicketSerializer


# Create your views here.
class TicketView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.type == User.SUPPORT:
            return Ticket.objects.all()
        else:
            return Ticket.objects.filter(user=user)
