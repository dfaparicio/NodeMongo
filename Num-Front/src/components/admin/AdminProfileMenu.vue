<template>
  <div class="admin-profile-menu">
    <q-btn flat no-caps class="full-width profile-card-btn q-pa-sm">
      <div class="row items-center no-wrap full-width q-gutter-x-sm">

        <!-- Avatar con anillo rotatorio -->
        <div class="profile-avatar-wrapper">
          <q-avatar size="40px" class="profile-avatar">
            <span class="text-weight-bolder text-white font-serif" style="font-size: 16px;">
              {{ (authStore.user?.nombre || 'A').charAt(0).toUpperCase() }}
            </span>
          </q-avatar>
          <div class="profile-avatar-ring"></div>
        </div>

        <!-- Info del usuario -->
        <div class="column items-start text-left" style="flex: 1; min-width: 0;">
          <div class="text-weight-bold text-white ellipsis full-width" style="font-size: 13px; line-height: 1.2;">
            {{ authStore.user?.nombre || 'Arquitecto' }}
          </div>
          <div class="text-gold-soft tracking-widest uppercase" style="font-size: 8px; letter-spacing: 2px;">
            Administrador Elite
          </div>
        </div>

        <!-- Chevron -->
        <q-icon name="unfold_more" color="gold" size="16px" class="opacity-40" />
      </div>

      <!-- Menú desplegable mejorado -->
      <q-menu dark class="profile-popup-menu" transition-show="scale" transition-hide="scale" anchor="top left" self="bottom left" :offset="[0, 8]">
        <!-- Header del menú con info del usuario -->
        <div class="profile-popup-header column items-center q-pa-lg">
          <div class="profile-popup-avatar-wrap q-mb-sm">
            <q-avatar size="56px" class="profile-avatar">
              <span class="text-weight-bolder text-white text-h5 font-serif">
                {{ (authStore.user?.nombre || 'A').charAt(0).toUpperCase() }}
              </span>
            </q-avatar>
            <div class="profile-avatar-ring"></div>
          </div>
          <div class="text-white text-weight-bold" style="font-size: 15px;">{{ authStore.user?.nombre }}</div>
          <div class="text-grey-5 font-mono q-mt-xs" style="font-size: 11px;">{{ authStore.user?.email }}</div>
          <q-badge outline color="gold" class="q-mt-sm q-px-sm tracking-widest" style="font-size: 8px;">
            ADMINISTRADOR ELITE
          </q-badge>
        </div>

        <div class="popup-separator"></div>

        <q-list style="min-width: 240px;" class="q-pa-sm">
          <q-item clickable v-ripple v-close-popup class="popup-menu-item rounded-lg q-mb-xs" @click="goToProfile">
            <q-item-section avatar><q-icon name="manage_accounts" color="primary" size="20px" /></q-item-section>
            <q-item-section class="text-white" style="font-size: 13px;">Mi Perfil Astral</q-item-section>
          </q-item>

          <div class="popup-separator q-my-sm"></div>

          <q-item clickable v-ripple v-close-popup class="popup-menu-item popup-logout rounded-lg" @click="logout">
            <q-item-section avatar><q-icon name="logout" color="negative" size="20px" /></q-item-section>
            <q-item-section class="text-negative" style="font-size: 13px;">Cerrar Portal</q-item-section>
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
  router.push('/perfil');
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
/* BOTÓN DE PERFIL */
.profile-card-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.profile-card-btn:hover {
  background: rgba(212, 175, 55, 0.07);
  border-color: rgba(212, 175, 55, 0.35);
  box-shadow: 0 0 16px rgba(212, 175, 55, 0.08);
}

/* AVATAR */
.profile-avatar-wrapper,
.profile-popup-avatar-wrap {
  position: relative;
  padding: 4px;
  flex-shrink: 0;
}
.profile-avatar {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(0,0,0,0.6));
  border: 1px solid rgba(212, 175, 55, 0.3);
  overflow: visible;
}
.profile-avatar-ring {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.45);
  animation: rotate-ring-profile 10s linear infinite;
  pointer-events: none;
}
@keyframes rotate-ring-profile {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* MENÚ POPUP */
.profile-popup-menu {
  background: rgba(8, 10, 14, 0.97) !important;
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.04);
  overflow: hidden;
}

/* HEADER DEL POPUP */
.profile-popup-header {
  background: rgba(212, 175, 55, 0.03);
}

/* SEPARADOR */
.popup-separator {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent);
}

/* ÍTEMS DEL MENÚ */
.popup-menu-item {
  border-radius: 10px;
  transition: background 0.2s ease;
}
.popup-menu-item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
}
.popup-logout:hover {
  background: rgba(255, 77, 77, 0.07) !important;
}

/* TIPOGRAFÍA */
.font-serif { font-family: 'Playfair Display', serif; }
.text-gold-soft { color: rgba(212, 175, 55, 0.6); }
</style>
