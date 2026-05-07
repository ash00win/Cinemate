from django.conf import settings
from django.db import models


class Comparison(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="comparisons",
    )

    title = models.CharField(
        max_length=255
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class ComparisonMovie(models.Model):
    comparison = models.ForeignKey(
        Comparison,
        on_delete=models.CASCADE,
        related_name="movies",
    )

    tmdb_movie_id = models.IntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "comparison",
                    "tmdb_movie_id",
                ],
                name="unique_movie_per_comparison",
            )
        ]

    def __str__(self):
        return (
            f"{self.comparison.title} - "
            f"{self.tmdb_movie_id}"
        )