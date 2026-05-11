import axiosClient from "../api/axios";

export const fetchTrendingMovies = async (page = 1) => {
  const response = await axiosClient.get(`/movies/trending/?page=${page}`);
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/`);

  return response.data;
};

export const fetchSimilarMovies = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/similar/`);

  return response.data;
};

export const fetchMovieVideos = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/videos/`);

  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosClient.get(`/movies/${movieId}/reviews/`);

  return response.data;
};

export const fetchPopularMovies = async () => {
  const response = await axiosClient.get("/movies/popular/");

  return response.data;
};

export const fetchTopRatedMovies = async () => {
  const response = await axiosClient.get("/movies/top-rated/");

  return response.data;
};

export const fetchUpcomingMovies = async () => {
  const response = await axiosClient.get("/movies/upcoming/");

  return response.data;
};