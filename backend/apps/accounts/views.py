from django.contrib.auth import get_user_model

from rest_framework import generics
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.register_serializer import RegisterSerializer
from .serializers.user_serializer import UserSerializer
from .serializers.login_serializer import LoginSerializer
User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()

    serializer_class = RegisterSerializer

    permission_classes = [permissions.AllowAny]


class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, token):
        try:
            user = User.objects.get(
                verification_token=token
            )

            user.is_verified = True

            user.verification_token = None

            user.save()

            return Response(
                {
                    "message": (
                        "Email verified successfully."
                    )
                },
                status=status.HTTP_200_OK,
            )

        except User.DoesNotExist:
            return Response(
                {
                    "error": (
                        "Invalid verification token."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
            
            
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK,
        )