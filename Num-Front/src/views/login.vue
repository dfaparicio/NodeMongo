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
              :type="showpassword ? 'text' : 'password'" :rules="[val => !!val || 'La contraseña es requerida']">
              <template v-slot:prepend>
                <q-icon name="lock_outline" />
              </template>
              <template v-slot:append>
                <q-icon :name="showpassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                  @click="showpassword = !showpassword" />
              </template>
            </q-input>
            <div class="text-right">
              <a href="#" class="text-caption text-grey-5 hover-text-primary custom-link">¿Olvidaste tu llave
                cósmica?</a>
            </div>
          </div>

          <br>

          <PrimaryButton label="INGRESAR" type="submit" icon="login" :loading="loading" />
        </q-form>

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
import PrimaryButton from '../components/primaryButton.vue';
import { useNotifications } from '../composables/notify.js';

const { success, error: notifyerror } = useNotifications();

const email = ref("");
const password = ref("");
const showpassword = ref(false);
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const avatars = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB4QqQfw2dZYRgRRoAmE00Hzt4rVb9gt6aynSwvSXBQ5e8xBk--yLd2XXS5iDDmo8SNtK10-uUGILlC77Ww-fqL3N6EtvBvZ6lS33LQdxC3SpaS8NVfmncJJqierNLOmkJALgL6ZmRqon9fh9WX_9CIX7cFxH9aD9xSkgeEZFIOymTqLNXKZ8VkKo7iTmSoQVFwb0Id65GwWO93LAJLjvhvURIn2lLocMYkIDin0OGDiL-K1kUnNg5O15ek04LK7gNJzMireaf2MkI',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCj36BvfOdcs71S5yqw-sLtzgxAIHjXiyY8In3Wr8AEln9Z093nvEeBBHj_MEIkvhcBVjTv-JJ5Hj9g9wBM_6RfQW3d7KqdfID9kuIxxb_gjfzF6dPBf24sXPqsdDmDhBmPpZ2ZdfgJTDtpYAjtR7dVuCBOAbiajo7kVwFYpdIUUy0YdzOAr64K-QOt5CRJMaeIgKJd4bfYsyV6J5a0uVP4H0qqHhV2cQFuv0YdpQylBsBkmGqMeMk9d-bO4M98VjHXKVzvdyxf4SE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCLCwZXUhNVM0zwzzY8HmEGHTL1qo4mdjf59Yr-rXSCB2OTgVmXAJXKthexHpFhMzdeVYcKgd-59CXjv-17V5ZZiRLrC0r8YTd0DjGYe4FNYO-83VlwDgkY995fjm5YBTth4VMzCj3Xed7QY1fSge4kqlXdpMY8Hh94fLWomtdscHisVpJPO_sQRt6eG1j51F_1pZBYuUXhaHjaCQWsz4K-QrSKs8FGUCoeXXnBI61ywZsC-yxbtBvG-kHSR4n2cMIfVFCDFAvDMZc'
];

const login = async () => {

  if (!email.value || !password.value) return;

  loading.value = true;

  try {
    const res = await postData("auth/login", { email: email.value, password: password.value });

    authStore.token = res.token;
    authStore.user = res.usuario;

    console.log("Datos cósmicos guardados en Pinia con éxito");

    success("Conexión cósmica establecida", "Bienvenido de vuelta a tu camino");

    router.push('/perfil');

  } catch (error) {
    console.error(error.response);

    const errormsg = error.response?.data?.error || "Revisa tus credenciales e intenta de nuevo";
    notifyerror("Energía desalineada", errormsg)

  } finally {
    loading.value = false;
  }
};

// onMounted(() => {
//   login();
// });

// const logout = () => {
//   authStore.logout(); 
//   router.push('/');   
// };

</script>

<style scoped>
@import url('../styles/login.css');
</style>