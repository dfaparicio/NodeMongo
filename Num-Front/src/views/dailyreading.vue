<template>
  <q-page class="soul-reading-page font-display text-white overflow-hidden flex flex-center">
    <!-- FONDO CÓSMICO -->
    <div class="fixed-full z-behind">
      <img src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80"
        class="bg-image opacity-30 full-width full-height object-cover" />
      <div class="absolute-full nebula-soft-glow"></div>
      <div class="absolute-full geometry-grid opacity-10"></div>
    </div>

    <header class="absolute-top z-top full-width q-px-xl q-py-lg flex justify-between items-center">
      <div class="flex items-center q-gutter-x-lg">
        <div class="row items-center gap-md">
          <q-avatar size="54px">
            <img src="../assets/Logo.png" alt="Logo" />
          </q-avatar>
          <div class="column">
            <span class="text-caption text-uppercase tracking-widest text-gold-soft" style="font-size: 10px; letter-spacing: 5px;">Numeris Astral</span>
            <span class="text-h6 font-serif opacity-80">GUÍA DIARIA</span>
          </div>
        </div>
        
        <div class="row items-center glass-panel-premium-soft q-px-md q-py-xs" style="border-radius: 100px;">
          <q-icon name="chevron_left" class="text-gold-soft cursor-pointer hover-white" size="xs" @click="moverCarrusel(-1)" />
          <div class="row q-gutter-x-lg items-center no-wrap q-px-md">
            <div v-for="day in fechasVisibles" :key="day.str" @click="seleccionarFecha(day)"
              :class="['column items-center cursor-pointer day-item', day.str === fechaSeleccionada.str ? 'active-day' : 'text-grey-7']">
              <span class="text-bold" style="font-size: 9px; letter-spacing: 1px;">{{ day.isHoy && day.str === fechaSeleccionada.str ? 'HOY' : day.labelCarrusel }}</span>
              <div class="dot-status-mini" :class="{ 'bg-primary glow-primary': day.str === fechaSeleccionada.str }"></div>
            </div>
          </div>
          <q-icon name="chevron_right" class="text-gold-soft cursor-pointer hover-white" size="xs" @click="moverCarrusel(1)" />
        </div>
      </div>

      <div class="row q-gutter-x-md">
        <secondButton to="/perfil" label="Panel" class="nav-gold-item" />
        <secondButton to="/lectura_principal" label="ADN" class="nav-gold-item" />
      </div>
    </header>

    <!-- CONTENIDO EXPANDIDO (SIN SCROLL) -->
    <main class="full-width max-w-xl-container q-px-xl">
      <div class="row items-center justify-between q-col-gutter-xl">
        
        <!-- COLUMNA 1: EL NÚMERO MAESTRO (IZQUIERDA) -->
        <div class="col-12 col-md-4 column items-center">
          <div class="avatar-wrapper relative-position" style="width: 320px; height: 320px;">
            <q-icon name="star" color="gold" size="8px" class="absolute animate-pulse" style="top: 15%; left: 10%;" />
            <q-icon name="auto_awesome" color="gold" size="12px" class="absolute animate-pulse-slow" style="top: 10%; right: 20%;" />

            <div class="absolute-full flex flex-center">
              <svg class="w-full h-full svg-primary-opacity" viewBox="0 0 200 200" style="filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.2));">
                <circle cx="100" cy="100" fill="none" r="98" stroke="rgba(212, 175, 55, 0.2)" stroke-width="0.3" stroke-dasharray="1 5"></circle>
                <circle cx="100" cy="100" fill="none" r="90" stroke="rgba(212, 175, 55, 0.4)" stroke-width="0.5" stroke-dasharray="8 4"></circle>
                <polygon fill="none" points="100,5 195,160 5,160" stroke="rgba(212, 175, 55, 0.3)" stroke-width="0.8" class="animate-pulse-slow"></polygon>
              </svg>
            </div>
            <div class="absolute-center column flex-center full-width">
              <div class="text-caption text-gold-soft text-weight-thin tracking-widest q-mb-xs" style="font-size: 11px; letter-spacing: 12px;">ESENCIA</div>
              <div class="master-number-glow-soft text-weight-bolder text-white font-serif" style="font-size: 8rem;">
                {{ lecturaPrincipal?.contenido?.numero || '?' }}
              </div>
            </div>
          </div>
          <div class="badge-frecuencia-premium q-px-lg q-py-xs q-mt-md">CAMINO DE VIDA</div>
        </div>

        <!-- COLUMNA 2: CONTENIDO (DERECHA) -->
        <div class="col-12 col-md-8">
          <div class="glass-panel-premium-soft q-pa-xl min-h-card">
            <div class="row items-center justify-between q-mb-lg">
              <div class="column">
                <div class="row items-center q-gutter-x-sm opacity-60">
                  <q-icon name="flare" color="gold" size="14px" />
                  <span class="text-caption tracking-widest text-uppercase" style="font-size: 10px; letter-spacing: 3px;">Pronóstico del día</span>
                </div>
                <h2 class="text-h3 font-serif text-white q-ma-none tracking-widest text-bold">CANALIZACIÓN</h2>
              </div>
              <div class="text-right">
                <div class="text-gold-soft text-h6 font-serif">{{ fechaSeleccionada.str.split(',')[0] }}</div>
                <div class="text-grey-6 text-caption tracking-tighter">{{ fechaSeleccionada.str.split(',')[1] }}</div>
              </div>
            </div>
            
            <q-separator dark class="q-my-lg opacity-10" />

            <template v-if="estadoLectura === 'encontrada'">
              <p class="text-h6 text-grey-4 line-height-tight text-italic q-mb-xl font-light" style="max-width: 90%;">
                "{{ lecturaActual.contenido?.mensaje }}"
              </p>
              
              <div class="row q-col-gutter-xl">
                <div class="col-6">
                  <div class="info-block-soft q-pa-lg">
                    <div class="text-overline text-primary tracking-widest q-mb-sm">ENERGÍA DOMINANTE</div>
                    <div class="text-subtitle1 text-white text-weight-medium">{{ lecturaActual.contenido?.energia }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="info-block-soft q-pa-lg">
                    <div class="text-overline text-primary tracking-widest q-mb-sm">MOTIVACIÓN ASTRAL</div>
                    <div class="text-subtitle1 text-white text-weight-medium">{{ lecturaActual.contenido?.motivacion }}</div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="column flex-center q-py-xl opacity-30">
                <q-icon :name="estadoLectura === 'futura' ? 'auto_awesome' : 'hourglass_empty'" size="4em" class="q-mb-md" />
                <span class="text-h5 font-serif tracking-widest">{{ estadoLectura === 'futura' ? 'FRECUENCIA EN CAMINO' : 'CANAL CERRADO' }}</span>
              </div>
            </template>
          </div>
        </div>

      </div>
    </main>

    <!-- MODALES DE PROTECCIÓN -->
    <q-dialog v-model="mostrarModalPrincipalFaltante" persistent backdrop-filter="blur(20px)">
      <q-card class="glass-panel-premium-soft q-pa-xl text-center" style="max-width: 450px; border-radius: 40px;">
        <q-icon name="auto_fix_high" size="4em" color="primary" class="q-mb-md animate-pulse" />
        <h2 class="text-h4 font-serif text-white text-bold">ADN REQUERIDO</h2>
        <p class="text-grey-5 q-mt-md">Tu frecuencia base no ha sido sintonizada.</p>
        <q-btn unelevated label="GENERAR ADN" class="btn-plan-highlight q-mt-xl full-width" to="/lectura_principal" />
      </q-card>
    </q-dialog>

    <q-dialog v-model="mostrarModalSuscripcion" persistent backdrop-filter="blur(20px)">
      <q-card class="glass-panel-premium-soft q-pa-xl text-center" style="max-width: 450px; border-radius: 40px;">
        <q-icon name="lock" size="4em" color="gold" class="q-mb-md opacity-60" />
        <h2 class="text-h4 font-serif text-white text-bold">CONEXIÓN REQUERIDA</h2>
        <p class="text-grey-5 q-mt-md">Activa tu plan para recibir el mensaje diario.</p>
        <q-btn unelevated label="VER PLANES" class="btn-plan-highlight q-mt-xl full-width" @click="irAPlanes" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth.js";
import { converFecha, generarRangoFechas, obtenerEstadoLectura, resetearHoras } from "../utils/functions.js";
import secondButton from "../components/secondButton.vue"

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { lecturasguardadas } = storeToRefs(authStore);

const lecturaPrincipal = computed(() => (lecturasguardadas.value || []).find(item => item.tipo === 'principal') || null);
const mostrarModalPrincipalFaltante = computed(() => !lecturaPrincipal.value);
const mostrarModalSuscripcion = computed(() => lecturaPrincipal.value && authStore.user?.estado !== 1);

const irAPlanes = () => router.push('/planes');
const irAPerfil = () => router.push('/perfil');

const lecturasDiarias = computed(() => (lecturasguardadas.value || []).filter(item => item.tipo === 'diaria'));
const fechaActualObj = resetearHoras(new Date());
const stringHoy = converFecha(fechaActualObj);

const fechaCentroCarrusel = ref(new Date(fechaActualObj));
const fechaSeleccionada = ref({ str: stringHoy, date: new Date(fechaActualObj) });

const fechasVisibles = computed(() => generarRangoFechas(fechaCentroCarrusel.value, 2, stringHoy));
const lecturaActual = computed(() => lecturasDiarias.value.find(item => converFecha(new Date(item.fechaLectura)) === fechaSeleccionada.value.str));
const estadoLectura = computed(() => obtenerEstadoLectura(lecturaActual.value, fechaSeleccionada.value.date, fechaActualObj));

const moverCarrusel = (dias) => {
  const nuevaFecha = new Date(fechaCentroCarrusel.value);
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);
  fechaCentroCarrusel.value = nuevaFecha;
};

const seleccionarFecha = (dayObj) => {
  fechaSeleccionada.value = { str: dayObj.str, date: dayObj.date };
};

onMounted(() => {
  if (route.query.fecha) {
    const fechaUrl = new Date(route.query.fecha);
    if (!isNaN(fechaUrl.getTime())) {
      const fechaReset = resetearHoras(fechaUrl);
      fechaCentroCarrusel.value = new Date(fechaReset);
      fechaSeleccionada.value = { str: converFecha(fechaReset), date: fechaReset };
    }
  }
});
</script>

<style scoped>
@import url('../styles/dailyreading.css');
</style>
