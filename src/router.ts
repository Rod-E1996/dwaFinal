import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './firebase/auth'

import Login from './views/Login.vue'
import Blank from './views/Blank.vue'
import Inicio from './views/Admin/inicio.vue'
import HistorialCompras from './views/Admin/historialCompras.vue'
import CatalogoAdmin from './views/Admin/catalogoAdmin.vue'
import UsersList from './views/Admin/usersLIst.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Inicio,
    meta: { requiresAuth: true },
  },
  {
    path: '/history',
    name: 'BuyingHistory',
    component: HistorialCompras,
    meta: { requiresAuth: true },
  },
  {
    path: '/catalog',
    name: 'AdminCatalog',
    component: CatalogoAdmin,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'UsersList',
    component: UsersList,
    meta: { requiresAuth: true },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let authInitialized = false;
let currentUser = useAuth.getCurrentUser();

useAuth.onAuthStateChange((user) => {
  currentUser = user;
});

router.beforeEach(async (to, from, next) => {
  if (!authInitialized) {
    currentUser = await useAuth.initializeAuth();
    authInitialized = true;
  }

  const requiresAuth = to.meta.requiresAuth as boolean;

  if (requiresAuth && !currentUser) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && currentUser) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router
