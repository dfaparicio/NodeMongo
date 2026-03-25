<template>
  <q-page class="soul-reading-page font-display text-white overflow-x-hidden">
    <!-- FONDO DINÁMICO MEJORADO -->
    <div class="fixed-full z-behind">
      <img src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80"
        class="bg-image opacity-30 full-width full-height object-cover" />
      <div class="absolute-full geometry-grid opacity-10"></div>
      <div class="absolute-full ambient-vignette"></div>
    </div>

    <nav class="relative-position z-top full-width q-px-xl q-py-xl flex justify-between items-center">
      <div class="flex items-center gap-md">
        <q-avatar size="42px">
          <img src="../assets/Logo.png" alt="Logo" />
        </q-avatar>
        <span class="font-serif text-h6 text-bold tracking-widest text-white-80 text-uppercase" style="letter-spacing: 6px;">Numeris Astral</span>
      </div>
      <div class="flex items-center q-gutter-x-lg">
        <secondButton to="/perfil" label="Panel Cósmico" class="nav-gold-item" />
        <secondButton to="/lectura_diaria" label="Guía del Día" class="nav-gold-item" />
      </div>
    </nav>

    <main class="relative-position z-top container mx-auto q-px-md q-py-xl flex flex-center">
      <div class="full-width max-w-lg-container relative-position">
        
        <!-- CABECERA EQUILIBRADA: EL NÚMERO MAESTRO -->
        <div v-if="lecturaPrincipal" class="column items-center q-mb-lg">
          <div class="avatar-wrapper q-mb-lg relative-position" style="width: 240px; height: 240px;">
            <!-- Estrellas Decorativas -->
            <q-icon name="star" color="gold" size="8px" class="absolute animate-pulse" style="top: 10%; left: 15%;" />
            <q-icon name="auto_awesome" color="gold" size="12px" class="absolute animate-pulse-slow" style="top: 20%; right: 10%;" />
            
            <div class="absolute-full flex flex-center">
              <svg class="w-full h-full svg-primary-opacity" viewBox="0 0 200 200" style="filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.2));">
                <circle cx="100" cy="100" fill="none" r="98" stroke="rgba(212, 175, 55, 0.3)" stroke-width="0.3" stroke-dasharray="1 5"></circle>
                <circle cx="100" cy="100" fill="none" r="90" stroke="rgba(212, 175, 55, 0.5)" stroke-width="0.6" stroke-dasharray="10 5"></circle>
                <polygon fill="none" points="100,5 195,160 5,160" stroke="rgba(212, 175, 55, 0.4)" stroke-width="0.8" class="animate-pulse-slow"></polygon>
              </svg>
            </div>
            <div class="absolute-center column flex-center full-width">
              <div class="text-caption text-gold-soft text-weight-thin tracking-widest q-mb-xs" style="font-size: 10px; letter-spacing: 10px;">ADN CÓSMICO</div>
              <div class="master-number-glow-soft text-weight-bolder text-white font-serif" style="font-size: 6.5rem;">
                {{ lecturaPrincipal?.contenido?.numero || '?' }}
              </div>
            </div>
          </div>
          <h1 class="text-h3 text-weight-bold text-gradient-gold-soft text-center q-ma-none font-serif tracking-widest">MAPA DEL ALMA</h1>
          <div class="row items-center q-gutter-x-md q-mt-md opacity-30">
            <div style="height: 1px; width: 40px; background: #fff;"></div>
            <span class="text-uppercase tracking-widest" style="font-size: 9px; letter-spacing: 4px;">Frecuencia Vibratoria</span>
            <div style="height: 1px; width: 40px; background: #fff;"></div>
          </div>
        </div>

        <!-- CONTENIDO CON ESPACIO OPTIMIZADO -->
        <div v-if="lecturaPrincipal" class="q-gutter-y-xl q-pt-xl">
          
          <!-- CAPÍTULO 1: LA ESENCIA -->
          <div class="glass-panel-premium-soft q-pa-xl q-mb-md">
            <div class="row items-center q-mb-xl">
              <q-icon name="auto_fix_high" color="primary" size="sm" class="q-mr-md opacity-60" />
              <h3 class="text-h5 text-bold text-white q-ma-none tracking-widest font-serif opacity-90">TU ESENCIA Y PROPÓSITO</h3>
            </div>
            <p class="text-body1 text-grey-4 line-height-2 text-italic">{{ lecturaPrincipal?.contenido?.descripcion }}</p>
          </div>

          <div class="row q-col-gutter-xl q-mt-md">
            <!-- CAPÍTULO 2: TALENTOS -->
            <div class="col-12 col-md-6">
              <div class="glass-panel-premium-soft q-pa-xl h-full">
                <div class="row items-center q-mb-xl">
                  <q-icon name="stars" color="primary" size="sm" class="q-mr-md opacity-60" />
                  <h3 class="text-h6 text-bold text-white q-ma-none tracking-widest font-serif opacity-90">DONES CELESTIALES</h3>
                </div>
                <div class="text-talent-box-soft q-pa-lg">
                  <p class="text-body2 text-grey-3 q-ma-none line-height-relaxed">{{ lecturaPrincipal?.contenido?.talentos }}</p>
                </div>
              </div>
            </div>

            <!-- CAPÍTULO 3: EL CONSEJO -->
            <div class="col-12 col-md-6">
              <div class="glass-panel-premium-soft q-pa-xl h-full">
                <div class="row items-center q-mb-xl">
                  <q-icon name="lightbulb" color="primary" size="sm" class="q-mr-md opacity-60" />
                  <h3 class="text-h6 text-bold text-white q-ma-none tracking-widest font-serif opacity-90">CONSEJO ESTELAR</h3>
                </div>
                <p class="text-body2 text-grey-4 line-height-extra">{{ lecturaPrincipal?.contenido?.mensaje }}</p>
              </div>
            </div>
          </div>

          <!-- ACCIONES FINALES CON ESPACIO -->
          <div class="flex justify-center items-center q-gutter-xl q-pt-xl q-mt-xl">
            <secondButton label="Descargar Pergamino" icon="download" @click="onDownloadPDF" />
            <secondButton label="Enviar al Email" icon="mail" :loading="sendingEmail" @click="onSendEmail" />
          </div>
        </div>

        <!-- ESTADO SIN GENERAR -->
        <div v-else class="column flex-center q-py-xl text-center">
          <div class="avatar-wrapper q-mb-xl relative-position" style="width: 200px; height: 200px;">
            <div class="absolute-full flex flex-center animate-pulse">
              <svg class="w-full h-full opacity-20" viewBox="0 0 200 200">
                <circle cx="100" cy="100" fill="none" r="90" stroke="white" stroke-width="0.5" stroke-dasharray="4 4"></circle>
              </svg>
            </div>
            <q-icon name="lock" size="60px" class="text-grey-8" />
          </div>
          <h2 class="text-h4 text-weight-light q-mb-md tracking-widest font-serif">TU DESTINO TE ESPERA</h2>
          <p class="text-white-40 text-body1 max-w-sm mx-auto q-mb-xl">Pulsa el botón inferior para invocar la sabiduría de los números.</p>
          <secondButton label="Generar Lectura Principal" :loading="loading" @click="onGeneratePrincipal" />
        </div>

      </div>
    </main>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "../store/auth.js";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { postData } from "../services/services.js";
import { converFecha, generarPDFLectura } from "../utils/functions.js";
import secondButton from '../components/secondButton.vue';
import { showNotify } from '../utils/notify.js';

const authStore = useAuthStore();
const { user, lecturasguardadas } = storeToRefs(authStore);

const loading = ref(false);
const sendingEmail = ref(false);

const lecturaPrincipal = computed(() => (lecturasguardadas.value || []).find(item => item.tipo === 'principal') || null);

const onDownloadPDF = () => {
  if (!lecturaPrincipal.value) return;
  generarPDFLectura(lecturaPrincipal.value, user.value?.nombre);
};

const onSendEmail = async () => {
  if (!lecturaPrincipal.value || !user.value?.email) return;
  sendingEmail.value = true;
  try {
    await postData('/lectura/enviar-email', { 
      email: user.value.email, 
      nombre: user.value.nombre, 
      lectura: lecturaPrincipal.value 
    });
    showNotify.success("Mensaje Enviado", "Tu pergamino astral ha sido enviado a tu correo celestial.");
  } catch (error) {
    showNotify.error("Error de Transmisión", "No se pudo enviar el pergamino en este momento.");
  } finally {
    sendingEmail.value = false;
  }
};

const onGeneratePrincipal = async () => {
  if (!user.value?._id) return;
  loading.value = true;
  try {
    const res = await postData(`/lectura/principal/${user.value._id}`);
    const contenido = typeof res.contenido === 'string' ? JSON.parse(res.contenido) : res.contenido;
    const nuevaLectura = { 
      _id: res.id, 
      usuario: user.value._id, 
      tipo: 'principal', 
      contenido: contenido, 
      fechaLectura: new Date().toISOString() 
    };
    authStore.lecturasguardadas.push(nuevaLectura);
    showNotify.success("Alineación Completada", "¡Tu Mapa del Alma ha sido revelado por los astros! 🌌");
  } catch (error) {
    showNotify.error("Error de Invocación", "La sabiduría de los números no pudo ser revelada. Intenta más tarde.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('../styles/mainreading.css');
</style>
