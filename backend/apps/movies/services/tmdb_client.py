import requests

from django.conf import settings


class TMDBClient:
    BASE_URL = "https://api.themoviedb.org/3"

    def __init__(self):
        self.api_key = settings.TMDB_API_KEY

        self.headers = {
            "User-Agent": "Cinemate/1.0",
        }

    def get(self, endpoint, params=None):
        if params is None:
            params = {}

        params["api_key"] = self.api_key

        try:
            response = requests.get(
                f"{self.BASE_URL}{endpoint}",
                params=params,
                headers=self.headers,
                timeout=20,
            )

            response.raise_for_status()

            return response.json()

        except requests.exceptions.RequestException as e:
            print("TMDB API ERROR:", e)

            return {
                "error": True,
                "results": [],
}

    def search_movies(self, query):
        return self.get(
            "/search/movie",
            params={
                "query": query,
            },
        )