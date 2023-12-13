import { RouteRecordRaw } from 'vue-router';

export const user: RouteRecordRaw[] = [
  {
    path: 'profile',
    name: 'Profile',
    component: () => import('./views/ProfileView.vue'),
  },
  {
    path: '',
    redirect: {
      name: 'Profile',
    },
  },
  {
    path: '/admin',
    name: 'Users',
    component: () => import('./views/UsersView.vue'),
  },
];
