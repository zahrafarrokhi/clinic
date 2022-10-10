from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from doctor.serializers import DoctorSerializer
from patient.models import Patient
from visit.models import Visit


class VisitSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()
    class Meta:
        model = Visit
        fields = "__all__"
        read_only_fields = ['status']


   # create
    def validate(self, attrs):
        print(attrs)
        patient = attrs['patient']
        # or
        # get patient from url becucuse patient_id exist in url
        # patient_id = self.context['request'].parser_context.get('kwargs').get('patient_id', None)
        # try:
        #     patient = Patient.objects.get(pk=patient_id)
        # except Patient.DoesNotExist:
        #     raise ValidationError(_('Patient not found'))
        if self.context['request'].user != patient.user:
            raise ValidationError(_('action not allowed'))
        return attrs
