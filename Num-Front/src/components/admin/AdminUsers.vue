<template>
  <div class="admin-users q-gutter-y-xl q-pa-md animate-fade-in">

    <!-- KPI Summary Cards (idéntico al Dashboard) -->
    <div class="row q-col-gutter-xl q-mb-xl">
      <div class="col-12 col-md-4" v-for="card in kpiSummary" :key="card.title">
        <q-card class="kpi-card-galactic overflow-hidden no-border">
          <q-card-section class="q-pa-lg relative-position z-top">
            <div class="row items-center justify-between q-mb-md">
              <div class="icon-circle shadow-glow" :style="{ background: card.glowColor }">
                <q-icon :name="card.icon" size="24px" :color="card.color" />
              </div>
              <div class="text-caption text-gold-soft tracking-widest text-uppercase font-bold" style="font-size: 9px;">{{ card.title }}</div>
            </div>
            <div class="text-h3 text-white text-weight-bolder font-serif tracking-tighter" :class="card.textClass">{{ card.value }}</div>
          </q-card-section>
          <div class="kpi-light-source" :style="{ background: `radial-gradient(circle at 30% 20%, ${card.glowColor} 0%, transparent 80%)` }"></div>
          <div class="kpi-glass-shimmer"></div>
        </q-card>
      </div>
    </div>

    <!-- PANEL DIRECTORIO (igual a "Últimas Conexiones" del Resumen) -->
    <q-card class="kpi-card-galactic overflow-hidden no-border">

      <!-- Header del Panel -->
      <q-card-section class="row items-center justify-between q-pa-xl border-bottom-panel relative-position z-top">
        <div class="column q-gutter-y-none">
          <div class="row items-center q-gutter-x-sm q-mb-xs">
            <div class="panel-icon-dot"></div>
            <span class="text-gold-soft tracking-widest uppercase text-weight-bold" style="font-size: 9px; letter-spacing: 3px;">Directorio de Luz</span>
          </div>
          <h3 class="text-h4 font-serif italic text-white q-ma-none">Gestión de Almas</h3>
        </div>

        <!-- Controles -->
        <div class="row q-gutter-x-md items-center">
          <q-input
            v-model="filter"
            placeholder="Buscar alma..."
            dark borderless dense
            class="search-input-premium q-px-md"
            style="min-width:220px"
          >
            <template v-slot:append>
              <q-icon name="search" color="gold" size="xs" />
            </template>
          </q-input>

          <q-select
            v-model="statusFilter"
            :options="statusOptions"
            label="Estado"
            label-color="gold"
            dark dense borderless
            emit-value map-options
            class="status-select-premium q-px-md"
            style="min-width:120px"
            color="primary"
          />
        </div>

        <!-- Línea de luz inferior -->
        <div class="panel-light-line"></div>
      </q-card-section>

      <!-- Lista de Almas (idéntica a "Últimas Conexiones") -->
      <q-card-section class="q-pa-none relative-position z-top" style="max-height: 480px; overflow-y: auto;">
        <q-list padding class="q-px-md">

          <q-item
            v-for="user in filteredUsers"
            :key="user._id"
            class="q-my-sm rounded-xl user-list-item q-py-sm q-px-md"
            v-ripple
          >
            <!-- Avatar con Halo -->
            <q-item-section avatar style="min-width: 56px; padding-right: 12px;">
              <div class="avatar-halo-container">
                <q-avatar size="40px" class="ghost-avatar">
                  <span class="text-weight-bold" style="font-size: 15px;">{{ (user.nombre || 'U').charAt(0).toUpperCase() }}</span>
                </q-avatar>
                <div class="halo-effect" :class="user.estado === 1 ? 'halo-active' : 'halo-inactive'"></div>
              </div>
            </q-item-section>

            <!-- Nombre + Email -->
            <q-item-section style="flex: 1; min-width: 160px;">
              <q-item-label class="text-weight-bold text-white" style="font-size: 14px;">{{ user.nombre }}</q-item-label>
              <q-item-label caption class="text-grey-5 font-mono" style="font-size: 11px;">{{ user.email }}</q-item-label>
            </q-item-section>

            <!-- Rol -->
            <q-item-section side style="min-width: 90px; padding: 0 16px;">
              <q-badge outline color="gold" class="q-px-md rounded-xl tracking-widest font-bold" style="font-size: 9px; padding-top:4px; padding-bottom:4px;">
                {{ user.rol ? user.rol.toUpperCase() : 'ALMA' }}
              </q-badge>
            </q-item-section>

            <!-- Estado -->
            <q-item-section side style="min-width: 100px; padding: 0 16px;">
              <div class="row items-center q-gutter-x-sm no-wrap">
                <div :class="user.estado === 1 ? 'status-orb-active' : 'status-orb-inactive'"></div>
                <span
                  class="text-weight-bold tracking-widest"
                  :class="user.estado === 1 ? 'text-positive' : 'text-grey-7'"
                  style="font-size: 10px;"
                >{{ user.estado === 1 ? 'ACTIVO' : 'DORMIDO' }}</span>
              </div>
            </q-item-section>

            <!-- Acciones -->
            <q-item-section side style="min-width: 150px; padding-left: 16px;">
              <div class="row items-center q-gutter-x-sm no-wrap">
                <q-btn
                  flat no-caps unelevated
                  icon="edit" label="Editar"
                  color="primary"
                  class="action-pill-btn action-pill-edit"
                  @click.stop="editUser(user)"
                />
                <q-btn
                  flat no-caps unelevated
                  icon="delete_sweep" label="Eliminar"
                  color="negative"
                  class="action-pill-btn action-pill-delete"
                  @click.stop="confirmDelete(user)"
                />
              </div>
            </q-item-section>
          </q-item>

          <!-- Estado vacío -->
          <div v-if="filteredUsers.length === 0" class="text-center q-pa-xl flex flex-center column opacity-30">
            <q-icon name="bedtime" size="4em" class="q-mb-md" />
            <p class="text-h6 font-light">El vacío estelar aún espera...</p>
          </div>
        </q-list>
      </q-card-section>

      <!-- Luz decorativa (igual al Resumen) -->
      <div class="kpi-light-source" style="background: radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.05), transparent 50%)"></div>
    </q-card>

    <!-- Edit Dialog -->
    <q-dialog v-model="showEditDialog" backdrop-filter="blur(15px)">
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

const inactivosCount = computed(() =>
  adminStore.stats.totalUsuarios - adminStore.stats.usuariosActivos
);

const kpiSummary = computed(() => [
  {
    title: 'Total de Almas', value: adminStore.stats.totalUsuarios,
    textClass: '', icon: 'group', color: 'white',
    glowColor: 'rgba(212, 175, 55, 0.2)'
  },
  {
    title: 'Frecuencias Activas', value: adminStore.stats.usuariosActivos,
    textClass: 'text-positive', icon: 'bolt', color: 'positive',
    glowColor: 'rgba(33, 186, 69, 0.2)'
  },
  {
    title: 'Almas en Reposo', value: inactivosCount.value,
    textClass: 'text-negative', icon: 'bedtime', color: 'negative',
    glowColor: 'rgba(255, 77, 77, 0.2)'
  }
]);

const filteredUsers = computed(() => {
  let users = adminStore.usuarios;
  if (statusFilter.value !== 'todos') {
    users = users.filter(u => u.estado === statusFilter.value);
  }
  if (filter.value.trim()) {
    const f = filter.value.toLowerCase();
    users = users.filter(u =>
      u.nombre?.toLowerCase().includes(f) ||
      u.email?.toLowerCase().includes(f)
    );
  }
  return users;
});

const toggleStatus = async (user) => {
  try {
    await adminStore.toggleUsuarioEstado(user._id, user.estado);
    $q.notify({ message: `Estado de ${user.nombre} actualizado ✨`, color: 'positive', position: 'bottom-right' });
  } catch {
    $q.notify({ message: 'Error al cambiar estado', color: 'negative' });
  }
};

const editUser = (user) => {
  selectedUser.value = { ...user };
  showEditDialog.value = true;
};

const onUserUpdated = () => {
  showEditDialog.value = false;
  $q.notify({ message: 'Alma actualizada correctamente', color: 'positive' });
};

const confirmDelete = (user) => {
  $q.dialog({
    title: 'Disolver Alma',
    message: `¿Seguro que deseas eliminar a ${user.nombre}?`,
    cancel: true, dark: true,
    ok: { color: 'negative', label: 'Eliminar' }
  }).onOk(async () => {
    try {
      await adminStore.deleteUsuario(user._id);
      $q.notify({ message: 'Alma eliminada del cosmos', color: 'warning' });
    } catch {
      $q.notify({ message: 'Error al eliminar', color: 'negative' });
    }
  });
};
</script>

<style scoped>
/* KPI CARDS (igual al Dashboard) */
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

/* HEADER / INPUTS */
.border-bottom-glass-soft {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.border-glass-btn {
  border: 1px solid rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}
.border-glass-btn:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: var(--gold, #d4af37);
}
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

/* LISTA DE ALMAS (igual al Resumen) */
.user-list-item {
  transition: all 0.3s ease;
  border-radius: 16px;
}
.user-list-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}
.ghost-avatar {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* AVATAR HALO */
.avatar-halo-container {
  position: relative;
  padding: 4px;
}
.halo-effect {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  border: 2px solid transparent;
}
.halo-active {
  border-color: rgba(33, 186, 69, 0.4);
  box-shadow: 0 0 12px rgba(33, 186, 69, 0.25);
  animation: rotate-halo 5s linear infinite;
}
.halo-inactive {
  border-color: rgba(255, 77, 77, 0.15);
}
@keyframes rotate-halo {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* STATUS ORBs */
.status-orb-active {
  width: 10px; height: 10px; border-radius: 50%;
  background: #21ba45; box-shadow: 0 0 10px #21ba45;
}
.status-orb-inactive {
  width: 10px; height: 10px; border-radius: 50%;
  background: #ff4d4d; opacity: 0.5;
}

/* ACTION BUTTONS */
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
</style>
