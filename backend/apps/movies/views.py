from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services.movie_service import (
    get_trending_movies,
    get_popular_movies,
    get_top_rated_movies,
    get_upcoming_movies,
)


class TrendingMoviesView(APIView):
    def get(self, request):
        try:
            data = get_trending_movies()
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class PopularMoviesView(APIView):
    def get(self, request):
        try:
            data = get_popular_movies()
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TopRatedMoviesView(APIView):
    def get(self, request):
        try:
            data = get_top_rated_movies()
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpcomingMoviesView(APIView):
    def get(self, request):
        try:
            data = get_upcoming_movies()
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )