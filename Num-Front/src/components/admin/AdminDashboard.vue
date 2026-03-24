<template>
  <div class="q-animate-fade-in">
    <!-- Fila de KPIs -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="kpi-card border-gold">
          <div class="kpi-icon-bg bg-gold-opacity">
            <q-icon name="payments" size="24px" color="gold" />
          </div>
          <div class="kpi-content">
            <div class="text-overline text-grey-5">Ingresos Totales</div>
            <div class="text-h4 text-bold text-white font-mono">{{ formatoPesos(stats.ingresosTotales) }}</div>
          </div>
          <div class="kpi-badge text-gold">+12% vs mes anterior</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="kpi-card border-emerald">
          <div class="kpi-icon-bg bg-emerald-opacity">
            <q-icon name="group_add" size="24px" class="text-emerald" />
          </div>
          <div class="kpi-content">
            <div class="text-overline text-grey-5">Usuarios Activos</div>
            <div class="text-h4 text-bold text-white">{{ stats.usuariosActivos }} / {{ stats.totalUsuarios }}</div>
          </div>
          <div class="kpi-badge text-emerald">Población Alineada</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="kpi-card border-primary">
          <div class="kpi-icon-bg bg-primary-opacity">
            <q-icon name="auto_awesome" size="24px" color="primary" />
          </div>
          <div class="kpi-content">
            <div class="text-overline text-grey-5">Lecturas Hoy</div>
            <div class="text-h4 text-bold text-white">{{ stats.totalLecturas }}</div>
          </div>
          <div class="kpi-badge text-primary">{{ stats.lecturasPrincipales }} Principales</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="kpi-card border-silver">
          <div class="kpi-icon-bg bg-silver-opacity">
            <q-icon name="trending_up" size="24px" color="white" />
          </div>
          <div class="kpi-content">
            <div class="text-overline text-grey-5">Crecimiento 30d</div>
            <div class="text-h4 text-bold text-white">{{ stats.nuevosUsuarios }} Nuevos</div>
          </div>
          <div class="kpi-badge text-grey-4">Expansión Astral</div>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <!-- Actividad Reciente (Usuarios) -->
      <div class="col-12 col-md-7">
        <div class="glass-panel q-pa-lg full-height overflow-hidden border-glass">
          <div class="row items-center justify-between q-mb-lg">
            <div>
              <h3 class="text-h6 text-weight-bold text-white no-margin">Almas Recientemente Alineadas</h3>
              <p class="text-caption text-grey-5 no-margin">Últimos usuarios registrados en el portal</p>
            </div>
            <q-btn flat dense color="primary" label="Ver todos" no-caps @click="$emit('setView', 'usuarios')" />
          </div>

          <q-markup-table flat class="bg-transparent text-white cosmic-mini-table">
            <thead>
              <tr class="text-grey-6 text-uppercase text-caption letter-spacing-1">
                <th class="text-left">Usuario</th>
                <th class="text-left">Email</th>
                <th class="text-right">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in ultimosUsuarios" :key="user._id" class="hover-row">
                <td class="text-weight-bold">{{ user.nombre }}</td>
                <td class="text-grey-5">{{ user.email }}</td>
                <td class="text-right">
                  <q-badge :color="user.estado === 1 ? 'emerald-9' : 'grey-9'" :class="user.estado === 1 ? 'text-emerald' : 'text-grey-5'" rounded class="q-px-sm border-status">
                    {{ user.estado === 1 ? 'Activo' : 'Inactivo' }}
                  </q-badge>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>

      <!-- Pagos Recientes -->
      <div class="col-12 col-md-5">
        <div class="glass-panel q-pa-lg full-height border-glass">
          <div class="row items-center justify-between q-mb-lg">
            <div>
              <h3 class="text-h6 text-weight-bold text-white no-margin">Flujo de Abundancia</h3>
              <p class="text-caption text-grey-5 no-margin">Últimas transacciones procesadas</p>
            </div>
            <q-btn flat dense color="gold" label="Ver pagos" no-caps @click="$emit('setView', 'pagos')" />
          </div>

          <div class="q-gutter-y-md">
            <div v-for="pago in ultimosPagos" :key="pago._id" class="pago-mini-item flex items-center justify-between">
              <div class="row items-center gap-md">
                <div class="pago-icon-mini bg-gold-opacity flex flex-center">
                  <q-icon name="receipt" color="gold" size="xs" />
                </div>
                <div>
                  <div class="text-subtitle2 text-white">{{ adminStore.usuariosMap[pago.usuarioId] || 'Buscador' }}</div>
                  <div class="text-caption text-grey-6">{{ converFecha(pago.fecha) }}</div>
                </div>
              </div>
              <div class="text-subtitle1 text-gold text-weight-bold font-mono">
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

const ultimosUsuarios = computed(() => adminStore.usuarios.slice(-5).reverse());
const ultimosPagos = computed(() => adminStore.pagos.slice(-5).reverse());

defineEmits(['setView']);
</script>

<style scoped>
.kpi-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.04);
}

.kpi-icon-bg {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.kpi-content {
  margin-bottom: 12px;
}

.kpi-badge {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Colores Tematizados */
.bg-gold-opacity { background: rgba(212, 175, 55, 0.1); }
.border-gold { border-color: rgba(212, 175, 55, 0.2); }
.text-gold { color: #d4af37; }

.bg-emerald-opacity { background: rgba(16, 185, 129, 0.1); }
.border-emerald { border-color: rgba(16, 185, 129, 0.2); }
.text-emerald { color: #10b981; }

.bg-primary-opacity { background: rgba(0, 150, 255, 0.1); }
.border-primary { border-color: rgba(0, 150, 255, 0.2); }

.bg-silver-opacity { background: rgba(255, 255, 255, 0.05); }
.border-silver { border-color: rgba(255, 255, 255, 0.1); }

.cosmic-mini-table {
  border-spacing: 0 8px;
  border-collapse: separate;
}

.cosmic-mini-table td {
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.hover-row:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.pago-mini-item {
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.pago-mini-item:hover {
  background: rgba(212, 175, 55, 0.03);
  border-color: rgba(212, 175, 55, 0.1);
}

.pago-icon-mini {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.border-status {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.letter-spacing-1 { letter-spacing: 1px; }
</style>
