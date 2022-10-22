from django.db import models
from doctor.models import Doctor
from patient.models import Patient
from django.utils.translation import gettext_lazy as _

from payment.models import Payment


# Create your models here.
class Visit(models.Model):
    class Status(models.TextChoices):
        started = 'started', _('Started')
        waiting_for_response = 'waiting_for_response', _('Waiting for response')
        responded = 'responded', _('Responded')
        closed = 'closed', _('Closed')
        waiting_for_payment = 'waiting_for_payment', _('Waiting for Payment')
        payment_failed = 'payment_failed', _('Payment failed')
    doctor = models.ForeignKey(Doctor,on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    # auto_now_add or read_only_fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(choices=Status.choices, default=Status.waiting_for_payment, max_length=30)
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE)

    room_id = models.CharField(max_length=50, null=True, blank=True)
    room_name = models.CharField(max_length=50, null=True, blank=True)

