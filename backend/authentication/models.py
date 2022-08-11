from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager, BaseUserManager
from django.utils.crypto import get_random_string
from .settings import api_settings
from django.utils.translation import gettext_lazy as _
import uuid

def generate_numeric_token():
    return get_random_string(length=api_settings.OTP_LENGTH,
                             allowed_chars=string.digits)


def generate_uuid():
    tok = uuid.uuid4().hex.upper()
    return tok


# Create your models here.
class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email=None, phone_number=None, password=None, **extra_fields):

      if not email and not phone_number:
        raise ValueError(_('The given phone number/email must be set'))
        
      email = self.normalize_email(email)
      user = self.model(email=email, phone_number=phone_number, **extra_fields)
      user.set_password(password)
      user.save()
      return user

    def create_superuser(self, email=None, phone_number=None, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password,phone_number, **extra_fields)


class User(AbstractUser):
  ADMIN = 'admin'
  DOCTOR = 'doctor'
  ASSISTANT = 'assistant'
  PATIENT = 'patient'
  LABORATORY = 'laboratory'
  PHARMACY = 'pharmacy'
  ACCOUNTANT = 'accountant'
  SUPPORT = 'support'
  USER_TYPE_CHOICES = (
    (ADMIN, 'Admin'),
    (DOCTOR, 'Doctor'),
    (ASSISTANT, 'Assistant'),
    (LABORATORY, 'Laboratory'),
    (PATIENT, 'patient'),
    (PHARMACY, 'Pharmacy'),
    (ACCOUNTANT, 'Accountant'),
    (SUPPORT, 'Support'),
    )
  username = None
  unique_id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)
  type = models.CharField(choices=USER_TYPE_CHOICES, default=PATIENT,
                            max_length=32)

  phone_number = models.CharField(max_length=16,
                                    unique=True, null=True, default=None)
  phone_number_verified = models.BooleanField(default=False)
  email_verified = models.BooleanField(default=False)
  
  USERNAME_FIELD = 'unique_id'
  objects = UserManager()

  def __str__(self):
      username = self.phone_number if self.phone_number else self.email
      return f"{username}"

class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    EMAIL = 'email'
    SMS = 'sms'
    OTP_CHOICES = ((EMAIL, 'E-Mail'), (SMS, 'SMS'),)
    type = models.CharField(max_length=10, choices=OTP_CHOICES, default=SMS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    exp_date = models.DateTimeField(blank=False, null=False)
    is_active = models.BooleanField(default=True)
    value = models.CharField(default=generate_numeric_token, max_length=10)

    def __str__(self):
      return str(f"{self.value} sent by {str(self.type)} to "
      f"{self.user.email if self.type == 'email' else self.user.phone_number}")

class Token(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exp_date = models.DateTimeField(blank=False, null=False)
    session = models.CharField(default=generate_uuid, max_length=128)
    device_info = models.JSONField(blank=True, null=True, default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)