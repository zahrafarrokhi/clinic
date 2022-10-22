# python3 manage.py shell < test_scripts/create_visit.py
from chat.services import RocketChatService
from visit.models import Visit
service = RocketChatService()
visit = Visit.objects.get(pk=3)
service.create_channel(visit)