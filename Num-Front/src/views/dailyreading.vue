<template>
  <q-page class="dashboard-page overflow-hidden relative-position text-white">

    <div class="absolute-full bg-deep-space z-behind">
      <div class="absolute-full grid-pattern"></div>
      <div class="warm-glow-orb absolute-bottom-left"></div>
    </div>

    <div class="absolute-top row justify-between items-center q-pa-lg q-pl-md-xl z-top w-full header-daily-responsive">

      <div class="glass-panel border-white-5 row items-center q-px-md q-py-sm q-gutter-x-lg carousel-mobile"
        style="border-radius: 4px;">
        <q-icon name="chevron_left" class="text-grey-6 cursor-pointer hover-white" size="xs"
          @click="moverCarrusel(-1)" />

        <div class="row q-gutter-x-lg items-end no-wrap">
          <div v-for="day in fechasVisibles" :key="day.str" @click="seleccionarFecha(day)"
            :class="['column items-center cursor-pointer', day.str === fechaSeleccionada.str ? 'text-blue-accent relative-position' : 'text-grey-6 hover-white']">

            <span
              :style="day.str === fechaSeleccionada.str ? 'font-size: 10px; font-weight: bold; letter-spacing: 1px; transform: translateY(-2px);' : 'font-size: 9px; font-weight: bold; letter-spacing: 1px;'">
              {{ day.isHoy && day.str === fechaSeleccionada.str ? 'HOY' : day.labelCarrusel }}
            </span>

            <div v-if="day.str === fechaSeleccionada.str" class="timeline-dot-active bg-blue-accent relative-position">
              <div class="absolute-center bg-blue-accent glow-dot"></div>
            </div>
            <div v-else class="timeline-dot q-mt-xs bg-grey-8"></div>
          </div>
        </div>

        <q-icon name="chevron_right" class="text-grey-6 cursor-pointer hover-white" size="xs"
          @click="moverCarrusel(1)" />
      </div>

      <div class="flex items-center q-gutter-sm nav-buttons-daily">
        <div class="glass-panel border-white-5 row items-center q-px-md q-py-sm" style="border-radius: 4px;">
          <q-icon name="wb_sunny" class="text-blue-accent q-mr-sm" size="xs" />
          <div class="column justify-center q-pl-xs">
            <span class="text-uppercase text-grey-6 text-weight-bold"
              style="font-size: 8px; letter-spacing: 2px;">HOY</span>
            <span class="text-white text-weight-medium" style="font-size: 13px; line-height: 1;">{{ stringHoy }}</span>
          </div>
        </div>

        <div class="row q-gutter-x-sm">
          <secondButton to="/perfil" label="Perfil" class="nav-gold-item" />
          <secondButton to="/lectura_principal" label="Principal" class="nav-gold-item" />
        </div>
      </div>

    </div>

    <div class="absolute-full flex flex-center z-content scroll-y">
      <div class="row items-center justify-center w-full main-container-daily">

        <div class="flex flex-center column q-pa-none">
          <div class="relative-position flex flex-center">
            <div class="giant-number text-gold full-width full-height flex flex-center">
              {{ lecturaPrincipal?.contenido?.numero || '-' }}
            </div>
          </div>
          <div class="badge-gold">NÚMERO CAMINO DE VIDA</div>
        </div>

        <div class="col-12 col-md-6 q-pa-none">
          <div class="info-card glass-panel border-white-5 column q-pa-lg">

            <h2 class="text-h4 text-white q-ma-none text-weight-regular" style="font-family: Arial, sans-serif;">LECTURA
              DIARIA</h2>
            <div class="text-blue-accent text-uppercase text-weight-bold q-mt-sm"
              style="font-size: 10px; letter-spacing: 0.15em;">
              PRONÓSTICO CÓSMICO DE {{ fechaSeleccionada.str === stringHoy ? 'HOY' : fechaSeleccionada.str.toUpperCase()
              }}
            </div>
            <div class="text-grey-7 q-my-md text-weight-bold" style="letter-spacing: 2px;">•••</div>

            <template v-if="estadoLectura === 'encontrada'">
              <p class="text-grey-4 line-height-relaxed" style="font-size: 14px; margin-bottom: 20px;">
                {{ lecturaActual.contenido?.mensaje }}
              </p>

              <div class="row border-top-light q-pt-lg q-col-gutter-md">
                <div class="col-12 col-sm-6 column q-gutter-y-xs">
                  <span class="text-grey-6 text-uppercase" style="font-size: 13px; letter-spacing: 1px;">ENERGIAS</span>
                  <div class="row items-center q-gutter-x-sm">
                    <span class="text-white text-weight-medium" style="font-size: 13px;">{{
                      lecturaActual.contenido?.energia }}</span>
                  </div>
                </div>

                <div class="col-12 col-sm-6 column q-gutter-y-xs">
                  <span class="text-grey-6 text-uppercase"
                    style="font-size: 13px; letter-spacing: 1px;">MOTIVACIÓN</span>
                  <span class="text-white text-weight-medium" style="font-size: 13px;">{{
                    lecturaActual.contenido?.motivacion }}</span>
                </div>
              </div>

              <div class="row q-mt-lg items-end">
                <div class="col-12 column q-gutter-y-sm">
                  <span class="text-grey-6 text-uppercase" style="font-size: 13px; letter-spacing: 1px;">
                    🌟 Frecuencia Energética
                  </span>

                  <q-linear-progress :value="0.8" color="info" track-color="grey-9" size="3px"
                    class="resonance-bar" style="width: 100%;" />
                </div>
              </div>


            </template>

            <template v-else-if="estadoLectura === 'pasada_sin_generar'">
              <div class="column flex-center q-py-xl text-center">
                <q-icon name="history" size="xl" class="text-grey-7 q-mb-md" />
                <span class="text-grey-4 text-h6">No disponible</span>
                <span class="text-grey-6 text-caption">La lectura para este día no se encuentra registrada.</span>
              </div>
            </template>

            <template v-else-if="estadoLectura === 'futura'">
              <div class="column flex-center q-py-xl text-center">
                <q-icon name="auto_awesome" size="xl" class="text-grey-7 q-mb-md" />
                <span class="text-grey-4 text-h6">Pronto</span>
                <span class="text-grey-6 text-caption">Vuelve en esta fecha para tu pronóstico.</span>
              </div>
            </template>

            <template v-else>
              <div class="column flex-center q-py-xl text-center">
                <q-icon name="hourglass_empty" size="xl" class="text-grey-7 q-mb-md" />
                <span class="text-grey-4 text-h6">Aún no hay lectura</span>
              </div>
            </template>

          </div>
        </div>

      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth.js";
import { converFecha, generarRangoFechas, obtenerEstadoLectura, resetearHoras } from "../utils/functions.js";
import secondButton from "../components/secondButton.vue"

const authStore = useAuthStore();
const { lecturasguardadas } = storeToRefs(authStore);


const lecturasDiarias = computed(() => {
  return (lecturasguardadas.value || []).filter(item => item.tipo === 'diaria');
});

const lecturaPrincipal = computed(() => {
  return (lecturasguardadas.value || []).find(item => item.tipo === 'principal') || null;
});

const fechaActualObj = resetearHoras(new Date());
const stringHoy = converFecha(fechaActualObj);

const fechaCentroCarrusel = ref(new Date(fechaActualObj));
const fechaSeleccionada = ref({ str: stringHoy, date: new Date(fechaActualObj) });

const fechasVisibles = computed(() => 
  generarRangoFechas(fechaCentroCarrusel.value, 2, stringHoy)
);

const lecturaActual = computed(() => {
  return lecturasDiarias.value.find(item => 
    converFecha(new Date(item.fechaLectura)) === fechaSeleccionada.value.str
  );
});


const estadoLectura = computed(() => 
  obtenerEstadoLectura(lecturaActual.value, fechaSeleccionada.value.date, fechaActualObj)
);

const moverCarrusel = (dias) => {
  const nuevaFecha = new Date(fechaCentroCarrusel.value);
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);
  fechaCentroCarrusel.value = nuevaFecha;
};

const seleccionarFecha = (dayObj) => {
  fechaSeleccionada.value = { str: dayObj.str, date: dayObj.date };
};

</script>

<style scoped>
@import url('../styles/dailyreading.css');
</style>