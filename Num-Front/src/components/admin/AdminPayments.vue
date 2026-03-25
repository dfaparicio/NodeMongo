<template>
  <div class="admin-payments q-gutter-y-xl q-pa-md">
    <!-- Summary Row -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg">
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Recaudación Total</div>
          <div class="text-h3 text-weight-bold text-positive">${{ adminStore.stats.ingresosTotales.toLocaleString() }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg">
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Pagos del Mes</div>
          <div class="text-h3 text-weight-bold">{{ currentMonthPayments }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="glass-panel no-border text-center q-pa-lg">
          <div class="text-caption text-gold tracking-widest uppercase q-mb-sm">Ticket Promedio</div>
          <div class="text-h3 text-weight-bold text-info">${{ averageTicket }}</div>
        </q-card>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="row items-center justify-between q-mb-md">
      <h2 class="text-h5 text-gold tracking-widest uppercase font-serif q-ma-none">Historial de Abundancia</h2>
    </div>

    <q-card class="glass-panel no-border overflow-hidden">
      <q-table
        :rows="adminStore.pagos"
        :columns="columns"
        row-key="_id"
        dark
        flat
        :loading="adminStore.loading"
        class="bg-transparent"
      >
        <!-- User ID to Name -->
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
                <div class="text-caption opacity-50">{{ getUserEmail(props.value) }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <!-- Status Badge con Animación -->
        <template v-slot:body-cell-estado="props">
          <q-td :props="props">
            <div class="row items-center justify-center q-gutter-x-sm">
              <div :class="getOrbClass(props.value)"></div>
              <span 
                class="text-weight-bold tracking-widest" 
                style="font-size: 11px;"
                :class="getTextColorClass(props.value)"
              >
                {{ props.value ? props.value.toUpperCase() : 'DESCONOCIDO' }}
              </span>
            </div>
          </q-td>
        </template>

        <!-- Amount with Currency -->
        <template v-slot:body-cell-monto="props">
          <q-td :props="props" class="text-weight-bold text-positive">
            ${{ props.value.toLocaleString() }}
          </q-td>
        </template>
        
        <!-- Actions -->
        <template v-slot:body-cell-acciones="props">
          <q-td :props="props">
            <q-btn flat round dense icon="receipt" color="primary">
              <q-tooltip>Reenviar Factura</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';

const adminStore = useAdminStore();

const columns = [
  { name: 'fecha', align: 'left', label: 'FECHA', field: 'fecha', sortable: true, format: val => new Date(val).toLocaleDateString() },
  { name: 'usuarioId', align: 'left', label: 'ALMA (USUARIO)', field: 'usuarioId', sortable: true },
  { name: 'monto', align: 'center', label: 'MONTO', field: 'monto', sortable: true },
  { name: 'metodo', align: 'center', label: 'MÉTODO', field: 'metodo' },
  { name: 'estado', align: 'center', label: 'ESTADO', field: 'estado', sortable: true },
  { name: 'acciones', align: 'right', label: 'ACCIONES' }
];

const currentMonthPayments = computed(() => {
  const now = new Date();
  return adminStore.pagos.filter(p => {
    const pDate = new Date(p.fecha);
    return pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear();
  }).length;
});

const averageTicket = computed(() => {
  if (adminStore.pagos.length === 0) return 0;
  return Math.round(adminStore.stats.ingresosTotales / adminStore.pagos.length);
});

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'aprobado': return 'positive';
    case 'pendiente': return 'warning';
    case 'rechazado': return 'negative';
    default: return 'grey-7';
  }
};

const getOrbClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'aprobado': return 'status-orb-active';
    case 'pendiente': return 'status-orb-warning';
    case 'rechazado': return 'status-orb-inactive';
    default: return 'status-orb-inactive';
  }
};

const getTextColorClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'aprobado': return 'text-positive';
    case 'pendiente': return 'text-warning';
    case 'rechazado': return 'text-negative';
    default: return 'text-grey-5';
  }
};

const getUserName = (val) => {
  if (val && typeof val === 'object' && val.nombre) return val.nombre;
  return adminStore.usuariosMap[val] || 'Usuario Desconocido';
};

const getUserEmail = (val) => {
  if (val && typeof val === 'object' && val.email) return val.email;
  // Fallback if we only have ID: we can find it in the original array if we need to, but let's just return ID or 'Sin Email'
  if (typeof val === 'string') return val; // Muestra el ID como fallback
  return 'Sin Email';
};
</script>

<style scoped>
.status-orb-active {
  width: 10px; height: 10px; border-radius: 50%;
  background-color: #21ba45; box-shadow: 0 0 10px #21ba45;
  animation: pulse-green 2s infinite;
}
.status-orb-warning {
  width: 10px; height: 10px; border-radius: 50%;
  background-color: #f2c037; box-shadow: 0 0 10px #f2c037;
  animation: pulse-yellow 2s infinite;
}
.status-orb-inactive {
  width: 10px; height: 10px; border-radius: 50%;
  background-color: #c10015; box-shadow: 0 0 10px #c10015;
  animation: pulse-red 2s infinite;
}

@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(33, 186, 69, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(33, 186, 69, 0); }
}
@keyframes pulse-yellow {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(242, 192, 55, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(242, 192, 55, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(242, 192, 55, 0); }
}
@keyframes pulse-red {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(193, 0, 21, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(193, 0, 21, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(193, 0, 21, 0); }
}
</style>
