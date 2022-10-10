from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from visit.models import Visit


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = "__all__"

    def validate(self, attrs):
        print(attrs)
        patient = attrs['patient']
        if self.context['request'].user != patient.user:
            raise ValidationError(_('action not allowed'))
        return attrs
