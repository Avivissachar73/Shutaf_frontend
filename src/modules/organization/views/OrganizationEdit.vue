<template>
  <div class="organization-edit">
    <form v-if="organization" @submit.prevent="saveOrganization">
      <FormInput type="text" placeholder="name" label="name" v-model="organization.name"/>
      <FormInput type="text" placeholder="description" label="description" v-model="organization.desc"/>

      <ul v-if="organization._id">
        <li v-for="account in accounts" :key="account._id">
          {{account.username}} <button @click.prevent="() => inviteAccount(account._id)">{{$t('invite')}}</button>
        </li>
      </ul>
      <button :disabled="!isOrganizationValid">{{$t('submit')}}</button>
    </form>
  </div>
</template>

<script>
import FormInput from '../../common/cmps/FormInput.vue'
export default {
  name: 'OrganizationEdit',
  data() {
    return {
      organization: null
    }
  },
  computed: {
    isOrganizationValid() {
      return true
      // return this.organization && this.organization.key;
    },
    accounts() {
      return this.$store.getters['account/accounts'];
    }
  },
  methods: {
    async getOrganization() {
      this.organization = await this.$store.dispatch({ type: 'organization/loadOrganization', id: this.$route.params.id });
    },
    async getAccounts() {
      this.$store.dispatch({ type: 'account/loadAccounts' });
    },
    async saveOrganization() {
      if (!this.isOrganizationValid) return;
      await this.$store.dispatch({ type: 'organization/saveOrganization', organization: this.organization });
      this.$router.push('/organization');
    },
    async inviteAccount(accountId) {
      await this.$store.dispatch({ type: 'organization/inviteAccount', organizationId: this.$route.params.id, accountId });
    }
  },
  created() {
    this.getOrganization();
    this.getAccounts();
  },
  watch: {
    '$route.params.id'() {
      this.getOrganization();
      // this.getAccounts();
    }
  },
  components: {
    FormInput
  }
}
</script>