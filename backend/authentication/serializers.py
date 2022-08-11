from .models import User, OTP, Token
from rest_framework import serializers
from django.utils import timezone
from rest_framework_simplejwt.serializer import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'email', 'phone_number_verified',
                  'email_verified', 'type']




class EmailSerializer(serializers.Serializer):
  email = serializers.EmailField()

  def validate(self, attrs):
    user = self.get_user()

    exp_otp= OTP.objects.filter(user=user, is_active=True)
    for otp in exp_otp:
      otp.is_active = False

    OTP.objects.bulk_update(exp_otp, ['is_active'])
    
    attrs['user'] = user
    return attrs
  
  def get_user(self):
    user = None
    try:
      user = User.objects.filter(email=self.data['email']).first()
    except User.DoesNotExist:
      user = User(email=self.data['email'])
      user.set_unusable_password()
      user.save()
    return user


class validateOtpSerializer(serializers.Serializer):
  phoneNumber = serializers.CharField(max_length=11)
  otp = serializers.CharField(max_length=10)

  def validate(self, attrs):
    try:
      user = User.objects.get(phone_number=attrs['phoneNumber'])
      otp= OTP.objects.get(user=user,is_active=True,value=attrs['otp'],exp_date__gte=timezone.now())
      otp.is_active = False
      otp.save()
    except User.DoesNotExist:
      raise serializers.ValidationError("user dose not exist")
    except OTP.DoesNotExist:
      raise serializers.ValidationError("OTP dose not exist")

    attrs['user']=user
    return attrs


class TokenObtainPairSerializer(TokenObtainSerializer):
    token_class = RefreshToken

    def validate(self, data):
        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        # if api_settings.UPDATE_LAST_LOGIN:
            # update_last_login(None, self.user)

        return data