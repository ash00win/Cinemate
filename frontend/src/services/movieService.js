import axiosClient from "../api/axios";

export const fetchTrendingMovies = async () => {
  const response = await axiosClient.get("/movies/trending/");

  return response.data;
};
