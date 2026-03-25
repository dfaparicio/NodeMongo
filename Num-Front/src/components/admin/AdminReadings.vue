<template>
  <div class="admin-readings q-gutter-y-xl q-pa-md">
    <!-- Summary Row -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg">
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Total de Registros</div>
          <div class="text-h3 text-weight-bold">{{ adminStore.stats.totalLecturas }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg">
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Misiones Estelares (Principales)</div>
          <div class="text-h3 text-weight-bold text-primary">{{ adminStore.stats.lecturasPrincipales }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg">
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Guías Diarias</div>
          <div class="text-h3 text-weight-bold text-secondary">{{ adminStore.stats.lecturasDiarias }}</div>
        </q-card>
      </div>
    </div>

    <!-- Header with quick filter -->
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h5 text-gold tracking-widest uppercase font-serif">Bitácora General</div>
      <q-input 
        v-model="filter" 
        placeholder="Buscar frecuencias..." 
        dark 
        dense 
        outlined 
        class="search-input rounded-lg"
        style="width: 300px"
      >
        <template v-slot:append>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>

    <!-- Readings Table -->
    <q-card class="glass-panel no-border overflow-hidden">
      <q-table
        :rows="adminStore.lecturas"
        :columns="columns"
        row-key="_id"
        dark
        flat
        :filter="filter"
        :loading="adminStore.loading"
        class="bg-transparent"
      >
        <!-- User ID to Name Mapping -->
        <template v-slot:body-cell-usuarioId="props">
          <q-td :props="props">
            <div class="row items-center q-gutter-x-sm">
              <q-avatar size="32px" color="primary" text-color="black">
                {{ getUserName(props.value).charAt(0).toUpperCase() }}
              </q-avatar>
              <div>
                <div class="text-weight-medium">
                  {{ getUserName(props.value) }}
                </div>
                <div class="text-caption opacity-50">{{ typeof props.value === 'string' ? props.value : 'Usuario Info' }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <!-- Type Badge con Animación -->
        <template v-slot:body-cell-tipo="props">
          <q-td :props="props">
            <div class="row items-center justify-center q-gutter-x-sm">
              <div :class="props.value === 'principal' ? 'status-orb-principal' : 'status-orb-diaria'"></div>
              <span 
                class="text-weight-bold tracking-widest uppercase" 
                style="font-size: 11px;"
                :class="props.value === 'principal' ? 'text-primary' : 'text-positive'"
              >
                {{ props.value === 'principal' ? 'BASE (PRINCIPAL)' : 'SUSCRIPCIÓN (DIARIA)' }}
              </span>
            </div>
          </q-td>
        </template>

        <!-- Content Preview (JSON parse) -->
        <template v-slot:body-cell-contenido="props">
          <q-td :props="props">
            <div class="ellipsis" style="max-width: 300px">
              {{ formatContent(props.value) }}
            </div>
          </q-td>
        </template>
        
        <!-- Actions -->
        <template v-slot:body-cell-acciones="props">
          <q-td :props="props">
            <q-btn flat round dense icon="visibility" color="primary" @click="viewDetail(props.row)">
              <q-tooltip>Ver Detalles Completos</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Detail Dialog -->
    <q-dialog v-model="showDetail" persistent backdrop-filter="blur(15px)">
      <q-card class="glass-panel no-border q-pa-md" style="min-width: 600px; max-width: 90vw;">
        <q-card-section class="row items-center q-pb-md border-bottom-glass q-mb-md">
          <div class="text-h5 text-gold font-serif tracking-widest">Detalle del Registro Celeste</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup class="text-grey-5 hover-gold" />
        </q-card-section>
        <q-card-section class="q-pa-md scroll" style="max-height: 65vh">
          <pre class="text-grey-4 font-mono line-height-2" style="white-space: pre-wrap; font-size: 14px;">{{ JSON.stringify(JSON.parse(selectedReading.contenido), null, 3) }}</pre>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAdminStore } from '../../store/admin.js';

const adminStore = useAdminStore();
const filter = ref('');
const showDetail = ref(false);
const selectedReading = ref(null);

const columns = [
  { name: 'fechaLectura', align: 'left', label: 'FECHA', field: 'fechaLectura', sortable: true, format: val => new Date(val).toLocaleDateString() },
  { name: 'usuarioId', align: 'left', label: 'ALMA', field: 'usuarioId', sortable: true },
  { name: 'tipo', align: 'center', label: 'TIPO', field: 'tipo', sortable: true },
  { name: 'contenido', align: 'left', label: 'RESUMEN DEL MENSAJE', field: 'contenido' },
  { name: 'acciones', align: 'right', label: 'ACCIONES' }
];

const formatContent = (content) => {
  try {
    const json = JSON.parse(content);
    return json.mensaje || json.descripcion || content;
  } catch (e) {
    return content;
  }
};

const getUserName = (val) => {
  if (val && typeof val === 'object' && val.nombre) return val.nombre;
  return adminStore.usuariosMap[val] || 'Usuario Desconocido';
};

const viewDetail = (reading) => {
  selectedReading.value = reading;
  showDetail.value = true;
};
</script>

<style scoped>
.search-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
}

.status-orb-principal {
  width: 10px; height: 10px; border-radius: 50%;
  background-color: #d4af37; /* gold/primary */
  box-shadow: 0 0 10px #d4af37;
  animation: pulse-gold 3s infinite alternate; /* Animación calmada y única */
}

.status-orb-diaria {
  width: 10px; height: 10px; border-radius: 50%;
  background-color: #21ba45; /* positive/green */
  box-shadow: 0 0 10px #21ba45;
  animation: pulse-green 2s infinite; /* Representa que el pago activo fluye */
}

@keyframes pulse-gold {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
  100% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(212, 175, 55, 0); }
}

@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(33, 186, 69, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0); }
}
</style>
