<template>
  <q-btn 
    :label="label" 
    :to="to" 
    class="numerology-btn-gold"
    unelevated 
    no-caps
  />
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  to: { type: [String, Object], required: true }
});
</script>

<style scoped>
.numerology-btn-gold {
  background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  color: #2c2c2c; 
  font-weight: 700;
  border: 1px solid rgba(184, 134, 11, 0.5);
  transition: all 0.3s ease;
}

.numerology-btn-gold:hover {
  filter: brightness(1.1);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}
</style>