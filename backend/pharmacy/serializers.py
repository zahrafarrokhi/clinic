from django.conf import settings
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

from authentication.models import User
from patient.serializers import PatientSerializer,AddressSerializers
from payment.serializers import PaymentSerializer
from payment.services import BasePaymentService
from pharmacy.models import PharmacyPrescription, PharmacyPrescriptionPic, PatientPrescriptionPic



# pharmacyPic
class PharmacyPrescriptionPicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyPrescriptionPic
        fields = '__all__'

    def validate_image(self, image):
        if image is not None and image.size > settings.FILE_UPLOAD_SIZE_LIMIT:
            raise serializers.ValidationError(
                _("File is too big!"))
        return image

    def validate(self, attrs):
        user = self.context['request'].user
        if user.type != User.PHARMACY:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return attrs
# patient
class PatientPrescriptionSerializer(serializers.ModelSerializer):
    pic = PharmacyPrescriptionPicSerializer(source="pharmacyprescriptionpic_set", read_only=True, many=True)
    class Meta :
        model = PharmacyPrescription
        fields = '__all__'
        read_only_fields = ['status', 'pharmacy_description', 'price', 'delivery_price']

    def validate(self,attrs):
        patient = attrs['patient']
        user = self.context['request'].user
        if user != patient.user:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        if self.instance is not None and self.instance.status != PharmacyPrescription.Status.waiting_for_payment:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        return attrs

class PatientCancelPrescriptionSerializer(serializers.ModelSerializer):
    class Meta :
        model = PharmacyPrescription
        fields = ['status']
        read_only_fields = ['status', ]

    def validate(self,attrs):
        if self.instance is not None and self.instance.status != PharmacyPrescription.Status.waiting_for_payment:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        return attrs
    def update(self, instance, validated_data):
        instance.status = PharmacyPrescription.Status.canceled
        instance.save()
        return instance


class PatientDatePrescriptionSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)
    class Meta :
        model = PharmacyPrescription
        fields = ['id', 'time', 'day', 'payment']

    def validate(self,attrs):
        patient = self.instance.patient
        user = self.context['request'].user
        if user != patient.user:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        status = self.instance.status
        if status != PharmacyPrescription.Status.waiting_for_payment:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return attrs

    def update(self, instance, validated_data):
        payment = BasePaymentService.create_payment(user=self.context['request'].user,
                                                    amount=instance.price + instance.delivery_price,
                                                    description="PharmacyPrescription",
                                                    )
        instance.time = validated_data['time']
        instance.day = validated_data['day']
        instance.payment = payment
        instance.save()
        return instance

# # patientPic
class PrescriptionPic(serializers.ModelSerializer):
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

# pharmacy
class PharmacyPre(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    address = AddressSerializers(read_only=True)
    # PharmacyPrescription => PrescriptionPic
    pic = PrescriptionPic(source="patientprescriptionpic_set",read_only=True, many=True)
    pharmacy_pic = PharmacyPrescriptionPicSerializer(source="pharmacyprescriptionpic_set", read_only=True, many=True)

    class Meta:
        model = PharmacyPrescription
        fields = "__all__"
        read_only_fields = ['status', 'code', 'description']

    def validate(self, attrs):
        status = self.instance.status
        if status != PharmacyPrescription.Status.waiting_for_response:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return  attrs
    def update(self, instance, validated_data):
        instance.price = validated_data['price']
        instance.pharmacy_description = validated_data['pharmacy_description']
        instance.status = PharmacyPrescription.Status.waiting_for_payment
        instance.delivery_price = validated_data['delivery_price']
        instance.save()
        return instance

class PharmacyDeliverPrescription(serializers.ModelSerializer):
    class Meta :
        model = PharmacyPrescription
        fields = ['status']
        read_only_fields = ['status', ]

    def validate(self,attrs):
        if self.instance is not None and self.instance.status != PharmacyPrescription.Status.waiting_for_delivery:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        return attrs
    def update(self, instance, validated_data):
        instance.status = PharmacyPrescription.Status.delivered
        instance.save()
        return instance
