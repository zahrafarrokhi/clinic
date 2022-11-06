from django.db import models

from authentication.models import User
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Payment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()
    card_number = models.CharField(max_length=30,blank=True,null=True)
    # shomare paygiri
    rrn = models.CharField(max_length=100,blank=True,null=True)
    # token for payment zarinpal send to site  at first time
    ref_id = models.CharField(max_length=100,null=True,blank=True)
    description = models.CharField(max_length=200, default="", blank=True)
    class Status(models.TextChoices):
        successful = 'successful', _('Successful')
        failed = 'failed', _('Failed')
        pending = 'pending', _('Pending')

    status = models.CharField(choices=Status.choices, default=Status.pending, max_length=30)
