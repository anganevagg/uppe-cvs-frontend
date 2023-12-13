import { RouteRecordRaw } from 'vue-router';
import { auth } from 'pages/auth/routes';
import { user } from 'src/pages/users/routes';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [...auth],
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('layouts/UserLayout.vue'),
    children: [...user],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
