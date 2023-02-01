<template>
  <li class="organization-preview item-preview">
    <div v-if="accountOrgStatus === 'pending'">
      <button @click="updateStatus('approved')">{{$t('approve')}}</button>
      <button @click="updateStatus('declined')">{{$t('decline')}}</button>
    </div>
    <router-link :to="'/organization/' + organization._id">
      <pre>{{organization}}</pre>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'OrganizationPreview',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    async updateStatus(newStatus) {
      await this.$store.dispatch({ type: 'organization/updateAccountStatus', organizationId: this.organization._id, accountId: this.loggedUser._id, newStatus });
    }
  },
  computed: {
    organization() {
      return this.item;
    },
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    },
    accountOrgStatus() {
      return this.$store.getters['auth/loggedUser']?.organizations.find(c => c._id === this.organization._id)?.status;
    }
  }
}
</script>