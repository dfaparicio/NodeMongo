<template>
  <div class="admin-readings q-gutter-y-xl q-pa-md animate-fade-in">

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

    <!-- PANEL DE CRÓNICAS (mismo patrón que Almas/Abundancia) -->
    <q-card class="kpi-card-galactic overflow-hidden no-border">

      <!-- Header -->
      <q-card-section class="row items-center justify-between q-pa-xl border-bottom-panel relative-position z-top">
        <div class="column q-gutter-y-none">
          <div class="row items-center q-gutter-x-sm q-mb-xs">
            <div class="panel-icon-dot"></div>
            <span class="text-gold-soft tracking-widest uppercase text-weight-bold" style="font-size: 9px; letter-spacing: 3px;">Bitácora Celestial</span>
          </div>
          <h3 class="text-h4 font-serif italic text-white q-ma-none">Control de Frecuencias</h3>
        </div>

        <div class="row q-gutter-x-md items-center">
          <!-- Búsqueda -->
          <q-input
            v-model="filter"
            placeholder="Buscar crónica..."
            dark borderless dense
            class="search-input-premium q-px-md"
            style="min-width: 220px"
          >
            <template v-slot:append>
              <q-icon name="search" color="gold" size="xs" />
            </template>
          </q-input>

          <!-- Filtro por tipo -->
          <q-select
            v-model="tipoFilter"
            :options="tipoOptions"
            label="Tipo"
            label-color="gold"
            dark dense borderless
            emit-value map-options
            class="status-select-premium q-px-md"
            style="min-width: 150px"
          />
        </div>

        <!-- Línea de luz inferior -->
        <div class="panel-light-line"></div>
      </q-card-section>

      <!-- Lista de Lecturas (mismo q-list que Almas/Abundancia) -->
      <q-card-section class="q-pa-none relative-position z-top" style="max-height: 380px; overflow-y: auto;">
        <q-list padding class="q-px-md">

          <q-item
            v-for="lectura in filteredReadings"
            :key="lectura._id"
            class="q-my-sm rounded-xl reading-list-item q-py-sm q-px-md"
            v-ripple
            @click="viewDetail(lectura)"
          >
            <!-- Avatar -->
            <q-item-section avatar style="min-width: 56px; padding-right: 12px;">
              <q-avatar size="40px" class="ghost-avatar">
                <span class="text-weight-bold" style="font-size: 15px;">{{ getUserName(lectura.usuarioId).charAt(0).toUpperCase() }}</span>
              </q-avatar>
            </q-item-section>

            <!-- Nombre + Extracto -->
            <q-item-section style="flex: 1; min-width: 160px;">
              <q-item-label class="text-weight-bold text-white" style="font-size: 14px;">{{ getUserName(lectura.usuarioId) }}</q-item-label>
              <q-item-label caption class="text-grey-5 font-mono ellipsis" style="font-size: 11px; max-width: 360px;">
                {{ formatContent(lectura.contenido) }}
              </q-item-label>
            </q-item-section>

            <!-- Fecha -->
            <q-item-section side style="min-width: 110px; padding: 0 16px;">
              <q-badge outline color="grey-7" class="q-px-md rounded-xl tracking-widest font-bold font-mono" style="font-size: 9px; padding-top:4px; padding-bottom:4px;">
                {{ new Date(lectura.fechaLectura).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </q-badge>
            </q-item-section>

            <!-- Tipo Orb -->
            <q-item-section side style="min-width: 100px; padding: 0 16px;">
              <div class="row items-center q-gutter-x-sm no-wrap">
                <div :class="lectura.tipo === 'principal' ? 'status-orb-principal' : 'status-orb-diaria'"></div>
                <span
                  class="text-weight-bold tracking-widest uppercase"
                  :class="lectura.tipo === 'principal' ? 'text-gold' : 'text-positive'"
                  style="font-size: 10px;"
                >{{ lectura.tipo === 'principal' ? 'PRINCIPAL' : 'DIARIA' }}</span>
              </div>
            </q-item-section>

            <!-- Acción -->
            <q-item-section side style="min-width: 130px; padding-left: 16px;">
              <q-btn
                flat no-caps unelevated
                icon="auto_stories" label="Ver"
                color="primary"
                class="action-pill-btn action-pill-edit"
                @click.stop="viewDetail(lectura)"
              />
            </q-item-section>
          </q-item>

          <!-- Estado vacío -->
          <div v-if="filteredReadings.length === 0" class="text-center q-pa-xl flex flex-center column opacity-30">
            <q-icon name="history_edu" size="4em" class="q-mb-md" />
            <p class="text-h6 font-light">Las crónicas del cosmos aún no han sido escritas...</p>
          </div>

        </q-list>
      </q-card-section>

      <!-- Luz decorativa -->
      <div class="kpi-light-source" style="background: radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.04), transparent 50%)"></div>
    </q-card>

    <!-- DIÁLOGO DETALLE CRÓNICA (mejorado) -->
    <q-dialog v-model="showDetail" persistent backdrop-filter="blur(20px)">
      <q-card class="kpi-card-galactic no-border q-pa-none overflow-hidden" style="min-width: 620px; max-width: 90vw;">
        <!-- Header del Diálogo -->
        <q-card-section class="row items-center justify-between q-pa-xl border-bottom-glass-soft">
          <div>
            <div class="text-caption text-gold-soft tracking-widest uppercase">Registro Completo</div>
            <h3 class="text-h5 font-serif italic text-white q-ma-none">Crónica Celestial</h3>
          </div>
          <q-btn icon="close" flat round dense v-close-popup color="grey-5" />
        </q-card-section>

        <!-- Info del alma + tipo -->
        <q-card-section class="row items-center q-gutter-x-lg q-px-xl q-pt-lg q-pb-none">
          <q-avatar size="52px" class="ghost-avatar shadow-aura">
            <div class="text-weight-bolder text-white text-h6">{{ selectedReading ? getUserName(selectedReading.usuarioId).charAt(0).toUpperCase() : '?' }}</div>
          </q-avatar>
          <div class="column">
            <div class="text-weight-bold text-white" style="font-size: 16px;">{{ selectedReading ? getUserName(selectedReading.usuarioId) : '' }}</div>
            <div class="text-caption text-grey-5 font-mono">{{ selectedReading ? new Date(selectedReading.fechaLectura).toLocaleString('es-CO') : '' }}</div>
          </div>
          <q-space />
          <div class="row items-center q-gutter-x-sm" v-if="selectedReading">
            <div :class="selectedReading.tipo === 'principal' ? 'status-orb-principal' : 'status-orb-diaria'"></div>
            <span class="text-caption text-weight-bold tracking-widest uppercase" :class="selectedReading.tipo === 'principal' ? 'text-gold' : 'text-positive'" style="font-size: 10px;">
              {{ selectedReading.tipo === 'principal' ? 'MISIÓN PRINCIPAL' : 'GUÍA DIARIA' }}
            </span>
          </div>
        </q-card-section>

        <!-- Contenido JSON -->
        <q-card-section class="q-pa-xl scroll" style="max-height: 60vh;">
          <pre class="text-grey-4 font-mono reading-pre" v-if="selectedReading">{{ formatDetailContent(selectedReading.contenido) }}</pre>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';

const adminStore = useAdminStore();

const filter = ref('');
const tipoFilter = ref('todos');
const showDetail = ref(false);
const selectedReading = ref(null);

const tipoOptions = [
  { label: 'Todos los tipos', value: 'todos' },
  { label: 'Principal', value: 'principal' },
  { label: 'Diaria', value: 'diaria' }
];

const kpiCards = computed(() => [
  {
    title: 'Total de Crónicas', value: adminStore.stats.totalLecturas,
    icon: 'history_edu', color: 'white', textClass: 'text-white',
    glowColor: 'rgba(212, 175, 55, 0.2)'
  },
  {
    title: 'Misiones Principales', value: adminStore.stats.lecturasPrincipales,
    icon: 'auto_awesome', color: 'primary', textClass: 'text-primary',
    glowColor: 'rgba(212, 175, 55, 0.15)'
  },
  {
    title: 'Guías Diarias', value: adminStore.stats.lecturasDiarias,
    icon: 'wb_sunny', color: 'secondary', textClass: 'text-secondary',
    glowColor: 'rgba(38, 166, 154, 0.2)'
  }
]);

const filteredReadings = computed(() => {
  let items = adminStore.lecturas;
  if (tipoFilter.value !== 'todos') {
    items = items.filter(l => l.tipo === tipoFilter.value);
  }
  if (filter.value.trim()) {
    const f = filter.value.toLowerCase();
    items = items.filter(l =>
      getUserName(l.usuarioId).toLowerCase().includes(f) ||
      formatContent(l.contenido).toLowerCase().includes(f)
    );
  }
  return items;
});

const getUserName = (val) => {
  if (val && typeof val === 'object' && val.nombre) return val.nombre;
  return adminStore.usuariosMap[val] || 'Usuario Desconocido';
};

const formatContent = (content) => {
  try {
    const json = JSON.parse(content);
    return json.mensaje || json.descripcion || json.titulo || content?.slice(0, 100) || '';
  } catch {
    return content?.slice(0, 100) || '';
  }
};

const formatDetailContent = (content) => {
  try {
    return JSON.stringify(JSON.parse(content), null, 2);
  } catch {
    return content;
  }
};

const viewDetail = (reading) => {
  selectedReading.value = reading;
  showDetail.value = true;
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

/* LISTA */
.reading-list-item {
  transition: all 0.3s ease;
  border-radius: 16px;
  cursor: pointer;
}
.reading-list-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

/* AVATAR */
.ghost-avatar {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* ORBs */
.status-orb-principal {
  width: 10px; height: 10px; border-radius: 50%;
  background: #d4af37; box-shadow: 0 0 10px #d4af37;
  animation: pulse-gold 3s infinite alternate;
}
.status-orb-diaria {
  width: 10px; height: 10px; border-radius: 50%;
  background: #21ba45; box-shadow: 0 0 10px #21ba45;
  animation: pulse-green 2s infinite;
}

@keyframes pulse-gold {
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
  100% { transform: scale(1.1);  box-shadow: 0 0 0 8px rgba(212, 175, 55, 0); }
}
@keyframes pulse-green {
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0.7); }
  70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(33, 186, 69, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0); }
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

/* DETALLE */
.reading-pre {
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 1.8;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
}
</style>
