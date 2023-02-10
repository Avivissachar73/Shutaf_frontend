<template>
  <div class="account-edit simple-form flex column gap20">
    <h2>{{$t('account.editAccount')}}</h2>
    <form v-if="accountToEdit" @submit.prevent="saveAccount" class="flex column align-start gap10">
      <FormInput type="text" label="account.firstname" placeholder="account.firstname" v-model="accountToEdit.firstname"/>
      <FormInput type="text" label="account.lastname" placeholder="account.lastname" v-model="accountToEdit.lastname"/>
      <FormInput type="text" label="account.username" placeholder="account.username" v-model="accountToEdit.username"/>
      <FormInput type="text" label="account.email" placeholder="account.email" v-model="accountToEdit.email"/>
      <FormInput type="select" label="account.gender" placeholder="account.gender" v-model="accountToEdit.gender" :itemsMap="userGenders"/>
      <FormInput type="text" label="account.newPassword" placeholder="account.newPassword" v-model="accountToEdit.password"/>
      <FormInput type="text" label="account.confirmPassword" placeholder="account.confirmPassword" v-model="confirmPassword"/>
      <!-- <FormInput type="text" placeholder="role" v-model="accountToEdit.roles[0]"/> -->
      <button class="btn primary" :disabled="!isAccountValid">{{$t('submit')}}</button>
    </form>
  </div>
</template>

<script>
import FormInput from '../../common/cmps/FormInput.vue'
export default {
  name: 'AccountEdit',
  data() {
    return {
      accountToEdit: null,
      confirmPassword: ''
    }
  },
  computed: {
    isAccountValid() {
      const user = this.accountToEdit;
      return user && user.username && user.firstname && user.lastname && user.email &&
             (user.password? this.confirmPassword === user.password : true);
    },
    userGenders() {
      return this.$store.getters['settings/config'].userGenders;
    }
  },
  methods: {
    async getAccount() {
      this.accountToEdit = await this.$store.dispatch({ type: 'account/loadAccount', id: this.$route.params.id });
    },
    async saveAccount() {
      if (!this.isAccountValid) return;
      await this.$store.dispatch({ type: 'account/saveAccount', item: this.accountToEdit });
      this.$router.push({ name: 'HomePage' })
    }
  },
  created() {
    this.getAccount();
  },
  watch: {
    '$route.params.id'() {
      this.getAccount();
    }
  },
  components: {
    FormInput
  }
}
</script>