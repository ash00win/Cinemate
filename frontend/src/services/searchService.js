import axiosClient from "../api/axios";

export const searchMovies = async (query) => {
  const response = await axiosClient.get(`/movies/search/?q=${query}`);

  return response.data.results;
};
