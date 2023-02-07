<template>
  <div class="organization-edit flex column gap20">
    <h2>{{$t($route.params.id? 'organization.editOrganization' : 'organization.createOrganization')}}</h2>
    <form v-if="organization" @submit.prevent="saveOrganization" class="simple-form gap30">
      <div class="flex column gap5">
        <FormInput type="text" placeholder="name" label="name" v-model="organization.name"/>
        <FormInput type="text" placeholder="description" label="description" v-model="organization.desc"/>
      </div>

      <div v-if="organization._id" class="flex column gap10">
        <p>{{$t('organization.inviteMembers')}}</p>
        <div class="flex align-center gap10">
          <FormInput class="width-content" type="text" placeholder="search" v-model="searchAccountStr"/>
          <div class="btn" @click.prevent.stop="getAccounts">{{$t('search')}}</div>
        </div>
        <ul v-if="accounts.length" class="flex column gap5">
          <li v-for="account in accounts" :key="account._id" class="flex align-center gap5">
             <button class="btn secondary" @click.prevent="() => inviteAccount(account._id)">{{$t('invite')}}</button> <MiniAccountPreview :account="account"/>
          </li>
        </ul>
        <p v-else-if="!searchPristin">{{$t('noMatches')}}...</p>
      </div>
      <button class="btn big promary" :disabled="!isOrganizationValid">{{$t('save')}}</button>
    </form>
  </div>
</template>

<script>
import MiniAccountPreview from '../../account/cmps/MiniAccountPreview.vue'
import FormInput from '../../common/cmps/FormInput.vue'
export default {
  name: 'OrganizationEdit',
  data() {
    return {
      organization: null,
      searchAccountStr: '',
      searchPristin: true
    }
  },
  computed: {
    isOrganizationValid() {
      return this.organization && this.organization.name;
    },
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    },
    accounts() {
      return this.$store.getters['account/accounts'].filter(c => c._id !== this.loggedUser?._id);
    }
  },
  methods: {
    async getOrganization() {
      this.organization = await this.$store.dispatch({ type: 'organization/loadOrganization', id: this.$route.params.id });
    },
    async getAccounts() {
      this.searchPristin = false;
      this.$store.dispatch({ type: 'account/loadAccounts', filterBy: { filter: { search: this.searchAccountStr } } });
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
    // this.getAccounts();
  },
  watch: {
    '$route.params.id'() {
      this.getOrganization();
      // this.getAccounts();
    }
  },
  components: {
    FormInput,
    MiniAccountPreview
  }
}
</script>