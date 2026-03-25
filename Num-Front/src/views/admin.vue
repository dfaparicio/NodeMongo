<template>
  <q-layout view="lHh Lpr lFf" class="dashboard-layout cosmic-bg">
    <!-- LEFT SIDEBAR -->
    <q-drawer
      show-if-above
      :width="280"
      class="bg-sidebar-glass no-border"
    >
      <div class="column full-height relative-position glass-panel no-border no-radius-left">
        <!-- Logo Area -->
        <div class="q-px-lg q-py-xl column items-center">
          <div class="logo-wrapper q-mb-md">
            <q-avatar size="64px">
              <img src="../assets/Logo.png" alt="Logo" />
            </q-avatar>
          </div>
          <div class="logo-text">NUMERIS <span>ADMIN</span></div>
          <div class="text-caption text-gold opacity-50 tracking-widest text-uppercase" style="font-size: 8px; letter-spacing: 4px;">Portal del Arquitecto</div>
        </div>

        <!-- Navigation -->
        <div class="q-px-md flex-grow-1">
          <q-list class="q-gutter-y-sm">
            <q-item 
              clickable v-ripple 
              class="nav-item-cosmic" 
              :class="{ 'active-nav': currentView === 'dashboard' }"
              @click="setView('dashboard')"
            >
              <q-item-section avatar>
                <q-icon name="dashboard" size="22px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Resumen Astral</q-item-section>
            </q-item>

            <q-item 
              clickable v-ripple 
              class="nav-item-cosmic" 
              :class="{ 'active-nav': currentView === 'usuarios' }"
              @click="setView('usuarios')"
            >
              <q-item-section avatar>
                <q-icon name="group" size="22px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Almas (Usuarios)</q-item-section>
            </q-item>

            <q-item 
              clickable v-ripple 
              class="nav-item-cosmic" 
              :class="{ 'active-nav': currentView === 'pagos' }"
              @click="setView('pagos')"
            >
              <q-item-section avatar>
                <q-icon name="payments" size="22px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Abundancia (Pagos)</q-item-section>
            </q-item>

            <q-item 
              clickable v-ripple 
              class="nav-item-cosmic" 
              :class="{ 'active-nav': currentView === 'lecturas' }"
              @click="setView('lecturas')"
            >
              <q-item-section avatar>
                <q-icon name="history_edu" size="22px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label">Registros (Lecturas)</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- System Info & Profile -->
        <div class="q-pa-md q-mt-auto">
          <div class="system-status q-pa-sm q-mb-md text-center bg-black-20 rounded-lg border-glass">
            <div class="row items-center justify-center gap-sm">
              <div class="status-dot-active"></div>
              <span class="text-caption text-grey-5 uppercase tracking-widest" style="font-size: 9px; letter-spacing: 2px;">Sistema Online</span>
            </div>
          </div>
          <AdminProfileMenu />
        </div>
      </div>
    </q-drawer>

    <!-- PAGE CONTENT -->
    <q-page-container>
      <q-page class="q-px-xl q-py-lg page-content-cosmic">
        
        <!-- HEADER DINÁMICO -->
        <header class="row items-end justify-between q-mb-xl">
          <div class="q-animate-fade-in">
            <h1 class="page-title-cosmic no-margin">{{ viewTitles[currentView] }}</h1>
            <p class="page-subtitle-cosmic text-uppercase q-mt-xs q-mb-none opacity-50 tracking-widest">
              {{ viewSubtitles[currentView] }} • V.2026.4
            </p>
          </div>
          <div class="row gap-md">
            <q-btn flat round icon="refresh" color="primary" @click="refreshData" :loading="refreshing">
              <q-tooltip>Sincronizar Cosmos</q-tooltip>
            </q-btn>
            <q-btn outline color="primary" label="Ir al Portal" icon="launch" to="/" no-caps class="rounded-lg tracking-widest" />
          </div>
        </header>

        <!-- Dynamic Content with Transition -->
        <transition 
          name="fade-slide" 
          mode="out-in"
        >
          <component :is="activeComponent" @setView="setView" :key="currentView" />
        </transition>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useAdminStore } from '../store/admin.js';

// Import sub-views
import AdminDashboard from '../components/admin/AdminDashboard.vue';
import AdminUsers from '../components/admin/AdminUsers.vue';
import AdminPayments from '../components/admin/AdminPayments.vue';
import AdminReadings from '../components/admin/AdminReadings.vue';
import AdminProfileMenu from '../components/admin/AdminProfileMenu.vue';

const $q = useQuasar();
const adminStore = useAdminStore();
const currentView = ref('dashboard');
const refreshing = ref(false);

// Carga inicial proactiva
adminStore.fetchAll();

const viewTitles = {
  dashboard: 'Estado del Cosmos',
  usuarios: 'Buscadores de Luz',
  pagos: 'Registros de Abundancia',
  lecturas: 'Crónicas Celestiales'
};

const viewSubtitles = {
  dashboard: 'Resumen ejecutivo de la plataforma',
  usuarios: 'Gestión integral de la comunidad',
  pagos: 'Control financiero y facturación',
  lecturas: 'Auditoría de mensajes generados'
};

const activeComponent = computed(() => {
  switch (currentView.value) {
    case 'dashboard': return AdminDashboard;
    case 'usuarios': return AdminUsers;
    case 'pagos': return AdminPayments;
    case 'lecturas': return AdminReadings;
  }
});

const setView = (view) => {
  currentView.value = view;
};

const refreshData = async () => {
  refreshing.value = true;
  await adminStore.fetchAll();
  refreshing.value = false;
};

onMounted(() => {
  $q.dark.set(true);
});
</script>

<style scoped>
@import url('../styles/admin.css');

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.bg-sidebar-glass {
  background: rgba(11, 12, 14, 0.5) !important;
  backdrop-filter: blur(20px);
}

.no-radius-left {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.logo-wrapper {
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
}
</style>
