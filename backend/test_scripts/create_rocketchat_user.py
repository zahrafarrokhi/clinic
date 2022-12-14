# python3 manage.py shell < test_scripts/create_rocketchat_user.py

from chat.services import RocketChatService
from doctor.models import Doctor
from patient.models import Patient
service = RocketChatService()
patient = Doctor.objects.first()
service.create_user(patient)

patient = Patient.objects.get(pk=1)
patient.visit_set == Visit.objects.filter(patient=patient)
visits = Visit.objects.filter(patient=patient)

visit = visits[0]
visit.patient