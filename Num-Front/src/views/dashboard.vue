<template>
  <q-page class="cosmic-bg font-display min-h-screen row text-white overflow-hidden">
    <div class="fixed-full z-behind opacity-20 pointer-events-none">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDURC83wQPs436yjmwbq85kbDNxgA5yFl3ZccQmAnhmP1L1d7Cdy3QDi7PYKn3e9t5sczTCQMUSi6-Lo3IKEt-Tka66pve3m3VoE7oPoo2F2cF1pA0gCAuF8263SJwHkP6nIqlJRV8TRQ0V0I2awEHdf7rZBTMTRivLL-zyR80jG5DUdosAFnIwfN5aZubQqF26PbAY64tRdve7DRaRKfIfICvs1PQIRGm9sBwqRomUIsFKGeDbfnfARX9B9xlCraeE8VgDRcRbvKEV"
        class="fit object-cover" />
    </div>

    <div class="col-12 col-md-4 sidebar-dashboard fixed flex flex-center column q-pa-xl border-right-cosmic">
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

    <div class="col-12 col-md-8 main-content-dashboard relative-position q-pa-xl scroll-y">
      <router-view />
      <div class="fixed-top nav-container-fixed">
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

      <div class="row content-padding-top">
        <div class="col-md-4 gt-sm"></div>
        <div class="col-12 col-md-8">
          <div class="q-px-md-xl" style="padding-top: 140px;">
            <div class="q-pb-xl"></div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl q-pa-lg q-mb-xl flex column md-row items-center justify-between">
        <div class="full-width">
          <h2 class="text-h5 text-weight-bold q-mt-none q-mb-md text-center md-text-left">Perfil Cósmico</h2>
          <div class="flex flex-center md-justify-start q-gutter-md q-mb-lg">
            <span class="flex items-center"><q-icon name="email" class="q-mr-xs" />{{ user?.email }}</span>
            <span class="flex items-center"><q-icon name="person" class="q-mr-xs" />{{ user?.nombre }}</span>
            <span class="flex items-center"><q-icon name="calendar_today" class="q-mr-xs" />{{ user?.edad }} Años</span>
            <span class="flex items-center"><q-icon name="cake" class="q-mr-xs" />{{ converFecha(user?.fechanacimiento)
              }}</span>
            <q-btn flat dense icon="key" label="Cambiar Contraseña" color="primary"
              class="q-ml-md rounded-pill text-weight-bold" @click="dialogPassword = true" />
          </div>
        </div>
        <div class="badge-status text-center q-pa-md full-width md-shrink">
          <div class="text-status-title text-uppercase tracking-widest opacity-70 q-mb-xs" style="font-size: 0.7rem;">
            Estado del Alma</div>
          <div v-if="user?.estado === 1" class="flex flex-center q-gutter-x-sm">
            <span class="text-h6 text-weight-bold text-white-4">Alineado</span>
            <span class="dot-status dot-active"></span>
          </div>
          <div v-else class="flex flex-center q-gutter-x-sm">
            <span class="text-h6 text-weight-bold text-grey-5">Desalineado</span>
            <span class="dot-status dot-inactive"></span>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-6">
          <div class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div :class="user?.estado === 1 ? 'icon-box bg-emerald-box q-mr-md' : 'icon-box bg-red-2 q-mr-md'">
                <q-icon :name="user?.estado === 1 ? 'account_balance_wallet' : 'account_balance_wallet'"
                  :class="user?.estado === 1 ? 'text-emerald' : 'text-red'" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Estado Financiero</span>
                <span class="block text-subtitle1 text-weight-bold" :class="user?.estado !== 1 ? 'text-red' : ''">{{
                  user?.estado === 1 ? 'En Flujo' : 'Flujo Interrumpido' }}</span>
              </div>
            </div>
            <q-icon :name="user?.estado === 1 ? 'check_circle' : 'cancel'"
              :class="user?.estado === 1 ? 'text-emerald' : 'text-red'" size="lg" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="glass-panel rounded-xl q-pa-md flex items-center justify-between">
            <div class="flex items-center">
              <div :class="lecturaHoy ? 'icon-box bg-emerald-box q-mr-md' : 'icon-box bg-red-2 q-mr-md'">
                <q-icon name="account_balance_wallet" :class="lecturaHoy ? 'text-emerald' : 'text-red'" size="sm" />
              </div>
              <div>
                <span class="text-card-subtitle">Lectura Diaria</span>
                <span class="block text-subtitle1 text-weight-bold" :class="!lecturaHoy ? 'text-red' : ''">{{ lecturaHoy
                  ? 'Activa' : 'Inactiva' }}</span>
              </div>
            </div>
            <q-icon :name="lecturaHoy ? 'verified' : 'cancel'" :color="lecturaHoy ? 'primary' : 'negative'" size="lg" />
          </div>
        </div>
      </div>

      <div class="q-col-gutter-lg q-mb-xl">
        <div class="col-12">
          <div class="glass-panel rounded-xl q-pa-lg relative-position group h-full flex column justify-between">
            <q-icon name="history_edu" class="absolute-top-right q-pa-md text-slate-600" size="sm" />
            <div>
              <h3 class="text-card-title q-mt-none q-mb-md">Lectura Principal</h3>
              <p class="text-slate-200 text-italic font-light" style="line-height: 2">{{
                lecturaPrincipal?.contenido?.descripcion }}</p>
            </div>
            <secondButton to="/lectura_principal" label="VER TRANSCRIPCIÓN" class="nav-gold-item q-mt-md" />
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl overflow-hidden q-mb-xl">
        <div class="overflow-auto scroll-none">
          <primaryTable v-model="tabActiva" :tabs="misPestanas" :data="tabActiva === 'lecturas' ? Lecturas : Pagos"
            :itemsPerPage="5">
            <template #header>
              <tr v-if="tabActiva === 'lecturas'">
                <th>Tipo</th>
                <th class="gt-xs">Fecha</th>
                <th>Contenido</th>
                <th class="text-right">Ver</th>
              </tr>
              <tr v-else-if="tabActiva === 'pagos'">
                <th>Descripción</th>
                <th class="gt-xs">Fecha</th>
                <th>Monto</th>
                <th class="text-right">Acción</th>
              </tr>
            </template>
            <template #body="{ items }">
              <template v-if="tabActiva === 'lecturas'">
                <tr v-for="item in items" :key="item._id" class="table-row-hover">
                  <td class="text-weight-medium" style="text-transform: capitalize;">{{ item.tipo }}</td>
                  <td class="text-slate-300 gt-xs">{{ converFecha(new Date(item.fechaLectura)) }}</td>
                  <td class="text-slate-400 text-italic">{{ item.contenido?.mensaje ?
                    item.contenido.mensaje.substring(0, 30) + '...' : 'Sin contenido' }}</td>
                  <td class="text-right"><q-icon name="visibility"
                      class="cursor-pointer hover-white text-primary-custom" size="sm" @click="verLectura(item)" /></td>
                </tr>
              </template>
              <template v-else-if="tabActiva === 'pagos'">
                <tr v-for="pago in items" :key="pago.id" class="table-row-hover">
                  <td class="text-slate-300">{{ pago.descripcion }}</td>
                  <td class="text-weight-medium gt-xs">{{ converFecha(new Date(pago.fecha)) }}</td>
                  <td class="text-slate-400 text-italic">{{ formatoPesos(pago.monto) }}</td>
                  <td class="text-right">
                    <div class="cursor-pointer flex justify-end items-center q-gutter-x-sm">
                      <q-icon name="print" @click="generarFactura(pago, user?.nombre)"
                        class="hover-white text-primary-custom" size="sm"><q-tooltip
                          class="bg-dark text-primary">Imprimir</q-tooltip></q-icon>
                      <q-icon name="mail" @click="enviarCorreoFactura(pago, user)" class="hover-white text-emerald"
                        size="sm"><q-tooltip class="bg-dark text-emerald">Enviar</q-tooltip></q-icon>
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-if="items.length === 0">
                <td colspan="4" class="text-center text-slate-400 q-pa-xl"><q-icon name="auto_awesome" size="lg"
                    class="q-mb-sm opacity-50" />
                  <div class="text-subtitle1 text-weight-medium">No se encontraron registros</div>
                </td>
              </tr>
            </template>
          </primaryTable>
        </div>
      </div>
    </div>

    <!-- DIÁLOGO CAMBIO CONTRASEÑA -->
    <q-dialog v-model="dialogPassword" persistent backdrop-filter="blur(10px)">
      <q-card class="glass-panel text-white"
        style="min-width: 400px; border: 1px solid rgba(244, 175, 37, 0.4); border-radius: 20px;">
        <q-card-section class="row items-center q-pb-none q-pt-xl text-center flex-center">
          <div class="column items-center">
            <q-icon name="auto_fix_high" color="primary" size="40px" class="q-mb-sm animate-pulse" />
            <div class="text-h5 font-serif text-bold tracking-widest text-primary">NUEVA LLAVE CÓSMICA</div>
            <div class="text-caption text-grey-5 q-mt-xs text-uppercase tracking-widest">Alinea tu frecuencia de acceso
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-xl">
          <q-form @submit="handleCambiarPassword" class="q-gutter-y-lg">
            <div class="group">
              <label class="block text-caption text-uppercase tracking-widest text-primary text-weight-bold q-mb-xs"
                style="font-size: 10px;">Contraseña Actual</label>
              <q-input v-model="passForm.actual" :type="showPassActual ? 'text' : 'password'" dark outlined
                color="primary" placeholder="••••••••" :rules="[val => !!val || 'Requerido']">
                <template v-slot:prepend><q-icon name="lock" color="grey-7" /></template>
                <template v-slot:append><q-icon :name="showPassActual ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer text-grey-6" @click="showPassActual = !showPassActual" /></template>
              </q-input>
            </div>
            <div class="group">
              <label class="block text-caption text-uppercase tracking-widest text-primary text-weight-bold q-mb-xs"
                style="font-size: 10px;">Nueva Llave de Acceso</label>
              <q-input v-model="passForm.nueva" :type="showPassNueva ? 'text' : 'password'" dark outlined
                color="primary" placeholder="Mínimo 6 caracteres"
                :rules="[val => !!val || 'Requerido', val => val.length >= 6 || 'Mínimo 6 caracteres']">
                <template v-slot:prepend><q-icon name="key" color="grey-7" /></template>
                <template v-slot:append><q-icon :name="showPassNueva ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer text-grey-6" @click="showPassNueva = !showPassNueva" /></template>
              </q-input>
            </div>
            <div class="group">
              <label class="block text-caption text-uppercase tracking-widest text-primary text-weight-bold q-mb-xs"
                style="font-size: 10px;">Confirmar Nueva Llave</label>
              <q-input v-model="passForm.confirmar" :type="showPassConfirmar ? 'text' : 'password'" dark outlined
                color="primary" placeholder="Repite tu nueva contraseña"
                :rules="[val => val === passForm.nueva || 'Las llaves no coinciden']">
                <template v-slot:prepend><q-icon name="lock_reset" color="grey-7" /></template>
                <template v-slot:append><q-icon :name="showPassConfirmar ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer text-grey-6" @click="showPassConfirmar = !showPassConfirmar" /></template>
              </q-input>
            </div>
            <div class="row q-gutter-x-md q-pt-md">
              <q-btn flat label="Cancelar" v-close-popup class="col text-grey-5 no-caps" />
              <q-btn unelevated label="ACTUALIZAR" color="primary" type="submit" :loading="loadingPass"
                class="col rounded-pill text-weight-bold text-black" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
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
import { useAdminStore } from "../store/admin.js";
import { converFecha, resetearHoras, formatoPesos, generarFactura } from "../utils/functions.js";
import { postData, putData } from "../services/services.js";

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const adminStore = useAdminStore();
const { user, lecturasguardadas, pagosUsuario } = storeToRefs(authStore);

// Gestión de Cambio de Contraseña
const dialogPassword = ref(false);
const loadingPass = ref(false);
const showPassActual = ref(false);
const showPassNueva = ref(false);
const showPassConfirmar = ref(false);
const passForm = ref({ actual: '', nueva: '', confirmar: '' });

const handleCambiarPassword = async () => {
  if (passForm.value.nueva !== passForm.value.confirmar) {
    $q.notify({ type: 'negative', message: 'Las nuevas contraseñas no coinciden' });
    return;
  }
  loadingPass.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    await putData(`usuario/password/${user.value._id}`, {
      passwordActual: passForm.value.actual,
      passwordNueva: passForm.value.nueva
    });
    $q.notify({ type: 'positive', message: '¡Tu llave cósmica ha sido actualizada! ✨', icon: 'auto_awesome' });
    dialogPassword.value = false;
    passForm.value = { actual: '', nueva: '', confirmar: '' };
  } catch (error) {
    const msg = error.response?.data?.error || 'Error al cambiar la contraseña';
    $q.notify({ type: 'negative', message: msg, icon: 'error' });
  } finally {
    loadingPass.value = false;
  }
};

// Navegación y Datos
const tabActiva = ref('lecturas');
const misPestanas = ref([{ label: 'Lecturas', value: 'lecturas' }, { label: 'Pagos', value: 'pagos' }]);
const Lecturas = computed(() => lecturasguardadas.value || []);
const Pagos = computed(() => pagosUsuario.value || []);

const verLectura = (item) => {
  if (item.tipo === 'principal') {
    router.push('/lectura_principal');
  } else if (item.tipo === 'diaria') {
    router.push({ path: '/lectura_diaria', query: { fecha: item.fechaLectura } });
  }
};

const stringHoy = converFecha(resetearHoras(new Date()));
const lecturaHoy = computed(() => {
  const encontrada = (lecturasguardadas.value || []).find(item => {
    if (item.tipo !== 'diaria') return false;
    const fechaItemStr = converFecha(resetearHoras(new Date(item.fechaLectura)));
    return fechaItemStr === stringHoy;
  });
  return !!encontrada;
});

const lecturaPrincipal = computed(() => (lecturasguardadas.value || []).find(item => item.tipo === 'principal') || null);

onMounted(() => {
  if (!user.value) router.push('/login');
});

const logout = () => {
  $q.dialog({
    title: 'Cerrar Sesión',
    message: '¿Estás seguro de que deseas salir del sistema?',
    cancel: true,
    persistent: true,
    dark: true,
    ok: { flat: true, color: 'red-4', label: 'Sí, Salir' }
  }).onOk(() => {
    authStore.token = ""; authStore.user = null; authStore.lecturaActual = null;
    authStore.lecturasguardadas = []; authStore.pagosUsuario = [];
    adminStore.usuarios = []; adminStore.lecturas = []; adminStore.pagos = [];
    router.push('/login');
  });
};

const enviarCorreoFactura = async (pago, currentUser) => {
  if (!currentUser?._id) return;
  $q.loading.show();
  try {
    await postData('/pago/enviar-factura', { email: currentUser.email, nombre: currentUser.nombre, pago: pago });
    $q.notify({ color: 'positive', icon: 'check_circle', message: `Recibo enviado con éxito a ${currentUser.email}`, position: 'top-right' });
  } catch (error) {
    $q.notify({ color: 'negative', icon: 'warning', message: 'No se pudo enviar el correo. Intenta de nuevo.', position: 'top-right' });
  } finally {
    $q.loading.hide();
  }
};
</script>

<style scoped>
@import url("../styles/dashboard.css");
</style>