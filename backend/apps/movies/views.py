from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services.movie_service import (
    get_trending_movies,
    get_popular_movies,
    get_top_rated_movies,
    get_upcoming_movies,
    search_movies,
    get_movie_details,
    get_similar_movies,
    get_movie_videos,
    get_movie_reviews,
    search_movies,
)

class TrendingMoviesView(APIView):
    def get(self, request):
        page = request.GET.get("page", 1)

        try:
            data = get_trending_movies(page)

            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class PopularMoviesView(APIView):
    def get(self, request):
        page = request.GET.get("page", 1)

        try:
            data = get_popular_movies(page)

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
            
            
            
class SearchMoviesView(APIView):
    def get(self, request):
        query = request.GET.get("query")

        if not query:
            return Response(
                {"error": "Query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            data = search_movies(query)
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
class MovieDetailsView(APIView):
    def get(self, request, movie_id):
        try:
            data = get_movie_details(movie_id)
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
class SimilarMoviesView(APIView):
    def get(self, request, movie_id):
        try:
            data = get_similar_movies(movie_id)
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
class MovieVideosView(APIView):
    def get(self, request, movie_id):
        try:
            data = get_movie_videos(movie_id)
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
class MovieReviewsView(APIView):
    def get(self, request, movie_id):
        try:
            data = get_movie_reviews(movie_id)
            return Response(data)

        except Exception as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
            
class SearchMoviesView(APIView):
    def get(self, request):
        query = request.GET.get("q", "")

        if not query:
            return Response(
                {
                    "error": "Search query required"
                },
                status=400,
            )

        movies = search_movies(query)

        return Response(movies)