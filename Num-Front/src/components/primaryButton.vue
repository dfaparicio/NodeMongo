<template>
  <q-btn 
    :to="to" 
    :label="label" 
    :icon-right="icon" 
    class="primary-btn-astral full-width" 
    unelevated
    @click="$emit('click')"
  >
  </q-btn>
</template>

<script setup>
defineProps({
  label: { type: String, default: "Reveal My Path" },
  icon: { type: String, default: "east" },
  to: { type: [String, Object], default: null },
});

defineEmits(["click"]);
</script>

<style scoped>
.primary-btn-astral {
  background: linear-gradient(135deg, #f4af25 0%, #e09010 100%);
  color: #0d0d1a;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 3px;
  border-radius: 100px; /* Estilo píldora elegante */
  text-transform: uppercase;
  padding: 14px 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px rgba(244, 175, 37, 0.2);
}

.primary-btn-astral:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(244, 175, 37, 0.4);
  filter: brightness(1.1);
}

.primary-btn-astral:active {
  transform: translateY(-1px);
}

.full-width {
  width: 100%;
}
</style>
