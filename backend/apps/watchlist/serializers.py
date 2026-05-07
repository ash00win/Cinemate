from rest_framework import serializers

from .models import Watchlist


class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = [
            "id",
            "tmdb_movie_id",
            "created_at",
        ]