import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'landing',
    component: () => import(/* webpackChunkName: "landing" */ '../views/Landing.vue'),
  },
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
  },
  {
    path: '/auth/logout',
    name: 'auth-logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/auth/Logout.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
