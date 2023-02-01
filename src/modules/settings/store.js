import { settingsService } from './services/settings.service';
import { alertService } from '@/modules/common/services/alert.service'
import { basicStoreService } from '@/modules/common/services/basic-store.service';


const initState = () => ({
  settings: null,
  isLoading: false
});

export const _settingsStore = {
  namespaced: true,
  state: initState(),
  getters: {
    settings: (state) => state.settings,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setSettings(state, { settings }) {
      state.settings = settings;
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
    async loadSettings({ commit, dispatch }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          const settingsRes = await settingsService.getSettings();
          return settingsRes;
        },
        onSuccess: (settings) => commit({ type: 'setSettings', settings }),
        onError: (err) => {}, // NOOP;,
        dontDelay: true
      });
    },
    async updateSettings({ commit, dispatch }, { settings }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          const settingsRes = await settingsService.updateSettings(settings);
          return settingsRes;
        },
        onSuccess: (newSettings) => commit({ type: 'setSettings', settings: newSettings }),
        // onError: (err) => {} // NOOP;
        dontDelay: true
      });
    }
  }
}

export const settingsStore = { settings: _settingsStore };