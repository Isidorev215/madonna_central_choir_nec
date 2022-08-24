import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import MembersList from '../views/MembersList.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    components: {
      default: Dashboard,
      nav: Navbar
    }
  },
  {
    path: '/members',
    name: 'members',
    components: {
      default: MembersList,
      nav: Navbar
    }
  },
  { path: '/login', name: 'Login', components: { auth: Login } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
