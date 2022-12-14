from django.db import models

from patient.models import Patient,Address
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _
import string

from payment.models import Payment
from visit.models import DoctorPrescription


def generate_random_str(length=5):
    return get_random_string(length=length,
                             allowed_chars=string.printable)


def img_upload_path_generator(instance, file_name):
    return 'uploads/prescriptions/pic{0}_{1}'.format(generate_random_str(12), file_name)

# lab(update) and patient(create)
class LaboratoryPrescription(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    # auto_now_add or read_only_fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField()
    code = models.CharField(max_length=40)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)

    class Status(models.TextChoices):
        waiting_for_response = 'waiting_for_response', _('Waiting for response')
        waiting_for_payment = 'waiting_for_payment', _('Waiting for payment')
        waiting_for_test = 'waiting_for_test', _('Waiting for test')
        waiting_for_result = 'waiting_for_result', _('Waiting for result')
        result = 'result', _('Result')
        canceled = 'canceled', _('Canceled')

    status = models.CharField(choices=Status.choices, default=Status.waiting_for_response, max_length=30)
    # laboratory
    price = models.BigIntegerField(null=True, blank=True)
    doctor_name =  models.CharField(max_length=40,null=True, blank=True)
    delivery_price = models.BigIntegerField(null=True, blank=True)
    laboratory_description = models.TextField(null=True, blank=True)
    time = models.JSONField(null=True, blank=True)
    #payment
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, null=True, blank=True,
                                   related_name="laboratory_prescription")
    selected_time = models.JSONField(null=True, blank=True)

    doctor_prescription = models.ForeignKey(DoctorPrescription, on_delete=models.CASCADE, null=True, blank=True)

    @property
    def images(self):
        if self.doctor_prescription:
            return self.doctor_prescription.doctorpic_set
        return self.patientprescriptionpic_set




# patient upload pic & lab see that
class PatientPrescriptionPic(models.Model):
    image = models.ImageField(upload_to=img_upload_path_generator)
    # pic for which prescription
    prescription =  models.ForeignKey(LaboratoryPrescription, on_delete=models.CASCADE)

# lab ennter test and patient see that data(laboratory)
class TestPrescription(models.Model):
    # test for which prescription
    prescription =  models.ForeignKey(LaboratoryPrescription, on_delete=models.CASCADE,related_name="tests")
    test_name =  models.CharField(max_length=40,null=True, blank=True)
    insurance = models.BooleanField(default=False)
    sup_insurance = models.BooleanField(default=False)


class LaboratoryResultPic(models.Model):
    image = models.ImageField(upload_to=img_upload_path_generator)
    # pic for which prescription
    prescription =  models.ForeignKey(LaboratoryPrescription, on_delete=models.CASCADE)