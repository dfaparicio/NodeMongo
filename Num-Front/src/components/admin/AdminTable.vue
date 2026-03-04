<template>
  <div>
    <!-- Table Header: Title + Search -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <h3 class="table-heading no-margin">{{ title }}</h3>
        <p class="text-caption text-grey-6 q-mt-xs no-margin" v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div class="row items-center q-gutter-x-sm">
        <div class="search-box row items-center q-px-md no-wrap">
          <q-icon name="search" color="grey-6" size="18px" class="q-mr-sm" />
          <q-input
            v-model="search"
            dense
            borderless
            dark
            :placeholder="searchPlaceholder"
            class="search-input"
            style="min-width: 220px"
          />
        </div>
        <slot name="actions-header" />
      </div>
    </div>

    <!-- Table -->
    <q-card class="glass-table no-shadow overflow-hidden">
      <q-markup-table flat class="bg-transparent text-white">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :class="col.align === 'right' ? 'text-right' : 'text-left'"
              class="table-header-cell"
            >
              {{ col.label }}
            </th>
            <th v-if="hasActions" class="table-header-cell">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Empty state -->
          <tr v-if="filteredRows.length === 0">
            <td :colspan="columns.length + (hasActions ? 1 : 0)" class="text-center q-py-xl">
              <q-icon name="inbox" size="48px" color="grey-8" class="q-mb-sm" />
              <p class="text-grey-6 q-ma-none">Sin resultados</p>
            </td>
          </tr>

          <!-- Data rows -->
          <tr
            v-for="(row, rowIndex) in paginatedRows"
            :key="rowIndex"
            class="table-row"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="col.align === 'right' ? 'text-right' : 'text-left'"
            >
              <!-- Badge type -->
              <q-badge
                v-if="col.type === 'badge'"
                :color="getBadgeColor(row[col.key], col.badgeMap)"
                :label="row[col.key]"
                outline
                class="badge-pill"
              />
              <!-- Status dot + text -->
              <span v-else-if="col.type === 'status'" class="row items-center no-wrap inline-flex" style="gap:6px">
                <span
                  class="dot"
                  :class="getStatusDot(row[col.key], col.statusMap)"
                ></span>
                {{ row[col.key] }}
              </span>
              <!-- Default text -->
              <span v-else :class="col.class">{{ row[col.key] }}</span>
            </td>

            <!-- Actions slot -->
            <td v-if="hasActions" class="text-left">
              <slot name="row-actions" :row="row" :index="rowIndex">
                <q-btn flat round dense icon="edit" size="sm" color="grey-5" @click="$emit('editar', row)" />
                <q-btn flat round dense icon="delete" size="sm" color="red-4" class="q-ml-xs" @click="$emit('eliminar', row)" />
              </slot>
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <!-- Pagination Footer -->
      <div class="row items-center justify-between q-px-lg q-py-sm table-footer">
        <span class="text-caption text-grey-6">
          Mostrando {{ startIndex + 1 }}–{{ Math.min(endIndex, filteredRows.length) }} de {{ filteredRows.length }} registros
        </span>
        <div class="row items-center q-gutter-x-xs">
          <q-btn
            flat dense round icon="chevron_left" size="sm"
            :disable="currentPage === 1"
            class="page-btn"
            @click="currentPage--"
          />
          <div
            v-for="p in totalPages" :key="p"
            class="page-number"
            :class="{ 'active': p === currentPage }"
            @click="currentPage = p"
          >
            {{ p }}
          </div>
          <q-btn
            flat dense round icon="chevron_right" size="sm"
            :disable="currentPage === totalPages"
            class="page-btn"
            @click="currentPage++"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  columns: { type: Array, default: () => [] }, // [{ key, label, type, align, class, badgeMap, statusMap }]
  rows: { type: Array, default: () => [] },
  hasActions: { type: Boolean, default: true },
  searchPlaceholder: { type: String, default: 'Buscar...' },
  perPage: { type: Number, default: 8 }
});

defineEmits(['editar', 'eliminar']);

const search = ref('');
const currentPage = ref(1);

const filteredRows = computed(() => {
  if (!search.value.trim()) return props.rows;
  const q = search.value.toLowerCase();
  return props.rows.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(q))
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRows.value.length / props.perPage))
);

const startIndex = computed(() => (currentPage.value - 1) * props.perPage);
const endIndex = computed(() => startIndex.value + props.perPage);

const paginatedRows = computed(() =>
  filteredRows.value.slice(startIndex.value, endIndex.value)
);

function getBadgeColor(value, map = {}) {
  return map[value] ?? 'grey';
}

function getStatusDot(value, map = {}) {
  return map[value] ?? 'dot-grey';
}
</script>

<style scoped>
/* TABLE CARD */
.glass-table {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 16px;
  overflow: hidden;
  display: inline-block; /* Se ajusta al ancho del contenido */
  min-width: 300px;
  max-width: 100%;
}

.glass-table :deep(table) {
  border-collapse: collapse;
}

/* HEADER */
.table-heading {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.3px;
}

.table-header-cell {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: rgba(255, 255, 255, 0.3) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  padding: 12px 16px !important; /* Más compacto */
  vertical-align: middle;
  white-space: nowrap;
}

/* La última columna del header toma el espacio restante */
.table-header-cell:last-child {
  width: auto;
}

/* ROWS */
.table-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important;
  transition: background 0.2s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.table-row td {
  padding: 10px 16px !important; /* Altura de fila reducida */
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  vertical-align: middle;
  white-space: nowrap;
}

/* BADGE */
.badge-pill {
  border-radius: 20px;
  font-weight: 600;
  font-size: 11px;
  padding: 4px 14px;
  letter-spacing: 0.3px;
}

/* STATUS DOT */
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.dot-green { background: #4caf50; box-shadow: 0 0 6px rgba(76, 175, 80, 0.6); }
.dot-yellow { background: #f2a900; box-shadow: 0 0 6px rgba(242, 169, 0, 0.5); }
.dot-red { background: #ef5350; box-shadow: 0 0 6px rgba(239, 83, 80, 0.5); }
.dot-grey { background: rgba(255,255,255,0.2); }

/* SEARCH BOX */
.search-box {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  height: 36px;
  transition: all 0.3s;
}
.search-box:focus-within {
  border-color: rgba(242, 169, 0, 0.3);
}
.search-input :deep(input) {
  font-size: 13px;
  color: #fff;
}
.search-input :deep(input::placeholder) {
  color: rgba(255,255,255,0.3);
}

/* PAGINATION */
.table-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 12px;
  padding-bottom: 12px;
}

.page-btn {
  color: rgba(255,255,255,0.3);
}

.page-number {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: rgba(255,255,255,0.4);
  transition: all 0.2s;
}
.page-number:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
}
.page-number.active {
  background: rgba(242, 169, 0, 0.15);
  color: #f2a900;
  border: 1px solid rgba(242, 169, 0, 0.3);
}
</style>
