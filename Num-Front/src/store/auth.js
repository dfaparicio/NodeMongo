import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    let token = ref("");
    const user = ref(null);
    const lecturasguardadas = ref([]);

    return {
      token,
      user,
      lecturasguardadas,
    };
  },

  { persist: true },
);
