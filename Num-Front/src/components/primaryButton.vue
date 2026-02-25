<template>
  <q-btn :to="to" :label="label" :icon-right="icon" class="cosmic-gold-btn full-width" @click="$emit('click')">
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
.cosmic-gold-btn {
  background: linear-gradient(45deg, #cbac45 0%, #f9f295 45%, #e6be8a 70%, #b8860b 100%);
  color: #1a1a1a;
  font-weight: 800;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cosmic-gold-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
  filter: saturate(1.2);
}

.cosmic-gold-btn:active {
  transform: translateY(1px);
}

.full-width {
  width: 100%;
}
</style>