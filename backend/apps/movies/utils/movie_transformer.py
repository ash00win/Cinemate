from .image_helper import build_image_url


def transform_movie(movie):
    return {
        "id": movie.get("id"),
        "title": movie.get("title"),
        "overview": movie.get("overview"),
        "poster_url": build_image_url(
            movie.get("poster_path")
        ),
        "backdrop_url": build_image_url(
            movie.get("backdrop_path")
        ),
        "release_date": movie.get("release_date"),
        "rating": movie.get("vote_average"),
        "vote_count": movie.get("vote_count"),
        "popularity": movie.get("popularity"),
    }


def transform_movie_list(data):
    return {
        "page": data.get("page"),
        "total_pages": data.get("total_pages"),
        "total_results": data.get("total_results"),
        "results": [
            transform_movie(movie)
            for movie in data.get("results", [])
        ],
    }