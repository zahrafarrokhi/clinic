from .models import User, OTP, Token
from rest_framework import serializers

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

    