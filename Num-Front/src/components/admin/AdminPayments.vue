<template>
  <div class="admin-payments q-gutter-y-xl q-pa-md animate-fade-in">

    <!-- KPI Cards (mismo estilo que el Dashboard) -->
    <div class="row q-col-gutter-xl q-mb-xl">
      <div class="col-12 col-md-4" v-for="card in kpiCards" :key="card.title">
        <q-card class="kpi-card-galactic overflow-hidden no-border">
          <q-card-section class="q-pa-lg relative-position z-top">
            <div class="row items-center justify-between q-mb-md">
              <div class="icon-circle" :style="{ background: card.glowColor }">
                <q-icon :name="card.icon" size="24px" :color="card.color" />
              </div>
              <div class="text-caption text-gold-soft tracking-widest text-uppercase font-bold" style="font-size: 9px;">{{ card.title }}</div>
            </div>
            <div class="text-h3 text-weight-bolder font-serif tracking-tighter" :class="card.textClass">{{ card.value }}</div>
          </q-card-section>
          <div class="kpi-light-source" :style="{ background: `radial-gradient(circle at 30% 20%, ${card.glowColor} 0%, transparent 80%)` }"></div>
          <div class="kpi-glass-shimmer"></div>
        </q-card>
      </div>
    </div>

    <!-- PANEL DE ABUNDANCIA (misma estructura que Almas/Resumen) -->
    <q-card class="kpi-card-galactic overflow-hidden no-border">

      <!-- Header -->
      <q-card-section class="row items-center justify-between q-pa-xl border-bottom-panel relative-position z-top">
        <div class="column q-gutter-y-none">
          <div class="row items-center q-gutter-x-sm q-mb-xs">
            <div class="panel-icon-dot"></div>
            <span class="text-gold-soft tracking-widest uppercase text-weight-bold" style="font-size: 9px; letter-spacing: 3px;">Registros Financieros</span>
          </div>
          <h3 class="text-h4 font-serif italic text-white q-ma-none">Historial de Abundancia</h3>
        </div>

        <div class="row q-gutter-x-md items-center">
          <q-input
            v-model="filterText"
            placeholder="Buscar alma..."
            dark borderless dense
            class="search-input-premium q-px-md"
            style="min-width: 220px"
          >
            <template v-slot:append>
              <q-icon name="search" color="gold" size="xs" />
            </template>
          </q-input>

          <q-select
            v-model="statusFilter"
            :options="statusOptions"
            label="Estado"
            label-color="gold"
            dark dense borderless
            emit-value map-options
            class="status-select-premium q-px-md"
            style="min-width: 140px"
          />

        </div>

        <!-- Línea de luz inferior -->
        <div class="panel-light-line"></div>
      </q-card-section>

      <!-- Lista de Pagos (misma estructura q-list que en Almas) -->
      <q-card-section class="q-pa-none relative-position z-top" style="max-height: 380px; overflow-y: auto;">
        <q-list padding class="q-px-md">

          <q-item
            v-for="pago in filteredPayments"
            :key="pago._id"
            class="q-my-sm rounded-xl payment-list-item q-py-sm q-px-md"
            v-ripple
          >
            <!-- Avatar -->
            <q-item-section avatar style="min-width: 56px; padding-right: 12px;">
              <q-avatar size="40px" class="ghost-avatar">
                <span class="text-weight-bold" style="font-size: 15px;">{{ getUserName(pago.usuarioId).charAt(0).toUpperCase() }}</span>
              </q-avatar>
            </q-item-section>

            <!-- Nombre + Fecha/Método -->
            <q-item-section style="flex: 1; min-width: 160px;">
              <q-item-label class="text-weight-bold text-white" style="font-size: 14px;">{{ getUserName(pago.usuarioId) }}</q-item-label>
              <q-item-label caption class="text-grey-5 font-mono" style="font-size: 11px;">
                {{ new Date(pago.fecha).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }) }}
                · {{ pago.metodoPago || 'N/A' }}
              </q-item-label>
            </q-item-section>

            <!-- Monto -->
            <q-item-section side style="min-width: 110px; padding: 0 16px;">
              <q-badge outline color="positive" class="q-px-md rounded-xl tracking-widest font-bold font-serif" style="font-size: 12px; padding-top:4px; padding-bottom:4px;">
                ${{ (pago.monto || 0).toLocaleString() }}
              </q-badge>
            </q-item-section>

            <!-- Estado Orb -->
            <q-item-section side style="min-width: 100px; padding: 0 16px;">
              <div class="row items-center q-gutter-x-sm no-wrap">
                <div :class="getOrbClass(pago.estado)"></div>
                <span
                  class="text-weight-bold tracking-widest"
                  :class="getTextColorClass(pago.estado)"
                  style="font-size: 10px;"
                >{{ pago.estado ? pago.estado.toUpperCase() : 'N/A' }}</span>
              </div>
            </q-item-section>

            <!-- Acción -->
            <q-item-section side style="min-width: 130px; padding-left: 16px;">
              <q-btn
                flat no-caps unelevated
                icon="receipt_long" label="Factura"
                color="primary"
                class="action-pill-btn action-pill-edit"
                :loading="sendingInvoiceId === pago._id"
                @click.stop="reenviarFactura(pago)"
              />
            </q-item-section>
          </q-item>

          <!-- Estado vacío -->
          <div v-if="filteredPayments.length === 0" class="text-center q-pa-xl flex flex-center column opacity-30">
            <q-icon name="payments" size="4em" class="q-mb-md" />
            <p class="text-h6 font-light">El flujo de abundancia aún no fluye...</p>
          </div>

        </q-list>
      </q-card-section>

      <!-- Luz decorativa -->
      <div class="kpi-light-source" style="background: radial-gradient(circle at 90% 10%, rgba(33, 186, 69, 0.05), transparent 50%)"></div>
    </q-card>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';
import { postData } from '../../services/services.js';
import { showNotify } from '../../utils/notify.js';

const adminStore = useAdminStore();

const filterText = ref('');
const statusFilter = ref('todos');
const sendingInvoiceId = ref(null);

const statusOptions = [
  { label: 'Todos los estados', value: 'todos' },
  { label: 'Aprobado', value: 'aprobado' },
  { label: 'Pendiente', value: 'pendiente' },
  { label: 'Rechazado', value: 'rechazado' },
  { label: 'En proceso', value: 'en_proceso' }
];

const currentMonthPayments = computed(() => {
  const now = new Date();
  return adminStore.pagos.filter(p => {
    const pDate = new Date(p.fecha);
    return pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear();
  }).length;
});

const averageTicket = computed(() => {
  if (adminStore.pagos.length === 0) return 0;
  return Math.round(adminStore.stats.ingresosTotales / adminStore.pagos.length).toLocaleString();
});

const kpiCards = computed(() => [
  {
    title: 'Recaudación Total',
    value: `$${adminStore.stats.ingresosTotales.toLocaleString()}`,
    icon: 'payments', color: 'positive', textClass: 'text-positive',
    glowColor: 'rgba(33, 186, 69, 0.2)'
  },
  {
    title: 'Pagos del Mes',
    value: currentMonthPayments.value,
    icon: 'calendar_month', color: 'white', textClass: 'text-white',
    glowColor: 'rgba(212, 175, 55, 0.2)'
  },
  {
    title: 'Ticket Promedio',
    value: `$${averageTicket.value}`,
    icon: 'analytics', color: 'info', textClass: 'text-info',
    glowColor: 'rgba(49, 204, 239, 0.2)'
  }
]);

const filteredPayments = computed(() => {
  return adminStore.pagos.filter(p => {
    if (statusFilter.value !== 'todos' && p.estado !== statusFilter.value) return false;
    if (filterText.value.trim()) {
      const nombre = getUserName(p.usuarioId).toLowerCase();
      const email = getUserEmail(p.usuarioId).toLowerCase();
      const q = filterText.value.toLowerCase();
      return nombre.includes(q) || email.includes(q);
    }
    return true;
  });
});

const reenviarFactura = async (pago) => {
  const email = getUserEmail(pago.usuarioId);
  const nombre = getUserName(pago.usuarioId);
  if (!email || email === 'Sin Email') {
    showNotify.warning('Error', 'No hay email asociado a este usuario.');
    return;
  }
  sendingInvoiceId.value = pago._id;
  try {
    await postData('/pago/enviar-factura', {
      email, nombre,
      pago: { monto: pago.monto, descripcion: pago.descripcion, mpPaymentId: pago.mpPaymentId, fecha: pago.fecha }
    });
    showNotify.success('Éxito', 'Factura reenviada correctamente.');
  } catch (error) {
    console.error(error);
    showNotify.error('Error', 'No se pudo enviar la factura.');
  } finally {
    sendingInvoiceId.value = null;
  }
};

const getOrbClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'aprobado': return 'status-orb-active';
    case 'pendiente': return 'status-orb-warning';
    case 'rechazado': return 'status-orb-inactive';
    default: return 'status-orb-inactive';
  }
};

const getTextColorClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'aprobado': return 'text-positive';
    case 'pendiente': return 'text-warning';
    case 'rechazado': return 'text-negative';
    default: return 'text-grey-5';
  }
};

const getUserName = (val) => {
  if (val && typeof val === 'object' && val.nombre) return val.nombre;
  return adminStore.usuariosMap[val] || 'Usuario Desconocido';
};

const getUserEmail = (val) => {
  if (val && typeof val === 'object' && val.email) return val.email;
  if (typeof val === 'string') return val;
  return 'Sin Email';
};
</script>

<style scoped>
/* KPI CARDS */
.kpi-card-galactic {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  position: relative;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.kpi-card-galactic:hover {
  transform: translateY(-8px);
  border-color: rgba(212, 175, 55, 0.4);
  background: rgba(255, 255, 255, 0.05);
}
.icon-circle {
  width: 52px; height: 52px;
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
}
.kpi-light-source {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0; pointer-events: none;
}
.kpi-glass-shimmer {
  position: absolute; top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent);
  transform: skewX(-25deg); transition: 0.75s;
}
.kpi-card-galactic:hover .kpi-glass-shimmer { left: 150%; }
.z-top { position: relative; z-index: 2; }

/* HEADER */
.border-bottom-glass-soft {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.border-glass-btn {
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.border-glass-btn:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.6);
}

/* INPUTS */
.search-input-premium, .status-select-premium {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.search-input-premium:hover, .status-select-premium:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(212, 175, 55, 0.4);
}

/* LISTA DE PAGOS */
.payment-list-item {
  transition: all 0.3s ease;
  border-radius: 16px;
}
.payment-list-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

/* AVATAR */
.ghost-avatar {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* STATUS ORBs */
.status-orb-active {
  width: 10px; height: 10px; border-radius: 50%;
  background: #21ba45; box-shadow: 0 0 10px #21ba45;
  animation: pulse-green 2s infinite;
}
.status-orb-warning {
  width: 10px; height: 10px; border-radius: 50%;
  background: #f2c037; box-shadow: 0 0 10px #f2c037;
  animation: pulse-yellow 2s infinite;
}
.status-orb-inactive {
  width: 10px; height: 10px; border-radius: 50%;
  background: #c10015; box-shadow: 0 0 10px #c10015;
  animation: pulse-red 2s infinite;
}

@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(33, 186, 69, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0); }
}
@keyframes pulse-yellow {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(242, 192, 55, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(242, 192, 55, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(242, 192, 55, 0); }
}
@keyframes pulse-red {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(193, 0, 21, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(193, 0, 21, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(193, 0, 21, 0); }
}

/* ACTION */
.action-btn-glass {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}
.action-btn-glass:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  border-color: rgba(212, 175, 55, 0.3);
}
</style>
