from .settings import api_settings

def create_callback_token_for_user(user, alias_type, token_type):
  token = OTP.objects.create(user=user, type=token_type, is_active=True,
                              exp_date=(timezone.now() +
                                        timedelta(seconds=api_settings.OTP_EXPIRE_TIME)))

  return token