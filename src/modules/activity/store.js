import { activityService } from './services/activity.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

export const _activityStore = {
  namespaced: true,
  state: basicStoreService.initState(),
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
      const newState = basicStoreService.initState();
      for (let key in state) state[key] = newState[key];
    },
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async loadComments({ commit, dispatch }, { filterBy }) {
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
    async loadComment({ commit, dispatch }, { id }) {
      commit({ type: 'setSelectedActivity', activity: null });
      return dispatch({
        type: '_Ajax',
        do: async () => activityService.get(id),
        onSuccess: (activity) => commit({ type: 'setSelectedActivity', activity })
      });
    },
    async removeComment({ commit, dispatch }, { id }) {
      if (!await alertService.Confirm('Are you sure you want to remove this activity?')) return;
      console.log('WOWO!');
      return dispatch({
        type: '_Ajax',
        do: async () => activityService.remove(id),
        onSuccess: () => alertService.toast({type: 'success', msg: `activity removed successfully! id: ${id}`})
      });
    },
    async addComment({ commit, dispatch }, { activity, attachedId }) {
      activity.attachedId = attachedId;
      return dispatch({
        type: '_Ajax',
        do: async () => activityService.add(activity),
        onSuccess: ((addedActicvity) => {
          // commit({ type: 'addComment', activity: addedActicvity });
        })
      });
    },
    async saveComment({ commit, dispatch }, { activity }) {
      return dispatch({
        type: '_Ajax',
        do: async () => activityService.save(activity),
        onSuccess: (data) => alertService.toast({type: 'success', msg: `activity saved successfully! id: ${data._id}`})
      });
    },

    async simpleLoadComments(context, { filterBy }) {
      return await activityService.query(filterBy);
    }
  }
}

export const activityStore = { activity: _activityStore };