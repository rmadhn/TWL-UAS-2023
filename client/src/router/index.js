import { createRouter, createWebHistory } from "vue-router";
import AddUser from "../views/AddUser.vue";
import Login from "../views/Login.vue";
import Signup from "../views/signup.vue";
import Main from "../views/main.vue";
import auth from "../router/auth.js";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { requiresAuth: true },
  },
  {
    path: "/add",
    name: "AddUser",
    component: AddUser,
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.state.isAuthenticated) {
    // Jika halaman memerlukan autentikasi dan pengguna belum login,
    // alihkan ke halaman login.
    next("/"); // Ubah "/login" menjadi "/"
  } else {
    // Jika pengguna telah login atau halaman tidak memerlukan autentikasi,
    // lanjutkan dengan me-load halaman.
    next();
  }
});

export default router;
