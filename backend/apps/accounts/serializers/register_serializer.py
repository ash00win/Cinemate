import re
import uuid

from django.conf import settings
from django.core.mail import send_mail

from rest_framework import serializers

from apps.accounts.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
    )

    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password",
        ]

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long."
            )

        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError(
                "Password must contain an uppercase letter."
            )

        if not re.search(r"[a-z]", value):
            raise serializers.ValidationError(
                "Password must contain a lowercase letter."
            )

        if not re.search(r"\d", value):
            raise serializers.ValidationError(
                "Password must contain a number."
            )

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise serializers.ValidationError(
                "Password must contain a special character."
            )

        return value

    def create(self, validated_data):
        verification_token = str(uuid.uuid4())

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        user.is_verified = False

        user.verification_token = verification_token

        user.save()

        verification_url = (
    f"http://localhost:5173/verify/"
    f"{verification_token}"
)

        send_mail(
            subject="Verify your Cinemate account",
            message=(
                f"Click the link below to verify your account:\n\n"
                f"{verification_url}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return user