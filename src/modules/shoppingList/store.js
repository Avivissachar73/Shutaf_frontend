import { shoppingListService } from './services/shoppingList.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

import { $t } from '@/plugins/i18n';

const initState = () => {
  const state = {
    ...basicStoreService.initState()
  }
  state.filterBy.pagination.limit = 1;
  return state;
}

const basicStore = basicStoreService.getSimpleStore(initState);

export const _shoppingListStore = {
  namespaced: true,
  state: basicStore.state,
  getters: {
    ...basicStore.getters
  },
  mutations: {
    ...basicStore.mutations
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async loadShoppingLists({ commit, dispatch }, { filterBy, organizationId }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const shoppingListsRes = await shoppingListService.query(filterBy, organizationId);
          return shoppingListsRes;
        },
        onSuccess: (data) => commit({ type: 'setData', data })
      });
    },
    async loadShoppingList({ commit, dispatch }, { id, organizationId }) {
      commit({ type: 'setSelectedItem', item: null });
      return dispatch({
        type: '_Ajax',
        do: async () => shoppingListService.get(id, organizationId),
        onSuccess: (shoppingList) => commit({ type: 'setSelectedItem', item: shoppingList })
      });
    },
    async removeItem({ commit, dispatch, getters }, { id, organizationId, reload = false }) {
      if (!await alertService.Confirm($t('shoppingList.alerts.confirmRemove'))) return;
      return dispatch({
        type: '_Ajax',
        do: async () => shoppingListService.remove(id, organizationId),
        onSuccess: () => {
          commit({ type: 'removeItem', id });
          alertService.toast({type: 'safe', msg: `${$t('shoppingList.alerts.removeSuccess')}! id: ${id}`});
          if (reload) dispatch({ type: 'loadShoppingLists', organizationId, filterBy: getters.filterBy });
        }
      });
    },
    async saveShoppingList({ commit, dispatch }, { shoppingList, organizationId, loading }) {
      return dispatch({
        type: '_Ajax',
        loading,
        do: async () => shoppingListService.save(shoppingList, organizationId),
        onSuccess: (shoppingList) => {
          // alertService.toast({type: 'safe', msg: `${$t('shoppingList.alerts.savedSuccess')}! id: ${data._id}`})
          // commit({ type: 'saveItem', item: shoppingList });
        }
      });
    },
  }
}

export const shoppingListStore = { shoppingList: _shoppingListStore };