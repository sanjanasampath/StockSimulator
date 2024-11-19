import axiosClient, { getToken } from "./api";

import { API } from "./constant";



export async function loginService(username, password) {
  const data = await axiosClient.post(API.Auth.login, { username, password })
  return data.data;
}

export async function registerService(username, email, password) {
  const data = await axiosClient.post(API.Auth.register, { username, email, password })
  return data.data;
}



export async function logoutService() {
  const data = await axiosClient.post(API.Auth.logout)
  return data.data;
}

export async function getUser() {
  const token = getToken()
  const data = await axiosClient.get(API.Auth.user, {
    headers: {
      "x-auth-token": token
    }
  })
  return data.data;
}