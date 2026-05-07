from rest_framework import serializers

from apps.movies.services.movie_service import (
    get_movie_summary,
)

from .models import Watchlist


class WatchlistSerializer(serializers.ModelSerializer):
    movie = serializers.SerializerMethodField()

    class Meta:
        model = Watchlist
        fields = [
            "id",
            "tmdb_movie_id",
            "movie",
            "created_at",
        ]

    def get_movie(self, obj):
        return get_movie_summary(
            obj.tmdb_movie_id
        )