<template>
  <q-layout view="lHh Lpr lFf" class="cosmic-checkout font-display text-white overflow-x-hidden">
    <div class="fixed-full z-behind">
      <div class="absolute-full bg-cosmic-main"></div>
      <div class="glow-orb top-left bg-primary-10"></div>
      <div class="glow-orb bottom-right bg-primary-5"></div>
      <div class="stars-overlay"></div>
    </div>

    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card flat class="glass-panel-light q-pa-lg text-center shadow-2xl rounded-2xl max-width-receipt mx-auto">
          <div v-if="loading" class="q-gutter-md text-center q-pa-xl">
            <q-spinner-orbit color="primary" size="4em" />
            <div class="text-h5 text-bold q-mt-md">Verificando tu pago...</div>
          </div>

          <div v-else>
            <!-- ESTADO APROBADO -->
            <div v-if="status === 'approved'">
              <q-icon name="check_circle" color="positive" size="5em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-xs">¡Pago Exitoso!</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-lg">Tu suscripción ha sido activada correctamente.</p>

              <!-- RECIBO DETALLADO -->
              <div class="receipt-box q-pa-md q-mb-xl text-left rounded-lg bg-dark-opacity">
                <div class="text-overline text-primary q-mb-sm">Detalles de la Transacción</div>
                <div class="row justify-between q-mb-xs">
                  <span class="text-grey-5">ID de Pago:</span>
                  <span class="text-weight-bold text-white">{{ paymentDetails.id }}</span>
                </div>
                <div class="row justify-between q-mb-xs">
                  <span class="text-grey-5">Monto:</span>
                  <span class="text-weight-bold text-white">${{ formatMonto(paymentDetails.monto) }} COP</span>
                </div>
                <div class="row justify-between q-mb-xs">
                  <span class="text-grey-5">Fecha:</span>
                  <span class="text-weight-bold text-white">{{ formatFecha(paymentDetails.fecha) }}</span>
                </div>
                <div class="row justify-between q-mb-xs">
                  <span class="text-grey-5">Método:</span>
                  <span class="text-weight-bold text-white text-uppercase">{{ paymentDetails.metodo }}</span>
                </div>
                <div class="row justify-between border-top-dashed q-pt-sm q-mt-sm">
                  <span class="text-grey-5">Descripción:</span>
                  <span class="text-weight-bold text-primary">{{ paymentDetails.descripcion || 'Plan Numerología' }}</span>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-btn outline color="white" label="Ver mis Planes" to="/planes" class="full-width q-py-md rounded-xl" />
                </div>
                <div class="col-12 col-sm-6">
                  <q-btn unelevated color="primary" label="Ir a mi Dashboard" to="/perfil" class="full-width q-py-md rounded-xl" />
                </div>
              </div>
            </div>

            <!-- ESTADO PENDIENTE -->
            <div v-else-if="status === 'pending' || status === 'in_process'">
              <q-icon name="hourglass_empty" color="warning" size="5em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">Pago en Proceso</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                Estamos esperando la confirmación de Mercado Pago. Esto puede tardar unos minutos. Te avisaremos por correo.
              </p>
              <q-btn unelevated color="primary" label="Entendido" to="/perfil" class="q-px-xl q-py-md rounded-xl" />
            </div>

            <!-- ESTADO FALLIDO -->
            <div v-else>
              <q-icon name="cancel" color="negative" size="5em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">Pago no Completado</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                No pudimos procesar tu pago en este momento. Si se realizó un cobro, por favor contacta a soporte.
              </p>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-btn outline color="white" label="Volver a Inicio" to="/perfil" class="full-width q-py-md rounded-xl" />
                </div>
                <div class="col-12 col-sm-6">
                  <q-btn unelevated color="primary" label="Reintentar Pago" to="/pagos" class="full-width q-py-md rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { verificarPago } from '../services/services.js';
import { useAuthStore } from '../store/auth.js';

const route = useRoute();
const authStore = useAuthStore();
const loading = ref(true);
const status = ref('');
const paymentDetails = ref({
  id: '',
  monto: 0,
  fecha: '',
  metodo: '',
  descripcion: ''
});

const formatMonto = (monto) => {
  return new Intl.NumberFormat('es-CO').format(monto);
};

const formatFecha = (fecha) => {
  if (!fecha) return 'Reciente';
  return new Date(fecha).toLocaleString('es-CO');
};

onMounted(async () => {
  const paymentId = route.query.payment_id;

  if (paymentId) {
    try {
      const response = await verificarPago(paymentId);
      status.value = response.status || 'rejected';

      if (status.value === 'approved') {
        // Guardamos los detalles del recibo
        if (response.detalles) {
          paymentDetails.value = response.detalles;
        }
        
        // Actualizamos el usuario en el store global
        if (response.usuario) {
          authStore.user = response.usuario;
          console.log("✅ Suscripción activada. Usuario actualizado.");
        }
      }
    } catch (error) {
      console.error("Error al verificar pago:", error);
      status.value = 'error';
    } finally {
      loading.value = false;
    }
  } else {
    // Si no hay ID, revisamos si viene status directo
    status.value = route.query.status || 'rejected';
    loading.value = false;
  }
});
</script>

<style scoped>
@import url('../styles/payment.css');

.max-width-receipt {
  max-width: 500px;
  width: 100%;
}

.bg-dark-opacity {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.border-top-dashed {
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
}

.receipt-box {
  backdrop-filter: blur(5px);
}
</style>
