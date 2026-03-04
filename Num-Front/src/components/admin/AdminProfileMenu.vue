<template>
  <div class="profile-card cursor-pointer relative-position">
    <q-item class="q-pa-sm">
      <q-item-section avatar>
        <div class="avatar-container">
          <q-icon name="person_outline" size="24px" />
          <div class="status-indicator"></div>
        </div>
      </q-item-section>
      <q-item-section>
        <q-item-label class="profile-name">{{ authStore.user?.nombre || 'Administrador' }}</q-item-label>
        <q-item-label caption class="profile-role">
          {{ authStore.user?.rol === 'ADMIN_ROLE' ? 'Administrador del Sistema' : 'Usuario' }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <!-- Menú desplegable -->
    <q-menu 
      anchor="top right" 
      self="bottom right" 
      class="bg-sidebar no-border glass-menu"
      transition-show="jump-up"
      transition-hide="jump-down"
    >
      <q-list style="min-width: 180px" class="q-pa-xs">
        <q-item clickable v-ripple @click="goTo('/perfil')" class="menu-item rounded-pill">
          <q-item-section avatar>
            <q-icon name="account_circle" size="20px" />
          </q-item-section>
          <q-item-section>Mi Perfil</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/lecturas/principal')" class="menu-item rounded-pill">
          <q-item-section avatar>
            <q-icon name="star" size="20px" />
          </q-item-section>
          <q-item-section>Lectura Principal</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('/lecturas/diaria')" class="menu-item rounded-pill">
          <q-item-section avatar>
            <q-icon name="sunny" size="20px" />
          </q-item-section>
          <q-item-section>Lectura Diaria</q-item-section>
        </q-item>

        <q-separator dark class="q-my-xs opacity-10" />

        <q-item clickable v-ripple @click="logout" class="menu-item logout-item rounded-pill">
          <q-item-section avatar>
            <q-icon name="logout" size="20px" color="red-4" />
          </q-item-section>
          <q-item-section class="text-red-4">Cerrar Sesión</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../store/auth.js';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const goTo = (path) => {
  router.push(path);
};

const logout = () => {
  $q.dialog({
    title: 'Cerrar Sesión',
    message: '¿Estás seguro de que deseas salir del sistema?',
    cancel: true,
    persistent: true,
    dark: true,
    ok: {
      flat: true,
      color: 'red-4',
      label: 'Sí, Salir'
    }
  }).onOk(() => {
    authStore.token = "";
    authStore.user = null;
    router.push('/login');
  });
};
</script>

<style scoped>
.profile-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.profile-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(242, 169, 0, 0.2);
}

.avatar-container {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #4caf50;
  border: 2px solid #0b0c0e;
  border-radius: 50%;
}

.profile-name {
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
}

.profile-role {
  font-size: 11px;
  color: #f2a900;
  opacity: 0.8;
}

.glass-menu {
  background: rgba(11, 12, 14, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.menu-item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 500;
  margin: 2px 0;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.logout-item:hover {
  background: rgba(239, 83, 80, 0.1);
}

.rounded-pill {
  border-radius: 10px;
}

.opacity-10 {
  opacity: 0.1;
}
</style>
