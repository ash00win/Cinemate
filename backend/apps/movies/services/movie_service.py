from .tmdb_client import TMDBClient


client = TMDBClient()


def get_trending_movies():
    return client.get("/trending/movie/week")


def get_popular_movies():
    return client.get("/movie/popular")


def get_top_rated_movies():
    return client.get("/movie/top_rated")


def get_upcoming_movies():
    return client.get("/movie/upcoming")