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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  }
  else if (isAuthenticated && (to.path === "/login" || to.path === "/register")) {
    next("/perfil");
  }
  else if (to.meta.role && authStore.user?.rol !== to.meta.role) {
    next("/perfil");
  }
  else {
    next();
  }
});

export default router;
