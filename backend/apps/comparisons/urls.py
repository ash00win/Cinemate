from django.urls import path

from .views import (
    ComparisonListCreateView,
    ComparisonDeleteView,
    AddMovieToComparisonView,
)

urlpatterns = [
    path(
        "",
        ComparisonListCreateView.as_view(),
    ),

    path(
        "<int:pk>/",
        ComparisonDeleteView.as_view(),
    ),

    path(
        "<int:comparison_id>/movies/",
        AddMovieToComparisonView.as_view(),
    ),
]