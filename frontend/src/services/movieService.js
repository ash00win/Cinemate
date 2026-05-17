import axiosClient from "../api/axios";

/* TRENDING */

export const fetchTrendingMovies = async (page = 1) => {
  const response = await axiosClient.get(`/movies/trending/?page=${page}`);

  return response.data;
};

/* MOVIE DETAILS */

export const fetchMovieDetails = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/`);

  return response.data;
};

/* SIMILAR MOVIES */

export const fetchSimilarMovies = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/similar/`);

  return response.data;
};

/* MOVIE VIDEOS */

export const fetchMovieVideos = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/videos/`);

  return response.data;
};

/* MOVIE REVIEWS */

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/reviews/`);

  return response.data;
};

/* POPULAR */

export const fetchPopularMovies = async () => {
  const response = await axiosClient.get("/movies/popular/");

  return response.data;
};

/* TOP RATED */

export const fetchTopRatedMovies = async () => {
  const response = await axiosClient.get("/movies/top-rated/");

  return response.data;
};

/* UPCOMING */

export const fetchUpcomingMovies = async () => {
  const response = await axiosClient.get("/movies/upcoming/");

  return response.data;
};

/* GENRE MOVIES */

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axiosClient.get(`/movies/genre/${genreId}/`, {
      params: {
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("FETCH GENRE MOVIES ERROR:", error);

    throw error;
  }
};

/* MOVIE CREDITS */

export const fetchMovieCredits = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/credits/`);

  return response.data;
};

/* SEARCH SUGGESTIONS */

export const fetchSearchSuggestions = async (query) => {
  const response = await axiosClient.get(`/movies/search/?q=${query}`);

  return response.data.results;
};
