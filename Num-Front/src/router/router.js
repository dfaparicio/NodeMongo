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

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: home },
  { path: "/login", component: login },
  { path: "/register", component: register },
  { path: "/recuperar", component: recuperar },
  { path: "/perfil", component: perfil },
  { path: "/planes", component: planes },
  { path: "/pagos", component: pagos },
  { path: "/historial_pagos", component: historial_pagos },
  { path: "/lectura_principal", component: lectura_principal },
  { path: "/lectura_diaria", component: lectura_diaria },
  { path: "/historial_lecturas", component: historial_lecturas },
  { path: "/admin_finance", component: admin_finance },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
