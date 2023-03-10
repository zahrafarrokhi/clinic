from rest_framework import serializers

from authentication.models import User
from laboratory.models import LaboratoryPrescription, PatientPrescriptionPic, TestPrescription, LaboratoryResultPic
from django.utils.translation import gettext_lazy as _

from backend import settings
from patient.serializers import PatientSerializer, AddressSerializers

from datetime import date, time

from payment.serializers import PaymentSerializer
from payment.services import BasePaymentService


# patient & lab
class TestPrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPrescription
        fields = '__all__'

# laboratory
class TimeSerializer(serializers.Serializer):
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    date = serializers.DateField()


class LaboratoryResultPicSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaboratoryResultPic
        fields = '__all__'

    def validate_image(self, image):
        if image is not None and image.size > settings.FILE_UPLOAD_SIZE_LIMIT:
            raise serializers.ValidationError(
                _("File is too big!"))
        return image


    def validate(self, attrs):
        user = self.context['request'].user
        if user.type != User.LABORATORY:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return attrs


# patient
class PatientPrescriptionSerializer(serializers.ModelSerializer):
    # pic = PharmacyPrescriptionPicSerializer(source="pharmacyprescriptionpic_set", read_only=True, many=True)
    tests = TestPrescriptionSerializer(many=True, read_only=True)
    results = LaboratoryResultPicSerializer(many=True, read_only=True, source="laboratoryresultpic_set")

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



class PatientPaymentPrescriptionSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)
    selected_time = TimeSerializer()
    class Meta :
        model = LaboratoryPrescription
        fields = ['id', 'selected_time', 'payment']

    def validate(self,attrs):
        patient = self.instance.patient
        user = self.context['request'].user
        if user != patient.user:
            raise serializers.ValidationError(_("you arent allowed to do this"))

        status = self.instance.status
        if status != LaboratoryPrescription.Status.waiting_for_payment:
            raise serializers.ValidationError(_("you arent allowed to do this"))
        return attrs

    def update(self, instance, validated_data):
        payment = BasePaymentService.create_payment(user=self.context['request'].user,
                                                    amount=instance.price + instance.delivery_price,
                                                    description="Laboratory Prescription",
                                                    )
        instance.selected_time = {
            'start_time': validated_data['selected_time']['start_time'].strftime('%H:%M:%S', ),
            'end_time': validated_data['selected_time']['end_time'].strftime('%H:%M:%S', ),
            'date': validated_data['selected_time']['date'].strftime("%Y-%m-%d", ),
        }
        instance.payment = payment
        instance.save()
        return instance


# laboratory

class LaboratoryPrescriptionSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    # pic relation with prscription( prescription =  models.ForeignKey(LaboratoryPrescription))
    pic = PatientPrescriptionPicSerializer(many=True, source="images",read_only=True)
    # related_name="tests" , source and fieldname have the same name => we dont need source
    tests = TestPrescriptionSerializer(many=True)
    time = TimeSerializer(many=True)
    address = AddressSerializers(read_only=True)
    results = LaboratoryResultPicSerializer(many=True, read_only=True, source="laboratoryresultpic_set")
    class Meta:
        model = LaboratoryPrescription
        fields = '__all__'
        read_only_fields = ['status', 'address', 'code', 'patient', 'description' ]

    # beacuse we have queryset in view for login laboratory
    # def validate(self, attrs):
    #     pass

    # def validate_time(self, time):

    def update(self, instance, validated_data):
        instance.price = validated_data['price']
        instance.doctor_name = validated_data['doctor_name']
        instance.delivery_price = validated_data['delivery_price']
        instance.laboratory_description = validated_data['laboratory_description']
        print(validated_data['time'])
        instance.time = [
            {
                'start_time': item['start_time'].strftime('%H:%M:%S', ),
                'end_time':  item['end_time'].strftime('%H:%M:%S',),
                'date': item['date'].strftime("%Y-%m-%d", ),
            } for item in validated_data['time']]

        tests_data = validated_data['tests']

        for test_data in tests_data:
            # test_data.pop('id')
            test_data.update({
                'prescription': instance
            })
            test = TestPrescription(**test_data)
            test.save()
        instance.status = LaboratoryPrescription.Status.waiting_for_payment
        instance.save()
        return instance

class LaboratoryStatus(serializers.ModelSerializer):
    class Meta:
        model = LaboratoryPrescription
        fields = ['status', ]
        read_only_fields = ['status', ]

    def update(self, instance, validated_data):
        if instance.status == LaboratoryPrescription.Status.waiting_for_test:
            instance.status = LaboratoryPrescription.Status.waiting_for_result
            instance.save()
        return instance

class LaboratoryStatusResult(serializers.ModelSerializer):
    class Meta:
        model = LaboratoryPrescription
        fields = ['status', ]
        read_only_fields = ['status', ]

    def update(self, instance, validated_data):
        if instance.status == LaboratoryPrescription.Status.waiting_for_result:
            instance.status = LaboratoryPrescription.Status.result
            instance.save()
        return instance