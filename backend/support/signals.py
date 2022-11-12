from django.db.models.signals import post_save
from django.dispatch import receiver

from authentication.models import User
from support.models import Ticket,Message


@receiver(post_save, sender=Message, weak=True)
def message_post_save(sender, instance: Message, created, **kwargs):
    if created:
        t = instance.ticket
        if instance.user.type == User.SUPPORT:
            t.status = Ticket.Status.responded

        else:
            t.status = Ticket.Status.waiting_for_response

        t.save()
