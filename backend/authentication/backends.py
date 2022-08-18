class CustomUserBackend(BaseBackend):
# before login
    def authenticate(self, request, username=None, password=None):
        try:
            user = User.objects.get(
                Q(email=username) | Q(phone_number=username))
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