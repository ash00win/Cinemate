from .tmdb_client import TMDBClient
from ..utils.movie_transformer import (
    transform_movie,
    transform_movie_list,
)

client = TMDBClient()


def get_trending_movies(page=1):
    data = client.get(
        "/trending/movie/week",
        params={"page": page},
    )

    return transform_movie_list(data)

def get_popular_movies(page=1):
    data = client.get(
        "/movie/popular",
        params={"page": page},
    )

    return transform_movie_list(data)

def get_top_rated_movies():
    data = client.get("/movie/top_rated")
    return transform_movie_list(data)

def get_upcoming_movies():
    data = client.get("/movie/upcoming")
    return transform_movie_list(data)

def search_movies(query):
    data = client.get(
        "/search/movie",
        params={"query": query},
    )

    return transform_movie_list(data)

def get_movie_details(movie_id):
    data = client.get(f"/movie/{movie_id}")
    return transform_movie(data)

def get_similar_movies(movie_id):
    return client.get(f"/movie/{movie_id}/similar")


def get_movie_videos(movie_id):
    return client.get(f"/movie/{movie_id}/videos")


def get_movie_reviews(movie_id):
    return client.get(f"/movie/{movie_id}/reviews")


def get_movie_summary(movie_id):
    data = client.get(f"/movie/{movie_id}")

    return transform_movie(data)