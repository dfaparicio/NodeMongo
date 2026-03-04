<template>
  <q-btn :label="label" :to="to" class="cosmic-option-btn q-px-md" flat no-caps />
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  to: { type: [String, Object], default: '' }
});
</script>

<style scoped>
.cosmic-option-btn {
  position: relative;
  color: #fdd076;
  font-weight: 900;
  letter-spacing: 2px;
  border-radius: 12px;
  background: rgba(245, 190, 79, 0.05);
  border: 2px solid rgba(244, 175, 37, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.cosmic-option-btn:hover {
  color: #ffffff;
  background: rgba(244, 175, 37, 0.15);
  border-color: rgba(247, 193, 87, 0.6);
  box-shadow: 0 0 20px rgba(244, 175, 37, 0.2),
    inset 0 0 10px rgba(244, 175, 37, 0.1);
  transform: translateY(-2px);
}

.cosmic-option-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent);
  transition: all 0.6s;
}

.cosmic-option-btn:hover::before {
  left: 100%;
}
</style>