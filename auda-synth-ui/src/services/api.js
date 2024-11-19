import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"

export const BASE_URL = isProduction ? "https://app.audasynth.com/api" : "http://localhost:5000/api"

export const getToken = () => {
  const tokenString = localStorage.getItem("token")
  try {
    const token = JSON.parse(tokenString)
    return token
  } catch (e) {
    return null
  }
}

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosClient