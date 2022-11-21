from django.db import models
from django.contrib.gis.db import models as gis_models

from authentication.models import User
from django.utils.crypto import get_random_string

import string

from patient.models import Patient


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

class PharmacyPrescriptionPic(models.Model):
    image = models.ImageField(upload_to=img_upload_path_generator)
    prescription =  models.ForeignKey(PharmacyPrescription, on_delete=models.CASCADE)




