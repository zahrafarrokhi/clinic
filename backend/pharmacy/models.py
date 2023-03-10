from django.db import models
from django.contrib.gis.db import models as gis_models

from authentication.models import User
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _
import string

from patient.models import Patient,Address
from payment.models import Payment
from visit.models import DoctorPrescription


def generate_random_str(length=5):
    return get_random_string(length=length,
                             allowed_chars=string.printable)


def img_upload_path_generator(instance, file_name):
    return 'uploads/prescriptions/pic{0}_{1}'.format(generate_random_str(12), file_name)


# Create your models here.
class Pharmacy(models.Model):
    # for witch  user
    user = models.ForeignKey(
        User, null=False, blank=False, on_delete=models.CASCADE)
    address = models.TextField(null=False, blank=False)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=16)
    location = gis_models.PointField()


class PharmacyPrescription(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    # auto_now_add or read_only_fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField()
    code = models.CharField(max_length=40)
    address = models.ForeignKey(Address,on_delete=models.CASCADE,null=True,blank=True)
    class Status(models.TextChoices):
        waiting_for_response = 'waiting_for_response', _('Waiting for response')
        waiting_for_payment = 'waiting_for_payment', _('Waiting for payment')
        waiting_for_delivery = 'waiting_for_delivery', _('Waiting for delivery')
        delivered = 'delivered', _('Delivered')
        canceled = 'canceled', _('Canceled')

    status = models.CharField(choices=Status.choices, default=Status.waiting_for_response, max_length=30)
    #pharmacy
    pharmacy_description = models.TextField(null=True,blank=True)
    price = models.BigIntegerField(null=True,blank=True)
    delivery_price = models.BigIntegerField(null=True,blank=True)
    day = models.DateField(null=True,blank=True)
    time = models.TimeField(null=True,blank=True)
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE,null=True,blank=True, related_name="pharmacy_prescription")

    doctor_prescription = models.ForeignKey(DoctorPrescription, on_delete=models.CASCADE, null=True, blank=True)

    @property
    def images(self):
        if self.doctor_prescription:
            return self.doctor_prescription.doctorpic_set
        return self.patientprescriptionpic_set

class PharmacyPrescriptionPic(models.Model):

    image = models.ImageField(upload_to=img_upload_path_generator)
    prescription =  models.ForeignKey(PharmacyPrescription, on_delete=models.CASCADE)

class PatientPrescriptionPic(models.Model):
    image = models.ImageField(upload_to=img_upload_path_generator)
    prescription =  models.ForeignKey(PharmacyPrescription, on_delete=models.CASCADE)



class PharmacyPayment(models.Model):
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)