from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response

from .models import (
    Comparison,
    ComparisonMovie,
)

from .serializers import (
    ComparisonSerializer,
)


class ComparisonListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = ComparisonSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Comparison.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class ComparisonDeleteView(
    generics.DestroyAPIView
):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Comparison.objects.filter(
            user=self.request.user
        )
        
class AddMovieToComparisonView(
    generics.CreateAPIView
):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(
        self,
        request,
        comparison_id,
    ):
        tmdb_movie_id = request.data.get(
            "tmdb_movie_id"
        )

        try:
            comparison = Comparison.objects.get(
                id=comparison_id,
                user=request.user,
            )

        except Comparison.DoesNotExist:
            return Response(
                {"error": "Comparison not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        exists = ComparisonMovie.objects.filter(
            comparison=comparison,
            tmdb_movie_id=tmdb_movie_id,
        ).exists()

        if exists:
            return Response(
                {
                    "error": (
                        "Movie already added"
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        ComparisonMovie.objects.create(
            comparison=comparison,
            tmdb_movie_id=tmdb_movie_id,
        )

        serializer = ComparisonSerializer(
            comparison
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )