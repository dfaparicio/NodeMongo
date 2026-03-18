# 📘 Integración de Mercado Pago — Guía Completa para Aprendices
## Proyecto Numerología (Numeris)

> Solo lo que necesitas saber sobre Mercado Pago. Paso a paso, con los códigos completos.

---

## 📑 Contenido

1. [Instalación de Mercado Pago](#1--instalación-de-mercado-pago)
2. [Variables de entorno (.env)](#2--variables-de-entorno)
3. [Estructura de archivos de MP](#3--estructura-de-archivos-de-mercado-pago)
4. [Backend — Código completo](#4--backend--código-completo)
5. [Frontend — Código completo](#5--frontend--código-completo)
6. [Flujo completo paso a paso](#6--flujo-completo-paso-a-paso)
7. [Explicación didáctica](#7--explicación-didáctica)
8. [Mejoras opcionales](#8--mejoras-opcionales)

---

## 1. 📦 Instalación de Mercado Pago

### En el Backend (Num-Back)

Abre una terminal, ve a la carpeta del backend y ejecuta:

```bash
cd Num-Back
npm i mercadopago
```

Eso instala el **SDK oficial de Mercado Pago para Node.js** (versión 1.5.17). Es el paquete que nos permite:
- Crear preferencias de pago (el "ticket" para cobrar).
- Verificar si un pago fue exitoso.
- Recibir notificaciones automáticas (webhooks).

Las demás dependencias del backend (`express`, `mongoose`, `dotenv`, etc.) ya las tienes instaladas.

### En el Frontend (Num-Front)

```bash
cd Num-Front
npm i axios
```

`axios` es la librería que usamos para hacer peticiones HTTP desde el navegador al backend. Si ya la tienes instalada, este paso no es necesario.

> **💡 Resumen**: Solo necesitas instalar **1 paquete nuevo** para Mercado Pago: `mercadopago` en el backend. Todo lo demás ya existe en tu proyecto.

---

## 2. 🔧 Variables de Entorno

### Backend — `Num-Back/.env`

Agrega estas líneas a tu archivo `.env`:

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxx-xxxxxx-xxxxxxxxx-xxxxxxxxxx
MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

| Variable | ¿Qué es? | ¿Para qué? |
|---|---|---|
| `MERCADOPAGO_ACCESS_TOKEN` | 🔑 Llave **PRIVADA** | El backend la usa para autenticarse con la API de MP. Sin ella no puedes crear pagos ni verificar transacciones. Se obtiene en el [panel de desarrolladores de MP](https://www.mercadopago.com.co/developers/panel/app). |
| `MERCADOPAGO_PUBLIC_KEY` | 🌐 Llave **pública** | Identifica tu app ante MP. Se usaría si embebimos el checkout en el frontend. |
| `FRONTEND_URL` | 🌍 URL del frontend | Para decirle a MP a dónde redirigir al usuario después de pagar. |

> **⚠️ El `ACCESS_TOKEN` NUNCA va en el frontend.** Si alguien lo ve, puede operar como si fuera tú en Mercado Pago.

### Frontend — `Num-Front/.env`

```env
VITE_API_URL=http://localhost:5040/api
```

| Variable | ¿Para qué? |
|---|---|
| `VITE_API_URL` | Le dice al frontend dónde está el backend para enviarle peticiones. |

> Las variables del frontend en Vite deben empezar con `VITE_` para que estén disponibles en el navegador.

---

## 3. 📂 Estructura de Archivos de Mercado Pago

Solo los archivos que tienen que ver con Mercado Pago:

```
📁 Num-Back/
├── .env                              ← ACCESS_TOKEN va aquí
├── app.js                            ← Monta la ruta /api/mercadopago
├── config/
│   └── mercadopago.js                ← Configura el SDK con el token
├── controllers/
│   └── mercadopago.js                ← Toda la lógica (crear, verificar, webhook)
├── models/
│   └── pagos.js                      ← Cómo se guarda un pago en MongoDB
└── routes/
    └── mercadopago.js                ← Las URLs del API

📁 Num-Front/
├── .env                              ← URL del backend
└── src/
    ├── plugins/
    │   └── pluginAxios.js            ← Axios configurado (envía peticiones al backend)
    ├── services/
    │   └── mercadopago.js            ← Funciones que llaman al backend
    ├── views/
    │   ├── payment.vue               ← Página de checkout (botón "Pagar")
    │   └── payment-result.vue        ← Página de resultado (éxito/fallo/pendiente)
    └── router/
        └── router.js                 ← Rutas /pagos, /pagos/exito, etc.
```

---

## 4. ⚙️ Backend — Código Completo

### 4.1 Configurar el SDK

📄 **Archivo**: `Num-Back/config/mercadopago.js`  
📍 **De dónde viene**: Importa el paquete `mercadopago` que instalamos con `npm i mercadopago`  
📍 **Quién lo usa**: El controlador (`controllers/mercadopago.js`) antes de cada operación

```javascript
import mercadopago from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

const configureMercadoPago = () => {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("MERCADOPAGO_ACCESS_TOKEN no definido");
  }
  mercadopago.configure({ access_token: accessToken });
  return mercadopago;
};

export { configureMercadoPago, mercadopago };
```

**¿Qué hace?** Lee el `ACCESS_TOKEN` del `.env` y le dice al SDK de Mercado Pago "usa este token para autenticarte". Exporta la función y el objeto para que el controlador los use.

---

### 4.2 Modelo de Pagos (Base de Datos)

📄 **Archivo**: `Num-Back/models/pagos.js`  
📍 **De dónde viene**: Usa `mongoose` para definir la estructura  
📍 **Quién lo usa**: El controlador guarda y actualiza pagos aquí

```javascript
import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  usuarioId:      { type: String, required: true },
  monto:          { type: Number, required: true },
  fecha:          { type: Date, default: Date.now },
  descripcion:    { type: String, default: "" },
  estado:         {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado", "en_proceso"],
    default: "pendiente",
  },
  metodoPago:     { type: String, default: "" },
  moneda:         { type: String, default: "COP" },
  mpPaymentId:    { type: String, default: "" },     // ID que MP le da al pago
  mpPreferenceId: { type: String, default: "" },     // ID del "ticket" que creamos en MP
});

const Pago = mongoose.model("Pago", pagoSchema);
export default Pago;

export const obtenerPagos = async () => {
  return await Pago.find();
};

export const obtenerPagosUsuario = async (idUsuario) => {
  return await Pago.find({ usuarioId: idUsuario });
};

export const registrarPago = async (data) => {
  const pago = new Pago(data);
  return await pago.save();
};

export const eliminarPago = async (id) => {
  return await Pago.findByIdAndDelete(id);
};

export const verificarEstadoUsuario = async (idUsuario) => {
  const tienePagos = await Pago.exists({ usuarioId: idUsuario });
  return {
    usuarioId: idUsuario,
    estado: tienePagos ? "Activo" : "Sin pagos",
  };
};
```

**Campos importantes para MP:**
- `mpPreferenceId` → se llena cuando se crea el ticket de pago.
- `mpPaymentId` → se llena cuando MP confirma que el pago fue aprobado.

---

### 4.3 Rutas del API

📄 **Archivo**: `Num-Back/routes/mercadopago.js`  
📍 **De dónde viene**: Importa las funciones del controlador  
📍 **Quién lo usa**: `app.js` lo monta en `/api/mercadopago`

```javascript
import { Router } from "express";
import {
  crearPreferencia,
  recibirNotificacion,
  verificarPago,
} from "../controllers/mercadopago.js";
import validarJWT from "../middlewares/validar-jwt.js";

const router = Router();

router.post("/create-preference", validarJWT, crearPreferencia);
router.get("/verify-payment", validarJWT, verificarPago);
router.post("/webhook", recibirNotificacion);
router.get("/webhook", recibirNotificacion);

export default router;
```

| Ruta completa | Método | ¿Protegida? | ¿Quién la llama? | ¿Qué hace? |
|---|---|---|---|---|
| `/api/mercadopago/create-preference` | POST | ✅ JWT | El frontend | Crea el ticket de pago en MP |
| `/api/mercadopago/verify-payment` | GET | ✅ JWT | El frontend | Verifica si el pago fue exitoso |
| `/api/mercadopago/webhook` | POST/GET | ❌ | Mercado Pago | MP nos avisa automáticamente |

> `/webhook` no tiene `validarJWT` porque es Mercado Pago quien lo llama, no un usuario nuestro.

---

### 4.4 Registrar la ruta en app.js

📄 **Archivo**: `Num-Back/app.js`  
📍 **Agregar estas líneas** (probablemente ya las tienes):

```javascript
// Importar la ruta (arriba del archivo, con las otras importaciones)
import mercadopagoRoute from "./routes/mercadopago.js";

// Montar la ruta (junto con las otras rutas)
app.use("/api/mercadopago", mercadopagoRoute);
```

---

### 4.5 Controlador — LA LÓGICA PRINCIPAL

📄 **Archivo**: `Num-Back/controllers/mercadopago.js`  
📍 **De dónde viene**: Importa la config de MP, el modelo de pagos y el modelo de usuario  
📍 **Quién lo usa**: Las rutas lo llaman cuando llega una petición

```javascript
import { configureMercadoPago, mercadopago } from "../config/mercadopago.js";
import Pago from "../models/pagos.js";
import Usuario from "../models/usuario.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ═══════════════════════════════════════════════════════════════
// 1. CREAR PREFERENCIA — Se ejecuta cuando el usuario hace clic en "Pagar"
// ═══════════════════════════════════════════════════════════════
export const crearPreferencia = async (req, res) => {
  const { monto, titulo } = req.body;                    // Datos que envía el frontend
  const usuarioId = req.usuario?._id || req.usuario?.id;  // ID del usuario (viene del JWT)

  if (!usuarioId) return res.status(401).json({ error: "Usuario no autenticado" });

  configureMercadoPago();  // Configura el SDK con el ACCESS_TOKEN

  try {
    const montoFinal = Number(monto) < 100 ? 2000 : Number(monto);

    // Le pide a Mercado Pago que cree un "ticket de pago"
    const response = await mercadopago.preferences.create({
      items: [{
        title: String(titulo || "Plan Numeris"),
        quantity: 1,
        unit_price: montoFinal,
        currency_id: "COP"
      }],
      back_urls: {
        success: "http://localhost:5173/pagos/exito",     // A dónde ir si pagó bien
        failure: "http://localhost:5173/pagos/fallo",      // A dónde ir si falló
        pending: "http://localhost:5173/pagos/pendiente",  // A dónde ir si quedó pendiente
      },
      external_reference: usuarioId.toString()  // Nuestro ID de usuario, para rastrear
    });

    // Guarda el pago en nuestra base de datos
    try {
      const nuevoPago = new Pago({
        usuarioId: usuarioId.toString(),
        monto: montoFinal,
        descripcion: titulo || "Plan Numeris",
        estado: "pendiente",
        mpPreferenceId: response.body.id,  // ID que MP le dio al ticket
      });
      await nuevoPago.save();

      // Activa al usuario
      await Usuario.collection.updateOne(
        { _id: new mongoose.Types.ObjectId(usuarioId.toString()) },
        { $set: { estado: 1 } }
      );

      console.log(`✅ USUARIO ${usuarioId} ACTIVADO EXITOSAMENTE`);
    } catch (dbError) {
      console.error("⚠️ Error DB:", dbError.message);
    }

    // Devuelve las URLs de pago al frontend
    res.json({
      success: true,
      init_point: response.body.init_point,              // URL de pago REAL
      sandbox_init_point: response.body.sandbox_init_point, // URL de pago PRUEBAS
      id: response.body.id,
    });

  } catch (error) {
    res.status(500).json({ error: "Error MP", detalle: error.message });
  }
};

// ═══════════════════════════════════════════════════════════════
// 2. WEBHOOK — Mercado Pago nos avisa automáticamente
// ═══════════════════════════════════════════════════════════════
export const recibirNotificacion = async (req, res) => {
  const { topic, id } = req.query;
  if (topic === "payment") {
    try {
      configureMercadoPago();
      const payment = await mercadopago.payment.findById(id);
      if (payment.body.status === "approved") {
        const pago = await Pago.findOneAndUpdate(
          { mpPreferenceId: payment.body.preference_id },
          { estado: "aprobado", mpPaymentId: id },
          { new: true }
        );
        if (pago) {
          await Usuario.collection.updateOne(
            { _id: new mongoose.Types.ObjectId(pago.usuarioId) },
            { $set: { estado: 1 } }
          );
        }
      }
    } catch (e) { console.error("Error Webhook:", e); }
  }
  res.status(200).send("OK");  // Siempre responde 200 (MP lo exige)
};

// ═══════════════════════════════════════════════════════════════
// 3. VERIFICAR PAGO — El frontend pregunta si el pago fue exitoso
// ═══════════════════════════════════════════════════════════════
export const verificarPago = async (req, res) => {
  const { payment_id } = req.query;
  try {
    configureMercadoPago();
    const payment = await mercadopago.payment.findById(payment_id);
    if (payment.body.status === "approved") {
      const pago = await Pago.findOneAndUpdate(
        { mpPreferenceId: payment.body.preference_id },
        { estado: "aprobado", mpPaymentId: payment_id },
        { new: true }
      );
      let usuarioActualizado = null;
      if (pago) {
        await Usuario.collection.updateOne(
          { _id: new mongoose.Types.ObjectId(pago.usuarioId) },
          { $set: { estado: 1 } }
        );
        usuarioActualizado = await Usuario.findById(pago.usuarioId);
      }
      return res.json({ success: true, status: "approved", usuario: usuarioActualizado });
    }
    res.json({ success: false, status: payment.body.status });
  } catch (error) {
    res.status(500).json({ error: "Error Verificación" });
  }
};
```

**Resumen de las 3 funciones:**

| Función | ¿Cuándo se ejecuta? | ¿Qué hace? |
|---|---|---|
| `crearPreferencia` | Usuario hace clic en "Pagar" | Crea el ticket de pago en MP, guarda en BD, devuelve URL de checkout |
| `recibirNotificacion` | MP nos llama automáticamente | Recibe notificación de MP, actualiza el pago en BD si fue aprobado |
| `verificarPago` | Usuario regresa de MP | Consulta el estado del pago en MP, actualiza BD, devuelve resultado |

---

## 5. 💻 Frontend — Código Completo

### 5.1 Plugin Axios (ya lo tienes, pero así está configurado)

📄 **Archivo**: `Num-Front/src/plugins/pluginAxios.js`  
📍 **Quién lo usa**: Los servicios de MP lo usan para enviar peticiones al backend

```javascript
import axios from "axios";
import { useAuthStore } from "../store/auth.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// Antes de cada petición, agrega el token JWT automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Si el backend responde 401 (no autorizado), cierra la sesión
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.token = "";
      authStore.user = null;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
```

---

### 5.2 Servicio de Mercado Pago

📄 **Archivo**: `Num-Front/src/services/mercadopago.js`  
📍 **De dónde viene**: Importa el Axios configurado  
📍 **Quién lo usa**: Las vistas `payment.vue` y `payment-result.vue`

```javascript
import axiosInstance from "../plugins/pluginAxios.js";

// Llama al backend para crear un ticket de pago en MP
export const crearPreferenciaPago = async (monto, titulo) => {
  const response = await axiosInstance.post(
    "/mercadopago/create-preference",
    { monto, titulo }
  );
  return response.data;
};

// Llama al backend para verificar si un pago fue exitoso
export const verificarPago = async (paymentId) => {
  const response = await axiosInstance.get(
    `/mercadopago/verify-payment?payment_id=${paymentId}`
  );
  return response.data;
};
```

---

### 5.3 Vista de Pago (Checkout)

📄 **Archivo**: `Num-Front/src/views/payment.vue`  
📍 **De dónde viene**: Importa `crearPreferenciaPago` del servicio  
📍 **Cuándo se muestra**: Cuando el usuario navega a `/pagos?monto=10000&titulo=Plan Cósmico`

```vue
<template>
  <q-layout view="lHh Lpr lFf" class="cosmic-checkout font-display text-white overflow-x-hidden">
    <!-- Fondo Cósmico -->
    <div class="fixed-full z-behind">
      <div class="absolute-full bg-cosmic-main"></div>
      <div class="glow-orb top-left bg-primary-10"></div>
      <div class="glow-orb bottom-right bg-primary-5"></div>
      <div class="stars-overlay"></div>
    </div>

    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card flat class="glass-panel-light q-pa-xl text-center shadow-2xl rounded-2xl max-width-form mx-auto">
          
          <!-- Encabezado -->
          <div class="q-mb-xl">
            <q-icon name="shopping_cart" color="primary" size="4em" class="q-mb-md" />
            <h1 class="text-h4 text-bold text-white q-mb-sm">Resumen de tu Pedido</h1>
            <p class="text-grey-5">Estás a un paso de desbloquear tu destino cósmico.</p>
          </div>

          <!-- Detalles del Plan -->
          <div class="order-details q-pa-lg q-mb-xl border-primary-10 rounded-xl bg-primary-5">
            <div class="row justify-between items-center q-mb-md">
              <span class="text-grey-4 text-subtitle1">Plan Seleccionado:</span>
              <span class="text-white text-h6 text-bold">{{ tituloPlan }}</span>
            </div>
            <q-separator dark class="q-my-md opacity-20" />
            <div class="row justify-between items-center">
              <span class="text-grey-4 text-h6">Total a Pagar:</span>
              <span class="text-primary text-h4 text-bold">${{ monto }}</span>
            </div>
          </div>

          <!-- Botón de Mercado Pago -->
          <div class="q-gutter-y-md">
            <q-btn 
              unelevated 
              class="full-width checkout-btn q-py-lg group" 
              rounded 
              :loading="loading" 
              @click="iniciarPago"
            >
              <div class="row items-center q-gutter-x-md">
                <q-icon name="payments" size="sm" />
                <span class="text-h6 text-bold text-uppercase tracking-wide">Pagar con Mercado Pago</span>
              </div>
            </q-btn>

            <p class="text-caption text-grey-7 q-mt-md">
              <q-icon name="lock" color="positive" class="q-mr-xs" />
              Serás redirigido a la plataforma segura de Mercado Pago.
            </p>
          </div>

          <div class="q-mt-xl">
            <q-btn flat color="grey-5" label="Cambiar de plan" to="/planes" no-caps />
          </div>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { crearPreferenciaPago } from '../services/mercadopago.js';
import { useAuthStore } from '../store/auth.js';

const route = useRoute();
const authStore = useAuthStore();
const loading = ref(false);
const monto = ref(0);
const tituloPlan = ref('Cargando plan...');

// Al cargar la página, lee el monto y título de la URL
onMounted(() => {
  if (route.query.monto) monto.value = Number(route.query.monto);
  if (route.query.titulo) tituloPlan.value = route.query.titulo;
});

// Se ejecuta al hacer clic en "Pagar con Mercado Pago"
const iniciarPago = async () => {
  loading.value = true;
  try {
    // 1. Pide al backend que cree la preferencia en MP
    const response = await crearPreferenciaPago(monto.value, tituloPlan.value);
    
    if (response.success) {
      // 2. Activa al usuario en el estado local
      if (authStore.user) {
        authStore.user.estado = 1;
      }

      // 3. Redirige al usuario a Mercado Pago
      const redirectUrl = response.sandbox_init_point || response.init_point;
      if (redirectUrl) {
        window.location.href = redirectUrl;  // Sale de nuestra app
      }
    }
  } catch (error) {
    console.error("Error al iniciar pago:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('../styles/payment.css');

.order-details {
  background: rgba(var(--q-primary), 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.checkout-btn {
  background: linear-gradient(45deg, #009ee3, #007eb5);
  transition: all 0.3s ease;
}
.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 158, 227, 0.3);
}
</style>
```

---

### 5.4 Vista de Resultado del Pago

📄 **Archivo**: `Num-Front/src/views/payment-result.vue`  
📍 **De dónde viene**: Importa `verificarPago` de los servicios  
📍 **Cuándo se muestra**: Cuando el usuario regresa de Mercado Pago (MP redirige aquí)

```vue
<template>
  <q-layout view="lHh Lpr lFf" class="cosmic-checkout font-display text-white overflow-x-hidden">
    <div class="fixed-full z-behind">
      <div class="absolute-full bg-cosmic-main"></div>
      <div class="glow-orb top-left bg-primary-10"></div>
      <div class="glow-orb bottom-right bg-primary-5"></div>
      <div class="stars-overlay"></div>
    </div>

    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card flat class="glass-panel-light q-pa-xl text-center shadow-2xl rounded-2xl max-width-form mx-auto">
          
          <!-- Cargando -->
          <div v-if="loading" class="q-gutter-md text-center">
            <q-spinner-orbit color="primary" size="4em" />
            <div class="text-h5 text-bold q-mt-md">Verificando tu pago...</div>
          </div>

          <div v-else>
            <!-- ÉXITO -->
            <div v-if="status === 'approved'">
              <q-icon name="check_circle" color="positive" size="6em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">¡Pago Exitoso!</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                Tu suscripción ha sido activada correctamente.
              </p>
              <q-btn unelevated color="primary" label="Ir a mi Dashboard" to="/perfil" class="q-px-xl q-py-md rounded-xl" />
            </div>

            <!-- PENDIENTE -->
            <div v-else-if="status === 'pending' || status === 'in_process'">
              <q-icon name="hourglass_empty" color="warning" size="6em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">Pago en Proceso</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                Estamos esperando la confirmación de Mercado Pago.
              </p>
              <q-btn outline color="primary" label="Volver a Inicio" to="/perfil" class="q-px-xl q-py-md rounded-xl" />
            </div>

            <!-- FALLIDO -->
            <div v-else>
              <q-icon name="cancel" color="negative" size="6em" class="q-mb-md" />
              <h1 class="text-h4 text-bold text-white q-mb-md">Pago Fallido</h1>
              <p class="text-grey-4 text-subtitle1 q-mb-xl">
                Hubo un problema. Por favor, intenta nuevamente.
              </p>
              <q-btn unelevated color="primary" label="Reintentar Pago" to="/pagos" class="q-px-xl q-py-md rounded-xl" />
            </div>
          </div>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { verificarPago } from '../services/mercadopago.js';
import { useAuthStore } from '../store/auth.js';

const route = useRoute();
const authStore = useAuthStore();
const loading = ref(true);
const status = ref('');

onMounted(async () => {
  const paymentId = route.query.payment_id;  // MP agrega esto a la URL al redirigir

  if (paymentId) {
    try {
      // Pregunta al backend si el pago fue exitoso
      const response = await verificarPago(paymentId);
      status.value = response.status || 'rejected';

      // Si fue aprobado, actualiza el perfil del usuario
      if (status.value === 'approved' && response.usuario) {
        authStore.user = response.usuario;
      }
    } catch (error) {
      console.error("Error al verificar pago:", error);
      status.value = 'error';
    } finally {
      loading.value = false;
    }
  } else {
    status.value = route.query.status || 'rejected';
    loading.value = false;
  }
});
</script>

<style scoped>
@import url('../styles/payment.css');
</style>
```

---

### 5.5 Rutas del Router

📄 **Archivo**: `Num-Front/src/router/router.js`  
📍 **Agregar estas líneas** junto con las otras rutas:

```javascript
// Importar los componentes (arriba del archivo)
import pagos from "../views/payment.vue";
import payment_result from "../views/payment-result.vue";

// Agregar estas rutas al array de routes
{ path: "/pagos",           component: pagos,          meta: { requiresAuth: true } },
{ path: "/pagos/exito",     component: payment_result,  meta: { requiresAuth: true } },
{ path: "/pagos/fallo",     component: payment_result,  meta: { requiresAuth: true } },
{ path: "/pagos/pendiente", component: payment_result,  meta: { requiresAuth: true } },
```

Las 3 rutas de resultado usan el **mismo componente** (`payment-result.vue`) — se adapta según lo que devuelve MP.

---

## 6. 🔄 Flujo Completo Paso a Paso

```
PASO 1 → El usuario elige un plan y llega a /pagos?monto=10000&titulo=Plan Cósmico
   │
PASO 2 → payment.vue muestra el resumen y el botón "Pagar con Mercado Pago"
   │
PASO 3 → El usuario hace clic → iniciarPago()
   │
PASO 4 → Frontend envía POST → /api/mercadopago/create-preference
   │         con { monto, titulo } y el token JWT
   │
PASO 5 → Backend recibe → crearPreferencia()
   │         → configura MP
   │         → llama a mercadopago.preferences.create()
   │         → MP responde con URLs de checkout
   │         → guarda el pago en MongoDB (estado: "pendiente")
   │         → devuelve las URLs al frontend
   │
PASO 6 → Frontend recibe las URLs
   │         → window.location.href = sandbox_init_point
   │         → EL USUARIO SALE DE NUESTRA APP Y VA A MERCADO PAGO
   │
PASO 7 → El usuario paga en la página de Mercado Pago
   │         (tarjeta, PSE, Nequi, efectivo, etc.)
   │
PASO 8 → Mercado Pago redirige al usuario de vuelta:
   │         → /pagos/exito?payment_id=12345    (si pagó bien)
   │         → /pagos/fallo?payment_id=12345    (si falló)
   │         → /pagos/pendiente?payment_id=12345 (si está procesando)
   │
PASO 9 → payment-result.vue se carga
   │         → lee payment_id de la URL
   │         → llama a verificarPago(payment_id)
   │         → Frontend envía GET → /api/mercadopago/verify-payment
   │
PASO 10 → Backend recibe → verificarPago()
   │         → consulta la API de MP con payment_id
   │         → si está aprobado: actualiza BD y activa usuario
   │         → devuelve el resultado al frontend
   │
PASO 11 → Frontend muestra el resultado:
            ✅ Éxito → "¡Pago Exitoso!" + botón al dashboard
            ⏳ Pendiente → "Pago en Proceso"
            ❌ Fallo → "Pago Fallido" + botón reintentar
```

### Webhook (sucede en paralelo)

Independientemente de que el usuario vuelva o no, Mercado Pago también llama directamente a nuestro backend:

```
MP → POST /api/mercadopago/webhook?topic=payment&id=12345
Backend → recibirNotificacion() → verifica y actualiza BD → responde 200 OK
```

Esto es un "respaldo": si el usuario cierra el navegador, el webhook igual actualiza el pago.

---

## 7. 🧠 Explicación Didáctica

### Analogía: Pedir comida por app 🍕

| En la app de comida | En nuestro proyecto |
|---|---|
| Eliges una pizza y das "Pedir" | El usuario elige un plan y da "Pagar" |
| La app crea tu pedido | El backend crea la preferencia en MP |
| Te redirigen a la pasarela de pago | Te redirigen a Mercado Pago |
| Pagas con tu tarjeta | El usuario paga en MP |
| La app te dice "Pedido confirmado" | payment-result.vue muestra "¡Pago Exitoso!" |
| El restaurante recibe una notificación | El webhook avisa al backend |

### Conceptos clave

- **Preferencia** = Un ticket de compra que le envías a MP diciendo "cobrame $10,000 por X producto".
- **`init_point`** = La URL de pago de producción (dinero real).
- **`sandbox_init_point`** = La URL de pago de pruebas (dinero falso, para desarrollar).
- **Webhook** = Una URL tuya que MP llama solito para avisarte que pasó algo.
- **`external_reference`** = Tu ID interno (del usuario) que MP guarda y te devuelve para que sepas quién pagó.

---

## 8. 📈 Mejoras Opcionales

1. **Usar variables de entorno para las `back_urls`** — Actualmente están hardcodeadas como `localhost:5173`. Deberían usar `process.env.FRONTEND_URL`.

2. **Activar al usuario DESPUÉS de que pague** — Actualmente se activa al crear la preferencia (antes de pagar). Lo ideal es activar solo cuando MP confirme `approved`.

3. **Eliminar funciones duplicadas** — `crearPreferenciaPago` y `verificarPago` existen en `services/mercadopago.js` y en `services/services.js`. Dejar solo uno.

4. **Agregar `auto_return: "approved"`** a la preferencia para que MP redirija automáticamente.

5. **Actualizar a SDK v2 de Mercado Pago** — La versión 1.5.17 es legacy. La v2 tiene una API más moderna.

6. **Mostrar errores al usuario** — Usar las notificaciones de Quasar en vez de solo `console.error`.

---

> 📝 Documento generado el 17 de marzo de 2026 — Proyecto Numeris
