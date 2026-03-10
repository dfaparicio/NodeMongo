<template>
  <q-dialog :model-value="modelValue" persistent transition-show="fade" transition-hide="fade"
    @update:model-value="$emit('update:modelValue', $event)">
    <q-card class="cosmic-dialog-card glass-panel shadow-24">
      <div class="top-accent-bar" />

      <!-- Header Section -->
      <q-card-section class="row items-center q-pb-none q-pt-lg q-px-xl">
        <div class="column">
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="edit_note" color="amber" size="24px" class="glow-icon" />
            <h2 class="text-h6 text-weight-bolder text-uppercase tracking-widest no-margin text-white">
              Edición <span class="text-amber">Cósmica</span>
            </h2>
          </div>
          <p class="text-caption text-grey-5 text-uppercase q-mt-xs tracking-wide">
            Ajustando la frecuencia del usuario en el sistema
          </p>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup color="grey-7" class="hover-white transition-03" />
      </q-card-section>

      <q-separator dark class="q-mx-xl q-mt-md opacity-10" />

      <!-- Form Body -->
      <q-card-section class="q-px-xl q-py-lg scroll" style="max-height: 70vh">
        <q-form @submit.prevent="onGuardar" class="q-gutter-y-lg">
          <!-- Nombre Input -->
          <div class="input-group">
            <label class="cosmic-label">Nombre Completo (Vibración)</label>
            <q-input
              v-model="form.nombre"
              dark outlined color="amber"
              placeholder="Ej. Orión Celeste"
              dense
              class="cosmic-input"
            >
              <template #prepend>
                <q-icon name="person" size="18px" />
              </template>
            </q-input>
          </div>

          <!-- Email Input -->
          <div class="input-group">
            <label class="cosmic-label">Correo Electrónico (Conexión)</label>
            <q-input
              v-model="form.email"
              dark outlined color="amber"
              placeholder="buscador@cosmos.com"
              type="email"
              dense
              class="cosmic-input"
            >
              <template #prepend>
                <q-icon name="alternate_email" size="18px" />
              </template>
            </q-input>
          </div>

          <!-- Rol Select -->
          <div class="input-group">
            <label class="cosmic-label">Nivel de Acceso</label>
            <q-select
              v-model="form.rol"
              :options="rolesOptions"
              dark outlined color="amber"
              dense
              emit-value map-options
              class="cosmic-input"
            >
              <template #prepend>
                <q-icon name="shield" size="18px" />
              </template>
            </q-select>
          </div>

          <!-- Estado Toggle -->
          <div class="input-group">
            <label class="cosmic-label">Estado de la Cuenta</label>
            <div class="row items-center justify-between glass-tile q-px-md q-py-sm rounded-12">
              <div class="column">
                <span class="text-caption text-weight-bold" :class="form.estado === 1 ? 'text-green-4' : 'text-red-4'">
                  {{ form.estado === 1 ? 'Sincronizado (Activo)' : 'Inactivo (Bloqueado)' }}
                </span>
                <span class="text-caption text-grey-6 op-60">
                  {{ form.estado === 1 ? 'El usuario tiene acceso total al cosmos.' : 'El usuario no podrá acceder a su mapa.' }}
                </span>
              </div>
              <q-toggle
                v-model="form.estado"
                :true-value="1"
                :false-value="0"
                color="green-5"
                keep-color
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-separator dark class="q-mx-xl opacity-10" />

      <!-- Actions -->
      <q-card-actions align="right" class="q-px-xl q-py-xl">
        <q-btn 
          flat 
          label="Cancelar" 
          color="grey-6" 
          no-caps 
          class="q-px-lg rounded-pill hover-bg-light"
          @click="$emit('update:modelValue', false)" 
        />
        <q-btn 
          unelevated 
          label="Sincronizar Datos" 
          color="amber" 
          text-color="black"
          no-caps 
          :loading="saving" 
          class="q-px-xl rounded-pill text-weight-bold shadow-amber"
          icon="auto_fix_high"
          @click="onGuardar" 
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  usuario: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['update:modelValue', 'guardar']);

const $q = useQuasar();
const saving = ref(false);

const form = ref({
  nombre: '',
  email: '',
  rol: 'USER_ROLE',
  estado: 1,
});

const rolesOptions = [
  { label: 'Administrador Estelar', value: 'ADMIN_ROLE' },
  { label: 'Buscador Estándar', value: 'USER_ROLE' },
  { label: 'Visitante Astral', value: 'OTHER_ROLE' },
];

// Sincronizar el formulario cuando el diálogo se abre
watch(() => props.modelValue, (isOpen) => {
  saving.value = false;
  if (isOpen && props.usuario?._id) {
    const { nombre = '', email = '', rol = 'USER_ROLE', estado = 1 } = props.usuario;
    form.value = { nombre, email, rol, estado };
  }
}, { immediate: true });

const onGuardar = () => {
  if (!form.value.nombre?.trim()) {
    $q.notify({ type: 'warning', message: 'El nombre es obligatorio', position: 'top' });
    return;
  }

  saving.value = true;
  emit('guardar', {
    id: props.usuario._id,
    datos: { ...form.value },
  });
};
</script>

<style scoped>
.cosmic-dialog-card {
  width: 520px;
  max-width: 95vw;
  background-color: #0d0f12 !important;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Manrope', sans-serif;
  position: relative;
}

.cosmic-dialog-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(242, 169, 0, 0.03) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
}

.glass-panel {
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 40px 120px -20px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.top-accent-bar {
  height: 3px;
  background: linear-gradient(90deg, transparent, #f2a900, #ffcc33, #f2a900, transparent);
  width: 100%;
  animation: shimmer 3s infinite linear;
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.tracking-widest { letter-spacing: 0.25em; }
.tracking-wide { letter-spacing: 0.1em; }
.opacity-10 { opacity: 0.1; }

.cosmic-label {
  display: block;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  color: #f2a900;
  letter-spacing: 2px;
  margin-bottom: 10px;
  margin-left: 4px;
  opacity: 0.8;
}

.cosmic-input :deep(.q-field__control) {
  border-radius: 14px !important;
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.cosmic-input :deep(.q-field__control:hover) {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(242, 169, 0, 0.4) !important;
  transform: translateY(-1px);
}

.cosmic-input :deep(.q-field--focused .q-field__control) {
  background: rgba(242, 169, 0, 0.02) !important;
  border-color: #f2a900 !important;
  box-shadow: 0 8px 25px -10px rgba(242, 169, 0, 0.2);
}

.glass-tile {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.glass-tile:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}

.rounded-pill { border-radius: 50px; }

.shadow-amber {
  box-shadow: 0 10px 30px -10px rgba(242, 169, 0, 0.4);
  transition: all 0.3s ease;
}

.shadow-amber:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px -10px rgba(242, 169, 0, 0.5);
}

.glow-icon {
  filter: drop-shadow(0 0 8px rgba(242, 169, 0, 0.4));
  animation: pulse-glow 2s infinite alternate;
}

@keyframes pulse-glow {
  from { filter: drop-shadow(0 0 4px rgba(242, 169, 0, 0.3)); }
  to { filter: drop-shadow(0 0 12px rgba(242, 169, 0, 0.6)); }
}

.transition-03 { transition: all 0.3s ease; }
.hover-white:hover { color: #fff !important; transform: rotate(90deg); }
.hover-bg-light:hover { background: rgba(255,255,255,0.05) !important; }

/* Scrollbar styling */
.scroll::-webkit-scrollbar { width: 3px; }
.scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(transparent, rgba(242, 169, 0, 0.3), transparent);
  border-radius: 10px;
}
</style>
