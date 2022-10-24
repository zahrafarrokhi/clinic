import requests
from django.utils.crypto import get_random_string

from backend.settings import ROCKETCHAT_SETTINGS
import string

from chat.models import ChatUser
from doctor.models import Doctor
from patient.models import Patient
from visit.models import Visit


def generate_random_str(length=5):
    return get_random_string(length=length,
                             allowed_chars=string.ascii_lowercase)


def create_username(obj):
    return f"{obj._meta.db_table}_{obj.pk}_{generate_random_str()}"


class RocketChatService:
    settings = ROCKETCHAT_SETTINGS

    def __init__(self, settings=ROCKETCHAT_SETTINGS):
        self.settings = settings

    @property
    def headers(self):
        return {
            'X-Auth-Token': self.settings['admin_token'],
            'X-User-Id': self.settings['admin_user_id'],
            'Content-type': 'application/json',
        }

    def create_user(self, obj):
        username = create_username(obj)
        email = obj.user.email if obj.user.email else f"{username}@clinic.com"
        name = f"{obj.first_name} {obj.last_name}"
        password = generate_random_str(length=15)
        print(username, email, name, password)
        response = requests.post(f"{self.settings['url']}/api/v1/users.create", json={
            "username": username,
            "email": email,
            "name": name,
            "password": password,
        }, headers=self.headers)

        res = response.json()

        print(res, isinstance(res, dict))
        user = ChatUser(rocketchat_id=res["user"]["_id"],username=username,password=password,owner=obj)
        user.save()
        return user


    def create_channel(self,obj:Visit):
        # channels name
        name = create_username(obj)
        response = requests.post(f"{self.settings['url']}/api/v1/channels.create", json={
            "name": name,
            "members": [
                # chatuser.owner <=> doctor.chat_user
                obj.doctor.chat_user.first().username,
                obj.patient.chat_user.first().username,
            ]
        }, headers=self.headers)
        res = response.json()
        print(res)
        obj.room_id = res['channel']['_id']
        obj.room_name = name
        obj.save()

    def create_token(self, obj: [Doctor, Patient]):
        # chat_user(realation to ChatUser modles ,has username field)
        username = obj.chat_user.first().username
        # user_id = obj.chat_user.first().rocketchat_id
        response = requests.post(f"{self.settings['url']}/api/v1/users.createToken", json={
            "username":username,
        }, headers=self.headers)
        res = response.json()
        return res['data']
