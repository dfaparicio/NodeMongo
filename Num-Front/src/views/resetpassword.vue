<template>
  <q-page class="restore-connection-page bg-black overflow-hidden flex row">
    <!-- Mitad Izquierda (Decorativa) -->
    <div class="gt-sm col-12 col-md-6 relative-position overflow-hidden flex flex-center bg-nebula-indigo">
      <div class="absolute-full space-bg opacity-40 mix-blend-screen"></div>
      <div class="absolute-full gradient-overlay opacity-60"></div>

      <div class="absolute-full no-pointer-events">
        <div class="geo-shard shard-1 floating-element"></div>
        <div class="geo-shard shard-2 floating-element-reverse opacity-60"></div>
      </div>

      <div class="relative-position z-top floating-element column items-center">
        <div class="key-container relative-position flex flex-center">
          <div class="aura-glow absolute-full animate-pulse"></div>
          <q-icon name="sync_lock" size="250px" class="cosmic-key-icon" />
          <div class="ring ring-outer rotate-slow"></div>
        </div>
        <h2 class="q-mt-xl text-h5 font-serif text-indigo-3 tracking-widest text-uppercase opacity-60">
          Reset Your Sigil
        </h2>
      </div>
    </div>

    <!-- Mitad Derecha (Formulario) -->
    <div class="col-12 col-md-6 relative-position">
      <main class="relative-position z-top monolith-glass-panel full-height flex flex-center q-px-xl q-py-xl">
        <div class="full-width max-w-sm">
          <div class="q-mb-xl">
            <h1 class="text-h3 md:text-h2 font-serif text-bold text-white q-mb-md leading-tight">
              Create New <br />
              <span class="text-glow-gold gold-gradient-text">Celestial Key</span>
            </h1>
            <p class="text-indigo-2 text-subtitle1 font-light line-height-relaxed">
              Define your new cosmic signature to regain access to your destiny.
            </p>
          </div>

          <q-form @submit.prevent="handleReset" class="q-gutter-y-lg">
            <div class="group">
              <label class="block text-7 font-serif text-bold tracking-widest text-indigo-3 text-uppercase q-mb-md">
                New Password
              </label>
              <q-input v-model="password" dark class="input-monolith" 
                :type="showPassword ? 'text' : 'password'" borderless
                :rules="[val => !!val || 'La contraseña es obligatoria', val => val.length >= 8 || 'Mínimo 8 caracteres']">
                <template v-slot:prepend><q-icon name="lock" class="q-ml-md" /></template>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="showPassword = !showPassword" />
                </template>
              </q-input>
            </div>

            <div class="group">
              <label class="block text-7 font-serif text-bold tracking-widest text-indigo-3 text-uppercase q-mb-md">
                Confirm Password
              </label>
              <q-input v-model="confirmPassword" dark class="input-monolith" 
                :type="showPassword ? 'text' : 'password'" borderless
                :rules="[val => val === password || 'Las contraseñas no coinciden']">
                <template v-slot:prepend><q-icon name="lock_reset" class="q-ml-md" /></template>
              </q-input>
            </div>

            <q-btn :loading="loading" type="submit" unelevated class="full-width restore-btn q-py-md group overflow-hidden">
              <div class="shimmer-effect"></div>
              <span class="text-subtitle1 font-serif text-bold text-uppercase tracking-widest">Update Signature</span>
            </q-btn>
          </q-form>
        </div>
      </main>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postData } from '../services/services.js';
import { showNotify } from '../utils/notify.js';

const route = useRoute();
const router = useRouter();

const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const loading = ref(false);

const handleReset = async () => {
  const token = route.params.token;
  if (!token) {
    showNotify.error("Token Ausente", "No se encontró un rastro de validación cósmica.");
    return;
  }

  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    await postData(`auth/nuevo-password/${token}`, { password: password.value });
    showNotify.success("Cambio Exitoso", "Tu llave cósmica ha sido actualizada. Ya puedes ingresar.");
    router.push('/login');
  } catch (error) {
    console.error(error);
    const msg = error.response?.data?.error || "El token ha expirado o es inválido.";
    showNotify.error("Error de Frecuencia", msg);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('../styles/resetpassword.css');
</style>
