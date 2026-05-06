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

def search_movies(query):
    return client.get(
        "/search/movie",
        params={"query": query},
    )


def get_movie_details(movie_id):
    return client.get(f"/movie/{movie_id}")


def get_similar_movies(movie_id):
    return client.get(f"/movie/{movie_id}/similar")


def get_movie_videos(movie_id):
    return client.get(f"/movie/{movie_id}/videos")


def get_movie_reviews(movie_id):
    return client.get(f"/movie/{movie_id}/reviews")