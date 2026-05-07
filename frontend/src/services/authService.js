import axiosClient from "../api/axios";

export const registerUser = async (userData) => {
  await axiosClient.post("/auth/register/", userData);

  const loginResponse = await axiosClient.post("/auth/login/", {
    username: userData.username,
    password: userData.password,
  });

  return loginResponse.data;
};

export const loginUser = async (userData) => {
  const response = await axiosClient.post("/auth/login/", userData);

  return response.data;
};
