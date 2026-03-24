<template>
  <q-btn 
    :label="label" 
    :to="to" 
    :icon="icon ? icon : undefined"
    class="second-btn-ethereal" 
    flat 
    no-caps 
    @click="$emit('click')"
  />
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  to: { type: [String, Object], default: '' }
});
defineEmits(['click']);
</script>

<style scoped>
.second-btn-ethereal {
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-size: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-transform: uppercase;
  min-height: 44px;
  padding: 0 25px; /* Padding equilibrado para centrado total */
}

.second-btn-ethereal:hover {
  background: rgba(212, 175, 55, 0.15);
  border-color: rgba(212, 175, 55, 0.6);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
  transform: translateY(-2px);
}

/* Forzar el centrado del contenido interno de Quasar */
:deep(.q-btn__content) {
  width: 100%;
  justify-content: center;
  text-align: center;
}
</style>
