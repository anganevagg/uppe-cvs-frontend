import { RouteRecordRaw } from 'vue-router';

export const auth: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'Login',
    component: () => import('./views/LoginView.vue'),
  },
  {
    path: 'signup/:code',
    name: 'Signup',
    component: () => import('./views/SignUpView.vue'),
  },
  {
    path: '',
    redirect: {
      name: 'Login',
    },
  },
];
