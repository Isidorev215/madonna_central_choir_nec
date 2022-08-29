import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { plugin, defaultConfig, createInput } from '@formkit/vue'
import '@formkit/themes/genesis'
import config from '../formkit.config'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// formkit global otp component
import OneTimePassword from './components/OneTimePassword.vue';

const app = createApp(App) 

app.config.globalProperties.$appUrl = window.location.origin;
app.config.globalProperties.$serverUrl = process.env.VUE_APP_BASE_URL;

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL + "api/v1";
axios.defaults.headers.common = {
  // Authorization: "Bearer " + token,
  Accept: 'application/json',
};

app.use(Toast, { position: 'top-right' })
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.use(plugin, defaultConfig({
  ...config, 
  inputs: {
    otp: createInput(OneTimePassword, {
      props: ['digits']
    })
  }
}))
app.mount('#app')
