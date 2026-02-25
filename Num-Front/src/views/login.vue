<template>
  <q-page class="row window-height text-white font-display bg-void overflow-hidden">

    <div class="col-md-7 gt-sm relative-position overflow-hidden bg-void">
      <q-img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOYC3SQk2mjOD_3Oz2LYFJi3QaADHLEXIGGNKuXHT08lXzlJaolS88F-zszgIY6Qmst4pnYXuYAWivn1GXXlX7wJXHId17ctPlFAE5Ivt-DFYsYd78Nx7xM8kFqp5boA68hMw9OXdkLe6KVHqqjLumwk575WqlyoFsl5SJ_ajsogHnqcdN9H1CNxTWoawJD38vYPo8EVNa9fID2JskLszZRmaGkOmTaI21vFJxQ6l4ssRIBOl1anYpGmLs_ivOY8o3TBN7xQrxRmE"
        class="absolute-full opacity-80" style="mix-blend-mode: overlay;" />
      <div class="absolute-full cosmic-overlay"></div>

      <div class="absolute-full flex flex-center opacity-60">
        <q-img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0XMIupUmXUu4OKxJegFu5lFdMLRVaacsP3VfUR5NH5CZ1Be5cRqA1kKXtQddiZCuBuiUzibqqBH6sG6nAFywNV4_pTfGJXIMKPy43H3xD0qJacj-B4BDHgvCxrahs386FqOa-mYYTfD12nztWvXu1jp6NYUSfX51Fqmp5gDcynM-vHxlWDtfrT8y52MBM3TwSE_Dov-xNfQvpeKkC2ij_dWh0T_hSXDY5PPmOydLPrzCyqGbeeULURTKRy55W_jMlaAMTQQnTR0M"
          class="absolute-full opacity-50" style="mix-blend-mode: screen;" />
      </div>

      <div class="relative-position fit column justify-between q-pa-xl z-top">
        <div class="row items-center q-gutter-sm opacity-80">
          <q-icon name="auto_awesome" color="primary" size="md" />
          <span class="text-h6 text-weight-bold text-uppercase tracking-widest text-primary">NUMERIS</span>
        </div>

        <div class="q-mb-xl" style="max-width: 600px;">
          <h2 class="font-serif text-h3 text-italic q-mb-md cosmic-text-gradient">
            "Los números son el lenguaje en el que el universo te habla."
          </h2>
          <p class="text-subtitle1 text-grey-4 text-weight-light" style="line-height: 1.6;">
            Accede a tus cartas numerológicas, descubre tus alineaciones cósmicas diarias y desvela el camino que las
            estrellas han trazado para ti.
          </p>

          <div class="row items-center q-mt-lg q-gutter-x-md">
            <div class="row items-center avatar-group">
              <q-avatar v-for="(avatar, index) in avatars" :key="index" size="40px" class="avatar-border">
                <img :src="avatar" />
              </q-avatar>
            </div>
            <span class="text-caption text-primary text-weight-medium">Únete a +12,000 Buscadores</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-5 relative-position flex flex-center q-pa-md bg-background-dark">
      <div class="absolute-full overflow-hidden" style="pointer-events: none;">
        <div class="absolute-full bg-stardust opacity-20"></div>
        <div class="ambient-glow-top"></div>
        <div class="ambient-glow-bottom"></div>
      </div>

      <q-card class="glass-panel w-full max-w-md q-pa-xl z-top no-shadow"
        style="border-radius: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">

        <div class="text-center q-mb-xl">
          <h1 class="font-serif text-h4 text-white q-mb-sm tracking-wide">Desbloquea tu Destino</h1>
          <p class="text-grey-5 text-caption text-weight-medium text-uppercase tracking-wider">Bienvenido de vuelta al
            cosmos</p>
        </div>

        <q-form @submit.prevent="login" class="q-gutter-y-md">

          <div>
            <label
              class="block text-caption text-uppercase tracking-widest text-primary text-weight-bold q-ml-xs q-mb-xs">Correo
              Electrónico</label>
            <q-input v-model="email" dark outlined color="primary" placeholder="buscador@cosmos.com" type="email"
              :rules="[val => !!val || 'El correo es necesario para conectar']">
              <template v-slot:prepend>
                <q-icon name="alternate_email" />
              </template>
            </q-input>
          </div>

          <div>
            <label
              class="block text-caption text-uppercase tracking-widest text-primary text-weight-bold q-ml-xs q-mb-xs">Contraseña</label>
            <q-input v-model="password" dark outlined color="primary" placeholder="••••••••"
              :type="showPassword ? 'text' : 'password'" :rules="[val => !!val || 'La contraseña es requerida']">
              <template v-slot:prepend>
                <q-icon name="lock_outline" />
              </template>
              <template v-slot:append>
                <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                  @click="showPassword = !showPassword" />
              </template>
            </q-input>
            <div class="text-right q-mt-sm">
              <a href="#" class="text-caption text-grey-5 hover-text-primary custom-link">¿Olvidaste tu llave
                cósmica?</a>
            </div>
          </div>

          <PrimaryButton label="INGRESAR" to="/dashboard" icon="login" />
        </q-form>

        <div class="relative-position q-my-lg">
          <q-separator dark class="opacity-20" />
          <div class="absolute-center bg-background-dark q-px-sm">
            <span class="text-caption text-grey-5 glass-panel-small q-px-md q-py-xs border-radius-full">O continúa
              con</span>
          </div>
        </div>

        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-btn outline dark class="full-width social-btn" no-caps>
              <template v-slot:default>
                <div class="row items-center q-gutter-x-sm">
                  <svg class="w-5 h-5" style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"></path>
                  </svg>
                  <span class="text-caption text-weight-medium">Google</span>
                </div>
              </template>
            </q-btn>
          </div>
          <div class="col-6">
            <q-btn outline dark class="full-width social-btn" no-caps>
              <template v-slot:default>
                <div class="row items-center q-gutter-x-sm">
                  <svg class="w-5 h-5 text-white" style="width: 20px; height: 20px;" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.04.86-2.17.58-3.04-.32-4.03-4.16-3.06-10.22 1.68-10.22 1.34 0 2.22.68 2.92.68.73 0 1.94-.74 3.28-.6 1.4.15 2.5.76 3.22 1.83-2.91 1.76-2.38 5.76.66 7.15-.59 1.68-1.55 3.12-2.56 4.13zM12.03 7.25c-.15-2.28 1.66-4.32 4-4.25.32 2.69-2.6 4.74-4 4.25z">
                    </path>
                  </svg>
                  <span class="text-caption text-weight-medium">Apple</span>
                </div>
              </template>
            </q-btn>
          </div>
        </div>

        <div class="q-mt-xl text-center">
          <p class="text-caption text-grey-5">
            ¿Aún no has descubierto tu mapa?
            <RouterLink to="/register" class="text-primary text-weight-bold custom-link hover-underline">
              Inicia tu viaje aquí
            </RouterLink>
          </p>
        </div>
      </q-card>

      <div class="absolute-bottom text-center q-pb-md text-caption text-grey-8">
        © 2026 Numeris. Todas las estrellas alineadas.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { postData } from '../services/services.js';
import { useAuthStore } from '../store/auth.js';
import { useQuasar } from 'quasar';
import PrimaryButton from '../components/primaryButton.vue';

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

const useAuth = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const avatars = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB4QqQfw2dZYRgRRoAmE00Hzt4rVb9gt6aynSwvSXBQ5e8xBk--yLd2XXS5iDDmo8SNtK10-uUGILlC77Ww-fqL3N6EtvBvZ6lS33LQdxC3SpaS8NVfmncJJqierNLOmkJALgL6ZmRqon9fh9WX_9CIX7cFxH9aD9xSkgeEZFIOymTqLNXKZ8VkKo7iTmSoQVFwb0Id65GwWO93LAJLjvhvURIn2lLocMYkIDin0OGDiL-K1kUnNg5O15ek04LK7gNJzMireaf2MkI',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCj36BvfOdcs71S5yqw-sLtzgxAIHjXiyY8In3Wr8AEln9Z093nvEeBBHj_MEIkvhcBVjTv-JJ5Hj9g9wBM_6RfQW3d7KqdfID9kuIxxb_gjfzF6dPBf24sXPqsdDmDhBmPpZ2ZdfgJTDtpYAjtR7dVuCBOAbiajo7kVwFYpdIUUy0YdzOAr64K-QOt5CRJMaeIgKJd4bfYsyV6J5a0uVP4H0qqHhV2cQFuv0YdpQylBsBkmGqMeMk9d-bO4M98VjHXKVzvdyxf4SE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLCwZXUhNVM0zwzzY8HmEGHTL1qo4mdjf59Yr-rXSCB2OTgVmXAJXKthexHpFhMzdeVYcKgd-59CXjv-17V5ZZiRLrC0r8YTd0DjGYe4FNYO-83VlwDgkY995fjm5YBTth4VMzCj3Xed7QY1fSge4kqlXdpMY8Hh94fLWomtdscHisVpJPO_sQRt6eG1j51F_1pZBYuUXhaHjaCQWsz4K-QrSKs8FGUCoeXXnBI61ywZsC-yxbtBvG-kHSR4n2cMIfVFCDFAvDMZc'
];

const login = async () => {

  try {
    const res = await postData("auth/login", { email: email.value, password: password.value });

    useAuth.token = res.data.token;
    console.log("Token guardado:", useAuth.token);

    router.push('/dashboard');

  } catch (error) {
    console.error(error.response);

  }
};
</script>

<style scoped>
/* Importación de fuentes de Google */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

/* Variables de Color (Reemplazando Tailwind) */
.bg-void {
  background-color: #0f0c08;
}

.bg-background-dark {
  background-color: #221c10;
}

.text-primary {
  color: #f4af25 !important;
}

/* Tipografía */
.font-display {
  font-family: 'Manrope', sans-serif;
}

.font-serif {
  font-family: 'Playfair Display', serif;
}

.tracking-widest {
  letter-spacing: 0.1em;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

/* Efectos visuales de fondo */
.cosmic-overlay {
  background: linear-gradient(to bottom right, rgba(49, 46, 129, 0.4), rgba(88, 28, 135, 0.3), rgba(34, 28, 16, 0.9));
}

.bg-stardust {
  background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
}

.ambient-glow-top {
  position: absolute;
  top: -5rem;
  right: -5rem;
  width: 24rem;
  height: 24rem;
  background-color: rgba(244, 175, 37, 0.05);
  border-radius: 50%;
  filter: blur(100px);
}

.ambient-glow-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 16rem;
  height: 16rem;
  background-color: rgba(49, 46, 129, 0.1);
  border-radius: 50%;
  filter: blur(80px);
}

/* Efecto Glassmorphism */
.glass-panel {
  background: rgba(34, 28, 16, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(244, 175, 37, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.glass-panel-small {
  background: rgba(34, 28, 16, 0.8);
  border: 1px solid rgba(244, 175, 37, 0.1);
}

/* Textos y Botones especiales */
.cosmic-text-gradient {
  background: linear-gradient(to right, #f6c35e, #f4af25, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

.cosmic-btn {
  background: linear-gradient(to right, #f4af25, #eab308, #d97706);
  color: #221c10 !important;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(244, 175, 37, 0.3);
  transition: all 0.3s ease;
}

.cosmic-btn:hover {
  box-shadow: 0 0 30px rgba(244, 175, 37, 0.5);
  transform: scale(1.01);
}

/* Utilidades extra */
.avatar-group {
  margin-left: 10px;
}

.avatar-border {
  border: 2px solid rgba(244, 175, 37, 0.5);
  margin-left: -10px;
}

.border-radius-full {
  border-radius: 9999px;
}

.custom-link {
  text-decoration: none;
  transition: color 0.2s;
}

.hover-text-primary:hover {
  color: #f4af25 !important;
}

.hover-underline:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.social-btn {
  border-color: rgba(255, 255, 255, 0.1);
  transition: background 0.2s;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.05) !important;
}

/* Custom scrollbar para tema oscuro */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #221c10;
}

::-webkit-scrollbar-thumb {
  background: #3d3424;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #f4af25;
}

/* Corrección de autofill en inputs oscuros */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #1a160e inset !important;
  -webkit-text-fill-color: #e5e5e5 !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>