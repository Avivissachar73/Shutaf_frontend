import { gameScoreService } from './services/game-score.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

import { $t } from '@/plugins/i18n';

const initState = () => ({
  ...basicStoreService.initState()
});

const basicStore = basicStoreService.createSimpleCrudStore(initState);

export const _gameScoreStore = {
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
    async loadScores({ commit, dispatch }, { filterBy }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const commentsRes = await gameScoreService.query(filterBy);
          return commentsRes;
        },
        // onSuccess: (data) => commit({ type: 'setComments', data })
        onSuccess: (data) => {}
      });
    },
    async addScore({ commit, dispatch }, { score }) {
      return dispatch({
        type: '_Ajax',
        do: async () => gameScoreService.add(score),
        onSuccess: ((addedComment) => {
          // commit({ type: 'addScore', score: addedComment });
        })
      });
    },

    async loadScore({ commit, dispatch }, { id }) {
      commit({ type: 'setSelectedItem', score: null });
      return dispatch({
        type: '_Ajax',
        do: async () => gameScoreService.get(id),
        onSuccess: (score) => commit({ type: 'setSelectedItem', item: score })
      });
    },
    async removeScore({ commit, dispatch }, { id }) {
      if (!await alertService.Confirm($t('gameScore.alerts.confirmRemove'))) return;
      return dispatch({
        type: '_Ajax',
        do: async () => gameScoreService.remove(id),
        onSuccess: () => alertService.toast({type: 'safe', msg: `${$t('gameScore.alerts.removedSuccess')}! id: ${id}`})
      });
    },
    async saveScore({ commit, dispatch }, { score }) {
      return dispatch({
        type: '_Ajax',
        do: async () => gameScoreService.save(score),
        onSuccess: (data) => alertService.toast({type: 'safe', msg: `${$t('gameScore.alerts.savedSuccess')}! id: ${data._id}`})
      });
    }
  }
}

export const gameScoreStore = { gameScore: _gameScoreStore };