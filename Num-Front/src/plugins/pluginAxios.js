import axios from "axios";
import { useAuthStore } from "../store/auth.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5040/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Interceptor de Peticiones (El que ya tienes)
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 2. NUEVO: Interceptor de Respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    // Si tu backend (Node/Express) devuelve el usuario actualizado después de hacer un PUT o POST
    // Por ejemplo: res.json({ msg: "Perfil actualizado", user: { ... } })
    const authStore = useAuthStore();

    // Aquí verificas la propiedad exacta que devuelve tu backend con los datos del usuario
    if (response.data && response.data.user) {
      // Pinia se actualiza, y el plugin persistedstate actualiza el localStorage al instante
      authStore.user = response.data.user;
    }

    return response;
  },
  (error) => {
    // Manejo global de errores (ej: Token expirado o inválido)
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();

      // Limpiamos el store automáticamente
      authStore.token = "";
      authStore.user = null;

      // Opcional: Aquí podrías importar tu router y mandar al usuario al login
      // router.push('/login');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
