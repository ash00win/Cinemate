from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Watchlist
from .serializers import WatchlistSerializer


class WatchlistListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = WatchlistSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Watchlist.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WatchlistDeleteView(
    generics.DestroyAPIView
):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    lookup_field = "tmdb_movie_id"

    def get_queryset(self):
        return Watchlist.objects.filter(
            user=self.request.user
        )

    def destroy(self, request, *args, **kwargs):
        movie_id = kwargs.get("tmdb_movie_id")

        deleted_count, _ = Watchlist.objects.filter(
            user=request.user,
            tmdb_movie_id=movie_id,
        ).delete()

        if deleted_count == 0:
            return Response(
                {"error": "Movie not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            {"message": "Movie removed"},
            status=status.HTTP_200_OK,
        )