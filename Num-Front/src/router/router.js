import home from "../views/home.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";
import recuperar from "../views/recoverpassword.vue";
import perfil from "../views/dashboard.vue";
import planes from "../views/plans.vue";
import pagos from "../views/payment.vue";
import historial_pagos from "../views/historicalpayments.vue";
import lectura_principal from "../views/mainreading.vue";
import lectura_diaria from "../views/dailyreading.vue";
import historial_lecturas from "../views/readinghistory.vue";
import admin_finance from "../views/financedashboard.vue";
import admin from "../views/admin.vue";
import payment_result from "../views/payment-result.vue";

import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../store/auth.js";

import reset_password from "../views/resetpassword.vue";

const routes = [
  { path: "/", component: home },
  { path: "/login", component: login },
  { path: "/register", component: register },
  { path: "/recuperar", component: recuperar },
  { path: "/reset-password/:token", component: reset_password },

  // Rutas Protegidas
  { path: "/perfil", component: perfil, meta: { requiresAuth: true } },
  { path: "/planes", component: planes, meta: { requiresAuth: true } },
  { path: "/pagos", component: pagos, meta: { requiresAuth: true } },
  { path: "/historial_pagos", component: historial_pagos, meta: { requiresAuth: true } },
  { path: "/lectura_principal", component: lectura_principal, meta: { requiresAuth: true } },
  { path: "/lectura_diaria", component: lectura_diaria, meta: { requiresAuth: true } },
  { path: "/historial_lecturas", component: historial_lecturas, meta: { requiresAuth: true } },
  { path: "/admin_finance", component: admin_finance, meta: { requiresAuth: true, role: 'ADMIN_ROLE' } },
  { path: "/admin", component: admin, meta: { requiresAuth: true, role: 'ADMIN_ROLE' } },

  // Rutas Mercado Pago
  { path: "/pagos/exito", component: payment_result, meta: { requiresAuth: true } },
  { path: "/pagos/fallo", component: payment_result, meta: { requiresAuth: true } },
  { path: "/pagos/pendiente", component: payment_result, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// --- DETECCIÓN DE REDIRECCIÓN DE MERCADO PAGO ---
// Si llegamos de MP sin el '#' (porque MP rechaza el '#' con auto_return),
// redirigimos a la versión con '#' para que Vue Router lo maneje.
if (window.location.pathname.startsWith('/pagos/')) {
  const path = window.location.pathname;
  const search = window.location.search;
  window.location.href = `${window.location.origin}/#${path}${search}`;
}

// --- GUARDIÁN DE NAVEGACIÓN (PORTERO) ---
// Se ejecuta antes de entrar a cualquier ruta
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // 1. REVISIÓN DE AUTENTICACIÓN: ¿Tiene un token válido?
  const isAuthenticated = !!authStore.token;

  // REGLA A: Si la página pide estar logueado (meta.requiresAuth) y NO lo está
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("🚫 Bloqueado: Usuario no autenticado. Redirigiendo a Login.");
    next("/login"); // No lo dejes pasar, mándalo a loguearse
  }
  
  // REGLA B: Si YA ESTÁ logueado y trata de ir a Login o Register
  else if (isAuthenticated && (to.path === "/login" || to.path === "/register")) {
    console.log("✅ Ya estás logueado. No necesitas ir a Login. Redirigiendo a Perfil.");
    next("/perfil"); // Mándalo directo a su perfil
  }
  
  // REGLA C: REVISIÓN DE PAGO (NUEVO): Si la página requiere suscripción activa
  // Usamos el campo 'estado' del usuario (1 = pagó, 0 = no ha pagado)
  else if (to.meta.requiresActive && authStore.user?.estado !== 1) {
    console.log("💰 Bloqueado: Se requiere suscripción activa. Redirigiendo a Planes.");
    next("/planes"); // Mándalo a que elija un plan de pago
  }
  
  // REGLA D: REVISIÓN DE ROLES: Si la página pide un rol específico (ej: ADMIN_ROLE)
  else if (to.meta.role && authStore.user?.rol !== to.meta.role) {
    console.log("🛑 Bloqueado: No tienes el rol necesario para esta página.");
    next("/perfil"); // Si no es admin, mándalo a su perfil personal
  }
  
  // REGLA FINAL: Si pasó todas las pruebas anteriores
  else {
    // ACTUALIZAR TÍTULO DE LA PÁGINA DINÁMICAMENTE
    const titulos = {
      '/': 'Inicio',
      '/login': 'Entrar al Portal',
      '/registro': 'Nuevo Buscador',
      '/perfil': 'Mi Perfil Cósmico',
      '/lectura_principal': 'ADN Cósmico',
      '/lectura_diaria': 'Guía del Día',
      '/planes': 'Planes de Activación',
      '/admin': 'Centro de Control'
    };
    document.title = `Numeris | ${titulos[to.path] || 'Astrología y Numerología'}`;
    
    next(); 
  }
});

export default router;
