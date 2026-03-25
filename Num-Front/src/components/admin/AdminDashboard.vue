<template>
  <div class="admin-dashboard q-gutter-y-xl q-pa-md">
    <!-- Título Principal -->
    <div class="row items-center q-mb-md">
      <h2 class="text-h5 text-gold tracking-widest uppercase font-serif q-ma-none">Reporte Astral</h2>
    </div>

    <!-- KPI Cards (Totales) -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-6 col-md-3" v-for="card in kpiCards" :key="card.title">
        <q-card class="kpi-card glass-panel no-border overflow-hidden q-py-sm">
          <q-card-section class="row items-center no-wrap">
            <div class="col">
              <div class="text-caption text-uppercase tracking-widest opacity-60 text-gold q-mb-xs" style="font-size: 10px;">{{ card.title }}</div>
              <div class="text-h4 text-weight-bold">{{ card.value }}</div>
            </div>
            <div class="col-auto">
              <q-icon :name="card.icon" size="38px" :color="card.color" class="opacity-40" />
            </div>
          </q-card-section>
          <div class="card-glow" :style="{ background: `radial-gradient(circle at center, ${card.glowColor} 0%, transparent 70%)` }"></div>
        </q-card>
      </div>
    </div>

    <!-- Promedios Generales y Últimos Registros -->
    <div class="row q-col-gutter-lg q-mt-md">
      
      <!-- Desgloses y Estadísticas -->
      <div class="col-12 col-md-5">
        <q-card class="glass-panel no-border full-height">
          <q-card-section class="q-pa-lg">
            <div class="text-h6 text-gold tracking-widest font-serif q-mb-xl text-center uppercase">Desglose del Cosmos</div>
            
            <div class="column q-gutter-y-lg q-px-md">
              
              <!-- Desglose Usuarios -->
              <div>
                <div class="row justify-between q-mb-xs">
                  <span class="text-caption text-gold uppercase tracking-widest opacity-80">Almas Activas</span>
                  <span class="text-weight-bold">{{ stats.usuariosActivos }} / {{ stats.totalUsuarios }}</span>
                </div>
                <q-linear-progress dark :value="tasaUsuarios" color="primary" class="rounded-borders" style="height: 8px" />
                <div class="text-right text-grey-5 q-mt-xs" style="font-size: 10px;">{{ Math.round(tasaUsuarios * 100) }}% con frecuencia activa</div>
              </div>

              <q-separator dark class="opacity-10 q-my-sm" />
              
              <!-- Desglose Lecturas -->
              <div>
                <div class="row justify-between q-mb-xs">
                  <span class="text-caption text-info uppercase tracking-widest opacity-80">Misiones Principales</span>
                  <span class="text-weight-bold">{{ stats.lecturasPrincipales }} / {{ stats.totalLecturas }}</span>
                </div>
                <q-linear-progress dark :value="tasaLecturas" color="info" class="rounded-borders" style="height: 8px" />
                <div class="text-right text-grey-5 q-mt-xs" style="font-size: 10px;">{{ stats.lecturasDiarias }} Guías Diarias generadas</div>
              </div>

              <q-separator dark class="opacity-10 q-my-sm" />
              
              <!-- Desglose Pagos -->
              <div>
                <div class="row justify-between q-mb-xs">
                  <span class="text-caption text-positive uppercase tracking-widest opacity-80">Abundancia Aprobada</span>
                  <span class="text-weight-bold">{{ pagosAprobados }} / {{ totalPagosRegistrados }}</span>
                </div>
                <q-linear-progress dark :value="tasaPagos" color="positive" class="rounded-borders" style="height: 8px" />
                <div class="text-right text-grey-5 q-mt-xs" style="font-size: 10px;">{{ stats.pagosPendientes }} pagos pendientes / fallidos</div>
              </div>

            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Recent Users -->
      <div class="col-12 col-md-7">
        <q-card class="glass-panel no-border full-height">
          <q-card-section class="row items-center justify-between q-pa-lg border-bottom-glass q-mb-sm">
            <div class="text-h6 text-gold tracking-widest font-serif uppercase">Últimas Almas</div>
            <q-btn flat dense color="primary" label="Ver Directorio" @click="$emit('setView', 'usuarios')" no-caps class="tracking-widest" />
          </q-card-section>
          
          <q-card-section class="q-pa-none">
            <q-list separator dark>
              <q-item v-for="user in recentUsers" :key="user._id" class="q-py-md q-px-lg hover-gold-subtle">
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="black" size="40px">
                    {{ (user.nombre || 'U').charAt(0).toUpperCase() }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold tracking-wide" style="font-size: 15px;">{{ user.nombre || 'Desconocido' }}</q-item-label>
                  <q-item-label caption class="text-grey-5">{{ user.email || 'Sin email' }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge :color="user.estado === 1 ? 'positive' : 'grey-7'" outline class="q-px-sm q-py-xs rounded-lg text-weight-bold">
                    {{ user.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}
                  </q-badge>
                </q-item-section>
              </q-item>
              
              <q-item v-if="recentUsers.length === 0" class="text-center q-pa-xl opacity-40">
                <q-item-section>El universo espacial aún está vacío.</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';
import { useQuasar } from 'quasar';

const adminStore = useAdminStore();
const $q = useQuasar();

const stats = computed(() => adminStore.stats);

// Cálculos para las barras de progreso
const tasaUsuarios = computed(() => {
  if (!stats.value.totalUsuarios) return 0;
  return stats.value.usuariosActivos / stats.value.totalUsuarios;
});

const tasaLecturas = computed(() => {
  if (!stats.value.totalLecturas) return 0;
  return stats.value.lecturasPrincipales / stats.value.totalLecturas;
});

const totalPagosRegistrados = computed(() => adminStore.pagos.length);
const pagosAprobados = computed(() => adminStore.pagos.filter(p => ['aprobado', 'approved'].includes(p.estado?.toLowerCase())).length);

const tasaPagos = computed(() => {
  if (!totalPagosRegistrados.value) return 0;
  return pagosAprobados.value / totalPagosRegistrados.value;
});

const kpiCards = computed(() => [
  {
    title: 'Ingresos Totales',
    value: `$${stats.value.ingresosTotales.toLocaleString()}`,
    icon: 'payments',
    color: 'positive',
    glowColor: 'rgba(33, 186, 69, 0.2)'
  },
  {
    title: 'Almas Activas',
    value: stats.value.usuariosActivos,
    icon: 'auto_awesome',
    color: 'primary',
    glowColor: 'rgba(212, 175, 55, 0.2)'
  },
  {
    title: 'Crónicas Totales',
    value: stats.value.totalLecturas,
    icon: 'history_edu',
    color: 'info',
    glowColor: 'rgba(49, 204, 239, 0.2)'
  },
  {
    title: 'Nuevas Almas',
    value: adminStore.usuarios.slice(-5).length,
    icon: 'person_add',
    color: 'secondary',
    glowColor: 'rgba(38, 166, 154, 0.2)'
  }
]);

const recentUsers = computed(() => {
  return [...adminStore.usuarios].reverse().slice(0, 5);
});
</script>

<style scoped>
.kpi-card {
  position: relative;
  transition: transform 0.3s ease;
}
.kpi-card:hover {
  transform: translateY(-5px);
}
.card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.status-dot-active {
  width: 8px;
  height: 8px;
  background: #21ba45;
  border-radius: 50%;
  box-shadow: 0 0 10px #21ba45;
}
</style>
