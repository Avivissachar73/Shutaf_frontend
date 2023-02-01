<template>
  <div class="account-edit">
    <form v-if="AccountToEdit" @submit.prevent="saveAccount">
      <pre>{{AccountToEdit}}</pre>
      <FormInput type="text" placeholder="username" v-model="AccountToEdit.username"/>
      <FormInput type="text" placeholder="email" v-model="AccountToEdit.email"/>
      <FormInput type="text" placeholder="role" v-model="AccountToEdit.roles[0]"/>
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