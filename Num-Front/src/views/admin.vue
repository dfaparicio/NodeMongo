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
            <div class="logo-text">NUMERO <span>LOGIA</span></div>
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
@import url('../styles/admin.css');
</style>
