<template>
  <RouterLink v-if="to" :to="to"
    class="w-full py-3.5 bg-gradient-to-r from-primary via-yellow-500 to-amber-600 text-background-dark font-bold rounded-lg shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
    <span>{{ label }}</span>
    <span v-if="icon" class="material-icons text-sm">
      {{ icon }}
    </span>
  </RouterLink>
  
  <button v-else :type="type" @click="$emit('click')"
    class="w-full py-3.5 bg-gradient-to-r from-primary via-yellow-500 to-amber-600 text-background-dark font-bold rounded-lg shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
    <span>{{ label }}</span>
    <span v-if="icon" class="material-icons text-sm">
      {{ icon }}
    </span>
  </button>
</template>

<script setup>
import { RouterLink } from "vue-router"

defineProps({
  label: {
    type: String,
    default: "Revelar mi Camino"
  },
  icon: {
    type: String,
    default: "east"
  },
  type: {
    type: String,
    default: "button"
  },
  to: {
    type: [String, Object],
    default: null
  }
})

defineEmits(["click"])
</script>
