import axiosClient from "../api/axios";

export const fetchWatchlist = async () => {
  const response = await axiosClient.get("/watchlist/");

  return response.data;
};

export const addToWatchlist = async (data) => {
  const response = await axiosClient.post("/watchlist/", data);

  return response.data;
};

export const removeFromWatchlist = async (watchlistId) => {
  const response = await axiosClient.delete(`/watchlist/${watchlistId}/`);

  return response.data;
};
