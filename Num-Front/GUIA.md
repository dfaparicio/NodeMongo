# Guía de Convenciones - Num-Front

## Funciones

```js
// Async para llamadas API
export const getData = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

// Arrow functions en servicios y utils
const converFecha = (dateSource) => {
  if (!dateSource) return "--";
  // ...
  return formateada;
};

// En stores: funciones setter
const setLectura = (valor) => {
  lecturaActual.value = valor;
};
```

**Reglas:**
- `async/await` para cualquier operación HTTP
- Arrow functions para callbacks y handlers
- Nombres en **camelCase**
- Export named para servicios, default para componentes

---

## Importaciones

```js
// Orden: 1) Framework/Externos, 2) Internos, 3) Componentes
import { ref, nextTick } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Notify } from 'quasar';

import axiosInstance from "../plugins/pluginAxios.js";
import { useAuthStore } from "../store/auth.js";
import PrimaryButton from '../components/primaryButton.vue';
import { converFecha, resetearHoras } from '../utils/functions.js';
```

**Reglas:**
- Siempre usar `import`, nunca `require`
- Incluir extensión `.js` o `.vue`
- Separar con líneas en blanco por categoría

---

## Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── primaryButton.vue
│   └── admin/
│       └── AdminDashboard.vue
├── views/               # Páginas principales
│   ├── login.vue
│   └── dashboard.vue
├── services/            # Llamadas API
│   └── services.js
├── store/               # Pinia stores
│   └── auth.js
├── utils/               # Funciones utilitarias
│   ├── notify.js
│   └── functions.js
├── plugins/             # Plugins (axios, etc)
│   └── pluginAxios.js
└── router/              # Configuración de rutas
    └── router.js
```

**Reglas:**
- `components/` para UI reutilizable
- `views/` para páginas/rutas
- `services/` para comunicaciones con API
- `utils/` para funciones puras/helpers
- Subcarpetas con `kebab-case` si agrupa temas (admin/)

---

## Convenciones de Nombres

```js
// Variables y funciones: camelCase
const email = ref("");
const login = async () => { };
export const converFecha = () => { };

// Componentes: PascalCase en import, kebab-case en archivo
import PrimaryButton from '../components/primaryButton.vue';

// Archivos: kebab-case
// login.vue, primaryButton.vue, services.js

// Stores: use + Nombre + Store
useAuthStore, useAdminStore
```

---

## Manejo de Errores

```js
try {
  const res = await postData("auth/login", data);
  authStore.token = res.token;
  showNotify.success("Conexión Establecida", "Bienvenido");
  router.push('/perfil');
} catch (error) {
  console.error("Detalle del error:", error.response?.data);
  let msg = error.response?.data?.error || "Error al conectar";
  showNotify.error("Error", msg);
} finally {
  loading.value = false;
}
```

**Reglas:**
- Siempre usar `try/catch` en llamadas API
- Mostrar feedback con `showNotify`
- `console.error` para debug
- `finally` para limpiar estados (loading)

---

## Vue Components

```vue
<script setup>
import { ref } from 'vue';

// Props
defineProps({
  label: { type: String, default: "Default" },
  icon: { type: String, default: "icon" }
});

// Emits
defineEmits(["click"]);

// Estado local
const loading = ref(false);
</script>

<template>
  <q-btn :label="label" @click="$emit('click')" />
</template>
```

**Reglas:**
- Usar Composition API con `<script setup>`
- `defineProps` para props
- `defineEmits` para eventos
- Refs para estado reactivo

---

## Servicios API

```js
import axiosInstance from "../plugins/pluginAxios.js";

// Named exports
export const getData = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const postData = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};
```

**Reglas:**
- Una instancia axios centralizada (`pluginAxios.js`)
- Functions nombradas por verbo HTTP
- Solo retornar `response.data`

---

## Pinia Stores

```js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // Estado
    const token = ref("");
    const user = ref(null);

    // Actions
    const logout = () => {
      token.value = "";
      user.value = null;
    };

    return { token, user, logout };
  },
  { persist: true }
);
```

**Reglas:**
- `ref` para estado
- Funciones para setters/actions
- Exportar como `useNameStore`
- `persist: true` si debe guardarse en localStorage

---

## Router

```js
const routes = [
  { path: "/login", component: login },
  { path: "/perfil", component: perfil },
  { path: "/admin", component: admin }
];