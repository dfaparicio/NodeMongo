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
      <!-- DASHBOARD DE USUARIOS (KPIs ESTADÍSTICOS) -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-primary">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-primary opacity-70">Comunidad Total</div>
                <div class="text-h3 text-white text-bold">{{ totalUsuarios }}</div>
              </div>
              <q-icon name="groups" size="48px" color="primary" class="opacity-20" />
            </div>
            <div class="q-mt-md">
              <q-linear-progress :value="1" color="primary" class="rounded-xs" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-emerald">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-emerald opacity-70">Almas Activas</div>
                <div class="text-h3 text-white text-bold">{{ activos }}</div>
              </div>
              <div class="status-indicator-wrap">
                <div class="pulse-dot active"></div>
              </div>
            </div>
            <div class="q-mt-md">
              <q-linear-progress :value="activos / (totalUsuarios || 1)" color="emerald" class="rounded-xs" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="kpi-card-professional border-error">
            <div class="row items-center justify-between">
              <div>
                <div class="text-overline text-red-4 opacity-70">En Espera (Inactivos)</div>
                <div class="text-h3 text-white text-bold">{{ inactivos }}</div>
              </div>
              <div class="status-indicator-wrap">
                <div class="pulse-dot inactive"></div>
              </div>
            </div>
            <div class="q-mt-md">
              <q-linear-progress :value="inactivos / (totalUsuarios || 1)" color="red-4" class="rounded-xs" />
            </div>
          </div>
        </div>
      </div>

      <!-- BUSCADOR PROFESIONAL -->
      <div class="row items-center justify-between q-mb-lg">
        <div class="text-h5 text-white text-weight-light">Listado de <span class="text-bold text-primary">Usuarios</span></div>
        <q-input 
          v-model="filter" 
          placeholder="Buscar por identidad o canal..." 
          dark 
          outlined 
          dense
          style="width: 350px"
          class="search-professional"
        >
          <template v-slot:prepend><q-icon name="search" color="primary" /></template>
        </q-input>
      </div>

      <!-- TABLE AREA -->
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
              <q-th class="text-right text-primary text-bold">Gestión</q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="row-professional">
              <q-td key="nombre" :props="props">
                <div class="row items-center gap-md">
                  <q-avatar size="38px" color="primary" text-color="white" class="text-bold shadow-2">
                    {{ props.row.nombre.charAt(0) }}
                  </q-avatar>
                  <div>
                    <div class="text-white text-weight-bold">{{ props.row.nombre }}</div>
                    <div class="text-caption text-grey-5">{{ props.row.email }}</div>
                  </div>
                </div>
              </q-td>
              <q-td key="email" :props="props">
                <span class="text-grey-4 font-mono">{{ props.row.email }}</span>
              </q-td>
              <q-td key="rol" :props="props" align="center">
                <q-btn-dropdown
                  :label="props.row.rol === 'ADMIN_ROLE' ? 'ADMIN' : 'USUARIO'"
                  :color="props.row.rol === 'ADMIN_ROLE' ? 'amber-9' : 'blue-9'"
                  flat
                  dense
                  class="role-dropdown"
                  no-caps
                >
                  <q-list dark style="min-width: 150px">
                    <q-item clickable v-close-popup @click="cambiarRol(props.row, 'ADMIN_ROLE')">
                      <q-item-section>ADMIN</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="cambiarRol(props.row, 'USER_ROLE')">
                      <q-item-section>USUARIO</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
              <q-td key="estado" :props="props" align="center">
                <div class="row items-center justify-center gap-sm">
                  <div class="status-pill" :class="props.row.estado === 1 ? 'bg-emerald-10' : 'bg-red-10'">
                    <div class="pulse-dot-mini" :class="props.row.estado === 1 ? 'active' : 'inactive'"></div>
                    <span :class="props.row.estado === 1 ? 'text-emerald' : 'text-red-4'" class="text-caption text-bold">
                      {{ props.row.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}
                    </span>
                  </div>
                </div>
              </q-td>
              <q-td key="registro" :props="props" class="text-grey-6 text-caption">{{ props.row.registro }}</q-td>
              <q-td class="text-right">
                <q-btn flat round dense icon="edit" color="primary" @click="onEditar(props.row)" class="action-btn">
                  <q-tooltip>Editar Datos</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </template>

    <!-- Diálogo de edición -->
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
    error.value = "Error al conectar con la base de datos central.";
  } finally {
    loading.value = false;
  }
};

fetchData();

const columns = [
  { name: 'nombre', label: 'Identidad del Usuario', field: 'nombre', align: 'left' },
  { name: 'email', label: 'Correo Electrónico', field: 'email', align: 'left' },
  { name: 'rol', label: 'Rango / Nivel', field: 'rol', align: 'center' },
  { name: 'estado', label: 'Estado Actual', field: 'estado', align: 'center' },
  { name: 'registro', label: 'Fecha Registro', field: 'registro', align: 'center' },
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
  return rows.value.filter(r => 
    r.nombre.toLowerCase().includes(s) || 
    r.email.toLowerCase().includes(s)
  );
});

const totalUsuarios = computed(() => adminStore.usuarios.length);
const activos = computed(() => adminStore.usuarios.filter(u => u.estado === 1).length);
const inactivos = computed(() => totalUsuarios.value - activos.value);

/* ═══════════ ACCIONES ═══════════ */
const dialogEditar = ref(false);
const usuarioSeleccionado = ref({});

const onEditar = (row) => {
  usuarioSeleccionado.value = { ...row };
  dialogEditar.value = true;
};

const cambiarRol = async (row, nuevoRol) => {
  try {
    await adminStore.updateUsuario(row._id, { rol: nuevoRol });
    showNotify.success('Rol Actualizado', `El usuario ahora es ${nuevoRol}`);
  } catch (err) {
    showNotify.error('Error', 'No se pudo cambiar el rol.');
  }
};

const guardarEdicion = async ({ id, datos }) => {
  try {
    await adminStore.updateUsuario(id, datos);
    dialogEditar.value = false;
    showNotify.success('Éxito', 'Información actualizada correctamente.');
  } catch (err) {
    showNotify.error('Error', 'Fallo al guardar los cambios.');
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

.glass-panel-dark {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.table-professional :deep(.q-table__card) { background: transparent; }
.table-professional :deep(th) { text-transform: uppercase; letter-spacing: 1px; font-size: 11px; }

.row-professional:hover {
  background: rgba(255, 255, 255, 0.02) !important;
}

/* Pulsing Dots */
.pulse-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
}
.pulse-dot.active { background: #10b981; }
.pulse-dot.inactive { background: #f43f5e; }

.pulse-dot::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: pulse 2s infinite;
  opacity: 0.5;
}
.pulse-dot.active::after { border: 4px solid #10b981; }
.pulse-dot.inactive::after { border: 4px solid #f43f5e; }

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 20px;
}
.pulse-dot-mini { width: 6px; height: 6px; border-radius: 50%; }
.pulse-dot-mini.active { background: #10b981; box-shadow: 0 0 8px #10b981; }
.pulse-dot-mini.inactive { background: #f43f5e; box-shadow: 0 0 8px #f43f5e; }

.search-professional :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.5);
}

.border-primary { border-bottom: 3px solid #3b82f6; }
.border-emerald { border-bottom: 3px solid #10b981; }
.border-error { border-bottom: 3px solid #f43f5e; }

.role-dropdown { font-weight: 800; font-size: 10px; letter-spacing: 1px; }
.action-btn:hover { background: rgba(59, 130, 246, 0.1); }
</style>

