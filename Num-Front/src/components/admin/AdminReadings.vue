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
      <!-- ACTIVITY DASHBOARD (KPIs) -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-primary">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-primary opacity-70">Lecturas Procesadas</div>
                <div class="text-h3 text-white text-bold">{{ totalLecturas }}</div>
              </div>
              <q-icon name="auto_stories" size="48px" color="primary" class="opacity-30" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-gold">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-gold opacity-70">Esencias Principales</div>
                <div class="text-h3 text-white text-bold">{{ totalPrincipales }}</div>
              </div>
              <q-icon name="stars" size="48px" color="gold" class="opacity-30" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-silver">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-grey-5 opacity-70">Registros Diarios</div>
                <div class="text-h3 text-white text-bold">{{ totalDiarias }}</div>
              </div>
              <q-icon name="history" size="48px" color="white" class="opacity-30" />
            </div>
          </div>
        </div>
      </div>

      <!-- SEARCH & TABLE -->
      <div class="row items-center justify-between q-mb-lg">
        <div class="text-h5 text-white text-weight-light">Bitácora de <span class="text-bold text-primary">Lecturas AI</span></div>
        <q-input 
          v-model="filter" 
          placeholder="Filtrar por buscador o contenido..." 
          dark 
          outlined 
          dense
          style="width: 350px"
          class="search-professional"
        >
          <template v-slot:prepend><q-icon name="search" color="primary" /></template>
        </q-input>
      </div>

      <div class="glass-panel-dark overflow-hidden">
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
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-primary text-bold">
                {{ col.label }}
              </q-th>
              <q-th class="text-right text-primary text-bold q-pr-lg">Acción</q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="row-professional">
              <q-td key="tipo" :props="props" align="center">
                <q-badge :color="props.row.tipo === 'principal' ? 'gold-9' : 'blue-10'" 
                         :class="props.row.tipo === 'principal' ? 'text-gold border-gold' : 'text-blue-2 border-blue'"
                         class="q-px-md q-py-xs text-bold uppercase badge-astral">
                  {{ props.row.tipo === 'principal' ? 'Misión' : 'Diaria' }}
                </q-badge>
              </q-td>
              <q-td key="nombre" :props="props">
                <div class="text-white text-weight-bold">{{ props.row.usuario }}</div>
              </q-td>
              <q-td key="fecha" :props="props">
                <div class="column">
                  <span class="text-white font-mono text-caption">{{ props.row.fecha }}</span>
                  <span class="text-grey-6 text-mini">{{ props.row.hora }}</span>
                </div>
              </q-td>
              <q-td key="preview" :props="props" class="text-grey-5 italic" style="max-width: 400px;">
                <div class="truncate-2-lines">{{ props.row.preview }}</div>
              </q-td>
              <q-td class="text-right q-pr-md">
                <q-btn flat round dense icon="visibility" color="primary" @click="verLectura(props.row)" class="action-btn">
                  <q-tooltip>Expandir Registro</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </template>

    <!-- MODAL DE LECTURA DETALLADA -->
    <q-dialog v-model="modalDetalle" transition-show="scale" transition-hide="scale">
      <q-card class="modal-astral-detail glass-panel-dark text-white">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-primary text-bold uppercase tracking-widest">
            <q-icon name="auto_awesome" class="q-mr-sm" /> 
            Detalle de la Lectura
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-xl">
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-4">
              <div class="info-label">Buscador</div>
              <div class="info-value">{{ lecturaSeleccionada.usuario }}</div>
              
              <div class="info-label q-mt-md">Tipo de Esencia</div>
              <q-badge :label="lecturaSeleccionada.tipo" color="primary" />
              
              <div class="info-label q-mt-md">Fecha y Hora</div>
              <div class="text-caption opacity-70">{{ lecturaSeleccionada.fecha }} - {{ lecturaSeleccionada.hora }}</div>
            </div>
            
            <div class="col-12 col-md-8">
              <div class="reading-content-box shadow-inner">
                <div class="info-label q-mb-sm">Mensaje Transmitido</div>
                <p class="text-body1 text-grey-3 line-height-relaxed">{{ lecturaSeleccionada.preview }}</p>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cerrar Registro" color="grey-5" v-close-popup />
          <q-btn unelevated label="Copiar Contenido" color="primary" @click="copiarLectura" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';
import { showNotify } from '../../utils/notify.js';
import { copyToClipboard } from 'quasar';

const adminStore = useAdminStore();
const loading = ref(false);
const error = ref(null);
const filter = ref('');
const modalDetalle = ref(false);
const lecturaSeleccionada = ref({});

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    await adminStore.fetchLecturas();
    await adminStore.fetchUsuarios();
  } catch (err) {
    error.value = "Error al sintonizar con los registros centrales.";
  } finally {
    loading.value = false;
  }
};

fetchData();

const columns = [
  { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'center' },
  { name: 'nombre', label: 'Buscador', field: 'usuario', align: 'left' },
  { name: 'fecha', label: 'Fecha y Hora', field: 'fecha', align: 'left' },
  { name: 'preview', label: 'Mensaje Generado', field: 'preview', align: 'left' },
];

function extraerPreview(contenido) {
  try {
    const obj = typeof contenido === 'string' ? JSON.parse(contenido) : contenido;
    return obj.mensaje || obj.descripcion || obj.motivacion || 'Sin contenido disponible';
  } catch { return 'Contenido no procesable'; }
}

const rows = computed(() =>
  adminStore.lecturas.map(l => {
    const d = new Date(l.fechaLectura);
    return {
      ...l,
      usuario: adminStore.usuariosMap[l.usuarioId] || 'Anónimo',
      fecha: d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      hora: d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      preview: extraerPreview(l.contenido),
    };
  })
);

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const s = filter.value.toLowerCase();
  return rows.value.filter(r => 
    r.usuario.toLowerCase().includes(s) || 
    r.preview.toLowerCase().includes(s)
  );
});

const totalLecturas = computed(() => adminStore.lecturas.length);
const totalPrincipales = computed(() => adminStore.lecturas.filter(l => l.tipo === 'principal').length);
const totalDiarias = computed(() => totalLecturas.value - totalPrincipales.value);

const verLectura = (row) => {
  lecturaSeleccionada.value = row;
  modalDetalle.value = true;
};

const copiarLectura = () => {
  copyToClipboard(lecturaSeleccionada.value.preview);
  showNotify.success('Copiado', 'El mensaje ha sido copiado al portapapeles.');
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

.glass-panel-dark {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.table-professional :deep(.q-table__card) { background: transparent; }
.table-professional :deep(th) { text-transform: uppercase; letter-spacing: 1.5px; font-size: 10px; }

.row-professional:hover {
  background: rgba(59, 130, 246, 0.02) !important;
}

.badge-astral { letter-spacing: 1px; border: 1px solid transparent; }
.border-gold { border-color: rgba(212, 175, 55, 0.3) !important; }
.border-blue { border-color: rgba(59, 130, 246, 0.3) !important; }

.search-professional :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.5);
}

.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  line-height: 1.4;
}

.modal-astral-detail {
  width: 800px;
  max-width: 90vw;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.info-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #3b82f6; font-weight: 800; }
.info-value { font-size: 18px; font-weight: 700; color: #fff; }

.reading-content-box {
  background: rgba(0,0,0,0.2);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.text-mini { font-size: 10px; }
.line-height-relaxed { line-height: 1.8; }

.border-primary { border-bottom: 3px solid #3b82f6; }
.border-gold { border-bottom: 3px solid #d4af37; }
.border-silver { border-bottom: 3px solid #94a3b8; }

.action-btn:hover { background: rgba(59, 130, 246, 0.1); }
</style>
