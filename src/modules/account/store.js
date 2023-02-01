import { accountService } from './services/account.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

const initState = () => ({
  data: { items: [], total: 0},
  selectedAccount: null,
  filterBy: basicStoreService.initFilterBy(),
  isLoading: false
});

export const _accountStore = {
  namespaced: true,
  state: initState(),
  getters: {
    data: (state) => state.data,
    accounts: (state) => state.data.items,
    totalAccounts: (state) => state.data.total,
    selectedAccount: (state) => state.selectedAccount,
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
    setSelectedAccount(state, { item }) {
      state.selectedAccount = item;
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
        onSuccess: (item) => commit({ type: 'setSelectedAccount', item })
      });
    },
    async removeAccount({ commit, dispatch }, { id }) {
      if (!await alertService.Confirm('Are you sure you want to remove this account?')) return;
      return dispatch({
        type: '_Ajax',
        do: async () => accountService.remove(id),
        onSuccess: () => alertService.toast({type: 'success', msg: `Account removed successfully! id: ${id}`})
      });
    },
    async saveAccount({ commit, dispatch }, { item }) {
      return dispatch({
        type: '_Ajax',
        do: async () => accountService.save(item),
        onSuccess: () => alertService.toast({type: 'success', msg: `Account saved successfully! id: ${item._id}`})
      });
    }
  }
}

export const accountStore = { account: _accountStore };