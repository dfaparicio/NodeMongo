<template>
  <q-layout view="lHh Lpr lFf" class="soul-reading-page font-display text-white overflow-hidden">
    <!-- FONDO CÓSMICO DINÁMICO -->
    <div class="fixed-full z-behind">
      <div class="absolute-full nebula-soft-glow"></div>
      <div class="absolute-full geometry-grid-soft opacity-20"></div>
    </div>

    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        
        <!-- ESTADO DE CARGA -->
        <div v-if="loading" class="column items-center animate-pulse">
          <q-spinner-orbit color="primary" size="80px" />
          <h2 class="text-h5 font-serif q-mt-xl tracking-widest opacity-70">SINCRONIZANDO CON EL COSMOS...</h2>
        </div>

        <!-- RESULTADO: ÉXITO (HORIZONTAL OPTIMIZADO) -->
        <div v-else-if="status === 'approved'" class="full-width max-w-lg-card animate-fade-in">
          <div class="glass-panel-premium-soft q-pa-xl relative-position overflow-hidden">
            <!-- Aura de fondo sutil -->
            <div class="absolute-center light-burst opacity-10"></div>

            <div class="relative-position z-top row q-col-gutter-xl items-center">
              
              <!-- COLUMNA 1: MENSAJE TRIUNFAL -->
              <div class="col-12 col-md-6 text-center border-right-glass-soft">
                <div class="icon-success-wrapper q-mb-lg mx-auto">
                  <q-icon name="done_all" size="40px" color="emerald" class="animate-pulse-slow" />
                </div>
                <div class="text-overline text-primary tracking-widest q-mb-xs">ALINEACIÓN COMPLETADA</div>
                <h1 class="text-h3 font-serif text-white q-ma-none text-bold tracking-tighter">¡ÉXITO!</h1>
                <p class="text-subtitle2 text-grey-5 q-mt-md font-light italic">
                  Tu frecuencia ha sido elevada.<br>El portal está abierto.
                </p>
                
                <div class="row q-gutter-x-sm justify-center q-mt-xl">
                  <q-btn unelevated label="ENTRAR AL PANEL" class="btn-success-action col" @click="irAlPanel" />
                </div>
              </div>

              <!-- COLUMNA 2: DETALLES DE TRANSACCIÓN -->
              <div class="col-12 col-md-6">
                <div class="details-box-premium q-pa-lg">
                  <div class="row items-center q-mb-md">
                    <q-icon name="auto_awesome" color="gold" size="xs" class="q-mr-sm" />
                    <span class="text-caption text-uppercase tracking-widest text-weight-bold">Ficha de Activación</span>
                  </div>

                  <div class="q-gutter-y-sm">
                    <div class="row justify-between">
                      <span class="text-grey-6 text-caption tracking-wider">PLAN:</span>
                      <span class="text-white text-weight-bold">{{ paymentDetails.descripcion }}</span>
                    </div>
                    <div class="row justify-between">
                      <span class="text-grey-6 text-caption tracking-wider">VENCE:</span>
                      <span class="text-gold text-weight-bold">{{ converFecha(paymentDetails.fechaExpiracion) }}</span>
                    </div>
                    <div v-if="paymentDetails.metodoPago" class="row justify-between">
                      <span class="text-grey-6 text-caption tracking-wider">MÉTODO:</span>
                      <span class="text-white text-weight-bold">{{ formatearMetodoPago(paymentDetails.metodoPago) }}</span>
                    </div>
                    <div v-if="paymentDetails.bancoEmisor" class="row justify-between">
                      <span class="text-grey-6 text-caption tracking-wider">BANCO:</span>
                      <span class="text-white text-weight-bold">{{ paymentDetails.bancoEmisor }}</span>
                    </div>
                    <div v-if="paymentDetails.ultimosDigitos && paymentDetails.ultimosDigitos !== 'N/A'" class="row justify-between">
                      <span class="text-grey-6 text-caption tracking-wider">TARJETA:</span>
                      <span class="text-white text-weight-bold">**** {{ paymentDetails.ultimosDigitos }}</span>
                    </div>
                    <div v-if="paymentDetails.pagadorNombreCompleto" class="row justify-between">
                      <span class="text-grey-6 text-caption tracking-wider">TITULAR:</span>
                      <span class="text-white text-weight-bold">{{ paymentDetails.pagadorNombreCompleto }}</span>
                    </div>
                    <q-separator dark class="q-my-sm opacity-10" />
                    <div class="row justify-between items-end q-mt-sm">
                      <span class="text-grey-6 text-caption tracking-wider">TOTAL:</span>
                      <span class="text-h5 text-white text-weight-bolder">{{ formatoPesos(paymentDetails.monto) }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="text-center q-mt-lg">
                  <q-btn flat no-caps dense label="Descargar Comprobante PDF" color="grey-5" class="opacity-60 hover-opacity-100" @click="onDownloadInvoice" icon="download" />
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- RESULTADO: FALLO (Compacto) -->
        <div v-else class="full-width max-w-sm-card animate-fade-in">
          <div class="glass-panel-premium-soft q-pa-xl text-center border-red-soft">
            <q-icon name="error_outline" size="50px" color="red-4" class="q-mb-lg" />
            <h1 class="text-h4 font-serif text-white q-ma-none text-bold">FLUJO INTERRUMPIDO</h1>
            <p class="text-grey-5 q-mt-md">No se pudo procesar la transacción.</p>
            <div class="row q-gutter-x-md q-mt-xl">
              <q-btn unelevated label="REINTENTAR" class="btn-error-action col" to="/planes" />
              <q-btn flat label="VOLVER" color="grey-6" class="col" @click="irAlPanel" />
            </div>
          </div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { verificarPago } from '../services/mercadopago.js';
import { useAuthStore } from '../store/auth.js';
import { converFecha, formatoPesos, generarFactura } from '../utils/functions.js';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);
const status = ref('');
const paymentDetails = ref({
  id: '',
  monto: 0,
  fecha: '',
  descripcion: '',
  fechaExpiracion: '',
  metodoPago: '',
  bancoEmisor: '',
  ultimosDigitos: '',
  pagadorNombreCompleto: '',
  fechaAprobacion: new Date()
});

const irAlPanel = () => {
  router.push('/perfil');
};

const onDownloadInvoice = () => {
  generarFactura({
    fecha: paymentDetails.value.fechaAprobacion || new Date(),
    monto: paymentDetails.value.monto,
    mpPaymentId: paymentDetails.value.id,
    descripcion: paymentDetails.value.descripcion,
    metodoPago: paymentDetails.value.metodoPago,
    bancoEmisor: paymentDetails.value.bancoEmisor,
    ultimosDigitos: paymentDetails.value.ultimosDigitos,
    pagadorNombreCompleto: paymentDetails.value.pagadorNombreCompleto
  }, authStore.user?.nombre);
};

onMounted(async () => {
  const paymentId = route.query.payment_id;
  if (paymentId) {
    try {
      const res = await verificarPago(paymentId);
      status.value = res.status;
      if (res.success && res.status === 'approved') {
        paymentDetails.value = {
          id: paymentId,
          monto: res.detalles?.monto || 0,
          descripcion: res.pago?.descripcion || 'Suscripción Premium',
          fechaExpiracion: res.usuario?.fechaExpiracion,
          metodoPago: res.detalles?.metodoPago || '',
          bancoEmisor: res.detalles?.bancoEmisor || '',
          ultimosDigitos: res.detalles?.ultimosDigitos || '',
          pagadorNombreCompleto: res.detalles?.pagadorNombreCompleto || '',
          fechaAprobacion: res.detalles?.fechaAprobacion || new Date()
        };
        if (res.usuario) authStore.user = res.usuario;
        if (res.lecturas) authStore.lecturasguardadas = res.lecturas;
        if (res.pagos) authStore.pagosUsuario = res.pagos;

        // REDIRECCIÓN AUTOMÁTICA AL PERFIL DESPUÉS DE 6 SEGUNDOS
        setTimeout(() => {
          if (status.value === 'approved') {
            irAlPanel();
          }
        }, 6000);
      }
    } catch (e) {
      status.value = 'error';
    } finally {
      loading.value = false;
    }
  } else {
    status.value = route.query.status || 'pending';
    loading.value = false;
  }
});

// Función para formatear el nombre del método de pago
const formatearMetodoPago = (metodo) => {
  const metodos = {
    'credit_card': 'Tarjeta de Crédito',
    'debit_card': 'Tarjeta de Débito',
    'pse': 'PSE',
    'bank_transfer': 'Transferencia Bancaria',
    'atm': 'Cajero Automático',
    'ticket': 'Efectivo',
    'pix': 'PIX',
    'yape': 'Yape',
    'mercadopagoaccount': 'Cuenta Mercado Pago'
  };
  return metodos[metodo] || metodo.toUpperCase();
};
</script>

<style scoped>
@import url('../styles/payment-result.css');
</style>
