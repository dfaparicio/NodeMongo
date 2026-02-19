import login from "../views/login.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [{ path: "/", component: login }];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
