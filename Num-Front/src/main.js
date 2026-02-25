import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router/router.js";

// Quasar y sus plugins
import { Quasar, Notify, Loading, Dialog } from "quasar";

// Iconos de Quasar
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Quasar CSS (Necesario importar src/css/index.sass para que tomen efecto tus variables SASS)
import "quasar/src/css/index.sass";

// Idioma español y Set de Iconos por defecto
import quasarLang from "quasar/lang/es";
import quasarIconSet from "quasar/icon-set/material-icons";

const app = createApp(App);

// Configuración de Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Uso de plugins
app.use(pinia);
app.use(router);

// Inicialización de Quasar
app.use(Quasar, {
  plugins: {
    Notify,
    Loading,
    Dialog,
  },
  lang: quasarLang,
  iconSet: quasarIconSet, 
  config: {
    notify: {
      position: "top-right",
    },
  },
});

app.mount("#app");
