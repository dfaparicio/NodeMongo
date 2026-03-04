<template>
  <q-layout view="lHh Lpr lFf" class="dashboard-layout">
    <!-- LEFT SIDEBAR -->
    <q-drawer
      show-if-above
      :width="260"
      class="bg-sidebar no-border"
    >
      <div class="column full-height">
        <!-- Logo Area -->
        <div class="q-px-md q-py-xl column items-center">
          <div class="row items-center no-wrap cursor-pointer">
            <div class="logo-text">NUMERO<span>LOGIA</span></div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="q-px-md flex-grow-1">
          <q-list class="q-gutter-y-sm">
            <q-item 
              clickable v-ripple 
              class="nav-item" 
              :class="{ 'active-nav': currentView === 'usuarios' }"
              @click="setView('usuarios')"
            >
              <q-item-section avatar>
                <q-icon name="group" size="24px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Usuarios</q-item-section>
              <div v-if="currentView === 'usuarios'" class="active-indicator"></div>
            </q-item>

            <q-item 
              clickable v-ripple 
              class="nav-item" 
              :class="{ 'active-nav': currentView === 'pagos' }"
              @click="setView('pagos')"
            >
              <q-item-section avatar>
                <q-icon name="payments" size="24px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Pagos</q-item-section>
              <div v-if="currentView === 'pagos'" class="active-indicator"></div>
            </q-item>

            <q-item 
              clickable v-ripple 
              class="nav-item" 
              :class="{ 'active-nav': currentView === 'lecturas' }"
              @click="setView('lecturas')"
            >
              <q-item-section avatar>
                <q-icon name="auto_awesome" size="24px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Lecturas</q-item-section>
              <div v-if="currentView === 'lecturas'" class="active-indicator"></div>
            </q-item>
          </q-list>
        </div>

        <!-- User Profile -->
        <div class="q-pa-md q-mt-auto">
          <AdminProfileMenu />
        </div>
      </div>
    </q-drawer>

    <!-- PAGE CONTENT -->
    <q-page-container>
      <q-page class="q-px-xl q-py-lg page-bg">
        
        <!-- HEADER DINÁMICO -->
        <header class="row items-center justify-between q-mb-xl">
          <div>
            <h1 class="page-title text-uppercase no-margin tracking-tighter">La visión del arquitecto</h1>
            <p class="page-subtitle text-uppercase q-mt-xs q-mb-none font-weight-bold op-40 tracking-widest">
              {{ viewTitles[currentView] }} • SYSTEM V9.2
            </p>
          </div>
        </header>

        <!-- Dynamic Content -->
        <component :is="activeComponent" />

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useAdminStore } from '../store/admin.js';
import { useAuthStore } from '../store/auth.js';

// Import sub-views
import AdminUsers from '../components/admin/AdminUsers.vue';
import AdminPayments from '../components/admin/AdminPayments.vue';
import AdminReadings from '../components/admin/AdminReadings.vue';

import AdminProfileMenu from '../components/admin/AdminProfileMenu.vue';

const $q = useQuasar();
const adminStore = useAdminStore();
const authStore = useAuthStore();
const currentView = ref('lecturas');

// Carga inicial proactiva de todos los datos necesarios para el dashboard
adminStore.fetchAll();

const viewTitles = {
  usuarios: 'Central de Usuarios',
  pagos: 'Control de Facturación',
  lecturas: 'Monitor de Actividad'
};

const activeComponent = computed(() => {
  switch (currentView.value) {
    case 'usuarios': return AdminUsers;
    case 'pagos': return AdminPayments;
    case 'lecturas': return AdminReadings;
  }
});

onMounted(() => {
  $q.dark.set(true);
});

const setView = (view) => {
  currentView.value = view;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap');

.dashboard-layout {
  font-family: 'Manrope', sans-serif;
  background-color: #0d0f12 !important;
  color: #ffffff;
}

:deep(.q-drawer) {
  background-color: #0b0c0e !important;
}

.page-bg {
  background-color: #0d0f12 !important;
  min-height: 100vh;
}

.op-60 { opacity: 0.6; }
.op-40 { opacity: 0.4; }
.z-top { z-index: 10; }
.flex-1 { flex: 1; }

.bg-sidebar {
  background-color: #0b0c0e !important;
  border-right: 1px solid rgba(255, 255, 255, 0.03) !important;
}

/* LOGO */
.logo-container {
  width: 32px;
  height: 32px;
  background: #f2a900;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  box-shadow: 0 0 15px rgba(242, 169, 0, 0.4);
}

.logo-text {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
}

.logo-text span {
  color: #f2a900;
}

/* NAVIGATION */
.nav-item {
  border-radius: 12px;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  min-height: 52px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.active-nav {
  background: rgba(242, 169, 0, 0.04) !important;
  color: #ffffff !important;
  border: 1px solid rgba(242, 169, 0, 0.1);
}

.nav-label {
  font-weight: 600;
  font-size: 15px;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 15%;
  height: 70%;
  width: 3px;
  background: #f2a900;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 10px rgba(242, 169, 0, 0.8);
}

.profile-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  margin-top: 20px;
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

.page-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
  color: #ffffff;
}

.page-subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 2.5px;
}
</style>
