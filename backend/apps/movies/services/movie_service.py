from datetime import datetime

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

    transformed_data = transform_movie_list(data)

    current_year = datetime.now().year

    filtered_results = []

    for movie in transformed_data["results"]:
        release_date = movie.get("release_date")

        if not release_date:
            continue

        try:
            movie_year = int(
                release_date[:4]
            )

            # remove ancient movies only
            if movie_year >= current_year - 1:
                filtered_results.append(movie)

        except:
            continue

    transformed_data["results"] = filtered_results

    return transformed_data

def get_movies_by_genre(genre_id, page=1):
    data = client.get(
        "/discover/movie",
        params={
            "with_genres": genre_id,
            "page": page,
        },
    )

    return transform_movie_list(data)

def search_movies(query):
    data = client.search_movies(query)

    if not data or "results" not in data:
        return {
            "page": 1,
            "results": [],
            "total_pages": 1,
            "total_results": 0,
        }

    return transform_movie_list(data)


def get_movie_details(movie_id):
    data = client.get(f"/movie/{movie_id}")

    return transform_movie(data)


def get_similar_movies(movie_id):
    data = client.get(
        f"/movie/{movie_id}/similar"
    )

    return transform_movie_list(data)


def get_movie_videos(movie_id):
    return client.get(
        f"/movie/{movie_id}/videos"
    )


def get_movie_reviews(movie_id):
    return client.get(
        f"/movie/{movie_id}/reviews"
    )


def get_movie_summary(movie_id):
    data = client.get(f"/movie/{movie_id}")

    return transform_movie(data)