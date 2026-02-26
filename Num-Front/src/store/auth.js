import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    let token = ref("");
    const user = ref(null);

    return {
      token,
      user,
    };
  },

  { persist: true },
);
