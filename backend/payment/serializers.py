from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from payment.models import Payment
from visit.models import Visit
from .services import BasePaymentService

### create for visit
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

    def update(self, instance, validated_data):
        print("Updating payment")
        BasePaymentService.get_result(instance)
        print("Payment updated")

        return instance

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
        payment = BasePaymentService.create_payment(user=self.context['request'].user,amount=validated_data['doctor'].amount)
        visit = Visit(user=self.context['request'].user,doctor=validated_data['doctor'],patient=validated_data['patient'],payment=payment)
        visit.save()

        return visit