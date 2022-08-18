from django.contrib.auth.backends import ModelBackend, BaseBackend
from .models import User
from django.db.models import Q


class CustomUserBackend(BaseBackend):
    # before login
    def authenticate(self, request, username=None, password=None):
        try:
            print(username, password, User.objects.all())
            user = User.objects.get(
                Q(email=username) | Q(phone_number=username))
            print(user)
            if user.check_password(password):
                return user
            return None
        except User.DoesNotExist:
            return None
# after login

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
