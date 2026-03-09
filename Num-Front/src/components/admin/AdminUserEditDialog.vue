<template>
  <q-dialog :model-value="modelValue" persistent transition-show="fade" transition-hide="fade"
    @update:model-value="$emit('update:modelValue', $event)">
    <q-card class="cosmic-dialog-card glass-panel shadow-24">
      <!-- Top Decorative Bar -->
      <div class="top-accent-bar"></div>

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

          <div class="row q-col-gutter-lg">
            <!-- Rol Select -->
            <div class="col-12">
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
            </div>
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

// ✅ SOLO sincronizar el formulario cuando el diálogo SE ABRE (modelValue pasa a true)
// Esto evita que el watch reactivo sobreescriba los datos del formulario
// cuando el store se refresca tras guardar.
watch(() => props.modelValue, (abierto) => {
  saving.value = false; // Resetear siempre al cambiar visibilidad
  if (abierto && props.usuario?._id) {
    form.value = {
      nombre: props.usuario.nombre || '',
      email: props.usuario.email || '',
      rol: props.usuario.rol || 'USER_ROLE',
      estado: props.usuario.estado ?? 1,
    };
  }
}, { immediate: true });

const onGuardar = () => {
  if (!form.value.nombre?.trim()) {
    $q.notify({ 
      type: 'warning', 
      message: 'El nombre es obligatorio', 
      position: 'top',
    });
    return;
  }

  saving.value = true;

  // emit() es SÍNCRONO en Vue. No usar await.
  // El padre (AdminUsers) maneja la lógica async.
  console.log('📤 Emitiendo evento guardar desde el diálogo:', { id: props.usuario._id, datos: form.value });
  emit('guardar', {
    id: props.usuario._id,
    datos: { 
      nombre: form.value.nombre,
      email: form.value.email,
      rol: form.value.rol,
      estado: form.value.estado
    },
  });
};
</script>


<style scoped>
.cosmic-dialog-card {
  width: 520px;
  max-width: 95vw;
  background-color: #0d0f12 !important;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'Manrope', sans-serif;
}

.glass-panel {
  backdrop-filter: blur(20px);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7);
}

.top-accent-bar {
  height: 4px;
  background: linear-gradient(90deg, transparent, #f2a900, transparent);
  width: 100%;
}

.tracking-widest { letter-spacing: 0.15em; }
.tracking-wide { letter-spacing: 0.08em; }
.opacity-10 { opacity: 0.1; }

.cosmic-label {
  display: block;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: #f2a900;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
  margin-left: 2px;
}

.cosmic-input :deep(.q-field__control) {
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.03) !important;
  transition: all 0.3s ease;
}

.cosmic-input :deep(.q-field__control:hover) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(242, 169, 0, 0.3) !important;
}

.cosmic-input :deep(.q-field--focused .q-field__control) {
  background: rgba(255, 255, 255, 0.07) !important;
  box-shadow: 0 0 15px rgba(242, 169, 0, 0.1);
}

.rounded-pill { border-radius: 50px; }

.shadow-amber {
  box-shadow: 0 4px 15px rgba(242, 169, 0, 0.3);
}

.glow-icon {
  filter: drop-shadow(0 0 5px rgba(242, 169, 0, 0.5));
}

.transition-03 { transition: all 0.3s ease; }
.hover-white:hover { color: #fff !important; }
.hover-bg-light:hover { background: rgba(255,255,255,0.05) !important; }

/* Scrollbar styling */
.scroll::-webkit-scrollbar {
  width: 4px;
}
.scroll::-webkit-scrollbar-thumb {
  background: rgba(242, 169, 0, 0.2);
  border-radius: 10px;
}
</style>

