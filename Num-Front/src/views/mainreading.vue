<template>
  <q-page class="soul-reading-page font-display text-white">
    <div class="fixed-full z-behind">
      <img src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80"
        class="bg-image opacity-60 full-width full-height object-cover" />
      <div class="absolute-full geometry-bg"></div>
      <div class="absolute-full ambient-vignette"></div>
    </div>

    <nav class="relative-position z-top full-width q-px-xl q-py-lg flex justify-between items-center">
      <div class="flex items-center gap-sm">
        <q-icon name="auto_awesome" color="primary" size="32px" />
        <span class="font-serif-display text-h6 text-bold tracking-widest text-white-90">NUMEROLOGIA</span>
      </div>
      <div class="flex items-center q-gutter-x-lg">
        <secondButton to="/perfil" label="Perfil" class="nav-gold-item" />
        <secondButton to="/lectura_diaria" label="Lectura Diaria" class="nav-gold-item" />
      </div>
    </nav>

    <main class="relative-position z-top container mx-auto q-px-md flex flex-center min-h-85">
      <div
        class="full-width max-w-lg-container glass-panel prismatic-border q-pa-lg lg:q-pa-xl rounded-xl overflow-hidden">
        <div class="absolute-full spotlight no-pointer-events"></div>

        <header class="text-center q-mb-xl relative-position z-top">
          <h1
            class="font-serif-display text-h3 lg:text-h2 text-bold text-gold-gradient q-mb-xs tracking-wide drop-shadow-lg">
            LECTURA PRINCIPAL</h1>
          <p class="text-white-50 text-uppercase tracking-widest text-caption font-medium">{{
            converFecha(lecturaPrincipal?.fechaLectura) }}</p>
        </header>

        <div v-if="lecturaPrincipal" class="row q-col-gutter-xl items-start relative-position z-top">
          <div class=" flex justify-center items-center col-md-4 q-gutter-y-xl">
            <div class="reading-section">
              <h3 class="section-title-cosmic q-mb-md flex items-center">
                <div class="line-accent q-mr-sm"></div> DESCRIPCIÓN
              </h3>
              <p class="reading-content font-light">{{ lecturaPrincipal?.contenido?.descripcion }}</p>
            </div>
          </div>

          <div class="col-12 col-md-4 flex flex-center column">
            <div class="astrolabe-container relative-position">
              <div class="astrolabe-ring ring-outer animate-spin-slow"></div>
              <div class="astrolabe-ring ring-middle animate-spin-reverse-slow"></div>
              <div class="astrolabe-ring ring-inner animate-spin-slow-dashed"></div>
              <div class="absolute-center">
                <span class="font-serif-display text-num text-primary text-glow animate-pulse">{{
                  lecturaPrincipal?.contenido?.numero }}</span>
              </div>
            </div>
            <div class="q-mt-xl">
              <div class="mystic-badge q-px-md q-py-xs rounded-full text-bold text-caption tracking-widest">THE MYSTIC
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 q-gutter-y-xl text-right-md">
            <div class="reading-section column items-end-md">
              <h3 class="section-title-cosmic q-mb-md flex items-center reverse-md">MENSAJE <div
                  class="line-accent q-mr-sm"></div>
              </h3>
              <p class="reading-content font-light">{{ lecturaPrincipal?.contenido?.mensaje }}</p>
            </div>
            <div class="reading-section column items-end-md">
              <h3 class="section-title-cosmic q-mb-md flex items-center reverse-md">TALENTOS<div
                  class="line-accent q-mr-sm"></div>
              </h3>
              <p class="reading-content text-talent-highlight">{{ lecturaPrincipal?.contenido?.talentos }}</p>
            </div>
          </div>
        </div>

        <div v-else class="column flex-center q-py-xl text-center relative-position z-top">
          <q-icon name="auto_awesome" size="100px" class="text-primary q-mb-lg animate-pulse" />
          <h2 class="text-h4 text-weight-light q-mb-md tracking-widest">TU DESTINO TE ESPERA</h2>
          <p class="text-white-60 text-body1 max-w-sm mx-auto">Las estrellas aún no han trazado tu mapa principal. Pulsa
            el botón inferior para invocar la sabiduría de los números.</p>
        </div>

        <div class="flex justify-center items-center q-gutter-md q-pt-xl">
          <div v-if="!lecturaPrincipal">
            <secondButton label="Generar Lectura Principal" :loading="loading" @click="onGeneratePrincipal" />
          </div>
          <template v-else>
            <secondButton label="Descargar PDF" icon="download" @click="onDownloadPDF" />
            <secondButton label="Enviar al Correo" icon="mail" :loading="sendingEmail" @click="onSendEmail" />
          </template>
        </div>
      </div>
    </main>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "../store/auth.js";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { postData } from "../services/services.js";
import { converFecha, generarPDFLectura } from "../utils/functions.js";
import secondButton from '../components/secondButton.vue';

const $q = useQuasar();
const authStore = useAuthStore();
const { user, lecturasguardadas } = storeToRefs(authStore);

const loading = ref(false);
const sendingEmail = ref(false);

const lecturaPrincipal = computed(() => lecturasguardadas.value.find(item => item.tipo === 'principal') || null);

const onDownloadPDF = () => {
  if (!lecturaPrincipal.value) return;
  generarPDFLectura(lecturaPrincipal.value, user.value?.nombre);
};

const onSendEmail = async () => {
  if (!lecturaPrincipal.value || !user.value?.email) return;
  sendingEmail.value = true;
  try {
    await postData('/lectura/enviar-email', { email: user.value.email, nombre: user.value.nombre, lectura: lecturaPrincipal.value });
    $q.notify({ color: "positive", message: "¡Lectura enviada a tu correo! 📧✨", icon: "send" });
  } catch (error) {
    $q.notify({ color: "negative", message: "No pudimos enviar el correo. Intenta de nuevo. 🌌", icon: "error" });
  } finally {
    sendingEmail.value = false;
  }
};

const onGeneratePrincipal = async () => {
  if (!user.value?._id) return;
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    const res = await postData(`/lectura/principal/${user.value._id}`);
    const nuevaLectura = { _id: res.id, usuario: user.value._id, tipo: 'principal', contenido: res.contenido, fechaLectura: new Date().toISOString() };
    authStore.lecturasguardadas.push(nuevaLectura);
    $q.notify({ color: "positive", message: "¡Lectura Principal generada exitosamente! 🌌", icon: "done" });
  } catch (error) {
    $q.notify({ color: "negative", message: error.response?.data?.error || "Error al conectar con el cosmos", icon: "error" });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('../styles/mainreading.css');
</style>