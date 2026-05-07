from rest_framework import serializers

from apps.movies.services.movie_service import (
    get_movie_summary,
)

from .models import (
    Comparison,
    ComparisonMovie,
)


class ComparisonMovieSerializer(
    serializers.ModelSerializer
):
    movie = serializers.SerializerMethodField()

    class Meta:
        model = ComparisonMovie

        fields = [
            "id",
            "tmdb_movie_id",
            "movie",
        ]

    def get_movie(self, obj):
        return get_movie_summary(
            obj.tmdb_movie_id
        )


class ComparisonSerializer(
    serializers.ModelSerializer
):
    movies = ComparisonMovieSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Comparison

        fields = [
            "id",
            "title",
            "movies",
            "created_at",
        ]