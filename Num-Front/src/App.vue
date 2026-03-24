<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useAuthStore } from './store/auth.js';
import axiosInstance from './plugins/pluginAxios.js';

const authStore = useAuthStore();
let syncInterval = null;

// --- FUNCIÓN DE SINCRONIZACIÓN MAESTRA ---
const sincronizarConBaseDeDatos = async () => {
  if (!authStore.token) return;
  
  try {
    const response = await axiosInstance.get('/auth/renew');
    const { usuario, lecturas, pagos, token } = response.data;

    if (usuario) {
      // Sincronizamos todos los datos clave de Pinia con la DB real
      authStore.user = usuario;
      authStore.lecturasguardadas = lecturas || [];
      authStore.pagosUsuario = pagos || [];
      if (token) authStore.token = token;
      
      console.log("🌌 Sincronización Cósmica Exitosa (Estado:", usuario.estado, ")");
    }
  } catch (error) {
    console.error("❌ Error de sincronización:", error.response?.status);
    if (error.response?.status === 401) {
      authStore.logout(); // Si el token falló, limpiar todo
    }
  }
};

onMounted(async () => {
  // 1. Sincronizar inmediatamente al cargar
  await sincronizarConBaseDeDatos();

  // 2. Establecer un "latido" cada 60 segundos para mantener la realidad de la DB
  syncInterval = setInterval(sincronizarConBaseDeDatos, 60000);

  // 3. Sincronizar cuando el usuario vuelve a la pestaña (Visibility Change)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      console.log("👀 Usuario volvió a la pestaña. Sincronizando...");
      sincronizarConBaseDeDatos();
    }
  });
});

onUnmounted(() => {
  if (syncInterval) clearInterval(syncInterval);
});
</script>

<style scoped></style>
