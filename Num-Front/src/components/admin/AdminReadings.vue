<template>
  <div class="q-animate-fade-in">
    <!-- Loading & Error -->
    <div v-if="loading" class="flex flex-center q-py-xl column">
      <q-spinner-orbit color="primary" size="64px" />
      <span class="text-caption text-primary tracking-widest q-mt-md uppercase opacity-60">Sintonizando Crónicas...</span>
    </div>

    <div v-else-if="error" class="text-center q-py-xl glass-panel border-error q-ma-lg">
      <q-icon name="history_edu" size="48px" color="red-4" class="q-mb-md opacity-50" />
      <p class="text-h6 text-white">{{ error }}</p>
      <q-btn outline color="red-4" label="Reintentar Sintonía" @click="fetchData" class="rounded-lg" />
    </div>

    <template v-else>
      <!-- ACTIVITY KPIs -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-4">
          <div class="kpi-reading border-primary">
            <div class="row items-center justify-between q-mb-md">
              <q-icon name="auto_awesome" color="primary" size="sm" />
              <q-badge color="primary-opacity" text-color="primary" label="Histórico" />
            </div>
            <div class="text-caption text-primary opacity-50 uppercase tracking-widest">Lecturas Totales</div>
            <div class="text-h4 text-white text-bold font-mono">{{ totalLecturas }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-reading border-gold">
            <div class="row items-center justify-between q-mb-md">
              <q-icon name="stars" color="gold" size="sm" />
              <q-badge color="gold-opacity" text-color="gold" label="Misión" />
            </div>
            <div class="text-caption text-gold opacity-50 uppercase tracking-widest">Principales</div>
            <div class="text-h4 text-white text-bold font-mono">{{ totalPrincipales }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-reading border-silver">
            <div class="row items-center justify-between q-mb-md">
              <q-icon name="today" color="white" size="sm" />
              <q-badge color="silver-opacity" text-color="white" label="Tránsito" />
            </div>
            <div class="text-caption text-grey-5 opacity-50 uppercase tracking-widest">Diarias</div>
            <div class="text-h4 text-white text-bold font-mono">{{ totalDiarias }}</div>
          </div>
        </div>
      </div>

      <!-- ANALYTICS: FRECUENCIAS MAESTRAS -->
      <div class="glass-panel q-pa-xl q-mb-xl border-glass relative-position overflow-hidden">
        <div class="absolute-top-right q-pa-lg opacity-10"><q-icon name="blur_on" size="120px" /></div>
        <h3 class="text-h6 text-white text-weight-bold q-mt-none q-mb-lg row items-center gap-sm">
          <q-icon name="analytics" color="gold" /> Frecuencias Maestras Detectadas
        </h3>
        <div class="row q-col-gutter-lg">
          <div v-for="(count, num) in topNumeros" :key="num" class="col-4 col-sm-2">
            <div class="frecuencia-card text-center q-pa-md">
              <div class="text-h4 text-gold font-serif text-bold">{{ num }}</div>
              <div class="text-caption text-grey-6 uppercase tracking-widest" style="font-size: 8px;">{{ count }} Almas</div>
            </div>
          </div>
        </div>
      </div>

      <!-- SEARCH & TABLE -->
      <div class="row justify-end q-mb-lg">
        <div class="col-12 col-md-3">
          <q-input 
            v-model="filter" 
            placeholder="Filtrar por buscador..." 
            dark 
            outlined 
            dense
            color="primary"
            class="search-input-astral"
          >
            <template v-slot:prepend><q-icon name="search" color="primary" /></template>
          </q-input>
        </div>
      </div>

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
              <q-td key="usuario" :props="props">
                <div class="text-weight-bold text-white">{{ props.row.usuario }}</div>
              </q-td>
              <q-td key="tipo" :props="props" align="center">
                <q-badge :color="props.row.tipo === 'principal' ? 'gold-9' : 'blue-9'" 
                         :class="props.row.tipo === 'principal' ? 'text-gold border-gold-20' : 'text-blue border-blue-20'"
                         class="q-px-md q-py-xs text-bold uppercase">
                  {{ props.row.tipo === 'principal' ? 'Misión' : 'Diaria' }}
                </q-badge>
              </q-td>
              <q-td key="fecha" :props="props" class="text-grey-6 font-mono text-caption">{{ props.row.fecha }}</q-td>
              <q-td key="preview" :props="props" class="text-grey-5 italic text-caption" style="max-width: 300px;">
                <div class="truncate">{{ props.row.preview }}</div>
              </q-td>
              <q-td class="text-right q-pr-md">
                <q-btn flat round dense icon="visibility" color="primary" @click="verLectura(props.row)" class="hover-glow">
                  <q-tooltip>Ver Contenido Sagrado</q-tooltip>
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
import { showNotify } from '../../utils/notify.js';

const adminStore = useAdminStore();
const loading = ref(false);
const error = ref(null);
const filter = ref('');

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    await adminStore.fetchLecturas();
    await adminStore.fetchUsuarios();
  } catch (err) {
    error.value = "Error al sintonizar con los registros de la IA.";
  } finally {
    loading.value = false;
  }
};

fetchData();

const columns = [
  { name: 'usuario', label: 'Buscador', field: 'usuario', align: 'left' },
  { name: 'tipo', label: 'Esencia', field: 'tipo', align: 'center' },
  { name: 'fecha', label: 'Instante', field: 'fecha', align: 'left' },
  { name: 'preview', label: 'Mensaje (Preview)', field: 'preview', align: 'left' },
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleString('es-CO', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  });
}

function extraerPreview(contenido) {
  try {
    const obj = typeof contenido === 'string' ? JSON.parse(contenido) : contenido;
    return obj.mensaje || obj.descripcion || obj.motivacion || '—';
  } catch { return '—'; }
}

const rows = computed(() =>
  adminStore.lecturas.map(l => ({
    ...l,
    usuario: adminStore.usuariosMap[l.usuarioId] || 'Anónimo',
    fecha: formatearFecha(l.fechaLectura),
    preview: extraerPreview(l.contenido),
  }))
);

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const s = filter.value.toLowerCase();
  return rows.value.filter(r => r.usuario.toLowerCase().includes(s));
});

const totalLecturas = computed(() => adminStore.stats.totalLecturas);
const totalPrincipales = computed(() => adminStore.stats.lecturasPrincipales);
const totalDiarias = computed(() => adminStore.stats.lecturasDiarias);

const topNumeros = computed(() => {
  const conteo = {};
  adminStore.lecturas.forEach(l => {
    try {
      const obj = typeof l.contenido === 'string' ? JSON.parse(l.contenido) : l.contenido;
      const num = obj.numero;
      if (num) conteo[num] = (conteo[num] || 0) + 1;
    } catch (e) {}
  });
  return Object.fromEntries(Object.entries(conteo).sort((a,b) => b[1] - a[1]).slice(0, 6));
});

const verLectura = (row) => {
  showNotify.info(`Lectura de ${row.usuario}`, row.preview);
};
</script>

<style scoped>
.kpi-reading {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 25px;
  transition: all 0.3s ease;
}

.kpi-reading:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-5px);
}

.frecuencia-card {
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.frecuencia-card:hover {
  border-color: rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.08);
}

.search-input-astral :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
}

.cosmic-table { background: transparent !important; }
.hover-row-astral:hover { background: rgba(0, 150, 255, 0.03) !important; }

.border-gold { border-color: rgba(212, 175, 55, 0.3) !important; }
.border-primary { border-color: rgba(0, 150, 255, 0.3) !important; }
.border-silver { border-color: rgba(255, 255, 255, 0.1) !important; }

.gold-opacity { background: rgba(212, 175, 55, 0.1) !important; }
.primary-opacity { background: rgba(0, 150, 255, 0.1) !important; }
.silver-opacity { background: rgba(255, 255, 255, 0.05) !important; }

.border-gold-20 { border: 1px solid rgba(212, 175, 55, 0.2); }
.border-blue-20 { border: 1px solid rgba(0, 150, 255, 0.2); }

.hover-glow:hover { filter: drop-shadow(0 0 5px currentColor); }
.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
