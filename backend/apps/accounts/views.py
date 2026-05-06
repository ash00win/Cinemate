from rest_framework import generics, permissions
from django.contrib.auth import get_user_model

from .serializers.register_serializer import RegisterSerializer
from .serializers.user_serializer import UserSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user