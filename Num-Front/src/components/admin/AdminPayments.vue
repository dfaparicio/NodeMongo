<template>
  <div class="q-animate-fade-in">
    <!-- Loading & Error -->
    <div v-if="loading" class="flex flex-center q-py-xl column">
      <q-spinner-orbit color="gold" size="64px" />
      <span class="text-caption text-gold tracking-widest q-mt-md uppercase opacity-60">Calculando Abundancia...</span>
    </div>

    <div v-else-if="error" class="text-center q-py-xl glass-panel border-error q-ma-lg">
      <q-icon name="money_off" size="48px" color="red-4" class="q-mb-md" />
      <p class="text-h6 text-white">{{ error }}</p>
      <q-btn outline color="red-4" label="Reintentar Auditoría" @click="fetchData" class="rounded-lg" />
    </div>

    <template v-else>
      <!-- DASHBOARD FINANCIERO (KPIs) -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-gold shadow-glow-gold">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-gold opacity-70">Ingresos Totales</div>
                <div class="text-h3 text-white text-bold font-mono">{{ formatoPesos(ingresosTotales) }}</div>
              </div>
              <q-icon name="payments" size="48px" color="gold" class="opacity-30" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-emerald">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-emerald opacity-70">Transacciones</div>
                <div class="text-h3 text-white text-bold">{{ totalTransacciones }}</div>
              </div>
              <q-icon name="receipt_long" size="48px" color="emerald" class="opacity-30" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-primary">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-primary opacity-70">Ticket Promedio</div>
                <div class="text-h3 text-white text-bold font-mono">{{ formatoPesos(promedioPago) }}</div>
              </div>
              <q-icon name="analytics" size="48px" color="primary" class="opacity-30" />
            </div>
          </div>
        </div>
      </div>

      <!-- BUSCADOR FINANCIERO -->
      <div class="row items-center justify-between q-mb-lg">
        <div class="text-h5 text-white text-weight-light">Historial de <span class="text-bold text-gold">Transacciones</span></div>
        <q-input 
          v-model="filter" 
          placeholder="Buscar por ID, Usuario o Servicio..." 
          dark 
          outlined 
          dense
          style="width: 400px"
          class="search-professional-gold"
        >
          <template v-slot:prepend><q-icon name="search" color="gold" /></template>
        </q-input>
      </div>

      <!-- PAYMENTS TABLE -->
      <div class="glass-panel-dark overflow-hidden shadow-24">
        <q-table
          :rows="filteredRows"
          :columns="columns"
          row-key="_id"
          flat
          dark
          class="bg-transparent table-professional"
          :pagination="{ rowsPerPage: 10 }"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-gold text-bold">
                {{ col.label }}
              </q-th>
              <q-th class="text-right text-gold text-bold">Comprobantes</q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="row-professional">
              <q-td key="id" :props="props">
                <div class="font-mono text-caption text-gold opacity-80 cursor-pointer" @click="copyToClipboard(props.row._id)">
                  {{ props.row._id }}
                  <q-tooltip>Copiar ID de Transacción</q-tooltip>
                </div>
              </q-td>
              <q-td key="usuario" :props="props">
                <div class="text-weight-bold text-white">{{ props.row.usuario }}</div>
              </q-td>
              <q-td key="monto" :props="props">
                <div class="text-white text-bold font-mono text-right">{{ props.row.monto }}</div>
              </q-td>
              <q-td key="descripcion" :props="props">
                <div class="column">
                  <span class="text-grey-4 text-weight-medium">{{ props.row.descripcion }}</span>
                  <div class="row items-center gap-sm q-mt-xs">
                    <q-linear-progress 
                      :value="props.row.progreso" 
                      :color="props.row.progreso > 0.2 ? 'emerald' : 'red-4'" 
                      class="progress-service"
                    />
                    <span class="text-mini opacity-60">{{ props.row.diasRestantes }}d restantes</span>
                  </div>
                </div>
              </q-td>
              <q-td key="fechaPago" :props="props">
                <div class="text-grey-5 text-caption">{{ props.row.fechaPago }}</div>
              </q-td>
              <q-td class="text-right">
                <q-btn flat round dense icon="description" color="gold" @click="imprimir(props.row)" class="action-btn-gold">
                  <q-tooltip>Generar PDF</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="send" color="emerald" @click="enviarCorreo(props.row)" class="q-ml-xs action-btn-gold">
                  <q-tooltip>Enviar por Email</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';
import { formatoPesos, generarFactura } from '../../utils/functions.js';
import { postData } from '../../services/services.js';
import { showNotify } from '../../utils/notify.js';
import { copyToClipboard } from 'quasar';

const adminStore = useAdminStore();
const loading = ref(false);
const error = ref(null);
const filter = ref('');

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    await adminStore.fetchPagos();
    await adminStore.fetchUsuarios();
  } catch (err) {
    error.value = "Error al recuperar los registros de tesorería central.";
  } finally {
    loading.value = false;
  }
};

fetchData();

const columns = [
  { name: 'id', label: 'ID Transacción (DB)', field: '_id', align: 'left' },
  { name: 'usuario', label: 'Cliente / Buscador', field: 'usuario', align: 'left' },
  { name: 'monto', label: 'Inversión', field: 'monto', align: 'right' },
  { name: 'descripcion', label: 'Servicio Adquirido / Vigencia', field: 'descripcion', align: 'left' },
  { name: 'fechaPago', label: 'Fecha de Pago', field: 'fechaPago', align: 'left' },
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
  });
}

const rows = computed(() =>
  adminStore.pagos.map(p => {
    const fechaPago = new Date(p.fecha);
    const fechaVence = new Date(fechaPago.getTime() + (30 * 24 * 60 * 60 * 1000)); // Asumiendo 30 días
    const hoy = new Date();
    const totalMs = fechaVence - fechaPago;
    const restMs = fechaVence - hoy;
    const progreso = Math.max(0, Math.min(1, restMs / totalMs));
    const diasRestantes = Math.max(0, Math.ceil(restMs / (1000 * 60 * 60 * 24)));

    return {
      ...p,
      usuario: adminStore.usuariosMap[p.usuarioId] || 'Usuario no identificado',
      monto: formatoPesos(p.monto),
      fechaPago: formatearFecha(p.fecha),
      progreso,
      diasRestantes
    };
  })
);

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const s = filter.value.toLowerCase();
  return rows.value.filter(r => 
    r.usuario.toLowerCase().includes(s) || 
    r._id.toLowerCase().includes(s) ||
    r.descripcion.toLowerCase().includes(s)
  );
});

const ingresosTotales = computed(() => adminStore.stats.ingresosTotales);
const totalTransacciones = computed(() => adminStore.pagos.length);
const promedioPago = computed(() => totalTransacciones.value ? ingresosTotales.value / totalTransacciones.value : 0);

/* ═══════════ ACCIONES ═══════════ */
const imprimir = (row) => {
  generarFactura(row, row.usuario);
};

const enviarCorreo = async (row) => {
  try {
    const usuarioFull = adminStore.usuarios.find(u => u._id === row.usuarioId);
    if (!usuarioFull) throw new Error("Usuario no encontrado");

    await postData('/pago/enviar-factura', { 
      email: usuarioFull.email, 
      nombre: usuarioFull.nombre, 
      pago: row 
    });
    showNotify.success('Enviado', `Comprobante enviado a ${usuarioFull.email}`);
  } catch (error) {
    showNotify.error('Error', 'No se pudo enviar el correo.');
  }
};
</script>

<style scoped>
.kpi-card-professional {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.shadow-glow-gold {
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
}

.glass-panel-dark {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.table-professional :deep(.q-table__card) { background: transparent; }
.table-professional :deep(th) { text-transform: uppercase; letter-spacing: 1.5px; font-size: 10px; }

.row-professional:hover {
  background: rgba(212, 175, 55, 0.02) !important;
}

.progress-service {
  height: 6px;
  border-radius: 3px;
  width: 120px;
}

.text-mini { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

.search-professional-gold :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.1);
}

.action-btn-gold:hover { background: rgba(212, 175, 55, 0.1); }

.border-gold { border-bottom: 3px solid #d4af37; }
.border-emerald { border-bottom: 3px solid #10b981; }
.border-primary { border-bottom: 3px solid #3b82f6; }
</style>
