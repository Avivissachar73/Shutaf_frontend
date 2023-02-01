import { commentService } from './services/comment.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

const initState = () => ({
  data: { items: [], total: 0},
  selectedComment: null,
  filterBy: basicStoreService.initFilterBy(),
  isLoading: false
});

export const _commentStore = {
  namespaced: true,
  state: initState(),
  getters: {
    commentsData: (state) => state.data,
    comments: (state) => state.data.items,
    totalComments: (state) => state.data.total,
    selectedComment: (state) => state.selectedComment,
    filterBy: (state) => state.filterBy,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setProp(state, { key, val }) {
      state[key] = val;
    },
    setComments(state, { data }) {
      state.data = data;
    },
    setSelectedComment(state, { comment }) {
      state.selectedComment = comment;
    },
    removeComment(state, { id }) {
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
    async loadComments({ commit, dispatch }, { filterBy }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const commentsRes = await commentService.query(filterBy);
          return commentsRes;
        },
        // onSuccess: (data) => commit({ type: 'setComments', data })
        onSuccess: (data) => {}
      });
    },
    async loadComment({ commit, dispatch }, { id }) {
      commit({ type: 'setSelectedComment', comment: null });
      return dispatch({
        type: '_Ajax',
        do: async () => commentService.get(id),
        onSuccess: (comment) => commit({ type: 'setSelectedComment', comment })
      });
    },
    async removeComment({ commit, dispatch }, { id }) {
      if (!await alertService.Confirm('Are you sure you want to remove this comment?')) return;
      console.log('WOWO!');
      return dispatch({
        type: '_Ajax',
        do: async () => commentService.remove(id),
        onSuccess: () => alertService.toast({type: 'success', msg: `comment removed successfully! id: ${id}`})
      });
    },
    async addComment({ commit, dispatch }, { comment, attachedId }) {
      comment.attachedId = attachedId;
      return dispatch({
        type: '_Ajax',
        do: async () => commentService.add(comment),
        onSuccess: ((addedComment) => {
          // commit({ type: 'addComment', comment: addedComment });
        })
      });
    },
    async saveComment({ commit, dispatch }, { comment }) {
      return dispatch({
        type: '_Ajax',
        do: async () => commentService.save(comment),
        onSuccess: (data) => alertService.toast({type: 'success', msg: `comment saved successfully! id: ${data._id}`})
      });
    },

    async simpleLoadComments(context, { filterBy }) {
      return await commentService.query(filterBy);
    }
  }
}

export const commentStore = { comment: _commentStore };