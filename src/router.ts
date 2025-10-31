import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './firebase/auth'

import Login from './views/Login.vue'
import Blank from './views/Blank.vue'
import Inicio from './views/Admin/inicio.vue'
import HistorialCompras from './views/Admin/historialCompras.vue'
import CatalogoAdmin from './views/Admin/catalogoAdmin.vue'
import UsersList from './views/Admin/usersList.vue'
import catalogoCompra from './views/User/catalogoCompra.vue'
import carrito from './views/User/carrito.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, layout: 'empty' },
  },
  // Dashboard route - only accessible to admin users
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Inicio,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/history',
    name: 'BuyingHistory',
    component: HistorialCompras,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/catalog',
    name: 'AdminCatalog',
    component: CatalogoAdmin,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/users',
    name: 'UsersList',
    component: UsersList,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { requiresAuth: true },
  },
  // User routes - only accessible to logged in users
  {
    path: '/store',
    name: 'Store',
    component: catalogoCompra,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: carrito,
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
  const requiresAdmin = to.meta.requiresAdmin as boolean;
  const isAdmin = currentUser?.email === 'rjgespinoza96@gmail.com';

  if (requiresAuth && !currentUser) {
    next({ name: 'Login' });
  } else if (requiresAdmin && !isAdmin) {
    next({ name: 'Store' });
  } else if (to.name === 'Login' && currentUser) {
    next({ name: isAdmin ? 'Dashboard' : 'Blank' });
  } else {
    next();
  }
});

export default router
