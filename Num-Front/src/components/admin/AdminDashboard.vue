<template>
  <div class="admin-dashboard q-gutter-y-xl animate-fade-in">
    
    <!-- TARJETAS KPI SUPREMAS -->
    <div class="row q-col-gutter-xl">
      <div class="col-12 col-sm-6 col-md-3" v-for="card in kpiCards" :key="card.title">
        <q-card class="kpi-card-galactic overflow-hidden no-border">
          <q-card-section class="q-pa-lg relative-position z-top">
            <div class="row items-center justify-between q-mb-md">
              <div class="icon-circle shadow-glow" :style="{ background: card.glowColor }">
                <q-icon :name="card.icon" size="24px" :color="card.color" />
              </div>
              <div class="text-caption text-gold-soft tracking-widest text-uppercase font-bold" style="font-size: 9px;">{{ card.title }}</div>
            </div>
            
            <div class="text-h3 text-white text-weight-bolder font-serif tracking-tighter">{{ card.value }}</div>
            
            <div class="row items-center q-mt-md opacity-40">
              <q-icon name="trending_up" size="14px" color="positive" class="q-mr-xs" />
              <span class="text-caption tracking-wider">Sincronización Positiva</span>
            </div>
          </q-card-section>
          
          <!-- Efecto de luz interna -->
          <div class="kpi-light-source" :style="{ background: `radial-gradient(circle at 30% 20%, ${card.glowColor} 0%, transparent 80%)` }"></div>
          <div class="kpi-glass-shimmer"></div>
        </q-card>
      </div>
    </div>

    <!-- SECCIÓN INTERACTIVA DE ESTADÍSTICAS (ESTILO CARD) -->
    <div class="row q-col-gutter-xl q-mt-lg">
      
      <!-- Panel de Energías (Métricas) -->
      <div class="col-12 col-md-5">
        <q-card class="kpi-card-galactic overflow-hidden no-border full-height card-cosmic-glow">
          <q-card-section class="q-pa-xl relative-position z-top">
            <div class="column q-gutter-y-xl">
              <header class="text-center">
                <div class="text-overline text-gold tracking-widest q-mb-xs">ANÁLISIS DE FRECUENCIAS</div>
                <h3 class="text-h4 font-serif italic text-white q-ma-none">Equilibrio del Sistema</h3>
              </header>
              
              <div class="column q-gutter-y-lg q-px-sm">
                <!-- Usuarios -->
                <div class="stat-progress-item">
                  <div class="row justify-between q-mb-sm items-end">
                    <span class="text-caption text-white opacity-60 tracking-widest">ALMAS VIBRANTES</span>
                    <span class="text-h6 text-primary">{{ stats.usuariosActivos }} <small class="text-grey-7">/ {{ stats.totalUsuarios }}</small></span>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-fill gold-glow" :style="{ width: `${tasaUsuarios * 100}%` }"></div>
                  </div>
                </div>

                <!-- Lecturas -->
                <div class="stat-progress-item">
                  <div class="row justify-between q-mb-sm items-end">
                    <span class="text-caption text-white opacity-60 tracking-widest">DESTINOS REVELADOS</span>
                    <span class="text-h6 text-info">{{ stats.lecturasPrincipales }} <small class="text-grey-7">/ {{ stats.totalLecturas }}</small></span>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-fill info-glow" :style="{ width: `${tasaLecturas * 100}%` }"></div>
                  </div>
                </div>

                <!-- Pagos -->
                <div class="stat-progress-item">
                  <div class="row justify-between q-mb-sm items-end">
                    <span class="text-caption text-white opacity-60 tracking-widest">FLUJO DE ABUNDANCIA</span>
                    <span class="text-h6 text-positive">{{ pagosAprobados }} <small class="text-grey-7">/ {{ totalPagosRegistrados }}</small></span>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-fill success-glow" :style="{ width: `${tasaPagos * 100}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <!-- Luz decorativa corporativa -->
          <div class="kpi-light-source" style="background: radial-gradient(circle at 10% 90%, rgba(212, 175, 55, 0.08), transparent 60%)"></div>
        </q-card>
      </div>

      <!-- Últimos Usuarios (Almas) -->
      <div class="col-12 col-md-7">
        <q-card class="kpi-card-galactic overflow-hidden no-border full-height">
          <q-card-section class="row items-center justify-between q-pa-xl border-bottom-glass-soft relative-position z-top">
            <div>
              <div class="text-caption text-gold-soft tracking-widest uppercase">Portal de Entrada</div>
              <h3 class="text-h4 font-serif italic text-white q-ma-none">Últimas Conexiones</h3>
            </div>
            <q-btn flat dense color="gold" label="Explorar Todo" @click="$emit('setView', 'usuarios')" no-caps class="rounded-xl q-px-lg tracking-widest border-glass-btn" />
          </q-card-section>
          
          <q-card-section class="q-pa-none relative-position z-top">
            <q-list padding class="q-px-md">
              <q-item v-for="user in recentUsers" :key="user._id" class="q-my-sm rounded-xl user-list-item transition-all" v-ripple>
                <q-item-section avatar>
                  <q-avatar class="ghost-avatar shadow-aura">
                    <div class="text-weight-bold">{{ (user.nombre || 'U').charAt(0).toUpperCase() }}</div>
                  </q-avatar>
                </q-item-section>
                
                <q-item-section>
                  <q-item-label class="text-weight-bold text-white tracking-wide" style="font-size: 16px;">{{ user.nombre }}</q-item-label>
                  <q-item-label caption class="text-grey-6 font-mono" style="font-size: 11px;">{{ user.email }}</q-item-label>
                </q-item-section>
                
                <q-item-section side>
                  <div class="row items-center q-gutter-x-sm">
                    <div :class="user.estado === 1 ? 'status-orb-active' : 'status-orb-inactive'"></div>
                    <span class="text-caption text-weight-bold tracking-widest" :class="user.estado === 1 ? 'text-positive' : 'text-grey-7'" style="font-size: 9px;">
                      {{ user.estado === 1 ? 'ACTIVO' : 'DORMIDO' }}
                    </span>
                  </div>
                </q-item-section>
              </q-item>
              
              <div v-if="recentUsers.length === 0" class="text-center q-pa-xl flex flex-center column opacity-30">
                <q-icon name="bedtime" size="4em" class="q-mb-md" />
                <p class="text-h6 font-light">El vacío estelar aún espera...</p>
              </div>
            </q-list>
          </q-card-section>
          <!-- Luz decorativa corporativa -->
          <div class="kpi-light-source" style="background: radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.05), transparent 50%)"></div>
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
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  pointer-events: none;
}

.kpi-glass-shimmer {
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent);
  transform: skewX(-25deg);
  transition: 0.75s;
}

.kpi-card-galactic:hover .kpi-glass-shimmer {
  left: 150%;
}

.z-top { position: relative; z-index: 2; }

/* PROGRESS BARS STYLED */
.progress-bar-container {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.02);
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.gold-glow { background: var(--gold); box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
.info-glow { background: #31ccef; box-shadow: 0 0 20px rgba(49, 204, 239, 0.4); }
.success-glow { background: #21ba45; box-shadow: 0 0 20px rgba(33, 186, 69, 0.4); }

/* USER LIST ITEMS */
.user-list-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.ghost-avatar {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.border-glass-btn {
  border: 1px solid rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}

.border-glass-btn:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: var(--gold);
}

.status-orb-active {
  width: 10px; height: 10px; border-radius: 50%;
  background: #21ba45; box-shadow: 0 0 10px #21ba45;
}

.status-orb-inactive {
  width: 10px; height: 10px; border-radius: 50%;
  background: #ff4d4d; opacity: 0.5;
}

.border-bottom-glass-soft {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
