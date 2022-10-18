from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from doctor.models import Doctor
from doctor.serializers import DoctorSerializer
from patient.models import Patient
from payment.serializers import PaymentSerializer
from payment.services import BasePaymentService
from visit.models import Visit


class VisitSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)
    # ref_id = serializers.CharField(read_only=True, source="payment.ref_id") # front =>hiddenField.setAttribute("value", response?.data?.ref_id);
    # create visit
    doctor_id = serializers.PrimaryKeyRelatedField(source="doctor", write_only=True, queryset=Doctor.objects.all())

    class Meta:
        model = Visit
        fields = "__all__"
        read_only_fields = ['status','payment', 'user']

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

    def create(self, validated_data):
        # user is who has logged in
        payment = BasePaymentService.create_payment(user=self.context['request'].user,amount=validated_data['doctor'].amount)
        visit = Visit(doctor=validated_data['doctor'],patient=validated_data['patient'],payment=payment)
        visit.save()

        return visit