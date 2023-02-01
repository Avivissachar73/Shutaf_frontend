import { authService } from './services/auth.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

const initState = () => ({
  loggedUser: null,
  isLoading: false
});

export const _authStore = {
  namespaced: true,
  state: initState(),
  getters: {
    isLoading: (state) => state.isLoading,
    loggedUser: (state) => state.loggedUser,
    isAdmin: (state) => state.loggedUser?.role === 'admin' || state.loggedUser?.roles.includes('admin')
  },
  mutations: {
    setLoading(state, { val }) {
      state.isLoading = val;
    },

    setLoggedUser(state, { user }) {
      state.loggedUser = user;
    },
    resetState(state) {
      const newState = initState();
      for (let key in state) state[key] = newState[key];
    },
    updateOrgStatus(state, { organizationId, newStatus }) {
      state.loggedUser.organizations.find(c => c._id === organizationId).status = newStatus;
    }
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async login({ commit, dispatch }, { cred }) {
      return dispatch({
        type: '_Ajax',
        do: async () => authService.login(cred),
        onSuccess: (res) => {
          commit({ type: 'setLoggedUser', user: res.user });
          alertService.toast({type: 'success', msg: `Welcome back, ${res.user.username}!`});
        }
      });
    },
    async getUserInfo({ commit, dispatch }) {
      return dispatch({
        type: '_Ajax',
        do: async () => authService.getUserInfo(),
        onSuccess: (user) => commit({ type: 'setLoggedUser', user }),
        onError: () => {}
      });
    },
    async logout({ commit, dispatch }) {
      return dispatch({
        type: '_Ajax',
        do: async () => authService.logout(),
        onSuccess: (res) => {
          commit({ type: 'setLoggedUser', user: null });
          alertService.toast({type: 'success', msg: `Goodby`});
          dispatch('resetState', {}, {root: true});
        }
      });
    },
    async signup({ commit, dispatch }, { cred }) {
      return dispatch({
        type: '_Ajax',
        do: async () => authService.signup(cred),
        onSuccess: (res) => {
          commit({ type: 'setLoggedUser', user: res.user });
          alertService.toast({type: 'success', msg: `Welcome, ${res.user.username}!`});
        }
      });
    },
  }
}

export const authStore = { auth: _authStore };