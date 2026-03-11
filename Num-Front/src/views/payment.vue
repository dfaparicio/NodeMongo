<template>
  <q-layout view="lHh Lpr lFf" class="cosmic-checkout font-display text-white overflow-x-hidden">
    <!-- Fondo Cósmico -->
    <div class="fixed-full z-behind">
      <div class="absolute-full bg-cosmic-main"></div>
      <div class="glow-orb top-left bg-primary-10"></div>
      <div class="glow-orb bottom-right bg-primary-5"></div>
      <div class="stars-overlay"></div>
    </div>

    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card flat class="glass-panel-light q-pa-xl text-center shadow-2xl rounded-2xl max-width-form mx-auto">
          
          <!-- Encabezado de Resumen -->
          <div class="q-mb-xl">
            <q-icon name="shopping_cart" color="primary" size="4em" class="q-mb-md" />
            <h1 class="text-h4 text-bold text-white q-mb-sm">Resumen de tu Pedido</h1>
            <p class="text-grey-5">Estás a un paso de desbloquear tu destino cósmico.</p>
          </div>

          <!-- Detalles del Plan -->
          <div class="order-details q-pa-lg q-mb-xl border-primary-10 rounded-xl bg-primary-5">
            <div class="row justify-between items-center q-mb-md">
              <span class="text-grey-4 text-subtitle1">Plan Seleccionado:</span>
              <span class="text-white text-h6 text-bold">{{ tituloPlan }}</span>
            </div>
            <q-separator dark class="q-my-md opacity-20" />
            <div class="row justify-between items-center">
              <span class="text-grey-4 text-h6">Total a Pagar:</span>
              <span class="text-primary text-h4 text-bold">${{ monto }}</span>
            </div>
          </div>

          <!-- Botón de Mercado Pago -->
          <div class="q-gutter-y-md">
            <q-btn 
              unelevated 
              class="full-width checkout-btn q-py-lg group" 
              rounded 
              :loading="loading" 
              @click="iniciarPago"
            >
              <div class="row items-center q-gutter-x-md">
                <q-icon name="payments" size="sm" />
                <span class="text-h6 text-bold text-uppercase tracking-wide">Pagar con Mercado Pago</span>
              </div>
            </q-btn>

            <p class="text-caption text-grey-7 q-mt-md">
              <q-icon name="lock" color="positive" class="q-mr-xs" />
              Serás redirigido a la plataforma segura de Mercado Pago.
            </p>
          </div>

          <!-- Enlace para volver -->
          <div class="q-mt-xl">
            <q-btn flat color="grey-5" label="Cambiar de plan" to="/planes" no-caps />
          </div>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { crearPreferenciaPago } from '../services/mercadopago.js';
import { useAuthStore } from '../store/auth.js';

const route = useRoute();
const authStore = useAuthStore();
const loading = ref(false);
const monto = ref(0);
const tituloPlan = ref('Cargando plan...');

onMounted(() => {
  if (route.query.monto) monto.value = Number(route.query.monto);
  if (route.query.titulo) tituloPlan.value = route.query.titulo;
});

const iniciarPago = async () => {
  loading.value = true;
  try {
    const response = await crearPreferenciaPago(monto.value, tituloPlan.value);
    
    if (response.success) {
      // ACTIVACIÓN LOCAL INSTANTÁNEA
      if (authStore.user) {
        authStore.user.estado = 1;
        console.log("✅ Estado de usuario actualizado localmente a 1");
      }

      const redirectUrl = response.sandbox_init_point || response.init_point;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }
  } catch (error) {
    console.error("Error al iniciar pago:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('../styles/payment.css');

.order-details {
  background: rgba(var(--q-primary), 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.checkout-btn {
  background: linear-gradient(45deg, #009ee3, #007eb5);
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 158, 227, 0.3);
}
</style>
