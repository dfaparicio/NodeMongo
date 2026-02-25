<template>
  <q-card flat class="glass-card q-pa-md q-mb-md relative overflow-hidden hover-glow">
    <div class="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl bg-primary/20"></div>

    <div class="q-pa-md w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-4 text-primary bg-black/40">
      <q-icon :name="icon" size="2rem" />
    </div>

    <h3 class="font-serif text-2xl text-white mb-2">{{ title }}</h3>
    <p class="text-sm text-white/50 font-light leading-relaxed">{{ description }}</p>

    <div class="q-mt-md w-full h-px" style="background: linear-gradient(to right, var(--q-primary)/50, transparent);"></div>
  </q-card>
</template>

<script setup>
import { QCard, QIcon } from "quasar";

defineProps({
  icon: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, required: true }
});
</script>

<style>
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  transition: transform 0.5s, border-color 0.5s;
  cursor: pointer;
}
.glass-card:hover {
  transform: translateY(-8px);
  border-color: rgba(var(--q-primary-rgb), 0.5);
}
.hover-glow {
  overflow: hidden;
}
</style>