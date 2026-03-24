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
      <!-- FINANCIAL KPIs -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-4">
          <div class="kpi-financial border-gold">
            <q-icon name="account_balance_wallet" color="gold" size="2rem" class="q-mb-md opacity-40" />
            <div class="text-caption text-gold opacity-50 uppercase tracking-widest">Ingresos Totales</div>
            <div class="text-h4 text-white text-bold font-mono">{{ formatoPesos(ingresosTotales) }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-financial border-emerald">
            <q-icon name="trending_up" color="emerald" size="2rem" class="q-mb-md opacity-40" />
            <div class="text-caption text-emerald opacity-50 uppercase tracking-widest">Sincronizaciones ({{ totalTransacciones }})</div>
            <div class="text-h4 text-white text-bold font-mono">{{ formatoPesos(promedioPago) }} <span class="text-caption text-grey-5">Prom</span></div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-financial border-primary">
            <q-icon name="event_available" color="primary" size="2rem" class="q-mb-md opacity-40" />
            <div class="text-caption text-primary opacity-50 uppercase tracking-widest">Este Mes Astral</div>
            <div class="text-h4 text-white text-bold font-mono">+{{ transaccionesEsteMes }} <span class="text-caption text-grey-5">Pagos</span></div>
          </div>
        </div>
      </div>

      <!-- SEARCH & FILTERS -->
      <div class="row justify-end q-mb-lg">
        <div class="col-12 col-md-3">
          <q-input 
            v-model="filter" 
            placeholder="Buscar ID o Usuario..." 
            dark 
            outlined 
            dense
            color="gold"
            class="search-input-astral"
          >
            <template v-slot:prepend><q-icon name="receipt_long" color="gold" /></template>
          </q-input>
        </div>
      </div>

      <!-- PAYMENTS TABLE -->
      <div class="glass-panel border-glass overflow-hidden">
        <q-table
          :rows="filteredRows"
          :columns="columns"
          row-key="_id"
          flat
          dark
          class="bg-transparent cosmic-table"
          :pagination="{ rowsPerPage: 10 }"
        >
          <template v-slot:header="props">
            <q-tr :props="props" class="text-gold opacity-60 uppercase tracking-widest">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-caption">
                {{ col.label }}
              </q-th>
              <th class="text-right q-pr-lg">Acción</th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="hover-row-astral">
              <q-td key="id" :props="props" class="font-mono text-gold text-caption">{{ props.row.id }}</q-td>
              <q-td key="usuario" :props="props">
                <div class="text-weight-bold text-white">{{ props.row.usuario }}</div>
              </q-td>
              <q-td key="monto" :props="props" class="text-right text-white text-weight-bolder font-mono">
                {{ props.row.monto }}
              </q-td>
              <q-td key="descripcion" :props="props" class="text-grey-5 italic">{{ props.row.descripcion }}</q-td>
              <q-td key="fechaPago" :props="props" class="text-grey-6 text-caption">{{ props.row.fechaPago }}</q-td>
              <q-td class="text-right q-pr-md">
                <q-btn flat round dense icon="print" color="gold" @click="imprimir(props.row)" class="hover-glow">
                  <q-tooltip>Imprimir Factura</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="mail" color="emerald" @click="enviarCorreo(props.row)" class="q-ml-xs hover-glow">
                  <q-tooltip>Reenviar al Correo</q-tooltip>
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

const adminStore = useAdminStore();
const loading = ref(false);
const error = ref(null);
const filter = ref('');

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    await adminStore.fetchPagos();
    await adminStore.fetchUsuarios(); // Necesario para el mapeo de nombres
  } catch (err) {
    error.value = "Error al recuperar los registros de tesorería cósmica.";
  } finally {
    loading.value = false;
  }
};

fetchData();

const columns = [
  { name: 'id', label: 'ID Transacción', field: 'id', align: 'left' },
  { name: 'usuario', label: 'Buscador', field: 'usuario', align: 'left' },
  { name: 'monto', label: 'Inversión', field: 'monto', align: 'right' },
  { name: 'descripcion', label: 'Servicio', field: 'descripcion', align: 'left' },
  { name: 'fechaPago', label: 'Fecha Sincronía', field: 'fechaPago', align: 'left' },
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: '2-digit'
  });
}

const rows = computed(() =>
  adminStore.pagos.map(p => ({
    ...p,
    id: '#' + (p._id?.slice(-8) || '').toUpperCase(),
    usuario: adminStore.usuariosMap[p.usuarioId] || 'Buscador Desconocido',
    monto: formatoPesos(p.monto),
    montoNum: p.monto,
    fechaPago: formatearFecha(p.fecha),
  }))
);

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const s = filter.value.toLowerCase();
  return rows.value.filter(r => r.usuario.toLowerCase().includes(s) || r.id.toLowerCase().includes(s));
});

const ingresosTotales = computed(() => adminStore.stats.ingresosTotales);
const totalTransacciones = computed(() => adminStore.pagos.length);
const promedioPago = computed(() => totalTransacciones.value ? ingresosTotales.value / totalTransacciones.value : 0);

const transaccionesEsteMes = computed(() => {
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  return adminStore.pagos.filter(p => new Date(p.fecha) >= inicioMes).length;
});

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
    showNotify.success('Factura Reenviada', `El comprobante de DevsCenter ha sido transmitido a ${usuarioFull.email}.`);
  } catch (error) {
    showNotify.error('Fallo de Transmisión', 'No se pudo reenviar la factura electrónica.');
  }
};
</script>

<style scoped>
.kpi-financial {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
}

.kpi-financial:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-5px);
}

.search-input-astral :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
}

.cosmic-table { background: transparent !important; }

.hover-row-astral:hover {
  background: rgba(212, 175, 55, 0.03) !important;
}

.border-gold { border-color: rgba(212, 175, 55, 0.3) !important; }
.border-emerald { border-color: rgba(16, 185, 129, 0.3) !important; }
.border-primary { border-color: rgba(0, 150, 255, 0.3) !important; }

.text-gold { color: #d4af37; }
.text-emerald { color: #10b981; }

.hover-glow:hover { filter: drop-shadow(0 0 5px currentColor); }
</style>
