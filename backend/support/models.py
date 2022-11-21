from django.db import models

from authentication.models import User
from django.utils.translation import gettext_lazy as _

from patient.models import Patient
from django.utils.crypto import get_random_string
import string


def generate_random_str(length=5):
    return get_random_string(length=length,
                             allowed_chars=string.printable)


def img_upload_path_generator(instance, file_name):
    return 'uploads/support/file{0}_{1}'.format(generate_random_str(12), file_name)


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Status(models.TextChoices):
        waiting_for_response = 'waiting_for_response', _('Waiting for response')
        responded = 'responded', _('Responded')
        closed = 'closed', _('Closed')

    status = models.CharField(choices=Status.choices, default=Status.waiting_for_response, max_length=30)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, blank=True, null=True)


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = models.TextField(blank=True, null=True)
    # file = models.FileField(blank=True,null=True)
    file = models.ImageField(upload_to=img_upload_path_generator, blank=True, null=True)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
