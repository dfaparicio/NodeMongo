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
            <div class="flex no-wrap justify-center items-center q-gutter-x-sm sm:q-gutter-x-md q-pt-xl q-pb-xl overflow-auto scroll-none">
              <secondButton to="/lectura_principal" label="Lectura Principal" class="nav-gold-item" />
              <secondButton to="/lectura_diaria" label="Lectura Diaria" class="nav-gold-item" />
              <secondButton to="/planes" label="Planes" class="nav-gold-item" />
              <secondButton v-if="user?.rol === 'ADMIN_ROLE'" to="/admin" label="Centro de Control" class="nav-gold-item" />
              <secondButton label="Cerrar Sesión" class="nav-gold-item text-red-4" @click="logout" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 gt-sm"></div>

        <div class="col-12 col-md-8">
          <div class="q-px-xl" style="padding-top: 140px;">

            <div class="q-pb-xl">
            </div>

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
          <div v-if="user.estado === 1" class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
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
              <p class="text-slate-800 text-italic font-light" style="line-height: 2">{{
                lecturaPrincipal?.contenido?.descripcion }}</p>
            </div>

            <secondButton to="/lectura_principal" label="VER TRANSCRIPCIÓN COMPLETA" class="nav-gold-item" />

          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl overflow-hidden">
        <div class="flex border-bottom-primary">
          <button class="tab-btn active">Historial de Lecturas</button>
          <button class="tab-btn inactive">Historial de Pagos</button>
        </div>

        <div class="overflow-auto">
          <table class="full-width cosmic-table text-left" style="border-collapse: collapse">
            <thead>
              <tr>
                <th>Fecha de Portal</th>
                <th>Tipo de Lectura</th>
                <th>Oráculo Asignado</th>
                <th>Estado</th>
                <th class="text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row-hover">
                <td class="text-slate-300">01 Sep, 2023</td>
                <td class="text-weight-medium">Carta Astral Anual</td>
                <td class="text-slate-400 text-italic">Mastro Zephyr</td>
                <td><span class="badge-table-emerald">Archivada</span></td>
                <td class="text-right">
                  <q-icon name="download" class="cursor-pointer hover-white text-primary" size="sm" />
                </td>
              </tr>
              <tr class="table-row-hover">
                <td class="text-slate-300">24 Ago, 2023</td>
                <td class="text-weight-medium">Tránsito de Mercurio</td>
                <td class="text-slate-400 text-italic">Dra. Selene</td>
                <td><span class="badge-table-emerald">Archivada</span></td>
                <td class="text-right">
                  <q-icon name="download" class="cursor-pointer hover-white text-primary" size="sm" />
                </td>
              </tr>
              <tr class="table-row-hover">
                <td class="text-slate-300">12 Ago, 2023</td>
                <td class="text-weight-medium">Sinastría de Almas</td>
                <td class="text-slate-400 text-italic">Oráculo Nox</td>
                <td><span class="badge-table-primary">Pendiente</span></td>
                <td class="text-right">
                  <q-icon name="play_circle" class="cursor-pointer hover-white text-primary" size="sm" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import secondButton from "../components/secondButton.vue";
import { useAuthStore } from "../store/auth.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { converFecha, resetearHoras } from "../utils/functions.js";
import { getData } from "../services/services.js";
import { useQuasar } from 'quasar';
import { ref, onMounted, computed } from 'vue';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();

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
    router.push('/login');
  });
};

const { user, lecturaActual } = storeToRefs(authStore);

<<<<<<< HEAD
const lecturaHoy = computed(() => !!lecturaActual.value);

const stringHoy = converFecha(resetearHoras(new Date()));

=======
const stringHoy = converFecha(resetearHoras(new Date()));

const lecturaHoy = computed(() => {
  if (!lecturaActual.value?.fechaLectura) return false;

  const fechaLectura = converFecha(new Date(lecturaActual.value.fechaLectura));

  return fechaLectura === stringHoy;
});


>>>>>>> 9d0dd2c3b1ec428582b6ef154b6a2414cb4c1968
const mislecturas = ref([]);
const lecturaPrincipal = ref(null);

onMounted(() => {
  if (!user.value) {
    router.push('/login')
  }
});

const lecturas = async () => {
  if (!authStore.user?._id) return;

  try {
    const res = await getData(`/lectura/usuario/${authStore.user._id}`);
    const datoslecturas = res.lecturas || res.data?.lecturas || [];

    mislecturas.value = datoslecturas.map(item => ({
      ...item,
      contenido: typeof item.contenido === 'string' ? JSON.parse(item.contenido) : item.contenido
    }));

    authStore.lecturasguardadas = mislecturas.value;
    lecturaPrincipal.value = mislecturas.value.find(item => item.tipo === 'principal') || null;

    const encontradaHoy = mislecturas.value.find(item =>
      item.tipo === 'diaria' && converFecha(new Date(item.fechaLectura)) === stringHoy
    );

    if (encontradaHoy) {
      authStore.setLectura(encontradaHoy);
    }

  } catch (error) {
    console.error("Error al obtener lecturas:", error);
    mislecturas.value = [];
    lecturaPrincipal.value = null;
  }
};

onMounted(lecturas);
</script>

<style scoped>
@import url("../styles/dashboard.css");
</style>