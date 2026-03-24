<template>
  <q-page class="cosmic-bg font-display min-h-screen row text-white overflow-hidden">
    <!-- Fondo (Mantenido) -->
    <div class="fixed-full z-behind opacity-20 pointer-events-none">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDURC83wQPs436yjmwbq85kbDNxgA5yFl3ZccQmAnhmP1L1d7Cdy3QDi7PYKn3e9t5sczTCQMUSi6-Lo3IKEt-Tka66pve3m3VoE7oPoo2F2cF1pA0gCAuF8263SJwHkP6nIqlJRV8TRQ0V0I2awEHdf7rZBTMTRivLL-zyR80jG5DUdosAFnIwfN5aZubQqF26PbAY64tRdve7DRaRKfIfICvs1PQIRGm9sBwqRomUIsFKGeDbfnfARX9B9xlCraeE8VgDRcRbvKEV"
        class="fit object-cover" />
    </div>

    <!-- SIDEBAR FIJA -->
    <div class="col-12 col-md-4 sidebar-dashboard fixed flex flex-center column q-pa-xl border-right-cosmic" style="top: 0; left: 0; height: 100vh;">
      <div class="absolute nebula-glow nebula-1" style="z-index: 1;"></div>
      <div class="absolute nebula-glow nebula-2" style="z-index: 1;"></div>
      <div class="relative-position flex flex-center column full-width" style="z-index: 10; max-width: 350px;">
        <div class="stars-container absolute-full pointer-events-none">
          <q-icon name="star" color="gold" size="8px" class="absolute animate-pulse" style="top: 10%; left: 20%;" />
          <q-icon name="auto_awesome" color="gold" size="12px" class="absolute animate-pulse-slow" style="top: 15%; right: 15%;" />
        </div>
        <div class="avatar-wrapper q-mb-xl relative-position" style="width: 260px; height: 260px;">
          <div class="absolute-full flex flex-center">
            <svg class="w-full h-full svg-primary-opacity" viewBox="0 0 200 200" style="filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.2));">
              <circle cx="100" cy="100" fill="none" r="98" stroke="#d4af37" stroke-width="0.2" stroke-dasharray="1 5"></circle>
              <circle cx="100" cy="100" fill="none" r="90" stroke="#d4af37" stroke-width="0.5" stroke-dasharray="10 5"></circle>
              <polygon fill="none" points="100,5 195,160 5,160" stroke="#d4af37" stroke-width="0.8" class="animate-pulse-slow"></polygon>
            </svg>
          </div>
          <div class="absolute-center column flex-center full-width">
            <div class="text-caption text-gold text-weight-thin tracking-widest q-mb-xs opacity-80" style="font-size: 11px; letter-spacing: 8px;">ESENCIA</div>
            <div class="master-number-glow text-weight-bolder text-gold font-serif">{{ lecturaPrincipal?.contenido?.numero || '?' }}</div>
          </div>
        </div>
        <div class="text-center q-mb-md">
          <div class="row flex-center q-gutter-x-xs q-mb-xs opacity-70">
            <q-icon name="auto_awesome" color="primary" size="14px" />
            <span class="text-caption text-uppercase tracking-widest text-weight-light" style="font-size: 10px; letter-spacing: 5px;">Buscador del Cosmos</span>
          </div>
          <h1 class="text-h3 text-weight-bold text-gradient-gold text-center q-ma-none tracking-tighter" style="font-family: 'Cinzel', serif;">{{ user?.nombre || 'Buscador' }}</h1>
        </div>
        <div class="badge-frecuencia-premium column items-center text-center">
          <span class="text-white text-weight-thin text-uppercase tracking-widest" style="font-size: 11px; letter-spacing: 3px;">Frecuencia Maestro</span>
          <div class="text-white text-weight-thin italic opacity-50" style="font-size: 12px; max-width: 250px; line-height: 1.5;">Camino regido por la vibración número {{ lecturaPrincipal?.contenido?.numero || '?' }}</div>
        </div>
      </div>
    </div>

    <!-- CONTENIDO DERECHA -->
    <div class="col-12 col-md-8 main-content-dashboard relative-position q-px-xl q-pb-xl q-pt-none scroll-y" style="margin-left: auto;">
      
      <!-- NAVBAR -->
      <div class="fixed-top nav-container-fixed z-top">
        <div class="flex justify-center full-width">
          <div class="glass-panel2 rounded-xl q-pa-sm full-width" style="max-width: 900px; margin-top: 20px;">
            <div class="flex row no-wrap justify-center items-center q-gutter-x-md q-py-md">
              <secondButton to="/lectura_principal" label="Lectura Principal" />
              <secondButton to="/lectura_diaria" label="Lectura Diaria" />
              <secondButton to="/planes" label="Planes" />
              <secondButton v-if="user?.rol === 'ADMIN_ROLE'" to="/admin" label="Admin" />
              <secondButton label="Cerrar Sesión" class="text-red-4" @click="logout" />
            </div>
          </div>
        </div>
      </div>

      <div style="padding-top: 180px;">
        <!-- 1. PERFIL CÓSMICO (ESTRUCTURA ORIGINAL) -->
        <div class="profile-cosmic-container q-mb-xl overflow-hidden">
          <div class="row items-stretch">
            <div class="col-12 col-md-4 profile-header-cell q-pa-xl flex flex-center column relative-position">
              <div class="absolute-top-left q-pa-md opacity-20"><q-icon name="fingerprint" size="40px" /></div>
              <div class="text-center z-top">
                <span class="text-caption text-uppercase tracking-widest text-gold opacity-60" style="font-size: 10px; letter-spacing: 5px;">Identidad</span>
                <h2 class="text-h4 text-weight-bold q-ma-none font-serif q-mb-lg uppercase">Perfil</h2>
                <div class="status-orb-wrapper flex flex-center column">
                  <div :class="user?.estado === 1 ? 'orb-active' : 'orb-inactive'" class="q-mb-sm"><div class="orb-inner"></div></div>
                  <span :class="user?.estado === 1 ? 'text-emerald' : 'text-red-4'" class="text-caption text-bold tracking-widest uppercase">{{ user?.estado === 1 ? 'ALINEADO' : 'DESALINEADO' }}</span>
                  <div v-if="user?.estado === 1" class="text-gold text-bold q-mt-xs tracking-tighter" style="font-size: 10px;">PLAN ACTIVO</div>
                  <div v-else class="text-grey-6 q-mt-xs tracking-tighter" style="font-size: 10px;">SIN PLAN DE PAGO</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8 profile-data-grid q-pa-xl">
              <div class="row q-col-gutter-xl">
                <div class="col-12 col-sm-6"><div class="data-cell"><span class="text-label-soft block">NOMBRE</span><div class="row items-center q-gutter-x-sm"><q-icon name="person_outline" color="primary" size="xs" /><span class="text-subtitle1 text-weight-medium">{{ user?.nombre }}</span></div></div></div>
                <div class="col-12 col-sm-6"><div class="data-cell"><span class="text-label-soft block">CORREO</span><div class="row items-center q-gutter-x-sm"><q-icon name="alternate_email" color="primary" size="xs" /><span class="text-subtitle1 text-weight-medium truncate">{{ user?.email }}</span></div></div></div>
                <div class="col-12 col-sm-6"><div class="data-cell"><span class="text-label-soft block">EDAD</span><div class="row items-center q-gutter-x-sm"><q-icon name="hourglass_empty" color="primary" size="xs" /><span class="text-subtitle1 text-weight-medium">{{ user?.edad }} Años</span></div></div></div>
                <div class="col-12 col-sm-6"><div class="data-cell"><span class="text-label-soft block">NACIMIENTO</span><div class="row items-center q-gutter-x-sm"><q-icon name="event" color="primary" size="xs" /><span class="text-subtitle1 text-weight-medium">{{ converFecha(user?.fechanacimiento) }}</span></div></div></div>
              </div>
              <div class="row items-center justify-between q-mt-xl q-pt-lg border-top-glass">
                <div v-if="user?.estado === 1 && user?.fechaExpiracion" class="row items-center q-gutter-x-sm"><q-icon name="history_toggle_off" color="gold" size="xs" /><span class="text-caption text-grey-5">Activo hasta: <strong class="text-gold">{{ converFecha(user.fechaExpiracion) }}</strong></span></div>
                <div v-else></div>
                <q-btn flat no-caps dense label="Cambiar Llave" icon="key" class="btn-refresh-key" @click="dialogPassword = true" />
              </div>
            </div>
          </div>
        </div>

        <!-- 2. INDICADORES DE ESTADO (VUELVEN A SU POSICIÓN ARRIBA DE LA LECTURA) -->
        <div class="row q-col-gutter-lg q-mb-xl">
          <div class="col-12 col-md-6">
            <div class="status-card-premium q-pa-lg flex items-center justify-between">
              <div class="flex items-center">
                <div :class="user?.estado === 1 ? 'icon-circle-success q-mr-lg' : 'icon-circle-error q-mr-lg'"><q-icon name="account_balance_wallet" size="sm" /></div>
                <div><span class="text-uppercase tracking-widest opacity-50 block q-mb-xs" style="font-size: 10px;">Prosperidad</span><span class="block text-h6 text-weight-bolder" :class="user?.estado === 1 ? 'text-emerald' : 'text-red-4'">{{ user?.estado === 1 ? 'FLUJO DE ABUNDANCIA' : 'FLUJO INTERRUMPIDO' }}</span></div>
              </div>
              <q-icon :name="user?.estado === 1 ? 'verified' : 'report_problem'" :class="user?.estado === 1 ? 'text-emerald opacity-40' : 'text-red-4 opacity-40'" size="2rem" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="status-card-premium q-pa-lg flex items-center justify-between">
              <div class="flex items-center">
                <div :class="lecturaHoy ? 'icon-circle-success q-mr-lg' : 'icon-circle-warning q-mr-lg'"><q-icon name="auto_awesome" size="sm" /></div>
                <div><span class="text-uppercase tracking-widest opacity-50 block q-mb-xs" style="font-size: 10px;">Guía Diaria</span><span class="block text-h6 text-weight-bolder" :class="lecturaHoy ? 'text-emerald' : 'text-amber-7'">{{ lecturaHoy ? 'MENSAJE DISPONIBLE' : 'CANAL EN ESPERA' }}</span></div>
              </div>
              <q-icon :name="lecturaHoy ? 'lightbulb' : 'hourglass_empty'" :class="lecturaHoy ? 'text-emerald opacity-40' : 'text-amber-7 opacity-40'" size="2rem" />
            </div>
          </div>
        </div>

        <!-- 3. RESUMEN LECTURA PRINCIPAL (LETRA MÁS PEQUEÑA Y ESTRUCTURA SIMPLE) -->
        <div class="glass-panel rounded-xl q-pa-xl q-mb-xl relative-position">
          <q-icon name="history_edu" class="absolute-top-right q-pa-md opacity-20" size="md" color="gold" />
          <div class="column">
            <h3 class="text-h5 font-serif text-weight-bold q-mt-none q-mb-md tracking-widest text-gold opacity-80 uppercase">Misión Estelar</h3>
            <p class="text-grey-4 text-italic font-light line-height-2" style="font-size: 1rem; text-align: justify;">
              "{{ lecturaPrincipal?.contenido?.descripcion || 'Iniciando conexión con tu frecuencia base...' }}"
            </p>
            <div class="row justify-end q-mt-lg">
              <secondButton to="/lectura_principal" label="VER TRANSCRIPCIÓN" />
            </div>
          </div>
        </div>

        <!-- 4. TABLA DE REGISTROS -->
        <div class="profile-cosmic-container overflow-hidden q-mb-xl">
          <primaryTable v-model="tabActiva" :tabs="misPestanas" :data="tabActiva === 'lecturas' ? Lecturas : Pagos" :itemsPerPage="5">
            <template #header>
              <tr v-if="tabActiva === 'lecturas'"><th class="q-pa-lg text-gold opacity-60">Frecuencia</th><th class="gt-xs text-gold opacity-60">Fecha</th><th class="text-gold opacity-60">Mensaje</th><th class="text-right text-gold opacity-60">Ver</th></tr>
              <tr v-else-if="tabActiva === 'pagos'"><th class="q-pa-lg text-gold opacity-60">Sincronización</th><th class="gt-xs text-gold opacity-60">Fecha</th><th class="text-gold opacity-60">Monto</th><th class="text-right text-gold opacity-60">Acción</th></tr>
            </template>
            <template #body="{ items }">
              <template v-if="tabActiva === 'lecturas'">
                <tr v-for="item in items" :key="item._id" class="table-row-hover">
                  <td class="q-pa-md"><div class="badge-type-mini">{{ item.tipo }}</div></td><td class="text-grey-5 gt-xs">{{ converFecha(new Date(item.fechaLectura)) }}</td><td class="text-grey-6 text-italic">{{ item.contenido?.mensaje ? item.contenido.mensaje.substring(0, 40) + '...' : 'Sin contenido' }}</td><td class="text-right"><q-icon name="visibility" class="cursor-pointer hover-gold text-primary" size="sm" @click="verLectura(item)" /></td>
                </tr>
              </template>
              <template v-else-if="tabActiva === 'pagos'">
                <tr v-for="pago in items" :key="pago.id" class="table-row-hover">
                  <td class="q-pa-md text-grey-3">{{ pago.descripcion }}</td><td class="text-grey-5 gt-xs">{{ converFecha(new Date(pago.fecha)) }}</td><td class="text-weight-bold text-white">{{ formatoPesos(pago.monto) }}</td><td class="text-right"><div class="row justify-end q-gutter-x-sm"><q-icon name="print" @click="generarFactura(pago, user?.nombre)" class="cursor-pointer hover-white" size="sm" /><q-icon name="mail" @click="enviarCorreoFactura(pago, user)" class="cursor-pointer hover-emerald" size="sm" /></div></td>
                </tr>
              </template>
            </template>
          </primaryTable>
        </div>
      </div>
    </div>

    <!-- DIÁLOGO CAMBIO CONTRASEÑA: CÁPSULA DE SEGURIDAD -->
    <q-dialog v-model="dialogPassword" persistent backdrop-filter="blur(20px)">
      <q-card class="profile-cosmic-container text-white q-pa-none overflow-hidden" style="min-width: 420px; border: 1px solid rgba(212, 175, 55, 0.3);">
        <!-- ENCABEZADO DE SEGURIDAD -->
        <div class="q-pa-xl text-center bg-glass-dark border-bottom-glass relative-position">
          <div class="absolute-top q-mt-md opacity-10"><q-icon name="vpn_key" size="100px" /></div>
          <q-icon name="security" color="primary" size="48px" class="q-mb-md animate-pulse-slow" />
          <h2 class="text-h5 font-serif text-bold q-ma-none tracking-widest text-white">NUEVA LLAVE CÓSMICA</h2>
          <p class="text-caption text-gold-soft q-mt-sm tracking-widest opacity-70">REINICIA TU FRECUENCIA DE ACCESO</p>
        </div>

        <!-- FORMULARIO ESTILIZADO -->
        <q-card-section class="q-pa-xl">
          <q-form @submit="handleCambiarPassword" class="q-gutter-y-lg">
            <div class="column q-gutter-y-sm">
              <label class="text-label-soft uppercase q-ml-xs">Contraseña Actual</label>
              <q-input 
                v-model="passForm.actual" 
                type="password" 
                dark 
                outlined 
                color="primary" 
                class="input-astral-field"
                :rules="[val => !!val || 'Campo requerido']"
              >
                <template v-slot:prepend><q-icon name="lock_open" color="primary" size="xs" class="opacity-50" /></template>
              </q-input>
            </div>

            <div class="column q-gutter-y-sm">
              <label class="text-label-soft uppercase q-ml-xs">Nueva Llave de Acceso</label>
              <q-input 
                v-model="passForm.nueva" 
                type="password" 
                dark 
                outlined 
                color="primary" 
                class="input-astral-field"
                :rules="[val => !!val || 'Campo requerido', val => val.length >= 6 || 'Muy corta']"
              >
                <template v-slot:prepend><q-icon name="key" color="primary" size="xs" class="opacity-50" /></template>
              </q-input>
            </div>

            <div class="column q-gutter-y-sm">
              <label class="text-label-soft uppercase q-ml-xs">Confirmar Nueva Frecuencia</label>
              <q-input 
                v-model="passForm.confirmar" 
                type="password" 
                dark 
                outlined 
                color="primary" 
                class="input-astral-field"
                :rules="[val => val === passForm.nueva || 'Las llaves no coinciden']"
              >
                <template v-slot:prepend><q-icon name="verified_user" color="primary" size="xs" class="opacity-50" /></template>
              </q-input>
            </div>

            <div class="row q-gutter-x-md q-pt-lg">
              <q-btn flat label="CANCELAR" v-close-popup class="col btn-refresh-key" no-caps />
              <q-btn unelevated label="ACTUALIZAR LLAVE" color="primary" type="submit" :loading="loadingPass" class="col text-black text-bold tracking-widest rounded-lg" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import secondButton from "../components/secondButton.vue";
import primaryTable from "../components/primaryTable.vue";
import { useAuthStore } from "../store/auth.js";
import { converFecha, resetearHoras, formatoPesos, generarFactura } from "../utils/functions.js";
import { postData, putData } from "../services/services.js";
import { showNotify } from "../utils/notify.js";

const router = useRouter();
const authStore = useAuthStore();
const { user, lecturasguardadas, pagosUsuario } = storeToRefs(authStore);

const dialogPassword = ref(false);
const loadingPass = ref(false);
const passForm = ref({ actual: '', nueva: '', confirmar: '' });

const handleCambiarPassword = async () => {
  if (passForm.value.nueva !== passForm.value.confirmar) {
    showNotify.error('Error de Sincronía', 'Las nuevas contraseñas no coinciden.');
    return;
  }
  if (passForm.value.nueva.length < 8) {
    showNotify.warning('Clave Cósmica Débil', 'La nueva llave debe tener al menos 8 caracteres.');
    return;
  }

  loadingPass.value = true;
  try {
    await putData(`usuario/password/${user.value._id}`, { 
      passwordActual: passForm.value.actual, 
      passwordNueva: passForm.value.nueva 
    });
    showNotify.success('Llave Actualizada', '¡Tu llave cósmica ha sido sincronizada con éxito! ✨');
    dialogPassword.value = false;
    passForm.value = { actual: '', nueva: '', confirmar: '' };
  } catch (error) {
    const msg = error.response?.data?.error || 'Error al cambiar la contraseña';
    showNotify.error('Error de Frecuencia', msg);
  } finally {
    loadingPass.value = false;
  }
};


const tabActiva = ref('lecturas');
const misPestanas = [{ label: 'Lecturas', value: 'lecturas' }, { label: 'Pagos', value: 'pagos' }];
const Lecturas = computed(() => lecturasguardadas.value || []);
const Pagos = computed(() => pagosUsuario.value || []);

const verLectura = (item) => {
  if (item.tipo === 'principal') router.push('/lectura_principal');
  else router.push({ path: '/lectura_diaria', query: { fecha: item.fechaLectura } });
};

const lecturaHoy = computed(() => {
  const hoy = converFecha(resetearHoras(new Date()));
  return (lecturasguardadas.value || []).some(l => l.tipo === 'diaria' && converFecha(resetearHoras(new Date(l.fechaLectura))) === hoy);
});

const lecturaPrincipal = computed(() => (lecturasguardadas.value || []).find(l => l.tipo === 'principal'));

onMounted(() => { 
  if (!user.value) {
    router.push('/login');
    return;
  }

  // Lógica de notificación de expiración (5 días antes)
  if (user.value.estado === 1 && user.value.fechaExpiracion) {
    const today = new Date();
    const expiration = new Date(user.value.fechaExpiracion);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 5) {
      showNotify.warning(
        'Renovación Pendiente', 
        `Tu conexión cósmica expirará en ${diffDays} días. Asegura tu flujo de energía.`
      );
    }
  }
});

const logout = () => {
  showNotify.confirm(
    'Cerrar Sesión',
    '¿Deseas desconectarte de tu canal cósmico actual?',
    () => {
      authStore.logout();
      router.push('/login');
    }
  );
};

const enviarCorreoFactura = async (pago, currentUser) => {
  try {
    await postData('/pago/enviar-factura', { 
      email: currentUser.email, 
      nombre: currentUser.nombre, 
      pago: pago 
    });
    showNotify.success('Comprobante Enviado', 'El rastro de tu inversión ha sido enviado al correo.');
  } catch (error) { 
    showNotify.error('Error de Envío', 'No pudimos transmitir el comprobante en este momento.'); 
  }
};
</script>

<style scoped>
@import url("../styles/dashboard.css");
</style>
