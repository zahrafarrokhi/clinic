from django.db.models import Q
from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from visit.models import Visit
from visit.serializers import VisitSerializer


# Create your views here.
class VisitView(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = VisitSerializer
    permission_classes = [IsAuthenticated]

    # authentication middleware checked token and put on self.request.user
    # the person who has logged in(self.request.user)
    # user pateint who has logged in or user doctor ... == self.request.user
    def get_queryset(self):
        patient_id = self.kwargs.get('patient_id', None)
        # try:
        #     patient = Patient.objects.all(pk=patient_id)
        return Visit.objects.filter(
            Q(patient__user=self.request.user, patient=patient_id) | Q(doctor__user=self.request.user))
