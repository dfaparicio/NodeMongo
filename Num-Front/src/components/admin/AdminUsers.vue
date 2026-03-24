<template>
  <div class="q-animate-fade-in">
    <!-- Loading & Error States -->
    <div v-if="loading" class="flex flex-center q-py-xl column">
      <q-spinner-orbit color="primary" size="64px" />
      <span class="text-caption text-gold tracking-widest q-mt-md uppercase opacity-60">Sincronizando Almas...</span>
    </div>

    <div v-else-if="error" class="text-center q-py-xl glass-panel border-error q-ma-lg">
      <q-icon name="cloud_off" size="48px" color="red-4" class="q-mb-md" />
      <p class="text-h6 text-white">{{ error }}</p>
      <q-btn outline color="red-4" label="Reintentar Conexión" @click="fetchData" class="rounded-lg" />
    </div>

    <template v-else>
      <!-- HEADER & SEARCH -->
      <div class="row items-center justify-between q-mb-xl gap-md">
        <div class="row q-col-gutter-md col-12 col-md-8">
          <div class="col-12 col-sm-4">
            <div class="kpi-mini-astral border-gold">
              <div class="text-caption text-gold opacity-50 uppercase tracking-widest">Comunidad Total</div>
              <div class="text-h4 text-white text-bold font-mono">{{ totalUsuarios }}</div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <div class="kpi-mini-astral border-emerald">
              <div class="text-caption text-emerald opacity-50 uppercase tracking-widest">Vínculos Activos</div>
              <div class="text-h4 text-white text-bold font-mono">{{ activos }}</div>
            </div>
          </div>
          <div class="col-12 col-sm-4">
            <div class="kpi-mini-astral border-primary">
              <div class="text-caption text-primary opacity-50 uppercase tracking-widest">Nuevos Destinos</div>
              <div class="text-h4 text-white text-bold font-mono">+{{ nuevosEsteMes }}</div>
            </div>
          </div>
        </div>
        
        <div class="col-12 col-md-3">
          <q-input 
            v-model="filter" 
            placeholder="Buscar por nombre o email..." 
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

      <!-- TABLE AREA -->
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
              <q-th class="text-right">Acciones</q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="hover-row-astral">
              <q-td key="nombre" :props="props">
                <div class="row items-center gap-sm">
                  <q-avatar size="32px" color="primary-opacity" text-color="primary" class="text-weight-bold border-primary-20">
                    {{ props.row.nombre.charAt(0) }}
                  </q-avatar>
                  <div class="text-weight-bold text-white">{{ props.row.nombre }}</div>
                </div>
              </q-td>
              <q-td key="email" :props="props" class="text-grey-5">{{ props.row.email }}</q-td>
              <q-td key="rol" :props="props" align="center">
                <q-badge :color="props.row.rol === 'ADMIN_ROLE' ? 'gold-9' : 'blue-9'" 
                         :class="props.row.rol === 'ADMIN_ROLE' ? 'text-gold border-gold-20' : 'text-blue border-blue-20'"
                         class="q-px-md q-py-xs text-bold uppercase letter-spacing-1">
                  {{ props.row.rol === 'ADMIN_ROLE' ? 'ADMIN' : 'USUARIO' }}
                </q-badge>
              </q-td>
              <q-td key="estado" :props="props" align="center">
                <div class="row items-center justify-center gap-xs">
                  <div :class="props.row.estado === 1 ? 'status-dot-green' : 'status-dot-grey'"></div>
                  <span :class="props.row.estado === 1 ? 'text-emerald' : 'text-grey-6'" class="text-caption text-bold uppercase">
                    {{ props.row.estado === 1 ? 'Alineado' : 'En espera' }}
                  </span>
                </div>
              </q-td>
              <q-td key="registro" :props="props" class="text-grey-6 font-mono text-caption">{{ props.row.registro }}</q-td>
              <q-td class="text-right">
                <q-btn flat round dense icon="tune" color="primary" @click="onEditar(props.row)" class="hover-glow">
                  <q-tooltip>Ajustar Frecuencia</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="visibility" color="grey-5" @click="verDetalles(props.row)" class="q-ml-xs hover-white">
                  <q-tooltip>Ver Perfil Astral</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </template>

    <!-- Diálogo de edición (Alineado con la nueva estética) -->
    <AdminUserEditDialog
      v-model="dialogEditar"
      :usuario="usuarioSeleccionado"
      @guardar="guardarEdicion"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminUserEditDialog from './AdminUserEditDialog.vue';
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
    await adminStore.fetchUsuarios();
  } catch (err) {
    error.value = "Error al conectar con la base de datos de almas.";
  } finally {
    loading.value = false;
  }
};

fetchData();

const columns = [
  { name: 'nombre', label: 'Identidad', field: 'nombre', align: 'left' },
  { name: 'email', label: 'Canal (Email)', field: 'email', align: 'left' },
  { name: 'rol', label: 'Rango', field: 'rol', align: 'center' },
  { name: 'estado', label: 'Alineación', field: 'estado', align: 'center' },
  { name: 'registro', label: 'Registro', field: 'registro', align: 'center' },
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: '2-digit'
  });
}

const rows = computed(() =>
  adminStore.usuarios.map(u => ({
    ...u,
    registro: formatearFecha(u.fechanacimiento),
  }))
);

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const s = filter.value.toLowerCase();
  return rows.value.filter(r => r.nombre.toLowerCase().includes(s) || r.email.toLowerCase().includes(s));
});

const totalUsuarios = computed(() => adminStore.stats.totalUsuarios);
const activos = computed(() => adminStore.stats.usuariosActivos);
const nuevosEsteMes = computed(() => adminStore.stats.nuevosUsuarios);

/* ═══════════ ACCIONES ═══════════ */
const dialogEditar = ref(false);
const usuarioSeleccionado = ref({});

const onEditar = (row) => {
  usuarioSeleccionado.value = { ...row };
  dialogEditar.value = true;
};

const verDetalles = (row) => {
  showNotify.info(`Perfil de ${row.nombre}`, 'Funcionalidad de auditoría detallada en desarrollo.');
};

const guardarEdicion = async ({ id, datos }) => {
  try {
    await adminStore.updateUsuario(id, datos);
    dialogEditar.value = false;
    showNotify.success('Sincronización Exitosa', 'El destino del usuario ha sido actualizado ✨');
  } catch (err) {
    showNotify.error('Error de Actualización', 'No se pudo sincronizar el cambio.');
  }
};
</script>

<style scoped>
.kpi-mini-astral {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 15px 20px;
  transition: all 0.3s ease;
}

.kpi-mini-astral:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
}

.search-input-astral :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
}

.cosmic-table {
  background: transparent !important;
}

.hover-row-astral {
  transition: all 0.2s ease;
}

.hover-row-astral:hover {
  background: rgba(212, 175, 55, 0.03) !important;
}

.status-dot-green { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }
.status-dot-grey { width: 8px; height: 8px; background: #6b6f76; border-radius: 50%; }

.border-gold { border-color: rgba(212, 175, 55, 0.3) !important; }
.border-emerald { border-color: rgba(16, 185, 129, 0.3) !important; }
.border-primary { border-color: rgba(0, 150, 255, 0.3) !important; }

.primary-opacity { background: rgba(0, 150, 255, 0.1) !important; }
.border-primary-20 { border: 1px solid rgba(0, 150, 255, 0.2); }

.hover-glow:hover { filter: drop-shadow(0 0 5px currentColor); }
.hover-white:hover { color: #fff !important; }
.letter-spacing-1 { letter-spacing: 1px; }
</style>
