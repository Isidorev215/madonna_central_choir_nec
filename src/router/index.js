import { createRouter, createWebHistory } from "vue-router";
// components
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Auths/Login.vue";
import Register from "../views/Auths/Register.vue";
import MembersList from "../views/MembersList.vue";
import SingleMember from "../views/SingleMember.vue";
import ProfilePage from "../views/ProfilePage.vue";
import ManageChapters from "../views/ManageChapters.vue";
import PositionDetails from "../views/PositionDetails.vue";
import moment from "moment";


// Make sure store.config is not null before entering these routes
const checkForToken = (to, from) => {
  let expires = new Date(localStorage.getItem('token_expires'));
  
  if(localStorage.getItem('token') && localStorage.getItem('token_expires') && moment(expires).isAfter()) return true
  else return { name: 'Login' }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      beforeEnter: checkForToken,
      components: {
        default: Dashboard,
        nav: Navbar,
        footer: Footer,
      },
      meta: { name: "Dashboard" },
    },
    {
      path: "/profile-page",
      name: "ProfilePage",
      beforeEnter: checkForToken,
      components: {
        default: ProfilePage,
        nav: Navbar,
        footer: Footer,
      },
      meta: { name: "Profile page" },
    },
    {
      path: "/members",
      name: "membersList",
      beforeEnter: checkForToken,
      components: {
        default: MembersList,
        nav: Navbar,
        footer: Footer,
      },
      meta: { name: "Members List" },
    },
    {
      path: "/member/:id",
      name: "singleMember",
      beforeEnter: checkForToken,
      components: {
        default: SingleMember,
        nav: Navbar,
        footer: Footer,
      },
      meta: { name: "Member Details" },
    },
    {
      path: "/chapters",
      name: "ManageChapters",
      beforeEnter: checkForToken,
      components: {
        default: ManageChapters,
        nav: Navbar,
        footer: Footer,
      },
      meta: { name: "Manage chapters" },
    },
    {
      path: "/position/:id",
      name: "PositionDetails",
      beforeEnter: checkForToken,
      components: {
        default: PositionDetails,
        nav: Navbar,
        footer: Footer,
      },
      meta: { name: "Position details" },
    },
    { path: "/login", name: "Login", components: { auth: Login } },
    { path: "/register", name: "Register", components: { auth: Register } },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      components: {
        auth: () => import("../views/NotFound.vue"),
      },
    },
  ],
});

export default router;
