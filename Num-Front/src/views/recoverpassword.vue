<template>
  <q-page class="restore-connection-page bg-black overflow-hidden flex row">

    <div class="gt-sm col-12 col-md-6 relative-position overflow-hidden flex flex-center bg-nebula-indigo">
      <div class="absolute-full space-bg opacity-40 mix-blend-screen"></div>
      <div class="absolute-full gradient-overlay opacity-60"></div>

      <div class="absolute-full no-pointer-events">
        <div class="geo-shard shard-1 floating-element"></div>
        <div class="geo-shard shard-2 floating-element-reverse opacity-60"></div>
        <div class="geo-shard shard-3 rotate-slow opacity-30"></div>

        <div class="ghost-number n3 absolute font-serif floating-element-reverse">3</div>
        <div class="ghost-number n7 absolute font-serif floating-element">7</div>
        <div class="ghost-number n9 absolute font-serif floating-element">9</div>
      </div>

      <div class="relative-position z-top floating-element column items-center">
        <div class="key-container relative-position flex flex-center">
          <div class="aura-glow absolute-full animate-pulse"></div>
          <q-icon name="key" size="250px" class="cosmic-key-icon rotate-45" />
          <div class="ring ring-outer rotate-slow"></div>
          <div class="ring ring-inner rotate-slow-reverse"></div>
        </div>
        <h2 class="q-mt-xl text-h5 font-serif text-indigo-3 tracking-widest text-uppercase opacity-60">
          Gateway of Knowledge
        </h2>
      </div>
    </div>

    <div class="col-12 col-md-6 relative-position">
      <div class="absolute-full bg-monolith">
        <div class="absolute-full glow-top-right"></div>
      </div>

      <main class="relative-position z-top monolith-glass-panel full-height flex flex-center q-px-xl q-py-xl">
        <div class="full-width max-w-sm">

          <div class="q-mb-xl">
            <div class="row items-center q-gutter-x-sm q-mb-md opacity-60">
              <q-icon name="stars" color="amber-7" size="14px" />
              <span class="text-7 text-bold tracking-widest text-uppercase text-amber-7">Numerology Premium</span>
            </div>
            <h1 class="text-h3 md:text-h2 font-serif text-bold text-white q-mb-md leading-tight">
              Restore Your <br />
              <span class="text-glow-gold gold-gradient-text">Cosmic Connection</span>
            </h1>
            <p class="text-indigo-2 text-subtitle1 font-light line-height-relaxed">
              Align your stardust signature. Enter your registered email to summon the celestial key.
            </p>
          </div>

          <q-form @submit.prevent="handleRestore" class="q-gutter-y-xl">
            <div class="group">
              <label
                class="block text-7 font-serif text-bold tracking-widest text-indigo-3 text-uppercase q-mb-md group-focus-within-gold">
                Registered Email Address
              </label>
              <q-input v-model="email" dark placeholder="cosmos@universe.com" class="input-monolith" type="email"
                borderless :rules="[val => !!val || 'El email es necesario para la restauración']">
                <template v-slot:prepend>
                  <q-icon name="alternate_email" class="q-ml-md" />
                </template>
                <template v-slot:append>
                  <q-icon name="auto_awesome" color="amber-7" class="animate-pulse opacity-0 focus-opacity-100" />
                </template>
              </q-input>
            </div>

            <q-btn :loading="loading" type="submit" unelevated
              class="full-width restore-btn q-py-md group overflow-hidden">
              <div class="shimmer-effect"></div>
              <div class="row full-width justify-between items-center q-px-md">
                <span class="text-subtitle1 font-serif text-bold text-uppercase tracking-widest">Send Restoration
                  Link</span>
                <div class="arrow-wrap flex flex-center">
                  <q-icon name="arrow_forward" size="sm" class="group-hover-right" />
                </div>
              </div>
            </q-btn>
          </q-form>

          <div class="q-mt-xl q-pt-xl border-top-white-10 row justify-between items-center">
            <q-btn flat no-caps color="indigo-4" icon="west" label="Return to Login" @click="goToLogin"
              class="font-serif tracking-widest text-uppercase text-sm hover-white" />
            <div class="gt-xs row items-center q-gutter-x-sm opacity-30 text-indigo-5">
              <q-icon name="lock" size="14px" />
              <span class="text-7 tracking-widest text-uppercase">Secure Cosmic Encryption</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postData } from '../services/services.js';
import { useNotifications } from '../composables/notify.js';

const email = ref("");
const loading = ref(false);
const { success, error: notifyError } = useNotifications();
const router = useRouter();

const handleRestore = async () => {
  if (!email.value) {
    notifyError("Campo Requerido", "Por favor ingresa tu dirección de correo electrónico.");
    return;
  }

  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    await postData("auth/recuperar-password", { email: email.value });
    success("Enlace Enviado", "Hemos enviado la llave de restauración a tu correo celestial.");
    // Opcional: Redirigir al login después de un momento
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  } catch (error) {
    console.error(error);
    const msg = error.response?.data?.error || "No pudimos encontrar ese rastro en el cosmos.";
    notifyError("Error de Conexión", msg);
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
@import url('../styles/recoverpassword.css');
</style>