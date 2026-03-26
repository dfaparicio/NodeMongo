import axios from "axios";
import { useAuthStore } from "../store/auth.js";

// LÓGICA DE DETECCIÓN AUTOMÁTICA DE ENTORNO
// Esto permite que el mismo código funcione en Local y en Producción (Hostinger/Render)
const getBaseURL = () => {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // Si estamos en local, usamos el puerto 5040 del backend local
  if (isLocal) {
    return "http://localhost:5040/api";
  }
  
  // Si estamos en producción, usamos la URL del backend en Render
  // Podríamos usar solo "/api" si el front se sirve desde el mismo servidor,
  // pero usando la URL absoluta aseguramos que funcione desde Hostinger (Cross-domain).
  return "https://nodemongo-ihx8.onrender.com/api";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
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

// 2. Interceptor de Respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.token = "";
      authStore.user = null;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
