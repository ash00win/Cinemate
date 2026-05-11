IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

PLACEHOLDER_IMAGE = (
    "https://via.placeholder.com/500x750?text=No+Image"
)


def transform_movie(movie):
    poster_path = movie.get("poster_path")
    backdrop_path = movie.get("backdrop_path")

    return {
        "id": movie.get("id"),

        "title": movie.get("title"),

        "overview": movie.get("overview"),

        "poster_url": (
            f"{IMAGE_BASE_URL}{poster_path}"
            if poster_path
            else PLACEHOLDER_IMAGE
        ),

        "backdrop_url": (
            f"{IMAGE_BASE_URL}{backdrop_path}"
            if backdrop_path
            else PLACEHOLDER_IMAGE
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