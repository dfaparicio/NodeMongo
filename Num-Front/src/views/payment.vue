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
                Hemos abierto el Portal de Pago en una <span class="text-gold text-bold">nueva pestaña</span> o ventana.<br>
                Completa la transacción para activar tu conexión.
              </p>

              <div class="q-gutter-y-md">
                <div class="loader-bar-container-premium">
                  <div class="loader-bar-progress-gold"></div>
                </div>
                <p class="text-caption text-grey-6 italic">Verificando estado del pago... No cierres esta ventana.</p>

                <q-btn
                  flat
                  color="grey-5"
                  label="¿No se abrió la ventana? Haz clic aquí"
                  @click="reabrirPagos"
                  class="q-mt-lg opacity-50 hover-opacity-100"
                  no-caps
                  icon="open_in_new"
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
const preferenceId = ref('');
const paymentUrl = ref(''); // Guardar el URL de pago
let pollingInterval = null;

onMounted(() => {
  if (authStore.user?.estado === 1) {
    showNotify.warning('Conexión Activa', 'Ya posees una alineación estelar vigente.');
    router.push('/perfil');
    return;
  }
  if (route.query.monto) monto.value = Number(route.query.monto);
  if (route.query.titulo) tituloPlan.value = route.query.titulo;

  // Verificar si viene de un pago en proceso (para polling)
  if (route.query.preference_id) {
    preferenceId.value = route.query.preference_id;
    pagoIniciado.value = true;
    iniciarPolling(route.query.preference_id);
  }
});

onUnmounted(() => { if (pollingInterval) clearInterval(pollingInterval); });

// Función de polling para verificar el estado del pago
const iniciarPolling = async (prefId) => {
  let intentos = 0;
  const maxIntentos = 120; // 2 minutos máximo (1 segundo x 120)

  pollingInterval = setInterval(async () => {
    intentos++;

    if (intentos > maxIntentos) {
      clearInterval(pollingInterval);
      pagoIniciado.value = false;
      showNotify.warning('Tiempo Agotado', 'El pago está tomando más tiempo de lo esperado. Revisa tu correo.');
      router.push('/planes');
      return;
    }

    try {
      const resultado = await consultarEstadoPago(prefId);
      if (resultado.success && resultado.estado === 'aprobado') {
        clearInterval(pollingInterval);
        pagoIniciado.value = false;

        // Redirigir AMBAS ventanas a la página de resultado usando window.location.href
        // Esto asegura que tanto la página principal como la ventana nueva del pago se redirijan
        if (resultado.paymentId) {
          console.log('✅ Pago aprobado, redirigiendo a resultado en todas las ventanas...');
          window.location.href = `/#/pagos/exito?payment_id=${resultado.paymentId}`;
        }
      }
    } catch (error) {
      console.error('Error en polling:', error);
    }
  }, 2000); // Verificar cada 2 segundos
};

const procesarPago = async () => {
  loading.value = true;
  try {
    const response = await crearPreferenciaPago(monto.value, tituloPlan.value);
    if (response.success && response.id) {
      preferenceId.value = response.id;
      paymentUrl.value = response.init_point;
      pagoIniciado.value = true;

      // Abrir Mercado Pago en una nueva ventana
      const paymentWindow = window.open(response.init_point, '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');

      if (!paymentWindow) {
        // Si el navegador bloquea el popup, mostrar mensaje
        showNotify.warning('Ventana Bloqueada', 'Por favor permite las ventanas emergentes o haz clic en el botón de reintentar.');
        pagoIniciado.value = false;
      } else {
        // Iniciar polling para verificar el estado del pago
        iniciarPolling(response.id);
      }
    }
  } catch (error) {
    showNotify.error('Algo salió mal', 'No se pudo conectar con el portal de pago.');
    pagoIniciado.value = false;
  } finally {
    loading.value = false;
  }
};

// Función para reabrir la ventana de pago si no se abrió
const reabrirPagos = () => {
  if (paymentUrl.value) {
    window.open(paymentUrl.value, '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
  }
};
</script>

<style scoped>
@import url('../styles/payment.css');
</style>
