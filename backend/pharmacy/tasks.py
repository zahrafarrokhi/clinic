from celery import shared_task
from .models import PharmacyPrescription

@shared_task(name ='close_pharmacy_prescriptions')
def close_prescription():
    prescription = PharmacyPrescription.objects.filter(status=PharmacyPrescription.Status.waiting_for_payment)

    for pres in prescription:
        pres.status = PharmacyPrescription.Status.canceled
        # pres.save()

    PharmacyPrescription.objects.bulk_update(prescription, ['status'])