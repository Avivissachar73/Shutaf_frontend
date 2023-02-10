import { accountService } from './services/account.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

import { $t } from '@/plugins/i18n';

const initState = () => ({
  ...basicStoreService.initState()
});

export const _accountStore = {
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
    setAccountData(state, { data }) {
      state.data = data;
    },
    setSelectedAccount(state, { account }) {
      state.selectedItem = account;
    },
    removeAccount(state, { id }) {
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
    }
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async loadAccounts({ commit, dispatch }, { filterBy }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const accountsRes = await accountService.query(filterBy);
          return accountsRes;
        },
        onSuccess: (data) => commit({ type: 'setAccountData', data })
      });
    },
    async loadAccount({ commit, dispatch }, { id }) {
      return dispatch({
        type: '_Ajax',
        do: async () => accountService.get(id),
        onSuccess: (account) => commit({ type: 'setSelectedAccount', account })
      });
    },
    async removeAccount({ commit, dispatch }, { id }) {
      if (!await alertService.Confirm($t('account.alerts.confirmRemove'))) return;
      return dispatch({
        type: '_Ajax',
        do: async () => accountService.remove(id),
        onSuccess: () => alertService.toast({type: 'safe', msg: `${$t('account.alerts.removeSuccess')} id: ${id}`})
      });
    },
    async saveAccount({ commit, dispatch, getters }, { account }) {
      return dispatch({
        type: '_Ajax',
        do: async () => accountService.save(account),
        onSuccess: (savedAccount) => {
          alertService.toast({type: 'safe', msg: `${$t('account.alerts.savedAccountSuccess')} id: ${account._id}`});
          const loggedUser = this.getters['auth/loggedUser'];
          if (account._id === loggedUser?._id) this.commit({ type: 'auth/setLoggedUser', user: savedAccount });
        }
      });
    }
  }
}

export const accountStore = { account: _accountStore };