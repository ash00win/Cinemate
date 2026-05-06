import requests
import environ

from django.conf import settings


env = environ.Env()


class TMDBClient:
    BASE_URL = "https://api.themoviedb.org/3"

    def __init__(self):
        self.api_key = env("TMDB_API_KEY")

    def get(self, endpoint, params=None):
        if params is None:
            params = {}

        params["api_key"] = self.api_key

        response = requests.get(
            f"{self.BASE_URL}{endpoint}",
            params=params,
            timeout=10,
        )

        response.raise_for_status()

        return response.json()