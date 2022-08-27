import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { plugin, defaultConfig } from '@formkit/vue'
import tailwindTheme from '../formkit.config'

const app = createApp(App) 

app.config.globalProperties.$appUrl = window.location.origin;
app.config.globalProperties.$serverUrl = process.env.VUE_APP_BASE_URL;

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL + "api/v1";
axios.defaults.headers.common = {
  // Authorization: "Bearer " + token,
  Accept: 'application/json',
};


app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.use(plugin, defaultConfig(tailwindTheme))
app.mount('#app')
