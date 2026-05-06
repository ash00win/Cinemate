IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"


def build_image_url(path):
    if not path:
        return None

    return f"{IMAGE_BASE_URL}{path}"