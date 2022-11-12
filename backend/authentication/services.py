from .settings import api_settings
from backend.settings import Ghasedak_APIKEY
import ghasedakpack
from .utils import create_callback_token_for_user
from django.utils.module_loading import import_string
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.utils.html import strip_tags


class TokenService():
    @staticmethod
    def send_token(user, alias_type, token_type, **message_payload):
        token = create_callback_token_for_user(user, alias_type, token_type)

        send_action = None

        if alias_type == 'email':
            send_action = import_string(api_settings.OTP_EMAIL_CALLBACK)
        elif alias_type == 'phone_number':
            send_action = import_string(api_settings.OTP_SMS_CALLBACK)

        success = send_action.send_otp(user, token, **message_payload)

        return success


class EmailService:
    @staticmethod
    def send_email(recipient_list, subject, template, variables):
        pass
        # message = render_to_string(template, variables)
        # try:
        #
        #     send_mail(subject=subject, html_message=message, message=strip_tags(
        #         message), from_email=None, recipient_list=recipient_list, fail_silently=False)
        # except Exception as e:
        #     raise e

    @staticmethod
    def send_otp(user, token, **message_payload):
        EmailService.send_email([user.email], variables={
                                'username': user.email, 'otp': token.value}, **message_payload)


class SmsService:
    @staticmethod
    def send_otp(user, token, template):
        # sms = ghasedakpack.Ghasedak(Ghasedak_APIKEY)

        # sms.verification({'receptor': user.phone_number, 'type': '1',
        #                  'template': template, 'param1': token.value})
        return True

        # payload ={
        #   'to':mobile,
        #   'args':args,
        #   'bodyId':int(body_id)

        # }
        # try:
        #   response = requests.post(f'', json=payload)
        #   res = response.json()

        #   return len(str(res['recId']))>=15
        # except Exception as e:
