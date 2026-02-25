import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    let token = ref("");
    const user = ref(null);

    const fechanacimiento = computed(() => {
      if (!user.value?.fechanacimiento) return "--";

      const fecha = new Date(user.value.fechanacimiento);

      const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];

      return `${fecha.getDate()} ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
    });

    const logout = () => {
      token.value = "";
      user.value = null;
    };

    return {
      token,
      user,
      logout,
      fechanacimiento,
    };
  },

  { persist: true },
);
