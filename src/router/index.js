import Vue from 'vue';
import VueRouter from 'vue-router';

import { commonRoutes } from '@/modules/common/routes';
import { authRoutes } from '@/modules/auth/routes';
import { accountRoutes } from '@/modules/account/routes';
import { settingsRoutes } from '@/modules/settings/routes';
import { organizationRoutes } from '@/modules/organization/routes';
import { postRoutes } from '@/modules/post/routes';
import { dashboardRoutes } from '../modules/dashboard/routes';
import { bugRoutes } from '../modules/bug/routes';
import { shoppingListRoutes } from '../modules/shoppingList/routes';

Vue.use(VueRouter)

const routes = [
  ...commonRoutes,
  ...authRoutes,
  ...accountRoutes,
  ...settingsRoutes,
  ...organizationRoutes,
  ...postRoutes,
  ...dashboardRoutes,
  ...bugRoutes,
  
  ...shoppingListRoutes,
]

export const router = new VueRouter({
  mode: 'hash',
  routes,
  // base: process.env.BASE_URL
});

// for before each usage
let _store = null;
export const setStoreForRouter = store => _store = store

// router.beforeEach((to, from, next) => {
//   next();
// });

// export default router
