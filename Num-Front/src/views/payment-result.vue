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
        <q-card flat class="glass-panel-light q-pa-xl text-center shadow-2xl rounded-2xl max-width-form mx-auto">
          <div v-if="loading" class="q-gutter-md text-center">
            <q-spinner-orbit color="primary" size="4em" />
            <div class="text-h5 text-bold q-mt-md">Verificando tu pago...</div>
          </div>

          <div v-else>
            <div v-if="status === 'approved'">
              <q-icon name="check_circle" color="positive" size="6em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">¡Pago Exitoso!</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                Tu suscripción ha sido activada correctamente. Ya puedes disfrutar de todo el contenido cósmico.
              </p>
              <q-btn unelevated color="primary" label="Ir a mi Dashboard" to="/perfil" class="q-px-xl q-py-md rounded-xl" />
            </div>

            <div v-else-if="status === 'pending' || status === 'in_process'">
              <q-icon name="hourglass_empty" color="warning" size="6em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">Pago en Proceso</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                Estamos esperando la confirmación de Mercado Pago. Esto puede tardar unos minutos.
              </p>
              <q-btn outline color="primary" label="Volver a Inicio" to="/perfil" class="q-px-xl q-py-md rounded-xl" />
            </div>

            <div v-else>
              <q-icon name="cancel" color="negative" size="6em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">Pago Fallido</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
              </p>
              <q-btn unelevated color="primary" label="Reintentar Pago" to="/pagos" class="q-px-xl q-py-md rounded-xl" />
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
import { verificarPago, getData } from '../services/services.js';
import { useAuthStore } from '../store/auth.js';

const route = useRoute();
const authStore = useAuthStore();
const loading = ref(true);
const status = ref('');

onMounted(async () => {
  const paymentId = route.query.payment_id;

  if (paymentId) {
    try {
      const response = await verificarPago(paymentId);
      status.value = response.status || 'rejected';

      // ACTUALIZACIÓN INMEDIATA: Usamos el usuario que ya viene activado desde el servidor
      if (status.value === 'approved' && response.usuario) {
        authStore.user = response.usuario;
        console.log("✅ Perfil sincronizado con éxito. Estado:", response.usuario.estado);
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
</style>
