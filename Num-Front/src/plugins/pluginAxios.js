import axios from "axios";
import { useAuthStore } from "../store/auth.js";

const axiosInstance = axios.create({
  // Si estamos en desarrollo, usamos la URL local, si no, la de producción.
  // VITE_API_URL debería ser algo como "http://localhost:5040/api" en local
  // o "/api" si se sirve desde el mismo servidor Express.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5040/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Interceptor de Peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Interceptor de Respuestas (Limpio y seguro)
axiosInstance.interceptors.response.use(
  (response) => response, // Solo retornamos la respuesta tal cual
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.token = "";
      authStore.user = null;
      // router.push('/login');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
