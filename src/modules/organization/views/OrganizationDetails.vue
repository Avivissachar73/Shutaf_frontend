<template>
  <div class="organization-details">
    <div v-if="organization?.loggedAccountData?.status === 'pending'">
      <button @click="updateStatus('approved')">{{$t('approve')}}</button>
      <button @click="updateStatus('declined')">{{$t('decline')}}</button>
    </div>
    <div v-else-if="organization?.loggedAccountData?.status === 'approved'">
      <button @click="updateStatus('declined')">{{$t('Leave')}}</button>
    </div>
    <div>
      <router-link v-if="organization" :to="{ name: 'OrganizationEdit', params: {id: organization._id} }"><button>{{$t('edit')}}</button></router-link>
      <button @click="removeOrganization">{{$t('delete')}}</button>
    </div>
    <pre v-if="organization">{{organization}}</pre>
  </div>
</template>

<script>
import Loader from '@/modules/common/cmps/Loader.vue';

export default {
  name: 'OrganizationDetails',
  methods: {
    getOrganization() {
      this.$store.dispatch({ type: 'organization/loadOrganization', id: this.$route.params.id });
    },
    async removeOrganization() {
      await this.$store.dispatch({ type: 'organization/removeOrganization', id: this.organization._id });
      this.$router.push({name: 'ExamplePage'});
    },
    async updateStatus(newStatus) {
      await this.$store.dispatch({ type: 'organization/updateAccountStatus', organizationId: this.$route.params.id, accountId: this.loggedUser._id, newStatus });
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    },
    organization() {
      return this.$store.getters['organization/selectedOrganization'];
    }
  },
  created() {
    this.getOrganization();
    localStorage.logged_organization_id = this.$route.params.id;
  },
  watch: {
    '$route.params.id'() {
      this.getOrganization();
    }
  },
  components: {
    Loader
  }
}
</script>