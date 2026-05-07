from django.urls import path

from .views import (
    WatchlistListCreateView,
    WatchlistDeleteView,
)

urlpatterns = [
    path(
        "",
        WatchlistListCreateView.as_view(),
    ),

    path(
        "<int:tmdb_movie_id>/",
        WatchlistDeleteView.as_view(),
    ),
]