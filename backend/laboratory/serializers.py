from rest_framework import serializers

from laboratory.models import LaboratoryPrescription, PatientPrescriptionPic, TestPrescription
from django.utils.translation import gettext_lazy as _

from backend import settings
from patient.serializers import PatientSerializer

# patient & lab
class TestPrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPrescription
        fields = '__all__'
# patient
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


# laboratory

class LaboratoryPrescriptionSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    # pic relation with prscription( prescription =  models.ForeignKey(LaboratoryPrescription))
    pic = PatientPrescriptionPicSerializer(many=True, source="patientprescriptionpic_set",read_only=True)
    # related_name="tests" , source and fieldname have the same name => we dont need source
    tests = TestPrescriptionSerializer(many=True)
    class Meta:
        model = LaboratoryPrescription
        fields = '__all__'
        read_only_fields = ['status', 'address', 'code', 'patient', 'description' ]

    # beacuse we have queryset in view for login laboratory
    # def validate(self, attrs):
    #     pass

    def update(self, instance, validated_data):
        instance.price = validated_data['price']
        instance.doctor_name = validated_data['doctor_name']
        instance.delivery_price = validated_data['delivery_price']
        instance.laboratory_description = validated_data['laboratory_description']

        tests_data = validated_data['tests']
        tests = []
        for test_data in tests_data:
            # test_data.pop('id')
            test_data.update({
                'prescription': instance
            })
            test = TestPrescription(**test_data)
            test.save()
            tests.append(test)

        instance.save()
        return instance