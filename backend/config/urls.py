from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/v1/auth/",
        include("apps.accounts.urls"),
    ),

    path(
        "api/v1/movies/",
        include("apps.movies.urls"),
    ),
    path(
    "api/v1/watchlist/",
    include("apps.watchlist.urls"),
    ),
    path(
    "api/v1/comparisons/",
    include("apps.comparisons.urls"),
),
]