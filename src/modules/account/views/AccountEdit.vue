<template>
  <div class="account-edit simple-form flex column gap20">
    <h2>{{$t('editAccount')}}</h2>
    <form v-if="AccountToEdit" @submit.prevent="saveAccount" class="flex column align-start gap10">
      <FormInput type="text" label="firstname" placeholder="firstname" v-model="AccountToEdit.firstname"/>
      <FormInput type="text" label="lastname" placeholder="lastname" v-model="AccountToEdit.lastname"/>
      <FormInput type="text" label="username" placeholder="username" v-model="AccountToEdit.username"/>
      <FormInput type="text" label="email" placeholder="email" v-model="AccountToEdit.email"/>
      <!-- <FormInput type="text" placeholder="role" v-model="AccountToEdit.roles[0]"/> -->
      <button :disabled="!isAccountValid">{{$t('submit')}}</button>
    </form>
  </div>
</template>

<script>
import FormInput from '../../common/cmps/FormInput.vue'
export default {
  name: 'AccountEdit',
  data() {
    return {
      AccountToEdit: null
    }
  },
  computed: {
    isAccountValid() {
      return this.AccountToEdit && this.AccountToEdit.key;
    }
  },
  methods: {
    async getAccount() {
      this.AccountToEdit = await this.$store.dispatch({ type: 'account/loadAccount', id: this.$route.params.id });
    },
    async saveAccount() {
      if (!this.isAccountValid) return;
      await this.$store.dispatch({ type: 'account/saveAccount', item: this.AccountToEdit });
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

<style lang="scss">

</style>