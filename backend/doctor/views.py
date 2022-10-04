from django.shortcuts import render
from rest_framework import generics, mixins, viewsets, status

from doctor.models import Doctor, Department
from doctor.serializers import DoctorSerializer, DepartmentSerializer


# Create your views here.
class DoctorView(mixins.ListModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = DoctorSerializer
    permission_classes = []
    # list Doctors from site
    queryset = Doctor.objects.all()

class DepartmentView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = []
    # list Doctors from site
    queryset = Department.objects.all()