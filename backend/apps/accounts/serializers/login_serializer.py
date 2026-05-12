from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.models import User


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()

    password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):
        username = attrs.get("username")

        password = attrs.get("password")

        user = authenticate(
            username=username,
            password=password,
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid credentials."
            )

        if not user.is_verified:
            raise serializers.ValidationError(
                "Please verify your email before logging in."
            )

        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        }