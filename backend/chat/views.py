from django.shortcuts import render
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

    def post(self, request):
        service = RocketChatService()
        tok = service.create_token(self.get_user_obj())

        return Response(tok)







