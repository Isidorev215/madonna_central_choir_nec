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
import LoadingSpinner from './components/LoadingSpinner.vue'
import NoFixedSpinner from './components/NoFixedSpinner.vue'
import Pagination from '@/components/Pagination.vue'
import AvatarInitial from '@/components/AvatarInitial.vue'

const app = createApp(App) 

app.config.globalProperties.$appUrl = window.location.origin;
app.config.globalProperties.$serverUrl = process.env.VUE_APP_BASE_URL;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL + "api/v1";
let token = localStorage.getItem("token");
axios.defaults.headers.common = {
  // "Access-Control-Allow-Credentials": true
  Authorization: token,
  Accept: "application/json",
  "Content-Type": "application/json",
};


app.component('Spinner', LoadingSpinner)
app.component('NoFixedSpinner', NoFixedSpinner)
app.component('Pagination', Pagination)
app.component('AvatarInitial', AvatarInitial)

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
