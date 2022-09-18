from rest_framework import serializers

from patient.models import Patient, Address


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        #fields = '__all__'
        exclude = ['user']

    def validate(self,attrs):
        if len (attrs['national_id'] ) != 10 :
            raise serializers.ValidationError("National id must be 10 digits")
        return attrs

    def create(self,validated_data):
        user = self.context['request'].user
        patient = Patient(
            user = user,
            national_id = validated_data['national_id'],
            date_of_birth = validated_data['date_of_birth'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
        )
        patient.save()
        return patient

    def update(self, instance, validated_data):
        instance.city = validated_data.get(
            'city', instance.city)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.gender = validated_data.get(
            'gender', instance.gender)
        instance.insurance = validated_data.get(
            'insurance', instance.insurance)
        instance.supplementary_insurance = validated_data.get(
            'supplementary_insurance', instance.supplementary_insurance)
        instance.save()
        return instance


class AddressSerializers(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        exclude = ['user']

    def create(self,validated_data):
        user = self.context['request'].user
        address = Address.objects.create(user=user,**validated_data)
        return address

