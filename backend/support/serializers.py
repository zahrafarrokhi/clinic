from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from authentication.models import User
from backend import settings
from support.models import Ticket,Message
from django.utils.translation import gettext_lazy as _
class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        read_only_fields = ['user', ]
        fields = '__all__'

    def validate(self, attrs):
        user = self.context['request'].user
        if user.type != User.SUPPORT and user != attrs['ticket'].user:
            raise ValidationError(_("you arent allowed to do this"))
        file = attrs.get('file', None)
        text = attrs.get('text', None)
        if file is not None and file.size > settings.FILE_UPLOAD_SIZE_LIMIT:
            raise serializers.ValidationError(
                _("File is too big!"))

        if file is None and text is None:
            raise ValidationError(_("Empty message"))

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        # validated_data => ticket,file,text
        # ticket = validated_data['ticket']
        # if user.type == user.SUPPORT:
        #     ticket.status = Ticket.Status.responded
        # else:
        #     ticket.status = Ticket.Status.waiting_for_response
        return Message.objects.create(user=user,**validated_data)

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        read_only_fields = ['user', 'ticket']
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(source="message_set",many=True)
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['user', 'status',]

    # def create(self, validated_data):
    #     user = self.context['request'].user
    #     subject = validated_data['subject']
    #     ticket=Ticket.objects.create(user=user,status=Ticket.Status.waiting_for_response,subject=subject)
    #     messages = validated_data['message_set']
    #     for msg in messages:
    #         msg = Message.objects.create(user=user,ticket=ticket,**msg)
    #
    #     return ticket

class CreateTicketSerializer(serializers.ModelSerializer):
    # files = serializers.FileField()
    text = serializers.CharField(write_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['user', 'status',]

    def create(self, validated_data):
        user = self.context['request'].user
        subject = validated_data['subject']
        ticket = Ticket.objects.create(user=user,status=Ticket.Status.waiting_for_response,subject=subject)
        msg = Message.objects.create(user=user, ticket=ticket, text=validated_data['text'])
        for f in self.context['request'].FILES:
            msg = Message.objects.create(user=user, ticket=ticket, file=f)

        return ticket