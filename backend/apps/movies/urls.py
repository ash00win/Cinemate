from django.urls import path

from .views import (
    TrendingMoviesView,
    PopularMoviesView,
    TopRatedMoviesView,
    UpcomingMoviesView,
    SearchMoviesView,
    MovieDetailsView,
    SimilarMoviesView,
    MovieVideosView,
    MovieReviewsView,
    MoviesByGenreView,
)

urlpatterns = [
    path("trending/", TrendingMoviesView.as_view()),
    path("popular/", PopularMoviesView.as_view()),
    path("top-rated/", TopRatedMoviesView.as_view()),
    path("upcoming/", UpcomingMoviesView.as_view()),

    path("search/", SearchMoviesView.as_view()),

    path("<int:movie_id>/", MovieDetailsView.as_view()),

    path(
        "<int:movie_id>/similar/",
        SimilarMoviesView.as_view(),
    ),

    path(
        "<int:movie_id>/videos/",
        MovieVideosView.as_view(),
    ),

    path(
        "<int:movie_id>/reviews/",
        MovieReviewsView.as_view(),
    ),

    path(
    "search/",
    SearchMoviesView.as_view(),
    name="search-movies",
    ),
    path(
    "genre/<int:genre_id>/",
    MoviesByGenreView.as_view(),
    ),
]