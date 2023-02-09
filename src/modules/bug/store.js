import { bugService } from './services/bug.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

import { $t } from '@/plugins/i18n';

const initState = () => ({
  ...basicStoreService.initState()
});

export const _bugStore = {
  namespaced: true,
  state: initState(),
  getters: {
    data: (state) => state.data,
    accounts: (state) => state.data.items,
    totalAccounts: (state) => state.data.total,
    selectedAccount: (state) => state.selectedItem,
    filterBy: (state) => state.filterBy,
    isLoading: (state) => state.isLoading
  },
  mutations: {
    setProp(state, { key, val }) {
      state[key] = val;
    },
    setBugData(state, { data }) {
      state.data = data;
    },
    setSelectedBug(state, { item }) {
      state.selectedItem = item;
    },
    removeBug(state, { id }) {
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setLoading(state, { val }) {
      state.isLoading = val;
    },
    resetState(state) {
      const newState = initState();
      for (let key in state) state[key] = newState[key];
    },
    saveBug(state, { bug }) {
      const idx = state.data.items.findIndex(c => c._id === bug._id);
      if (idx === -1) state.data.items.unshift(bug);
      else state.data.items.splice(idx, 1, bug);
    }
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async loadBugs({ commit, dispatch }, { filterBy }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const accountsRes = await bugService.query(filterBy);
          return accountsRes;
        },
        onSuccess: (data) => commit({ type: 'setBugData', data })
      });
    },
    async loadBug({ commit, dispatch }, { id }) {
      return dispatch({
        type: '_Ajax',
        do: async () => bugService.get(id),
        onSuccess: (item) => commit({ type: 'setSelectedBug', item })
      });
    },
    async removeBug({ commit, dispatch }, { id }) {
      if (!await alertService.Confirm($t('bug.alerts.confirmRemove'))) return;
      return dispatch({
        type: '_Ajax',
        do: async () => bugService.remove(id),
        onSuccess: () => alertService.toast({type: 'safe', msg: `${$t('bug.alerts.removeSuccess')} id: ${id}`})
      });
    },
    async saveBug({ commit, dispatch }, { bug }) {
      return dispatch({
        type: '_Ajax',
        do: async () => bugService.save(bug),
        onSuccess: () => {
          commit({ type: 'saveBug', bug });
          alertService.toast({type: 'safe', msg: bug._id? `${$t('bug.alerts.savedAccountSuccess')} id: ${bug._id}` : $t('bug.alerts.reportBugSuccess')+'!'})
        }
      });
    }
  }
}

export const bugStore = { bug: _bugStore };