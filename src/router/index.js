import Vue from 'vue';
import VueRouter from 'vue-router';

import PublicLayout from '../views/public/PublicLayout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', redirect: 'home' },
      {
        path: 'home',
        name: 'public-home',
        component: () => import(/* webpackChunkName: "home" */ '../views/public/Home'),
      },
      {
        path: 'about',
        name: 'public-about',
        component: () => import(/* webpackChunkName: "about" */ '../views/public/About'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
