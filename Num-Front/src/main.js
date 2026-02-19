import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './style.css'
// import { Quasar, Notify, Loading, Dialog } from 'quasar'
import router from './router/router.js'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
// import 'quasar/src/css/index.sass'

// Import language (default export)
// import es from 'quasar/lang/es.js'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

pinia.use(piniaPluginPersistedstate)

app.mount('#app')