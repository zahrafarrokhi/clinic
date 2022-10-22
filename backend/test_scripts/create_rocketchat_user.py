# python3 manage.py shell < test_scripts/create_rocketchat_user.py

from chat.services import RocketChatService
from patient.models import Patient
service = RocketChatService()
patient = Patient.objects.first()
service.create_user(patient)