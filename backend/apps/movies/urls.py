from django.urls import path

from .views import (
    TrendingMoviesView,
    PopularMoviesView,
    TopRatedMoviesView,
    UpcomingMoviesView,
)

urlpatterns = [
    path("trending/", TrendingMoviesView.as_view()),
    path("popular/", PopularMoviesView.as_view()),
    path("top-rated/", TopRatedMoviesView.as_view()),
    path("upcoming/", UpcomingMoviesView.as_view()),
]