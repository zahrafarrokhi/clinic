from rest_framework import serializers

from laboratory.models import LaboratoryPrescription, PatientPrescriptionPic
from django.utils.translation import gettext_lazy as _

from backend import settings

class PatientPrescriptionSerializer(serializers.ModelSerializer):
    # pic = PharmacyPrescriptionPicSerializer(source="pharmacyprescriptionpic_set", read_only=True, many=True)
    class Meta :
        model = LaboratoryPrescription
        fields = '__all__'
        read_only_fields = ['status', ]

    def validate(self,attrs):
        patient = attrs['patient']
        user = self.context['request'].user
        if user != patient.user:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        if self.instance is not None and self.instance.status != LaboratoryPrescription.Status.waiting_for_payment:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        return attrs


class PatientPrescriptionPicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientPrescriptionPic
        fields = '__all__'

    def validate_image(self, image):
        if image is not None and image.size > settings.FILE_UPLOAD_SIZE_LIMIT:
            raise serializers.ValidationError(
                _("File is too big!"))
        return image


    def validate(self, attrs):
        prescription = attrs['prescription']
        user = self.context['request'].user
        if user != prescription.patient.user:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return attrs
