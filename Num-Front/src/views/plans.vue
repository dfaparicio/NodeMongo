<template>
  <q-page class="soul-reading-page font-display text-white overflow-x-hidden column no-wrap">
    <!-- FONDO CÓSMICO -->
    <div class="fixed-full z-behind">
      <div class="absolute-full nebula-soft-glow"></div>
      <div class="absolute-full geometry-grid-soft opacity-20"></div>
    </div>

    <!-- NAVEGACIÓN SUPERIOR -->
    <nav class="relative-position z-top full-width q-px-xl q-py-lg flex justify-between items-center shrink-0">
      <div class="flex items-center q-gutter-x-md">
        <q-icon name="auto_awesome" color="primary" size="24px" class="opacity-50" />
        <span class="text-caption text-uppercase tracking-widest text-white-50" style="letter-spacing: 4px;">Numeris Astral</span>
      </div>
      <q-btn flat no-caps color="grey-5" to="/perfil" class="btn-back-ethereal">
        <q-icon name="keyboard_backspace" size="xs" class="q-mr-sm" />
        VOLVER AL PANEL
      </q-btn>
    </nav>

    <!-- CONTENEDOR DE PLANES -->
    <div class="col flex flex-center">
      <div class="container z-top q-py-xl mx-auto" style="width: 100%; max-width: 1400px;">
        
        <div class="text-center q-mb-xl">
          <h1 class="text-h2 text-weight-bold text-white q-ma-none font-serif tracking-widest text-uppercase">Niveles de Conexión</h1>
          <p class="text-subtitle1 text-grey-5 q-mt-md font-light">Tu vibración actual determina tu acceso a la sabiduría del portal.</p>
        </div>

        <div class="row q-col-gutter-lg justify-center items-stretch">
          
          <!-- PLAN GRATUITO: EL DESTELLO -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="plan-card-premium column q-pa-lg h-full" :class="{ 'plan-active-color': esPlanActual(0), 'plan-inactive-gray': !esPlanActual(0) }">
              <div class="text-center">
                <div class="plan-icon-wrapper q-mb-md mx-auto">
                  <q-icon :name="esPlanActual(0) ? 'wb_twilight' : 'lock_open'" size="32px" :color="esPlanActual(0) ? 'primary' : 'grey-7'" />
                </div>
                <div class="text-overline tracking-widest q-mb-xs">INICIACIÓN</div>
                <h2 class="text-h5 font-serif text-white q-ma-none">EL DESTELLO</h2>
                <div class="text-h4 font-serif q-my-md">$ 0</div>
              </div>
              <q-separator dark class="q-my-md opacity-10" />
              <q-list dense dark class="q-gutter-y-sm q-py-md">
                <q-item v-for="item in ['Lectura Diaria Simple', 'Perfil Base', 'Dashboard Básico']" :key="item">
                  <q-item-section avatar><q-icon name="check" size="12px"/></q-item-section>
                  <q-item-section class="text-caption">{{ item }}</q-item-section>
                </q-item>
              </q-list>
              <q-space />
              <div class="status-label-bot text-center q-pt-md">
                <span v-if="esPlanActual(0)" class="text-primary text-bold text-caption tracking-widest animate-pulse">FRECUENCIA ACTUAL</span>
                <q-btn v-else flat label="NIVEL SUPERADO" class="full-width opacity-40" disabled />
              </div>
            </div>
          </div>

          <!-- PLAN MENSUAL -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="plan-card-premium column q-pa-lg h-full" :class="{ 'plan-active-color': esPlanActual(50000), 'plan-inactive-gray': tienePlanPago && !esPlanActual(50000) }">
              <div class="text-center">
                <div class="plan-icon-wrapper q-mb-md mx-auto">
                  <q-icon :name="esPlanActual(50000) ? 'stars' : 'bolt'" size="32px" :color="esPlanActual(50000) ? 'primary' : 'grey-7'" />
                </div>
                <div class="text-overline tracking-widest q-mb-xs">SINTONÍA</div>
                <h2 class="text-h5 font-serif text-white q-ma-none">MENSUAL</h2>
                <div class="text-h4 font-serif q-my-md">{{ formatoPesos(50000) }}</div>
              </div>
              <q-separator dark class="q-my-md opacity-10" />
              <q-list dense dark class="q-gutter-y-sm q-py-md">
                <q-item v-for="item in ['Lectura Diaria Profunda', 'ADN Cósmico Completo', 'Rituales de Activación']" :key="item">
                  <q-item-section avatar><q-icon name="auto_awesome" size="12px"/></q-item-section>
                  <q-item-section class="text-caption">{{ item }}</q-item-section>
                </q-item>
              </q-list>
              <q-space />
              <q-btn v-if="!tienePlanPago" unelevated label="ACTIVAR FRECUENCIA" class="btn-plan-action full-width" @click="seleccionarPlan(50000, 'Suscripción Mensual')" />
              <div v-else-if="esPlanActual(50000)" class="status-label-bot text-center q-pt-md">
                <span class="text-primary text-bold text-caption tracking-widest animate-pulse">FRECUENCIA ACTUAL</span>
              </div>
              <q-btn v-else flat icon="lock" label="BLOQUEADO" class="full-width opacity-40" disabled />
            </div>
          </div>

          <!-- PLAN SEMESTRAL -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="plan-card-premium column q-pa-lg h-full" :class="{ 'plan-active-color': esPlanActual(240000), 'plan-inactive-gray': tienePlanPago && !esPlanActual(240000) }">
              <div class="plan-badge-top" v-if="!tienePlanPago">AHORRA 20%</div>
              <div class="text-center">
                <div class="plan-icon-wrapper q-mb-md mx-auto">
                  <q-icon :name="esPlanActual(240000) ? 'diamond' : 'bolt'" size="32px" :color="esPlanActual(240000) ? 'primary' : 'grey-7'" />
                </div>
                <div class="text-overline tracking-widest q-mb-xs">CONSOLIDACIÓN</div>
                <h2 class="text-h5 font-serif text-white q-ma-none">SEMESTRAL</h2>
                <div class="text-h4 font-serif q-my-md">{{ formatoPesos(240000) }}</div>
              </div>
              <q-separator dark class="q-my-md opacity-10" />
              <q-list dense dark class="q-gutter-y-sm q-py-md">
                <q-item v-for="item in ['Todo lo Mensual', 'Compatibilidad Kármica', 'Reporte Mensual PDF']" :key="item">
                  <q-item-section avatar><q-icon name="auto_awesome" size="12px"/></q-item-section>
                  <q-item-section class="text-caption">{{ item }}</q-item-section>
                </q-item>
              </q-list>
              <q-space />
              <q-btn v-if="!tienePlanPago" unelevated label="ACTIVAR FRECUENCIA" class="btn-plan-action full-width" @click="seleccionarPlan(240000, 'Suscripción Semestral')" />
              <div v-else-if="esPlanActual(240000)" class="status-label-bot text-center q-pt-md">
                <span class="text-primary text-bold text-caption tracking-widest animate-pulse">FRECUENCIA ACTUAL</span>
              </div>
              <q-btn v-else flat icon="lock" label="BLOQUEADO" class="full-width opacity-40" disabled />
            </div>
          </div>

          <!-- PLAN ANUAL -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="plan-card-premium plan-highlighted column q-pa-lg h-full" :class="{ 'plan-active-color': esPlanActual(420000), 'plan-inactive-gray': tienePlanPago && !esPlanActual(420000) }">
              <div class="plan-badge-top" v-if="!tienePlanPago">FRECUENCIA MAESTRA</div>
              <div class="text-center">
                <div class="plan-icon-wrapper highlighted-icon q-mb-md mx-auto">
                  <q-icon :name="esPlanActual(420000) ? 'auto_awesome' : 'bolt'" size="32px" :color="esPlanActual(420000) ? 'gold' : 'grey-7'" />
                </div>
                <div class="text-overline tracking-widest q-mb-xs">PREMIUM TOTAL</div>
                <h2 class="text-h5 font-serif text-white q-ma-none">ANUAL</h2>
                <div class="text-h4 font-serif q-my-md">{{ formatoPesos(420000) }}</div>
              </div>
              <q-separator dark class="q-my-md opacity-20" />
              <q-list dense dark class="q-gutter-y-sm q-py-md">
                <q-item v-for="item in ['Análisis Familiares', 'Consultas IA Ilimitadas', 'Soporte Prioritario']" :key="item">
                  <q-item-section avatar><q-icon name="auto_awesome" size="12px"/></q-item-section>
                  <q-item-section class="text-caption">{{ item }}</q-item-section>
                </q-item>
              </q-list>
              <q-space />
              <q-btn v-if="!tienePlanPago" unelevated label="ELEVAR AL MÁXIMO" class="btn-plan-highlight full-width" @click="seleccionarPlan(420000, 'Suscripción Anual')" />
              <div v-else-if="esPlanActual(420000)" class="status-label-bot text-center q-pt-md">
                <span class="text-primary text-bold text-caption tracking-widest animate-pulse">FRECUENCIA ACTUAL</span>
              </div>
              <q-btn v-else flat icon="lock" label="BLOQUEADO" class="full-width opacity-40" disabled />
            </div>
          </div>

        </div>

        <div class="text-center q-mt-xl text-grey-7 text-caption font-light">
          <q-icon name="security" size="xs" class="q-mr-xs" /> Conexión encriptada vía Mercado Pago.
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../store/auth.js';
import { getData } from '../services/services.js';
import { converFecha, formatoPesos } from '../utils/functions.js';

const router = useRouter();
const authStore = useAuthStore();

// Refrescar pagos al entrar para asegurar que el estado es real
onMounted(async () => {
  if (authStore.user?._id) {
    try {
      const resPagos = await getData(`/pago/${authStore.user._id}`);
      authStore.setPagosUsuario(Array.isArray(resPagos) ? resPagos : []);
    } catch (error) {
      console.error("Error al refrescar pagos:", error);
    }
  }
});

// Determina si el usuario tiene algún plan de pago activo basado en su estado
const tienePlanPago = computed(() => {
  // Si el estado es 1, el usuario tiene un plan activo y bloqueamos los demás
  return authStore.user?.estado === 1;
});

// Función inteligente para determinar cuál es el plan actual del usuario
const esPlanActual = (montoPlan) => {
  // Si el usuario no tiene plan de pago activo (estado 0), el único plan actual es el Gratuito (monto 0)
  if (authStore.user?.estado === 0) {
    return montoPlan === 0;
  }

  // Si el estado es 1, buscamos cuál de los planes de pago tiene activo basándonos en el último pago aprobado
  const pagos = authStore.pagosUsuario || [];
  // Ordenar por fecha descendente para obtener el más reciente
  const pagosOrdenados = [...pagos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const ultimoPagoAprobado = pagosOrdenados.find(p => p.estado === 'aprobado');
  
  if (!ultimoPagoAprobado) {
    // Si tiene estado 1 pero no hay pagos registrados, por defecto asumimos el mensual si el monto coincide
    return montoPlan === 50000; 
  }

  // Comparamos el monto del último pago con el monto del plan de la tarjeta
  // Usamos un margen de error pequeño por decimales si los hubiera
  return Math.abs(ultimoPagoAprobado.monto - montoPlan) < 10;
};

const seleccionarPlan = (monto, titulo) => {
  router.push({ path: '/pagos', query: { monto, titulo } });
};
</script>

<style scoped>
@import url('../styles/plans.css');
</style>
