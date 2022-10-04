from rest_framework import serializers
from doctor.models import Doctor,Department,Office


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields ="__all__"


class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields ="__all__"

class DoctorSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    office = OfficeSerializer(source="address")

    class Meta:
        model = Doctor
        fields = ['user', 'first_name', 'last_name', 'department', 'image','degree','medical_code','description','office']

