import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './firebase/auth'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'

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
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
    meta: { requiresAuth: true },
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
    meta: { requiresAuth: true },
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
    meta: { requiresAuth: true },
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
    meta: { requiresAuth: true },
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
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
