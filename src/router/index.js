import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Auths/Login.vue'
import Register from '../views/Auths/Register.vue'
import MembersList from '../views/MembersList.vue'

import store from '../store'

// Make sure store.config is not null before entering these routes
const checkForConfig = (to, from, next) => {
  console.debug('[router] checkConfigValid ', from, to)

  function proceed(){
    if(store.state.config){
      next()
    }else{
      next({ name: 'Login' })
    }
  }
  if(store.state.storeDataLoaded === false){
    console.debug('[router]   waiting for store to be initialized...')
    store.watch(
      (state) => state.storeDataLoaded,
      (value) => {
        if(value === true){
          proceed()
        }
      }
    )
  }else{
    proceed()
  }
}

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    beforeEnter: checkForConfig,
    components: {
      default: Dashboard,
      nav: Navbar,
      footer: Footer,
    }
  },
  {
    path: '/members',
    name: 'members',
    components: {
      default: MembersList,
      nav: Navbar,
      footer: Footer,
    }
  },
  { path: '/login', name: 'Login', components: { auth: Login } },
  { path: '/register', name: 'Register', components: { auth: Register } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
