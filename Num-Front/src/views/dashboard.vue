<template>
  <q-page class="cosmic-bg font-display min-h-screen row text-white overflow-hidden">

    <div class="fixed-full z-behind opacity-20 pointer-events-none">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDURC83wQPs436yjmwbq85kbDNxgA5yFl3ZccQmAnhmP1L1d7Cdy3QDi7PYKn3e9t5sczTCQMUSi6-Lo3IKEt-Tka66pve3m3VoE7oPoo2F2cF1pA0gCAuF8263SJwHkP6nIqlJRV8TRQ0V0I2awEHdf7rZBTMTRivLL-zyR80jG5DUdosAFnIwfN5aZubQqF26PbAY64tRdve7DRaRKfIfICvs1PQIRGm9sBwqRomUIsFKGeDbfnfARX9B9xlCraeE8VgDRcRbvKEV"
        class="fit object-cover" />
    </div>

    <div class="col-12 col-md-4 fixed flex flex-center column q-pa-xl border-right-cosmic"
      style="top: 0; left: 0; height: 100vh; width: 33.3333%; z-index: 100;">

      <div class="absolute nebula-glow nebula-1" style="z-index: 1;"></div>
      <div class="absolute nebula-glow nebula-2" style="z-index: 1;"></div>

      <div class="relative-position flex flex-center column" style="z-index: 10;">

        <div class="avatar-wrapper q-mb-lg relative-position" style="width: 200px; height: 200px;">
          <div class="absolute-full animate-pulse flex flex-center">
            <svg class="w-full h-full svg-primary-opacity" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="none" r="90" stroke="currentColor" stroke-width="0.5"></circle>
              <polygon fill="none" points="100,10 190,160 10,160" stroke="currentColor" stroke-width="0.5"></polygon>
              <polygon fill="none" points="100,190 190,40 10,40" stroke="currentColor" stroke-width="0.5"></polygon>
            </svg>
          </div>
          <div class="pulse-indicator absolute"></div>
        </div>

        <h1 class="text-h4 text-weight-bolder text-gradient-title text-center q-mb-xs q-pb-xl tracking-tighter">
          {{ user?.nombre || 'Buscador Cósmico' }}
        </h1>

        <div class="badge-frecuencia flex column items-center q-gutter-x-sm">
          <span class="text-white"> <q-icon name="auto_awesome" color="primary" size="sm" /> Numero de Camino de
            Vida</span>
          <br>
          <span class="text-white text-h5">{{ lecturaPrincipal?.contenido?.numero }}</span>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-4 gt-sm"></div>

    <div class="col-12 col-md-8 relative-position q-pa-xl scroll-y" style="z-index: 1;">

      <router-view />

      <div class="fixed-top" style="left: 33.3333%; right: 0; z-index: 999;">
        <div class="flex justify-center">
          <div class="glass-panel2 rounded-xl q-pa-md full-width">
            <div
              class="flex no-wrap justify-center items-center q-gutter-x-sm sm:q-gutter-x-md q-pt-xl q-pb-xl overflow-auto scroll-none">
              <secondButton to="/lectura_principal" label="Lectura Principal" class="nav-gold-item" />
              <secondButton to="/lectura_diaria" label="Lectura Diaria" class="nav-gold-item" />
              <secondButton to="/planes" label="Planes" class="nav-gold-item" />
              <secondButton v-if="user?.rol === 'ADMIN_ROLE'" to="/admin" label="Centro de Control"
                class="nav-gold-item" />
              <secondButton label="Cerrar Sesión" class="nav-gold-item text-red-4" @click="logout" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 gt-sm"></div>
        <div class="col-12 col-md-8">
          <div class="q-px-xl" style="padding-top: 140px;">
            <div class="q-pb-xl"></div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl q-pa-lg q-mb-xl flex items-center justify-between">
        <div>
          <h2 class="text-h5 text-weight-bold q-mt-none q-mb-sm">
            Perfil Cósmico
          </h2>
          <div class="flex q-gutter-x-xl">
            <span class="flex items-center">
              <q-icon name="email" class="q-mr-xs" />
              {{ user?.email }}
            </span>

            <span class="flex items-center">
              <q-icon name="person" class="q-mr-xs" />
              {{ user?.nombre }}
            </span>

            <span class="flex items-center">
              <q-icon name="calendar_today" class="q-mr-xs" />
              {{ user?.edad }}
            </span>

            <span class="flex items-center">
              <q-icon name="cake" class="q-mr-xs" />
              {{ converFecha(user?.fechanacimiento) }}
            </span>
          </div>
        </div>

        <div class="badge-status text-center q-pa-md">
          <div class="text-status-title text-uppercase tracking-widest opacity-70 q-mb-xs" style="font-size: 0.7rem;">
            Estado del Alma
          </div>

          <div v-if="user?.estado === 1" class="flex flex-center q-gutter-x-sm">
            <span class="text-h6 text-weight-bold text-white-4">
              Alineado
            </span>
            <span class="dot-status dot-active"></span>
          </div>

          <div v-else class="flex flex-center q-gutter-x-sm">
            <span class="text-h6 text-weight-bold text-grey-5">
              Desalineado
            </span>
            <span class="dot-status dot-inactive"></span>
          </div>

        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-6">
          <div v-if="user?.estado === 1" class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div class="icon-box bg-emerald-box q-mr-md">
                <q-icon name="account_balance_wallet" class="text-emerald" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Estado Financiero</span>
                <span class="block text-subtitle1 text-weight-bold">En Flujo</span>
              </div>
            </div>
            <q-icon name="check_circle" class="text-emerald" size="lg" />
          </div>

          <div v-else class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div class="icon-box bg-red-2 q-mr-md">
                <q-icon name="account_balance_wallet" class="text-red" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Estado Financiero</span>
                <span class="block text-subtitle1 text-weight-bold text-red">Flujo Interrumpido</span>
              </div>
            </div>
            <q-icon name="cancel" class="text-red" size="lg" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div v-if="lecturaHoy" class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div class="icon-box bg-emerald-box q-mr-md">
                <q-icon name="account_balance_wallet" class="text-emerald" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Lectura Diaria Generada</span>
                <span class="block text-subtitle1 text-weight-bold">Activa</span>
              </div>
            </div>
            <q-icon name="verified" color="primary" size="lg" />
          </div>

          <div v-else class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div class="icon-box bg-red-2 q-mr-md">
                <q-icon name="account_balance_wallet" class="text-red" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Lectura Diaria Generada</span>
                <span class="block text-subtitle1 text-weight-bold text-red">Inactiva</span>
              </div>
            </div>
            <q-icon name="cancel" color="negative" size="lg" />
          </div>
        </div>
      </div>

      <div class="q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-6">
          <div class="glass-panel rounded-xl q-pa-lg relative-position group h-full flex column justify-between">
            <q-icon name="history_edu" class="absolute-top-right q-pa-md text-slate-600" size="sm" />

            <div>
              <h3 class="text-card-title q-mt-none q-mb-md">
                Lectura Principal
              </h3>
              <p class="text-slate-800 text-italic font-light" style="line-height: 2">
                {{ lecturaPrincipal?.contenido?.descripcion }}
              </p>
            </div>

            <secondButton to="/lectura_principal" label="VER TRANSCRIPCIÓN COMPLETA" class="nav-gold-item" />

          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl overflow-hidden">
        <primaryTable v-model="tabActiva" :tabs="misPestanas" :data="tabActiva === 'lecturas' ? Lecturas : Pagos"
          :itemsPerPage="5">

          <template #header>
            <tr v-if="tabActiva === 'lecturas'">
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Contenido</th>
              <th class="text-right">Visualizar</th>
            </tr>

            <tr v-else-if="tabActiva === 'pagos'">
              <th>Descripción</th>
              <th>Fecha de Pago</th>
              <th>Monto</th>
              <th class="text-right">Recibo</th>
            </tr>
          </template>

          <template #body="{ items }">

            <template v-if="tabActiva === 'lecturas'">
              <tr v-for="item in items" :key="item._id" class="table-row-hover">
                <td class="text-weight-medium" style="text-transform: capitalize;">{{ item.tipo }}</td>
                <td class="text-slate-300">{{ converFecha(new Date(item.fechaLectura)) }}</td>
                <td class="text-slate-400 text-italic">
                  {{ item.contenido?.mensaje ? item.contenido.mensaje.substring(0, 60) + '...' : 'Sin contenido' }}
                </td>
                <td class="text-right">
                  <router-link to="/lectura_diaria">
                    <q-icon name="visibility" class="cursor-pointer hover-white text-primary-custom" size="sm" />
                  </router-link>
                </td>
              </tr>
            </template>

            <template v-else-if="tabActiva === 'pagos'">
              <tr v-for="pago in items" :key="pago.id" class="table-row-hover">
                <td class="text-slate-300">{{ pago.descripcion }}</td>
                <td class="text-weight-medium">{{ converFecha(new Date(pago.fecha)) }}</td>
                <td class="text-slate-400 text-italic">{{ formatoPesos(pago.monto) }}</td>
                <td class="text-right">
                  <div class="cursor-pointer flex justify-end items-center q-gutter-x-sm">

                    <q-icon name="print" @click="generarFactura(pago, user?.nombre)"
                      class="hover-white text-primary-custom" size="sm">
                      <q-tooltip class="bg-dark text-primary">Imprimir Recibo</q-tooltip>
                    </q-icon>

                    <q-icon name="mail" @click="enviarCorreoFactura(pago, user)" class="hover-white text-emerald"
                      size="sm">
                      <q-tooltip class="bg-dark text-emerald">Enviar al Correo</q-tooltip>
                    </q-icon>

                  </div>
                </td>
              </tr>
            </template>

            <tr v-if="items.length === 0">
              <td colspan="4" class="text-center text-slate-400 q-pa-xl">
                <q-icon name="auto_awesome" size="lg" class="q-mb-sm opacity-50" />
                <div class="text-subtitle1 text-weight-medium">No se encontraron registros</div>
                <div class="text-caption">Intenta con otra búsqueda</div>
              </td>
            </tr>

          </template>

        </primaryTable>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import secondButton from "../components/secondButton.vue";
import primaryTable from "../components/primaryTable.vue";
import { useAuthStore } from "../store/auth.js";
import { converFecha, resetearHoras, formatoPesos, generarFactura } from "../utils/functions.js";
import { postData } from "../services/services.js";

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();


const { user, lecturasguardadas, pagosUsuario } = storeToRefs(authStore);


const tabActiva = ref('lecturas');
const misPestanas = ref([
  { label: 'Lecturas', value: 'lecturas' },
  { label: 'Pagos', value: 'pagos' }
]);

const Lecturas = computed(() => lecturasguardadas.value || []);
const Pagos = computed(() => pagosUsuario.value || []);


const stringHoy = converFecha(resetearHoras(new Date()));

const lecturaHoy = computed(() => {
  const encontrada = (lecturasguardadas.value || []).find(item => {
    if (item.tipo !== 'diaria') return false;
    const fechaItemStr = converFecha(resetearHoras(new Date(item.fechaLectura)));
    return fechaItemStr === stringHoy;
  });
  return !!encontrada;
});

const lecturaPrincipal = computed(() => {
  return (lecturasguardadas.value || []).find(item => item.tipo === 'principal') || null;
});


onMounted(() => {
  if (!user.value) {
    router.push('/login');
  }
});


const logout = () => {
  $q.dialog({
    title: 'Cerrar Sesión',
    message: '¿Estás seguro de que deseas salir del sistema?',
    cancel: true,
    persistent: true,
    dark: true,
    ok: {
      flat: true,
      color: 'red-4',
      label: 'Sí, Salir'
    }
  }).onOk(() => {
    authStore.token = "";
    authStore.user = null;
    authStore.lecturaActual = null;
    authStore.lecturasguardadas = [];
    authStore.pagosUsuario = [];
    router.push('/login');
  });
};

const enviarCorreoFactura = async (pago, currentUser) => {
  if (!currentUser?._id) return;

  $q.loading.show();

  try {
    await postData('/pago/enviar-factura', {
      email: currentUser.email,
      nombre: currentUser.nombre,
      pago: pago
    });

    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: `Recibo enviado con éxito a ${currentUser.email}`,
      position: 'top-right'
    });

  } catch (error) {
    console.error('Error al enviar correo:', error);
    $q.notify({
      color: 'negative',
      icon: 'warning',
      message: 'No se pudo enviar el correo. Intenta de nuevo.',
      position: 'top-right'
    });
  } finally {
    $q.loading.hide();
  }
};
</script>

<style scoped>
@import url("../styles/dashboard.css");
</style>