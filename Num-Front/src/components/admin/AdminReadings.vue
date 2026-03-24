<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex flex-center q-py-xl">
      <q-spinner-orbit color="deep-purple-4" size="48px" />
      <span class="text-grey-6 q-ml-md">Cargando lecturas...</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center q-py-xl">
      <q-icon name="error_outline" size="48px" color="red-4" class="q-mb-sm" />
      <p class="text-red-4">{{ error }}</p>
      <q-btn flat color="deep-purple-4" label="Reintentar" @click="fetchData" />
    </div>

    <template v-else>
      <!-- Mini KPIs -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-6 col-md-4">
          <div class="kpi-mini border-purple">
            <div class="text-overline text-grey-6 q-mb-xs">Lecturas Principales</div>
            <div class="kpi-num text-purple">{{ totalPrincipales }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div class="kpi-mini">
            <div class="text-overline text-grey-6 q-mb-xs">Lecturas Diarias</div>
            <div class="kpi-num text-white">{{ totalDiarias }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <div class="kpi-mini">
            <div class="text-overline text-grey-6 q-mb-xs">Total Lecturas</div>
            <div class="kpi-num text-amber">{{ totalLecturas }}</div>
          </div>
        </div>
      </div>

      <!-- Reusable Table -->
      <AdminTable
        title="Monitor de Lecturas"
        subtitle="Actividad de lecturas generadas por la IA"
        :columns="columns"
        :rows="rows"
        :has-actions="false"
      >
        <template #actions-header>
          <q-btn unelevated color="deep-purple-4" label="Refrescar" icon="refresh" class="rounded-pill no-caps" @click="fetchData" />
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
    await new Promise(resolve => setTimeout(resolve, 800));
    await adminStore.fetchLecturas();
  } catch (err) {
    error.value = "Error al sintonizar con el flujo de lecturas";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const columns = [
  { key: 'usuario', label: 'Usuario', class: 'text-white text-weight-bold' },
  { key: 'tipoLabel', label: 'Tipo', type: 'badge',
    badgeMap: { 'Principal': 'deep-purple', 'Diaria': 'blue' } },
  { key: 'fecha', label: 'Fecha Lectura', class: 'text-grey-6' },
  { key: 'preview', label: 'Contenido', class: 'text-grey-5' },
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  const d = new Date(fecha);
  const ahora = new Date();
  const diffMs = ahora - d;
  const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHoras < 1) return 'Hace unos minutos';
  if (diffHoras < 24) return `Hace ${diffHoras} h`;
  if (diffDias === 1) return 'Ayer';
  return d.toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: '2-digit'
  });
}

function extraerPreview(contenido) {
  try {
    const obj = typeof contenido === 'string' ? JSON.parse(contenido) : contenido;
    return (obj.mensaje || obj.descripcion || obj.motivacion || '—').substring(0, 60) + '...';
  } catch {
    return '—';
  }
}

const rows = computed(() =>
  adminStore.lecturas.map(l => ({
    _id: l._id,
    usuario: adminStore.usuariosMap[l.usuarioId] || l.usuarioId,
    tipoLabel: l.tipo === 'principal' ? 'Principal' : 'Diaria',
    fecha: formatearFecha(l.fechaLectura),
    preview: extraerPreview(l.contenido),
  }))
);

const totalLecturas = computed(() => adminStore.lecturas.length);
const totalPrincipales = computed(() => adminStore.lecturas.filter(l => l.tipo === 'principal').length);
const totalDiarias = computed(() => adminStore.lecturas.filter(l => l.tipo === 'diaria').length);

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
.border-purple { border-color: rgba(103, 58, 183, 0.3) !important; }
.text-purple { color: #b39ddb; }
.text-amber { color: #f2a900; }
.rounded-pill { border-radius: 20px; }
</style>
