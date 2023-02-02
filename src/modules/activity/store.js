import { activityService } from './services/activity.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

const initState = () => ({
  ...basicStoreService.initState()
});

export const _activityStore = {
  namespaced: true,
  state: initState(),
  getters: {
    commentsData: (state) => state.data,
    comments: (state) => state.data.items,
    totalComments: (state) => state.data.total,
    selectedComment: (state) => state.selectedItem,
    filterBy: (state) => state.filterBy,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setProp(state, { key, val }) {
      state[key] = val;
    },
    setActivities(state, { data }) {
      state.data = data;
    },
    setSelectedActivity(state, { activity }) {
      state.selectedItem = activity;
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
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async loadActivity({ commit, dispatch }, { filterBy }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const commentsRes = await activityService.query(filterBy);
          return commentsRes;
        },
        // onSuccess: (data) => commit({ type: 'setActivities', data })
        onSuccess: (data) => {}
      });
    },
    async loadActivity({ commit, dispatch }, { id }) {
      commit({ type: 'setSelectedActivity', activity: null });
      return dispatch({
        type: '_Ajax',
        do: async () => activityService.get(id),
        onSuccess: (activity) => commit({ type: 'setSelectedActivity', activity })
      });
    },
    async addActivity({ commit, dispatch }, { activity, attachedId }) {
      activity = {
        ...activityService.getEmptyActivity(),
        ...activity,
        attachedId: attachedId
      }
      console.log(activity);
      return dispatch({
        type: '_Ajax',
        do: async () => activityService.add(activity),
        onSuccess: ((addedActicvity) => {
          // commit({ type: 'addActivity', activity: addedActicvity });
        })
      });
    },
  }
}

export const activityStore = { activity: _activityStore };