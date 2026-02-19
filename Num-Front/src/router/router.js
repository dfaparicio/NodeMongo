import login from "../views/login.vue";
import register from "../views/register.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: login },
  { path: "/register", component: register },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
