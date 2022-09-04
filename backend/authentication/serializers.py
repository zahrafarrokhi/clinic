from .models import User, OTP, Token
from rest_framework import serializers
from django.utils import timezone
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'email', 'phone_number_verified',
                  'email_verified', 'type']

class AbstractOtpObtain(serializers.Serializer):
  @property
  def alias_type(self):
    raise  NotImplementedError()

  def validate(self, attrs):
    user = self.get_user()

    exp_otp= OTP.objects.filter(user=user, is_active=True)
    for otp in exp_otp:
      otp.is_active = False

    OTP.objects.bulk_update(exp_otp, ['is_active'])
    
    attrs['user'] = user
    return attrs



  def get_user(self, *args, **kwargs):
    alias = self.initial_data[self.alias_type]
    values = {self.alias_type:alias}
    user = None
    try:
      # user = User.objects.filter(email=alias).first() if self.alias_type == 'email' else User.objects.filter(phone_number=alias).first()
      # user = User.objects.filter(**{self.alias_type:alias}).first()
      user = User.objects.get(**values)
      print("user exists")
    except User.DoesNotExist:
      print("doesnt exist", values)
      user = User(**values)
      user.set_unusable_password()
      user.save()
    return user


class EmailSerializer(AbstractOtpObtain):
  email = serializers.EmailField()
  alias_type = "email"

class PhoneSerializer(AbstractOtpObtain):
  phone_number = serializers.CharField(max_length=11)
  alias_type = "phone_number"


# class EmailSerializer(serializers.Serializer):
#   email = serializers.EmailField()
  
#   def validate(self, attrs):
#     user = self.get_user()

#     exp_otp= OTP.objects.filter(user=user, is_active=True)
#     for otp in exp_otp:
#       otp.is_active = False

#     OTP.objects.bulk_update(exp_otp, ['is_active'])
    
#     attrs['user'] = user
#     return attrs
  
#   def get_user(self):
#     user = None
#     try:
#       user = User.objects.filter(email=self.data['email']).first()
#     except User.DoesNotExist:
#       user = User(email=self.data['email'])
#       user.set_unusable_password()
#       user.save()
#     return user


class validateOtpSerializer(serializers.Serializer):
  phoneNumber = serializers.CharField(max_length=11, required=False)
  otp = serializers.CharField(max_length=10)
  email = serializers.EmailField(required=False)

  def validate(self, attrs):
    try:
      # model,get attrs
      user = User.objects.get(Q(phone_number=attrs.get('phoneNumber', 'xxx')) | Q(email=attrs.get('email', 'yyy')) )
      otp= OTP.objects.get(user=user,is_active=True,value=attrs['otp'],exp_date__gte=timezone.now())
      otp.is_active = False
      otp.save()
    except User.DoesNotExist:
      raise serializers.ValidationError("user dose not exist")
    except OTP.DoesNotExist:
      raise serializers.ValidationError("OTP dose not exist")

    attrs['user']=user
    return attrs


class TokenObtainPairSerializer(serializers.Serializer):
    token_class = RefreshToken

    @classmethod
    def get_token(cls, user):
        return cls.token_class.for_user(user)

    def validate(self, data):
        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        # if api_settings.UPDATE_LAST_LOGIN:
            # update_last_login(None, self.user)

        return data