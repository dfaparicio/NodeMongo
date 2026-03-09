<template>
  <div class="row q-col-gutter-lg q-mb-xl">
    <div v-for="kpi in kpis" :key="kpi.label" class="col-12 col-sm-6 col-md-4">
      <div class="kpi-card glass-panel" :class="kpi.class">
        <div class="row items-center justify-between q-mb-md">
          <div class="kpi-icon-wrap" :style="{ background: kpi.iconBg }">
            <q-icon :name="kpi.icon" :color="kpi.iconColor" size="20px" />
          </div>
          <q-badge v-if="kpi.trend" color="amber" class="trend-badge" label="+12.5%" />
        </div>
        <div class="text-overline text-grey-5 tracking-widest q-mb-xs">{{ kpi.label }}</div>
        <div class="kpi-value text-white">{{ kpi.value }}</div>
        <div class="kpi-progress-bg">
          <div class="kpi-progress-fill" :style="{ width: '70%', background: kpi.iconBg }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  usuarios: { type: Array, default: () => [] },
});

const totalUsuarios = computed(() => props.usuarios.length);
const activos = computed(() => props.usuarios.filter(u => u.estado === 1).length);
const nuevosEsteMes = computed(() => {
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  return props.usuarios.filter(u => {
    const fecha = new Date(u.fechanacimiento);
    return fecha >= inicioMes;
  }).length;
});

const kpis = computed(() => [
  { label: 'Total Usuarios', value: totalUsuarios.value, icon: 'group', iconColor: 'blue-4', iconBg: 'rgba(41, 121, 255, 0.14)', class: 'border-blue' },
  { label: 'Sincronizados', value: activos.value, icon: 'bolt', iconColor: 'green-4', iconBg: 'rgba(0, 230, 118, 0.14)', class: 'border-green' },
  { label: 'Nuevos Visitantes', value: '+' + nuevosEsteMes.value, icon: 'auto_awesome', iconColor: 'amber', iconBg: 'rgba(242, 169, 0, 0.14)', class: 'border-amber', trend: true },
]);
</script>

<style scoped>
.kpi-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.kpi-card:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.glass-panel {
  backdrop-filter: blur(12px);
}

.kpi-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-value {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1;
}

.tracking-widest { letter-spacing: 1.5px; font-weight: 700; font-size: 10px; }

.kpi-progress-bg {
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;
}

.kpi-progress-fill {
  height: 100%;
  border-radius: 2px;
}

.border-blue { border-left: 2px solid rgba(41, 121, 255, 0.3); }
.border-green { border-left: 2px solid rgba(0, 230, 118, 0.3); }
.border-amber { border-left: 2px solid rgba(242, 169, 0, 0.3); }

.trend-badge {
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
}
</style>

