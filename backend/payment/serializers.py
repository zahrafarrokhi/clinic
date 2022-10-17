from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from payment.models import Payment
from visit.models import Visit


### create for visit
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = "__all__"
        read_only_fields = ['status', 'payment']


    def validate(self, attrs):
        patient = attrs['patient']
        if self.context['request'].user != patient.user:
            raise ValidationError(_('action not allowed'))
        return attrs

    def create(self, validated_data):
        # user is who has logged in
        visit = Visit(user=self.context['request'].user,doctor=validated_data['doctor'],patient=validated_data['patient'] )
        visit.save()

        return visit