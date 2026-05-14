from datetime import datetime

import requests

from django.conf import settings

from .tmdb_client import TMDBClient

from ..utils.movie_transformer import (
    transform_movie,
    transform_movie_list,
)

BASE_URL = "https://api.themoviedb.org/3"

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


def get_movie_credits(movie_id):
    endpoint = f"/movie/{movie_id}/credits"

    response = requests.get(
        f"{BASE_URL}{endpoint}",
        params={
            "api_key": settings.TMDB_API_KEY,
        },
    )

    response.raise_for_status()

    data = response.json()

    cast = data.get("cast", [])

    return [
        {
            "id": actor["id"],
            "name": actor["name"],
            "character": actor["character"],
            "profile_url": (
                f"https://image.tmdb.org/t/p/w500{actor['profile_path']}"
                if actor.get("profile_path")
                else None
            ),
        }
        for actor in cast[:15]
    ]
    
    
def get_actor_details(actor_id):
    response = requests.get(
        f"{BASE_URL}/person/{actor_id}",
        params={
            "api_key": settings.TMDB_API_KEY,
        },
    )

    response.raise_for_status()

    data = response.json()

    return {
        "id": data["id"],
        "name": data["name"],
        "biography": data["biography"],
        "birthday": data.get("birthday"),
        "place_of_birth": data.get("place_of_birth"),
        "popularity": data.get("popularity"),
        "profile_url": (
            f"https://image.tmdb.org/t/p/w500{data['profile_path']}"
            if data.get("profile_path")
            else None
        ),
    }
    
    
def get_actor_movies(actor_id):
    response = requests.get(
        f"{BASE_URL}/person/{actor_id}/movie_credits",
        params={
            "api_key": settings.TMDB_API_KEY,
        },
    )

    response.raise_for_status()

    data = response.json()

    cast_movies = data.get("cast", [])

    transformed_movies = []

    for movie in cast_movies:
        transformed_movies.append(
            {
                "id": movie["id"],
                "title": movie["title"],
                "poster_url": (
                    f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
                    if movie.get("poster_path")
                    else None
                ),
                "rating": movie.get("vote_average", 0),
                "release_date": movie.get("release_date"),
            }
        )

    return transformed_movies[:20]