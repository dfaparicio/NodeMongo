import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    let token = ref("");
    const user = ref(null);
    const lecturasguardadas = ref([]);

    const lecturaActual = ref(null);
    const setLectura = (valor) => {
      lecturaActual.value = valor;
    };

    const pagosUsuario = ref([]);
    const setPagosUsuario = (pagos) => {
      pagosUsuario.value = pagos;
    };

    return {
      token,
      user,
      lecturasguardadas,
      lecturaActual,
      setLectura,
      pagosUsuario,
      setPagosUsuario,
    };
  },

  { persist: true },
);
