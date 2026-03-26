<template>
  <q-layout view="lHh Lpr lFf" class="dashboard-layout cosmic-bg overflow-hidden">
    <!-- FONDO DECORATIVO GLOBAL -->
    <div class="fixed-full z-behind">
      <div class="absolute-full star-field"></div>
      <div class="nebula nebula-1"></div>
      <div class="nebula nebula-2"></div>
      <div class="absolute-full aura-gradient"></div>
    </div>

    <!-- LEFT SIDEBAR -->
    <q-drawer
      show-if-above
      :width="280"
      class="bg-sidebar-glass no-border sidebar-astral"
    >
      <div class="column full-height relative-position sidebar-content">

        <!-- Logo Area mejorado -->
        <div class="logo-section-premium column items-center q-px-lg q-pt-xl q-pb-lg">
          <!-- Orb Logo con anillos -->
          <div class="logo-orb-wrapper q-mb-md">
            <div class="logo-orbit-ring ring-1"></div>
            <div class="logo-orbit-ring ring-2"></div>
            <div class="logo-glow"></div>
            <q-avatar size="64px" class="inner-logo">
              <img src="../assets/Logo.png" alt="Logo" class="animate-pulse-slow" />
            </q-avatar>
          </div>

          <!-- Nombre -->
          <div class="logo-title-premium">AETHERIA</div>
          <div class="logo-subtitle-premium">ADMIN PANEL</div>

          <!-- Separador con degradado dorado -->
          <div class="logo-separator q-mt-lg"></div>
        </div>

        <!-- Navigation -->
        <div class="q-px-md flex-grow-1 navigation-section">
          <q-list class="q-gutter-y-sm">
            <q-item
              v-for="item in navItems"
              :key="item.view"
              clickable v-ripple
              class="nav-item-cosmic"
              :class="{ 'active-nav': currentView === item.view }"
              @click="setView(item.view)"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" size="24px" class="nav-icon" />
              </q-item-section>
              <q-item-section class="nav-label text-uppercase tracking-wider">{{ item.label }}</q-item-section>
              <div class="active-indicator"></div>
            </q-item>
          </q-list>
        </div>

        <!-- Footer con perfil -->
        <div class="sidebar-footer-premium q-pa-md">
          <!-- Separador superior dorado -->
          <div class="footer-separator q-mb-md"></div>

          <!-- Status pill -->
          <div class="system-status-pill q-pa-sm q-mb-sm">
            <div class="row items-center justify-center q-gutter-x-sm">
              <div class="status-orb-active"></div>
              <span class="text-caption text-grey-5 uppercase tracking-widest text-weight-bold" style="font-size: 8px;">Cosmos Sincronizado</span>
            </div>
          </div>

          <AdminProfileMenu />
        </div>
      </div>
    </q-drawer>

    <!-- PAGE CONTENT -->
    <q-page-container>
      <q-page class="q-px-xl q-py-lg page-content-cosmic">
        
        <!-- HEADER DINÁMICO PREMIUM -->
        <header class="header-astral-premium q-px-xl q-py-lg q-mb-xl row items-center justify-between">
          <!-- Título de la Vista -->
          <div class="column q-gutter-y-none">
            <div class="row items-center q-gutter-x-sm">
              <div class="header-icon-dot"></div>
              <span class="text-gold-soft tracking-widest uppercase text-weight-bold" style="font-size: 9px; letter-spacing: 3px;">{{ viewSubtitles[currentView] }}</span>
            </div>
            <h1 class="page-title-cosmic no-margin font-serif italic q-mt-xs">{{ viewTitles[currentView] }}</h1>
          </div>

          <!-- Controles del Header -->
          <div class="row items-center q-gutter-x-md">
            <!-- Timestamp -->
            <div class="timestamp-box q-px-lg q-py-sm gt-sm">
              <div class="row items-center q-gutter-x-sm">
                <q-icon name="schedule" color="gold" size="13px" class="opacity-40" />
                <span class="text-caption text-grey-5 font-mono" style="font-size: 12px;">{{ currentTime }}</span>
              </div>
            </div>

            <!-- Botón Sincronizar -->
            <q-btn
              flat no-caps unelevated
              icon="sync"
              label="Sincronizar"
              color="gold"
              :loading="refreshing"
              class="sync-btn-premium q-px-lg q-py-sm"
              @click="refreshData"
            >
              <q-tooltip class="bg-dark text-gold">Actualizar datos del cosmos</q-tooltip>
            </q-btn>
          </div>

          <!-- Línea de Luz decorativa inferior -->
          <div class="header-light-line"></div>
        </header>

        <!-- Dynamic Content with Transition -->
        <div class="content-wrapper">
          <transition 
            name="cosmic-fade" 
            mode="out-in"
          >
            <component :is="activeComponent" @setView="setView" :key="currentView" />
          </transition>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>
>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAdminStore } from '../store/admin.js';
import { useAuthStore } from '../store/auth.js';

// Import sub-views
import AdminDashboard from '../components/admin/AdminDashboard.vue';
import AdminUsers from '../components/admin/AdminUsers.vue';
import AdminPayments from '../components/admin/AdminPayments.vue';
import AdminReadings from '../components/admin/AdminReadings.vue';
import AdminProfileMenu from '../components/admin/AdminProfileMenu.vue';

const $q = useQuasar();
const router = useRouter();
const adminStore = useAdminStore();
const authStore = useAuthStore();
const currentView = ref('dashboard');
const refreshing = ref(false);
const currentTime = ref('');

// Carga inicial proactiva
adminStore.fetchAll();

const navItems = [
  { view: 'dashboard', label: 'Resumen Astral', icon: 'dashboard' },
  { view: 'usuarios', label: 'Almas (Usuarios)', icon: 'group' },
  { view: 'pagos', label: 'Abundancia (Pagos)', icon: 'payments' },
  { view: 'lecturas', label: 'Registros (Lecturas)', icon: 'history_edu' },
];

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('es-CO', { hour12: true });
};

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

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
  $q.notify({ message: 'Has cerrado el portal. ¡Vuelve pronto! ✨', color: 'primary', position: 'bottom' });
};

onMounted(() => {
  $q.dark.set(true);
  updateTime();
  setInterval(updateTime, 1000);
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

/* HEADER PREMIUM */
.header-astral-premium {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.05);
}

.header-light-line {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(to right,
    transparent 0%,
    rgba(212, 175, 55, 0.15) 20%,
    rgba(212, 175, 55, 0.45) 50%,
    rgba(212, 175, 55, 0.15) 80%,
    transparent 100%
  );
}

.header-icon-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.8);
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.timestamp-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
}

/* BOTÓN SINCRONIZAR MEJORADO */
.sync-btn-premium {
  background: rgba(212, 175, 55, 0.07);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.sync-btn-premium:hover {
  background: rgba(212, 175, 55, 0.14);
  border-color: rgba(212, 175, 55, 0.55);
  box-shadow: 0 0 18px rgba(212, 175, 55, 0.15);
  transform: translateY(-1px);
}
.sync-btn-premium :deep(.q-btn__content .q-icon) {
  transition: transform 0.3s ease;
}
.sync-btn-premium:hover :deep(.q-btn__content .q-icon) {
  transform: rotate(180deg);
}

/* BOTÓN PERFIL HEADER */
.profile-header-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.profile-header-btn:hover {
  background: rgba(212, 175, 55, 0.07);
  border-color: rgba(212, 175, 55, 0.35);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.08);
}

.header-avatar {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(0,0,0,0.5));
  border: 1px solid rgba(212, 175, 55, 0.35);
  position: relative;
  overflow: visible;
}

.header-avatar-ring {
  position: absolute;
  top: -3px; left: -3px; right: -3px; bottom: -3px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.4);
  animation: rotate-ring 8s linear infinite;
  pointer-events: none;
}

@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* MENÚ DESPLEGABLE DEL PERFIL */
.profile-dropdown-menu {
  background: rgba(10, 12, 16, 0.95) !important;
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.05);
}

.menu-item-glass {
  border-radius: 10px;
  transition: background 0.2s ease;
}
.menu-item-glass:hover {
  background: rgba(255, 255, 255, 0.06) !important;
}
</style>
