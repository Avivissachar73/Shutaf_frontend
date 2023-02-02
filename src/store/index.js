import Vue from 'vue'
import Vuex from 'vuex'

import { commonStore } from '@/modules/common/store'
import { authStore } from '@/modules/auth/store'
import { accountStore } from '@/modules/account/store'
import { settingsStore } from '@/modules/settings/store'
import { organizationStore } from '@/modules/organization/store'
import { postStore } from '@/modules/post/store'
import { commentStore } from '@/modules/comment/store'
import { activityStore } from '@/modules/activity/store'
import { dashboardStore } from '../modules/dashboard/store'
import { shoppingListStore } from '../modules/shoppingList/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    commonStore,
    ...authStore,
    ...accountStore,
    ...settingsStore,
    ...organizationStore,
    ...postStore,
    ...commentStore,
    ...activityStore,
    ...dashboardStore,
    ...shoppingListStore,
  }
})
