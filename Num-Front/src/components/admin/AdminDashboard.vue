<template>
  <div class="q-animate-fade-in">
    <!-- FILA DE ESTADO GENERAL Y MÉTRICAS -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <div class="kpi-card-professional border-emerald pulse-glow-emerald">
          <div class="row items-center justify-between">
            <div>
              <div class="text-overline text-emerald opacity-70">Estado del Sistema</div>
              <div class="text-h4 text-white text-bold">OPERATIVO</div>
            </div>
            <div class="status-indicator-wrap large">
              <div class="pulse-dot active"></div>
            </div>
          </div>
          <div class="text-caption text-grey-5 q-mt-md">Sincronización Astral en Tiempo Real</div>
        </div>
      </div>

      <div class="col-12 col-md-8">
        <div class="row q-col-gutter-lg">
          <div class="col-6 col-sm-3">
            <div class="stat-box">
              <div class="text-h5 text-white text-bold font-mono">{{ formatoPesos(stats.ingresosTotales) }}</div>
              <div class="text-mini text-gold">Ingresos</div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="stat-box">
              <div class="text-h5 text-white text-bold">{{ stats.usuariosActivos }}</div>
              <div class="text-mini text-emerald">Activos</div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="stat-box">
              <div class="text-h5 text-white text-bold">{{ stats.totalLecturas }}</div>
              <div class="text-mini text-primary">Lecturas</div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="stat-box">
              <div class="text-h5 text-white text-bold">+{{ stats.nuevosUsuarios }}</div>
              <div class="text-mini text-grey-4">Nuevos</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <!-- Actividad Reciente (Usuarios) -->
      <div class="col-12 col-md-7">
        <div class="glass-panel-dark q-pa-xl full-height border-glass overflow-hidden shadow-24">
          <div class="row items-center justify-between q-mb-xl">
            <div>
              <h3 class="text-h5 text-weight-bold text-white no-margin">Auditoría de Almas</h3>
              <p class="text-caption text-grey-5 no-margin">Últimas sincronizaciones en el portal</p>
            </div>
            <q-btn unelevated color="primary" label="Gestionar Usuarios" icon-right="chevron_right" no-caps @click="$emit('setView', 'usuarios')" class="rounded-lg" />
          </div>

          <q-markup-table flat class="bg-transparent text-white table-professional-mini">
            <thead>
              <tr class="text-primary text-bold text-uppercase text-caption letter-spacing-2">
                <th class="text-left">Identidad</th>
                <th class="text-left">Canal</th>
                <th class="text-right">Alineación</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in ultimosUsuarios" :key="user._id" class="row-professional-mini">
                <td>
                  <div class="row items-center gap-sm">
                    <q-avatar size="28px" color="primary-opacity" text-color="primary" class="text-bold">
                      {{ user.nombre.charAt(0) }}
                    </q-avatar>
                    <span class="text-weight-bold">{{ user.nombre }}</span>
                  </div>
                </td>
                <td class="text-grey-5 font-mono text-caption">{{ user.email }}</td>
                <td class="text-right">
                  <div class="row items-center justify-end gap-sm">
                    <div class="pulse-dot-mini" :class="user.estado === 1 ? 'active' : 'inactive'"></div>
                    <span :class="user.estado === 1 ? 'text-emerald' : 'text-red-4'" class="text-mini text-bold">
                      {{ user.estado === 1 ? 'ACTIVE' : 'IDLE' }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>

      <!-- Pagos Recientes -->
      <div class="col-12 col-md-5">
        <div class="glass-panel-dark q-pa-xl full-height border-glass shadow-24">
          <div class="row items-center justify-between q-mb-xl">
            <div>
              <h3 class="text-h5 text-weight-bold text-white no-margin">Flujo Financiero</h3>
              <p class="text-caption text-grey-5 no-margin">Últimas transacciones</p>
            </div>
            <q-btn unelevated color="gold" label="Tesorería" icon-right="account_balance_wallet" no-caps @click="$emit('setView', 'pagos')" class="rounded-lg text-black" />
          </div>

          <div class="q-gutter-y-lg">
            <div v-for="pago in ultimosPagos" :key="pago._id" class="transaction-card-mini flex items-center justify-between">
              <div class="row items-center gap-md">
                <div class="icon-wrap bg-gold-opacity">
                  <q-icon name="receipt" color="gold" size="sm" />
                </div>
                <div>
                  <div class="text-subtitle1 text-white text-bold">{{ adminStore.usuariosMap[pago.usuarioId] || 'Buscador' }}</div>
                  <div class="text-caption text-grey-6">{{ converFecha(pago.fecha) }}</div>
                </div>
              </div>
              <div class="text-h6 text-gold text-weight-bolder font-mono">
                {{ formatoPesos(pago.monto) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAdminStore } from '../../store/admin.js';
import { formatoPesos, converFecha } from '../../utils/functions.js';

const adminStore = useAdminStore();
const stats = computed(() => adminStore.stats);

const ultimosUsuarios = computed(() => adminStore.usuarios.slice(-6).reverse());
const ultimosPagos = computed(() => adminStore.pagos.slice(-6).reverse());

defineEmits(['setView']);
</script>

<style scoped>
.kpi-card-professional {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
}

.pulse-glow-emerald {
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.05);
}

.stat-box {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-box:hover {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(59, 130, 246, 0.2);
  transform: translateY(-5px);
}

.glass-panel-dark {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
}

/* Pulsing Dots */
.status-indicator-wrap.large {
  padding: 10px;
}

.pulse-dot {
  width: 16px;
  height: 16px;
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
  opacity: 0.6;
}
.pulse-dot.active::after { border: 6px solid #10b981; }
.pulse-dot.inactive::after { border: 6px solid #f43f5e; }

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(3.5); opacity: 0; }
}

.pulse-dot-mini {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.pulse-dot-mini.active { background: #10b981; box-shadow: 0 0 10px #10b981; }
.pulse-dot-mini.inactive { background: #f43f5e; box-shadow: 0 0 10px #f43f5e; }

.table-professional-mini { background: transparent; }
.table-professional-mini th { letter-spacing: 2px; opacity: 0.6; padding-bottom: 20px; }
.row-professional-mini td { padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }

.transaction-card-mini {
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}
.transaction-card-mini:hover {
  background: rgba(212, 175, 55, 0.04);
  transform: translateX(5px);
}

.icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-gold-opacity { background: rgba(212, 175, 55, 0.1); }
.primary-opacity { background: rgba(59, 130, 246, 0.1); }

.text-mini { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
.border-emerald { border-left: 5px solid #10b981; }
.letter-spacing-2 { letter-spacing: 2px; }
</style>
