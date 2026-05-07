from django.conf import settings
from django.db import models


class Watchlist(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="watchlist",
    )

    tmdb_movie_id = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

        constraints = [
            models.UniqueConstraint(
                fields=["user", "tmdb_movie_id"],
                name="unique_user_movie",
            )
        ]

    def __str__(self):
        return f"{self.user.username} - {self.tmdb_movie_id}"