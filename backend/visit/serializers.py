from django.conf import settings
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from authentication.models import User
from doctor.models import Doctor
from doctor.serializers import DoctorSerializer
from laboratory.serializers import PatientPrescriptionSerializer as LaboratoryPatientPrescriptionSerializer
from patient.models import Patient
from patient.serializers import PatientSerializer
from payment.serializers import PaymentSerializer
from payment.services import BasePaymentService
from pharmacy.serializers import PatientPrescriptionSerializer as PharmacyPatientPrescriptionSerializer
from visit.models import Visit, DoctorPrescription, DoctorPic


class VisitSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)
    # ref_id = serializers.CharField(read_only=True, source="payment.ref_id") # front =>hiddenField.setAttribute("value", response?.data?.ref_id);
    # create visit
    doctor_id = serializers.PrimaryKeyRelatedField(source="doctor", write_only=True, queryset=Doctor.objects.all())
    patient = PatientSerializer()
    class Meta:
        model = Visit
        fields = "__all__"
        read_only_fields = ['status', 'payment', 'user', 'room_id', 'room_name']

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
        payment = BasePaymentService.create_payment(user=self.context['request'].user,
                                                    amount=validated_data['doctor'].amount,
                                                    description=f"Visit with {validated_data['doctor'].full_name}",
                                                    )
        visit = Visit(doctor=validated_data['doctor'], patient=validated_data['patient'], payment=payment)
        visit.save()

        return visit


class NestedVisitSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Visit
        exclude = ['patient']


class ProfileSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    visits = NestedVisitSerializer(source="patient.visit_set", many=True)
    laboratory = LaboratoryPatientPrescriptionSerializer(source="patient.laboratoryprescription_set", many=True)
    pharmacy = PharmacyPatientPrescriptionSerializer(source="patient.pharmacyprescription_set", many=True)
    class Meta:
        model = Visit
        fields = "__all__"


class DoctorPicSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorPic
        fields = "__all__"

    def validate_image(self, image):
        if image is not None and image.size > settings.FILE_UPLOAD_SIZE_LIMIT:
            raise serializers.ValidationError(
                _("File is too big!"))
        return image
    def validate(self, attrs):
        user = self.context['request'].user
        visit = attrs['prescription'].visit
        if user.type != User.DOCTOR:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        if visit.doctor != user.doctor:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return attrs

class DoctorPrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = DoctorPrescription
        fields = "__all__"

    def validate(self, attrs):
        doctor = self.context['request'].user.doctor
        visit = attrs['visit']
        if visit.doctor != doctor:
            raise ValidationError(_('action not allowed'))
        return attrs



class PatientPrescriptionSerializer(serializers.ModelSerializer):
    visit = VisitSerializer()
    image = DoctorPicSerializer(source="doctorpic_set",many=True)
    class Meta:
        model = DoctorPrescription
        fields = "__all__"