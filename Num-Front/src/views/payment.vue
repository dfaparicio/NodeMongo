<template>
  <q-layout view="lHh Lpr lFf" class="soul-reading-page font-display text-white overflow-x-hidden">
    <!-- FONDO CÓSMICO DINÁMICO -->
    <div class="fixed-full z-behind">
      <div class="absolute-full nebula-soft-glow"></div>
      <div class="absolute-full geometry-grid-soft opacity-20"></div>
    </div>

    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        
        <!-- OVERLAY DE SINCRONIZACIÓN (POLLING) -->
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="pagoIniciado" class="fixed-full z-max flex flex-center checkout-overlay-premium">
            <div class="text-center q-pa-xl glass-panel-premium-soft rounded-3xl shadow-2xl border-gold-glow max-width-small">
              <q-spinner-orbit color="primary" size="6em" />
              <h2 class="text-h4 font-serif text-white q-mt-xl q-mb-md tracking-widest">TRANSMITIENDO FRECUENCIA</h2>
              <p class="text-grey-4 text-subtitle1 q-mb-xl font-light">
                Hemos abierto el Portal de Pago en una <span class="text-gold text-bold">nueva pestaña</span>.<br>
                Completa la transacción para activar tu conexión.
              </p>
              
              <div class="q-gutter-y-md">
                <div class="loader-bar-container-premium">
                  <div class="loader-bar-progress-gold"></div>
                </div>
                <p class="text-caption text-grey-6 italic">Sincronizando con los astros... No cierres esta ventana.</p>
                
                <q-btn 
                  flat 
                  color="grey-5" 
                  label="¿Cerraste la ventana? Haz clic aquí para reintentar" 
                  @click="pagoIniciado = false"
                  class="q-mt-lg opacity-50 hover-opacity-100"
                  no-caps
                />
              </div>
            </div>
          </div>
        </transition>

        <!-- TARJETA DE CONFIRMACIÓN PRINCIPAL -->
        <q-card v-if="!pagoIniciado" flat class="glass-panel-premium-soft q-pa-none shadow-2xl rounded-3xl max-width-large mx-auto overflow-hidden animate-fade-in">
          <div class="row items-stretch min-h-500">
            
            <!-- SECCIÓN ESTÉTICA (IZQUIERDA) -->
            <div class="col-12 col-md-6 q-pa-xl bg-gold-opacity-5 flex flex-center column border-right-glass">
              <div class="text-center">
                <div class="plan-icon-master q-mb-xl mx-auto">
                  <q-icon name="auto_awesome" color="primary" size="4em" class="animate-pulse-slow" />
                </div>
                <h1 class="text-h4 font-serif text-white q-ma-none tracking-widest">TU DESTINO AGUARDA</h1>
                <p class="text-grey-5 q-mt-md font-light text-subtitle2">Preparando activación para el plan:</p>
                
                <div class="q-mt-xl plan-name-display q-pa-lg">
                  <div class="text-overline text-gold-soft tracking-widest">FRECUENCIA ELEGIDA</div>
                  <div class="text-h4 font-serif text-white text-bold">{{ tituloPlan.toUpperCase() }}</div>
                </div>

                <div class="row justify-center q-mt-xl opacity-60">
                  <div class="row items-center q-gutter-x-md">
                    <q-icon name="verified" color="primary" size="xs" />
                    <span class="text-caption tracking-widest">ACCESO TOTAL INMEDIATO</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- SECCIÓN DE ACCIÓN (DERECHA) -->
            <div class="col-12 col-md-6 q-pa-xl flex flex-center column bg-glass-dark">
              <div class="full-width text-center">
                <div class="text-subtitle1 text-grey-5 q-mb-xs tracking-widest">INVERSIÓN TOTAL</div>
                <div class="text-h2 font-serif text-white text-bold q-mb-xl text-shadow-gold">{{ formatoPesos(monto) }}</div>

                <div class="q-gutter-y-lg">
                  <q-btn 
                    unelevated 
                    class="full-width btn-checkout-master q-py-lg" 
                    rounded 
                    :loading="loading" 
                    @click="procesarPago"
                  >
                    <div class="row items-center justify-center q-gutter-x-md">
                      <q-icon name="payment" size="sm" />
                      <span class="text-h6 text-bold text-uppercase tracking-widest">PAGAR</span>
                    </div>
                  </q-btn>

                  <div class="row items-center justify-center q-gutter-x-sm q-mt-md text-grey-7">
                    <q-icon name="security" size="xs" />
                    <span class="text-caption font-light">Pago Encriptado y Seguro vía Mercado Pago</span>
                  </div>
                </div>

                <div class="q-mt-xl">
                  <q-btn flat color="grey-6" label="CAMBIAR FRECUENCIA" to="/planes" no-caps icon="arrow_back" class="opacity-70 hover-opacity-100" />
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { crearPreferenciaPago, consultarEstadoPago } from '../services/mercadopago.js';
import { useAuthStore } from '../store/auth.js';
import { formatoPesos, converFecha } from '../utils/functions.js';
import { showNotify } from '../utils/notify.js';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const pagoIniciado = ref(false);
const monto = ref(0);
const tituloPlan = ref('Cargando plan...');
const authStore = useAuthStore();
let pollingInterval = null;

onMounted(() => {
  if (authStore.user?.estado === 1) {
    showNotify.warning('Conexión Activa', 'Ya posees una alineación estelar vigente.');
    router.push('/perfil');
    return;
  }
  if (route.query.monto) monto.value = Number(route.query.monto);
  if (route.query.titulo) tituloPlan.value = route.query.titulo;
});

onUnmounted(() => { if (pollingInterval) clearInterval(pollingInterval); });

const iniciarSondeo = (preferenceId) => {
  if (pollingInterval) clearInterval(pollingInterval);
  pollingInterval = setInterval(async () => {
    try {
      const res = await consultarEstadoPago(preferenceId);
      if (res.success && res.estado === 'aprobado') {
        clearInterval(pollingInterval);
        pagoIniciado.value = false;
        showNotify.success('Frecuencia Alineada', '¡Transmisión completada con éxito! ✨');
        router.push({ path: '/pagos/exito', query: { payment_id: res.pagoId, status: 'approved' } });
      } 
      else if (res.success && res.estado === 'rechazado') {
        clearInterval(pollingInterval);
        pagoIniciado.value = false;
        showNotify.error('Transmisión Fallida', 'Los astros no pudieron completar la transacción. Intenta de nuevo.');
      }
    } catch (e) { console.error("Sondeo error:", e); }
  }, 3000); 
};

const procesarPago = async () => {
  loading.value = true;
  try {
    const response = await crearPreferenciaPago(monto.value, tituloPlan.value);
    if (response.success && response.id) {
      const checkoutUrl = response.init_point;
      
      // Activar overlay de transición
      pagoIniciado.value = true;
      
      // Esperar un momento para que el usuario vea el mensaje de "Transmitiendo Frecuencia"
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 1500);
    }
  } catch (error) {
    showNotify.error('Algo salió mal', 'No se pudo conectar con el portal de pago.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('../styles/payment.css');
</style>
