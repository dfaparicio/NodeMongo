<template>
  <div>
    <div v-if="loading" class="flex flex-center q-py-xl">
      <q-spinner-orbit color="cyan" size="48px" />
      <span class="text-grey-6 q-ml-md">Cargando pagos...</span>
    </div>

    <div v-else-if="error" class="text-center q-py-xl">
      <q-icon name="error_outline" size="48px" color="red-4" class="q-mb-sm" />
      <p class="text-red-4">{{ error }}</p>
      <q-btn flat color="cyan" label="Reintentar" @click="fetchData" />
    </div>

    <template v-else>
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-6 col-md-4">
          <div class="kpi-mini border-cyan">
            <div class="text-overline text-grey-6 q-mb-xs">Ingresos Totales</div>
            <div class="kpi-num text-cyan">$ {{ ingresosTotales }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div class="kpi-mini">
            <div class="text-overline text-grey-6 q-mb-xs">Transacciones</div>
            <div class="kpi-num text-white">{{ totalTransacciones }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div class="kpi-mini">
            <div class="text-overline text-grey-6 q-mb-xs">Este mes</div>
            <div class="kpi-num text-orange">{{ transaccionesEsteMes }}</div>
          </div>
        </div>
      </div>

      <AdminTable
        title="Historial de Pagos"
        subtitle="Transacciones registradas en la plataforma"
        :columns="columns"
        :rows="rows"
        :has-actions="false"
        search-placeholder="Buscar transacción o usuario..."
      >
        <template #actions-header>
          <q-btn unelevated color="cyan" label="Exportar" icon="download" class="rounded-pill no-caps" />
        </template>
      </AdminTable>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AdminTable from './AdminTable.vue';
import { useAdminStore } from '../../store/admin.js';

const adminStore = useAdminStore();
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    await adminStore.fetchPagos();
  } catch (err) {
    error.value = "Error al recuperar los registros de tesorería";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const columns = [
  { key: 'id', label: 'ID', class: 'font-mono text-cyan text-caption' },
  { key: 'usuario', label: 'Usuario', class: 'text-white text-weight-bold' },
  { key: 'monto', label: 'Monto', align: 'right', class: 'text-white text-weight-bold' },
  { key: 'descripcion', label: 'Descripción', class: 'text-grey-5' },
  { key: 'fechaPago', label: 'Fecha Pago', class: 'text-grey-6' },
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: '2-digit'
  });
}

function formatearMonto(monto) {
  if (monto == null) return '$ 0';
  return '$ ' + Number(monto).toLocaleString('es-CO', { minimumFractionDigits: 0 });
}

const rows = computed(() =>
  adminStore.pagos.map(p => ({
    _id: p._id,
    id: '#' + (p._id?.slice(-6) || '').toUpperCase(),
    usuario: adminStore.usuariosMap[p.usuarioId] || p.usuarioId,
    monto: formatearMonto(p.monto),
    montoNum: p.monto,
    descripcion: p.descripcion || '—',
    fechaPago: formatearFecha(p.fecha),
  }))
);

const totalTransacciones = computed(() => adminStore.pagos.length);

const ingresosTotales = computed(() => {
  const total = adminStore.pagos.reduce((sum, p) => sum + (p.monto || 0), 0);
  return Number(total).toLocaleString('es-CO', { minimumFractionDigits: 0 });
});

const transaccionesEsteMes = computed(() => {
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  return adminStore.pagos.filter(p => new Date(p.fecha) >= inicioMes).length;
});

</script>

<style scoped>
.kpi-mini {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px 24px;
}
.kpi-num {
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
}
.border-cyan { border-color: rgba(0, 229, 255, 0.15) !important; }
.text-cyan { color: #00e5ff; }
.text-orange { color: #f2a900; }
.rounded-pill { border-radius: 20px; }
</style>
