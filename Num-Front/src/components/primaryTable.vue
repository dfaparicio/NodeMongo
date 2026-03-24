<template>
  <div class="flex column h-full">
    
    <div class="flex justify-between items-center border-bottom-primary q-px-md q-pt-sm">
      
      <div v-if="tabs && tabs.length > 0" class="flex">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="['tab-btn', modelValue === tab.value ? 'active' : 'inactive']"
          @click="changeTab(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>
      <div v-else></div> <div class="relative-position q-pb-sm q-pr-sm">
        <q-icon name="search" class="absolute-left q-ml-sm" style="top:15% !important; color: #94a3b8;" size="sm" />
        <input 
          v-model="searchQuery" 
          type="text" 
          class="cosmic-input"
        />
      </div>

    </div>

    <div class="overflow-auto">
      <table class="full-width cosmic-table text-left" style="border-collapse: collapse">
        <thead>
          <slot name="header"></slot>
        </thead>
        <tbody>
          <slot name="body" :items="paginatedData"></slot>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center q-pa-md border-top-primary mt-auto">
      <span class="text-slate-400 text-caption">
        Mostrando {{ paginatedData.length > 0 ? startIndex + 1 : 0 }} - {{ Math.min(endIndex, filteredData.length) }} de {{ filteredData.length }}
      </span>
      
      <div class="flex items-center q-gutter-x-sm">
        <button class="pagination-btn flex flex-center" :disabled="currentPage === 1" @click="currentPage--">
          <q-icon name="chevron_left" size="sm" />
        </button>
        <span class="text-white text-caption text-weight-bold">
          {{ currentPage }} / {{ totalPages || 1 }}
        </span>
        <button class="pagination-btn flex flex-center" :disabled="currentPage === totalPages || totalPages === 0" @click="currentPage++">
          <q-icon name="chevron_right" size="sm" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  tabs: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  itemsPerPage: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const currentPage = ref(1)


const changeTab = (val) => {
  searchQuery.value = ''
  currentPage.value = 1
  emit('update:modelValue', val)
}

const filteredData = computed(() => {
  if (!searchQuery.value) return props.data;
  
  const lowerQuery = searchQuery.value.toLowerCase()
  
  return props.data.filter(item => {
    return Object.values(item).some(val => {
      if (val === null || val === undefined) return false;
      if (typeof val === 'object') {
        return JSON.stringify(val).toLowerCase().includes(lowerQuery)
      }
      return String(val).toLowerCase().includes(lowerQuery)
    })
  })
})


const totalPages = computed(() => Math.ceil(filteredData.value.length / props.itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * props.itemsPerPage)
const endIndex = computed(() => startIndex.value + props.itemsPerPage)

const paginatedData = computed(() => {
  return filteredData.value.slice(startIndex.value, endIndex.value)
})

watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<style scoped>
.h-full { height: 100%; }
.mt-auto { margin-top: auto; }
.flex { display: flex; }
.column { flex-direction: column; }
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.full-width { width: 100%; }
.text-left { text-align: left; }

.border-bottom-primary { border-bottom: 1px solid rgba(244, 175, 37, 0.2); }
.border-top-primary { border-top: 1px solid rgba(244, 175, 37, 0.2); }

/* Pestañas */
.tab-btn {
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.tab-btn.active {
  border-color: #f4af25;
  color: #f4af25;
  background-color: rgba(244, 175, 37, 0.05);
}
.tab-btn.inactive { color: #64748b; }
.tab-btn.inactive:hover { color: #cbd5e1; }

/* Buscador Cósmico */
.cosmic-input {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(244, 175, 37, 0.2);
  border-radius: 20px;
  color: #cbd5e1;
  padding: 0.4rem 1rem 0.4rem 2.5rem;
  outline: none;
  font-size: 0.85rem;
  transition: all 0.3s;
  width: 200px;
}
.cosmic-input:focus {
  border-color: #f4af25;
  box-shadow: 0 0 10px rgba(244, 175, 37, 0.2);
  width: 250px;
}
.cosmic-input::placeholder { color: #64748b; }

/* Botones Paginación */
.pagination-btn {
  background: rgba(244, 175, 37, 0.1);
  border: 1px solid rgba(244, 175, 37, 0.3);
  color: #f4af25;
  border-radius: 8px;
  cursor: pointer;
  padding: 4px;
  transition: all 0.3s;
}
.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: transparent;
  border-color: rgba(255, 255, 255, 0.1);
  color: #64748b;
}
.pagination-btn:not(:disabled):hover {
  background: rgba(244, 175, 37, 0.3);
  box-shadow: 0 0 10px rgba(244, 175, 37, 0.2);
}

/* ----------------------------------------------------------------- */
/* Estilos inyectados con :deep() para tu HTML padre                 */
/* ----------------------------------------------------------------- */
.cosmic-table :deep(th) {
  color: #64748b;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.2em;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  font-weight: 600;
}
.cosmic-table :deep(td) {
  padding: 1.25rem 2rem;
  border-bottom: 1px solid rgba(244, 175, 37, 0.1);
}
:deep(.table-row-hover:hover) {
  background-color: rgba(244, 175, 37, 0.05);
  transition: background-color 0.3s;
}

:deep(.text-slate-300) { color: #cbd5e1; }
:deep(.text-slate-400) { color: #94a3b8; }
:deep(.text-weight-medium) { font-weight: 500; }
:deep(.text-italic) { font-style: italic; }
:deep(.text-primary-custom) { color: #f4af25; }
:deep(.text-right) { text-align: right; }
:deep(.text-center) { text-align: center; }
:deep(.cursor-pointer) { cursor: pointer; }
:deep(.hover-white:hover) { color: white !important; transition: color 0.3s; }

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #f4af25; border-radius: 10px; }
</style>