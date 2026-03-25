<template>
  <div class="admin-users q-gutter-y-xl q-pa-md">
    <!-- Summary Row (Estadísticas Generales) -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg relative-position overflow-hidden">
          <div class="absolute-top-left q-pa-md opacity-20"><q-icon name="group" size="30px" color="gold"/></div>
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Total de Almas</div>
          <div class="text-h3 text-weight-bold">{{ adminStore.stats.totalUsuarios }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg relative-position overflow-hidden">
          <div class="absolute-top-left q-pa-md opacity-20"><q-icon name="bolt" size="30px" color="positive"/></div>
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Frecuencias Activas</div>
          <div class="text-h3 text-weight-bold text-positive">{{ adminStore.stats.usuariosActivos }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg relative-position overflow-hidden">
          <div class="absolute-top-left q-pa-md opacity-20"><q-icon name="bedtime" size="30px" color="negative"/></div>
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Almas en Reposo</div>
          <div class="text-h3 text-weight-bold text-negative">{{ inactivosCount }}</div>
        </q-card>
      </div>
    </div>

    <!-- Header Actions -->
    <div class="row justify-between items-center q-mb-md">
      <h2 class="text-h5 text-gold tracking-widest uppercase font-serif q-ma-none gt-xs">Gestión de Almas</h2>
      
      <div class="row q-gutter-x-lg items-center">
        <q-input 
          v-model="filter" 
          placeholder="Buscar buscador espacial..." 
          dark 
          dense 
          outlined 
          class="search-input rounded-lg"
          style="width: 320px"
        >
          <template v-slot:append>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>
        
        <q-select
          v-model="statusFilter"
          :options="statusOptions"
          label="Estado"
          label-color="gold"
          dark
          dense
          outlined
          emit-value
          map-options
          class="rounded-lg"
          style="width: 140px"
          color="primary"
        />

        <q-btn 
          color="primary" 
          icon="person_add" 
          label="Guía Nueva" 
          class="rounded-lg tracking-widest q-py-sm q-px-md text-weight-bold"
          outline
          @click="showAddDialog = true"
        />
      </div>
    </div>

    <!-- Users Table -->
    <q-card class="glass-panel no-border overflow-hidden">
      <q-table
        :rows="filteredUsers"
        :columns="columns"
        row-key="_id"
        dark
        flat
        :filter="filter"
        :loading="adminStore.loading"
        class="bg-transparent"
        :pagination="{ rowsPerPage: 10 }"
      >
        <!-- Custom Avatar Column -->
        <template v-slot:body-cell-nombre="props">
          <q-td :props="props">
            <div class="row items-center q-gutter-x-sm">
              <q-avatar size="32px" color="primary" text-color="black">
                {{ getUserName(props.row).charAt(0).toUpperCase() }}
              </q-avatar>
              <div class="text-weight-medium">{{ getUserName(props.row) }}</div>
            </div>
          </q-td>
        </template>

        <!-- Custom Status Column con Animación -->
        <template v-slot:body-cell-estado="props">
          <q-td :props="props">
            <div class="row items-center q-gutter-x-sm justify-center">
              <div :class="props.row.estado === 1 ? 'status-orb-active' : 'status-orb-inactive'"></div>
              <span 
                class="text-weight-bold tracking-widest" 
                style="font-size: 11px;"
                :class="props.row.estado === 1 ? 'text-positive' : 'text-negative'"
              >
                {{ props.row.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}
              </span>
            </div>
          </q-td>
        </template>

        <!-- Custom Actions Column -->
        <template v-slot:body-cell-acciones="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn 
              flat 
              round 
              dense 
              :icon="props.row.estado === 1 ? 'person_off' : 'person_check'" 
              :color="props.row.estado === 1 ? 'warning' : 'positive'"
              @click="toggleStatus(props.row)"
            >
              <q-tooltip>{{ props.row.estado === 1 ? 'Inactivar' : 'Activar' }}</q-tooltip>
            </q-btn>
            <q-btn flat round dense icon="edit" color="primary" @click="editUser(props.row)">
              <q-tooltip>Editar Perfil</q-tooltip>
            </q-btn>
            <q-btn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)">
              <q-tooltip>Eliminar Permanentemente</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Edit Dialog (Placeholder) -->
    <q-dialog v-model="showEditDialog">
       <AdminUserEditDialog :user="selectedUser" @updated="onUserUpdated" />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';
import { useQuasar } from 'quasar';
import AdminUserEditDialog from './AdminUserEditDialog.vue';

const adminStore = useAdminStore();
const $q = useQuasar();

const filter = ref('');
const statusFilter = ref('todos');
const showEditDialog = ref(false);
const showAddDialog = ref(false);
const selectedUser = ref(null);

const statusOptions = [
  { label: 'Todos', value: 'todos' },
  { label: 'Activos', value: 1 },
  { label: 'Inactivos', value: 0 }
];

const columns = [
  { name: 'nombre', align: 'left', label: 'NOMBRE', field: 'nombre', sortable: true },
  { name: 'email', align: 'left', label: 'EMAIL', field: 'email', sortable: true },
  { name: 'rol', align: 'center', label: 'ROL', field: 'rol', sortable: true },
  { name: 'estado', align: 'center', label: 'ESTADO', field: 'estado', sortable: true },
  { name: 'acciones', align: 'right', label: 'ACCIONES' }
];

const filteredUsers = computed(() => {
  let users = adminStore.usuarios;
  if (statusFilter.value !== 'todos') {
    users = users.filter(u => u.estado === statusFilter.value);
  }
  return users;
});

const inactivosCount = computed(() => {
  return adminStore.stats.totalUsuarios - adminStore.stats.usuariosActivos;
});

const getUserName = (row) => {
  return row?.nombre ? row.nombre : 'Desconocido';
};

const toggleStatus = async (user) => {
  try {
    await adminStore.toggleUsuarioEstado(user._id, user.estado);
    $q.notify({
      message: `Estado de ${user.nombre} actualizado ✨`,
      color: 'positive',
      icon: 'check'
    });
  } catch (error) {
    $q.notify({ message: 'Error al cambiar estado', color: 'negative' });
  }
};

const editUser = (user) => {
  selectedUser.value = { ...user };
  showEditDialog.value = true;
};

const onUserUpdated = () => {
  showEditDialog.value = false;
  $q.notify({ message: 'Usuario actualizado correctamente', color: 'positive' });
};

const confirmDelete = (user) => {
  $q.dialog({
    title: 'Confirmar Eliminación',
    message: `¿Estás seguro de que deseas eliminar permanentemente a ${user.nombre}? Esta acción no se puede deshacer.`,
    cancel: true,
    persistent: true,
    dark: true,
    ok: { color: 'negative', label: 'Eliminar' }
  }).onOk(async () => {
    try {
      await adminStore.deleteUsuario(user._id);
      $q.notify({ message: 'Alma eliminada del cosmos', color: 'warning' });
    } catch (error) {
      $q.notify({ message: 'Error al eliminar', color: 'negative' });
    }
  });
};
</script>

<style scoped>
.search-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
}

.status-orb-active {
  width: 10px; 
  height: 10px; 
  border-radius: 50%;
  background-color: #21ba45;
  box-shadow: 0 0 10px #21ba45;
  animation: pulse-green 2s infinite;
}

.status-orb-inactive {
  width: 10px; 
  height: 10px; 
  border-radius: 50%;
  background-color: #c10015;
  box-shadow: 0 0 10px #c10015;
  animation: pulse-red 2s infinite;
}

@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(33, 186, 69, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0); }
}

@keyframes pulse-red {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(193, 0, 21, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(193, 0, 21, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(193, 0, 21, 0); }
}
</style>
