import axiosClient from "../api/axios";

export const fetchActorDetails = async (actorId) => {
  const response = await axiosClient.get(`/movies/actors/${actorId}/`);

  return response.data;
};

export const fetchActorMovies = async (actorId) => {
  const response = await axiosClient.get(`/movies/actors/${actorId}/movies/`);

  return response.data;
};
