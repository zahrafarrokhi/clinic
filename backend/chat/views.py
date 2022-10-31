from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.services import RocketChatService


class UserObjExtension():
    obj_query_name = 'id'

    @property
    def get_obj_query(self):
        return self.kwargs.get(self.obj_query_name)

    def get_user_obj(self):
        user = self.request.user # or user = request.user
        obj = None
        if user.type == user.DOCTOR:
            obj = user.doctor
        else :
            obj = user.patient_set.get(pk=self.get_obj_query)
        return obj


class GetToken(APIView, UserObjExtension):
    obj_query_name = 'patient_id'
    permission_classes = [IsAuthenticated]

    def post(self, request, **kwargs):
        service = RocketChatService()
        tok = service.create_token(self.get_user_obj())

        return Response(tok)


class SendMessage(APIView, UserObjExtension):
    obj_query_name = 'patient_id'
    permission_classes = [IsAuthenticated]

    def post(self,requset,visit_id, **kwargs):
        # user = self.request.user
        obj = self.get_user_obj()
        visit = obj.visit_set.get(pk=visit_id)

        service = RocketChatService()
        service.login(obj)
        mesg = service.send_message(visit=visit,text=requset.data['text'])
        return Response(mesg)


class ListMessages(APIView, UserObjExtension):
    permission_classes = [IsAuthenticated]

    def get(self, requset, visit_id, **kwargs):
        # user = self.request.user
        obj = self.get_user_obj()
        visit = obj.visit_set.get(pk=visit_id)

        service = RocketChatService()
        service.login(obj)
        mesg = service.list_messages(visit=visit)
        return Response(mesg)

class UploadFile(APIView, UserObjExtension):
    obj_query_name = 'patient_id'
    permission_classes = [IsAuthenticated]

    def post(self,requset,visit_id, **kwargs):
        # user = self.request.user
        obj = self.get_user_obj()
        visit = obj.visit_set.get(pk=visit_id)
        file = requset.data['file']
        print(file.__dict__)
        service = RocketChatService()
        service.login(obj)
        resp = service.upload_file(visit=visit,file=file)
        return Response(resp)