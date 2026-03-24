<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex flex-center q-py-xl">
      <q-spinner-orbit color="amber" size="48px" />
      <span class="text-grey-6 q-ml-md">Cargando usuarios...</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center q-py-xl">
      <q-icon name="error_outline" size="48px" color="red-4" class="q-mb-sm" />
      <p class="text-red-4">{{ error }}</p>
      <q-btn flat color="amber" label="Reintentar" @click="fetchData" />
    </div>

    <template v-else>
      <!-- Mini KPIs -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-6 col-md-3">
          <div class="kpi-mini">
            <div class="text-overline text-grey-6 q-mb-xs">Total Usuarios</div>
            <div class="kpi-num text-white">{{ totalUsuarios }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="kpi-mini">
            <div class="text-overline text-grey-6 q-mb-xs">Activos</div>
            <div class="kpi-num text-positive">{{ activos }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="kpi-mini">
            <div class="text-overline text-grey-6 q-mb-xs">Nuevos este mes</div>
            <div class="kpi-num text-orange">+{{ nuevosEsteMes }}</div>
          </div>
        </div>
      </div>

      <!-- Reusable Table -->
      <AdminTable
        title="Gestión de Usuarios"
        subtitle="Personas registradas en la plataforma"
        :columns="columns"
        :rows="rows"
        @editar="onEditar"
      >
        <template #actions-header>
          <q-btn unelevated color="amber" label="Refrescar" icon="refresh" class="rounded-pill no-caps text-black" @click="fetchData" />
        </template>
        <template #row-actions="{ row }">
          <q-btn flat round dense icon="edit" size="sm" color="grey-5" @click="onEditar(row)" />
        </template>
      </AdminTable>
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
import AdminTable from './AdminTable.vue';
import AdminUserEditDialog from './AdminUserEditDialog.vue';
import { useAdminStore } from '../../store/admin.js';
import { showNotify } from '../../utils/notify.js';

const adminStore = useAdminStore();
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Añadimos un pequeño delay para que el spinner no parpadee demasiado rápido
    await new Promise(resolve => setTimeout(resolve, 800));
    await adminStore.fetchUsuarios();
  } catch (err) {
    error.value = "Error al conectar con el oráculo de usuarios";
  } finally {
    loading.value = false;
  }
};

fetchData();

const columns = [
  { key: 'nombre', label: 'Nombre', class: 'text-white text-weight-bold' },
  { key: 'email', label: 'Email', class: 'text-grey-5' },
  { key: 'rol', label: 'Rol', type: 'badge', align: 'center',
    badgeMap: { 'ADMIN_ROLE': 'amber', 'USER_ROLE': 'blue', 'OTHER_ROLE': 'grey' } },
  { key: 'estadoTexto', label: 'Estado', type: 'status',
    statusMap: { 'Activo': 'dot-green', 'Inactivo': 'dot-grey' } },
  { key: 'registro', label: 'Registro', class: 'text-grey-6' },
];

function formatearFecha(fecha) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: '2-digit'
  });
}

const rows = computed(() =>
  adminStore.usuarios.map(u => ({
    _id: u._id,
    nombre: u.nombre,
    email: u.email,
    rol: u.rol,
    estado: u.estado,
    estadoTexto: u.estado === 1 ? 'Activo' : 'Inactivo',
    registro: formatearFecha(u.fechanacimiento),
  }))
);

const totalUsuarios = computed(() => adminStore.usuarios.length);
const activos = computed(() => adminStore.usuarios.filter(u => u.estado === 1).length);
const nuevosEsteMes = computed(() => {
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  return adminStore.usuarios.filter(u => {
    const fecha = new Date(u.fechanacimiento);
    return fecha >= inicioMes;
  }).length;
});

/* ═══════════ EDITAR ═══════════ */
const dialogEditar = ref(false);
const usuarioSeleccionado = ref({});

const onEditar = (row) => {
  // Obtener el objeto completo del store (con estado numérico)
  const original = adminStore.usuarios.find(u => u._id === row._id) || row;
  usuarioSeleccionado.value = { ...original };
  dialogEditar.value = true;
};

const guardarEdicion = async ({ id, datos }) => {
  console.log('🚀 Enviando cambio directo a la BD:', { id, ...datos });
  
  try {
    // Enviamos TODO en una sola petición al servidor
    await adminStore.updateUsuario(id, {
      nombre: datos.nombre,
      email: datos.email,
      rol: datos.rol,
      estado: datos.estado
    });

    dialogEditar.value = false;
    showNotify.success('Sincronización Exitosa', 'El destino del usuario ha sido actualizado ✨');

  } catch (err) {
    console.error("❌ Fallo en la petición:", err);
    
    const serverData = err.response?.data;
    const errorMsg = serverData?.error || serverData?.msg || 'Error al actualizar el usuario';
    
    showNotify.error('Error de Actualización', errorMsg);
  }
};
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
.rounded-pill { border-radius: 20px; }
.text-orange { color: #f2a900; }
</style>
