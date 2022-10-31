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
    authorization_headers = {}


    def __init__(self, settings=ROCKETCHAT_SETTINGS):
        self.settings = settings
        self.authorization_headers = {}

    def login(self, obj: [Doctor, Patient]):
        self.user = obj
        resp = self.create_token(self.user)
        self.authorization_headers = {
            'X-Auth-Token': resp['authToken'],
            'X-User-Id': resp['userId'],
        }

    def get_headers(self, add_content_type=True):
        headers = {
            'X-Auth-Token': self.settings['admin_token'],
            'X-User-Id': self.settings['admin_user_id'],
        }
        print("Auth", self.authorization_headers)
        headers.update(self.authorization_headers)
        if add_content_type:
            headers.update({
                'Content-type': 'application/json',
            })
        return headers

    @property
    def headers(self):
        return self.get_headers()

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

    def send_message(self,visit: Visit, text=None):
        print(self.headers)

        response = requests.post(f"{self.settings['url']}/api/v1/chat.postMessage",json={"roomId":visit.room_id,"text":text},headers=self.headers)
        return response.json()

    def list_messages(self,visit:Visit):
        print(visit.room_id, visit.room_name)
        response = requests.get(f"{self.settings['url']}/api/v1/channels.messages",
                                 params={"roomId": visit.room_id}, headers=self.headers)
        print(response.json())
        return response.json()

    def upload_file(self, visit: Visit, file):
        response = requests.post(f"{self.settings['url']}/api/v1/rooms.upload/{visit.room_id}",
                                files={'file': (file._name, file.file, file.content_type)}, headers=self.get_headers(add_content_type=False))
        return response.json()