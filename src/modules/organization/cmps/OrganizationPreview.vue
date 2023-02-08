<template>
  <li class="organization-preview item-preview flex column gap10">
    <div v-if="accountOrgStatus === 'pending'" class="flex gap5">
      <span>{{$t('organization.newOrganization')}}!</span>
      <button @click.prevent.stop="updateStatus('approved')" class="btn safe">{{$t('approve')}}</button>
      <button @click.prevent.stop="updateStatus('declined')" class="btn danger">{{$t('decline')}}</button>
    </div>
    <component :is="accountOrgStatus === 'approved'? 'router-link' : 'div'" :to="'/organization/' + organization._id" class="flex column gap10 flex-1">
      <h3>{{organization.name}}</h3>
      <p>{{organization.desc}}</p>
    </component>
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