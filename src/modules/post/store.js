import { postService } from './services/post.service';
import { alertService } from '@/modules/common/services/alert.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

const initState = () => ({
  data: { items: [], total: 0},
  selectedPost: null,
  filterBy: basicStoreService.initFilterBy(),
  isLoading: false
});

export const _postStore = {
  namespaced: true,
  state: initState(),
  getters: {
    postsData: (state) => state.data,
    posts: (state) => state.data.items,
    totalPosts: (state) => state.data.total,
    selectedPost: (state) => state.selectedPost,
    filterBy: (state) => state.filterBy,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setProp(state, { key, val }) {
      state[key] = val;
    },
    setPosts(state, { data }) {
      state.data = data;
    },
    setSelectedPost(state, { post }) {
      state.selectedPost = post;
    },
    removePost(state, { id }) {
      const idx = state.data.items.findIndex(c => c._id === id);
      if (idx !== -1) {
        state.data.items.splice(idx, 1);
        state.data.total++;
      }
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

    addComment(state, { comment }) {
      state.selectedPost.comments.items.unshift(comment);
      state.selectedPost.comments.total++;
    },
    removeComment(state, { commentId }) {
      const idx = state.selectedPost.comments.items.findIndex(c => c._id === commentId);
      if (idx === -1) return;
      state.selectedPost.comments.items.splice(idx, 1);
      state.selectedPost.comments.total--;
    }
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async loadPosts({ commit, dispatch }, { filterBy, organizationId }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const postsRes = await postService.query(filterBy, organizationId);
          return postsRes;
        },
        onSuccess: (data) => commit({ type: 'setPosts', data })
      });
    },
    async loadPost({ commit, dispatch }, { id, organizationId }) {
      commit({ type: 'setSelectedPost', post: null });
      return dispatch({
        type: '_Ajax',
        do: async () => postService.get(id, organizationId),
        onSuccess: (post) => commit({ type: 'setSelectedPost', post })
      });
    },
    async removePost({ commit, dispatch }, { id, organizationId }) {
      if (!await alertService.Confirm('Are you sure you want to remove this post?')) return;
      return dispatch({
        type: '_Ajax',
        do: async () => postService.remove(id, organizationId),
        onSuccess: () => alertService.toast({type: 'success', msg: `post removed successfully! id: ${id}`})
      });
    },
    async savePost({ commit, dispatch }, { post, organizationId }) {
      return dispatch({
        type: '_Ajax',
        do: async () => postService.save(post, organizationId),
        onSuccess: (data) => alertService.toast({type: 'success', msg: `post saved successfully! id: ${data._id}`})
      });
    },
  }
}

export const postStore = { post: _postStore };