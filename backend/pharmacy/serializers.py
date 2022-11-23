from django.conf import settings
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from pharmacy.models import PharmacyPrescription, PharmacyPrescriptionPic


class PharmacyPrescriptionSerializer(serializers.ModelSerializer):

    class Meta :
        model = PharmacyPrescription
        fields = '__all__'

    def validate(self,attrs):
        patient = attrs['patient']
        user = self.context['request'].user
        if user != patient.user:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return attrs


class PrescriptionPic(serializers.ModelSerializer):
    class Meta:
        model = PharmacyPrescriptionPic
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
