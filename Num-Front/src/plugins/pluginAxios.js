import axios from 'axios';
import { useAuthStore } from "../store/auth.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5040/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
}, 
(error) => {
  return Promise.reject(error);
});

export default axiosInstance;