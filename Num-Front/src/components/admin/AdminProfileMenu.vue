<template>
  <div class="admin-profile-menu q-pa-sm">
    <q-btn flat no-caps class="full-width rounded-lg glass-button q-pa-sm">
      <div class="row items-center no-wrap full-width">
        <q-avatar size="42px" class="q-mr-md border-gold">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="Admin Avatar" />
        </q-avatar>
        <div class="column items-start text-left">
          <div class="text-weight-bold text-white">{{ authStore.user?.nombre || 'Arquitecto' }}</div>
          <div class="text-caption text-gold opacity-60 uppercase tracking-widest" style="font-size: 8px;">Administrador</div>
        </div>
        <q-space />
        <q-icon name="more_vert" color="grey-5" />
      </div>

      <q-menu dark persistent class="glass-panel no-border" transition-show="scale" transition-hide="scale">
        <q-list style="min-width: 200px">
          <q-item clickable v-ripple v-close-popup @click="goToProfile">
            <q-item-section avatar>
              <q-icon name="manage_accounts" color="primary" />
            </q-item-section>
            <q-item-section>Mi Perfil Astral</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-close-popup @click="goToSettings">
            <q-item-section avatar>
              <q-icon name="settings" color="primary" />
            </q-item-section>
            <q-item-section>Configuración</q-item-section>
          </q-item>
          <q-separator dark />
          <q-item clickable v-ripple v-close-popup class="text-negative" @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" color="negative" />
            </q-item-section>
            <q-item-section>Cerrar Portal (Salir)</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../store/auth.js';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const goToProfile = () => {
  $q.notify({ message: 'Redirigiendo al perfil...', color: 'info' });
};

const goToSettings = () => {
  $q.notify({ message: 'Abriendo configuración del cosmos...', color: 'info' });
};

const logout = () => {
  authStore.logout();
  router.push('/login');
  $q.notify({
    message: 'Has cerrado el portal. ¡Vuelve pronto! ✨',
    color: 'primary',
    position: 'bottom'
  });
};
</script>

<style scoped>
.glass-button {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
.glass-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--q-primary);
}
.border-gold {
  border: 2px solid var(--q-primary);
}
</style>
