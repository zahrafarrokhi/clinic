from django.db import models

from authentication.models import User


# Create your models here.
class Payment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()
    card_number = models.CharField(max_length=30,blank=True,null=True)
    # shomare paygiri
    rrn = models.CharField(max_length=50,blank=True,null=True)
    # token for payment zarinpal send to site  at first time
    ref_id = models.CharField(max_length=50,null=True,blank=True)