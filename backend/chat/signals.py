from django.db.models.signals import post_save
from django.dispatch import receiver
from chat.services import RocketChatService
from doctor.models import Doctor
from patient.models import Patient


@receiver(post_save, sender=Doctor, weak=True)
def doctor_post_save(sender, instance: Doctor, created, **kwargs):
    service = RocketChatService()
    # rocket_chat => reverse relation on doctor models
    if instance.chat_user.exists():
        pass
    else:
        service.create_user(instance)


@receiver(post_save, sender=Patient, weak=True)
def patient_post_save(sender, instance: Patient, created, **kwargs):
    service = RocketChatService()
    # rocket_chat => reverse relation on patient models
    if instance.chat_user.exists():
        pass
    else:
        service.create_user(instance)