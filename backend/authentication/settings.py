from datetime import timedelta

from django.conf import settings
from django.test.signals import setting_changed
from django.utils.translation import gettext_lazy as _
from rest_framework.settings import APISettings as _APISettings
from django.utils.text import Truncator, format_lazy
from django.utils.translation import gettext_lazy as _


USER_SETTINGS = getattr(settings, 'AUTHENTICATION_SETTINGS', None)

DEFAULTS = {
    'OTP_EXPIRE_TIME': 60 * 2,
    'OTP_LENGTH': 4,
    # Allowed auth types, can be EMAIL, SMS, or both.
    'OTP_AUTH_TYPES': ['EMAIL', 'SMS'],



    'OTP_EMAIL_CALLBACK': 'authentication.services.EmailService',
    'OTP_SMS_CALLBACK': 'authentication.services.SmsService',

}

IMPORT_STRINGS = (
    'AUTH_TOKEN_CLASSES',
    'TOKEN_USER_CLASS',
    'USER_AUTHENTICATION_RULE',
)

REMOVED_SETTINGS = (
    'AUTH_HEADER_TYPE',
    'AUTH_TOKEN_CLASS',
    'SECRET_KEY',
    'TOKEN_BACKEND_CLASS',
)


class APISettings(_APISettings):  # pragma: no cover
    def __check_user_settings(self, user_settings):
        SETTINGS_DOC = 'https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html'

        for setting in REMOVED_SETTINGS:
            if setting in user_settings:
                raise RuntimeError(format_lazy(
                    _("The '{}' setting has been removed. Please refer to '{}' for available settings."),
                    setting, SETTINGS_DOC,
                ))

        return user_settings


api_settings = APISettings(USER_SETTINGS, DEFAULTS, IMPORT_STRINGS)


def reload_api_settings(*args, **kwargs):  # pragma: no cover
    global api_settings

    setting, value = kwargs['setting'], kwargs['value']

    if setting == 'AUTHENTICATION_SETTINGS':
        api_settings = APISettings(value, DEFAULTS, IMPORT_STRINGS)


setting_changed.connect(reload_api_settings)
