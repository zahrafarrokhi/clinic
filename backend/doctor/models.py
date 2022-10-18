from django.db import models
from authentication.models import User
from constant_data.models import City
from django.utils.translation import gettext_lazy as _
from django.contrib.gis.db import models as gis_models
# Create your models here.
def _doctor_img_upload_path_generator(instance, file_name):
    return 'uploads/doctor_img/doc{0}_{1}'.format(instance.user.pk, file_name)


DEFAULT_VISIT_AMOUNT = 500000

class Department(models.Model):
    name = models.CharField(max_length=50)
    faname = models.CharField(max_length=50)
    icon = models.FileField(blank=True,null=True)
    def __str__(self):
        return str(self.name)


class Office(models.Model):
    location = gis_models.PointField()
    address = models.TextField(max_length=255)
    open_hours = models.CharField(max_length=255, default="")
    postal_code = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)

    def __str__(self):
        return str(self.postal_code)


class Doctor(models.Model):
    class Degrees(models.TextChoices):
        GENERAL_DOCTOR = 'general_doctor', _('General Doctor')
        FULL_DOCTOR = 'full_doctor', _("Full Doctor")
        SPECIALIZED_DOCTOR = 'specialized_doctor', _("Specialized doctor")

    user = models.OneToOneField(
        User, null=False, blank=False, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    national_id = models.CharField(max_length=50, unique=True)
    degree = models.CharField(max_length=20, choices=Degrees.choices)
    medical_code = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    description = models.TextField()
    image = models.FileField(
        upload_to=_doctor_img_upload_path_generator, blank=True, null=True)
    # fk
    # blank=False, null=False => required
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    address = models.ForeignKey(Office, on_delete=models.CASCADE)
    amount = models.IntegerField(default=DEFAULT_VISIT_AMOUNT)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.full_name} ({self.pk})"

