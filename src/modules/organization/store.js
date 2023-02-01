import { organizationService } from './services/organization.service';
import { alertService } from '@/modules/common/services/alert.service'
import { delay } from '@/modules/common/services/util.service';
import { basicStoreService } from '@/modules/common/services/basic-store.service';

const initState = () => ({
  data: { items: [], total: 0},
  selectedOrganization: null,
  filterBy: basicStoreService.initFilterBy(),
  isLoading: false
});

const _organizationStore = {
  namespaced: true,
  state: initState(),
  getters: {
    organizationData: (state) => state.data,
    organizations: (state) => state.data.items,
    totalItems: (state) => state.data.total,
    selectedOrganization: (state) => state.selectedOrganization,
    filterBy: (state) => state.filterBy,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setProp(state, { key, val }) {
      state[key] = val;
    },
    setOrganizaions(state, { data }) {
      state.data = data;
    },
    setSelectedOrganization(state, { organization }) {
      state.selectedOrganization = organization;
    },
    removeOrganization(state, { id }) {
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

    updateOrgStatus(state, { organizationId, newStatus }) {
      const doUpdateSttatus = (org) => org.loggedAccountData.status = newStatus;
      if (state.selectedOrganization?._id === organizationId) doUpdateSttatus(state.selectedOrganization);
      // const idxIdList = state.data.items.find(c => c._id === organizationId);
      // if (idxIdList !== -1) doUpdateSttatus(state.data.items[idxIdList]);
    }
  },
  actions: {
    _Ajax: basicStoreService.StoreAjax,
    async loadOrganizations({ commit, dispatch }, { filterBy }) {
      return dispatch({
        type: '_Ajax',
        do: async () => {
          if (filterBy) commit({ type: 'setFilterBy', filterBy });
          const organizationsRes = await organizationService.query(filterBy);
          return organizationsRes;
        },
        onSuccess: (data) => commit({ type: 'setOrganizaions', data })
      });
    },
    async loadOrganization({ commit, dispatch }, { id }) {
      return dispatch({
        type: '_Ajax',
        do: async () => organizationService.get(id),
        onSuccess: (organization) => commit({ type: 'setSelectedOrganization', organization })
      });
    },
    async removeOrganization({ commit, dispatch }, { id }) {
      if (!await alertService.Confirm('Are you sure you want to remove this organization?')) return;
      return dispatch({
        type: '_Ajax',
        do: async () => organizationService.remove(id),
        onSuccess: () => alertService.toast({type: 'success', msg: `Organization removed successfully! id: ${id}`})
      });
    },
    async saveOrganization({ commit, dispatch }, { organization }) {
      return dispatch({
        type: '_Ajax',
        do: async () => organizationService.save(organization),
        onSuccess: (data) => alertService.toast({type: 'success', msg: `Organization saved successfully! id: ${data._id}`})
      });
    },


    async inviteAccount({ commit, dispatch }, { organizationId, accountId }) {
      return dispatch({
        type: '_Ajax',
        do: async () => organizationService.inviteAccount(organizationId, accountId),
        onSuccess: () => alertService.toast({type: 'success', msg: `Invetation sent successfully!`})
      });
    },
    async updateAccountStatus({ commit, dispatch, getters }, { organizationId, accountId, newStatus }) {
      return dispatch({
        type: '_Ajax',
        do: async () => organizationService.updateAccountStatus(organizationId, accountId, newStatus),
        onSuccess: (data) => {
          commit({ type: 'updateOrgStatus', organizationId, newStatus });
          commit('auth/updateOrgStatus', { organizationId, newStatus }, { root: true });
        }
      });
    },
  }
}

export const organizationStore = { organization: _organizationStore };