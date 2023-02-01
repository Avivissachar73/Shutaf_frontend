<template>
  <div class="account-details">
    <pre v-if="account">{{account}}</pre>
    <router-link v-if="account" :to="{name: 'AccountEdit', params: {id: account._id}}"><button>{{$t('edit')}}</button></router-link>
  </div>
</template>

<script>
export default {
  name: 'AccountDetails',
  methods: {
    getAccount() {
      this.$store.dispatch({ type: 'account/loadAccount', id: this.$route.params.id });
    }
  },
  computed: {
    account() {
      return this.$store.getters['account/selectedAccount'];
    }
  },
  created() {
    this.getAccount();
  },
  watch: {
    '$route.params.id'() {
      this.getAccount();
    }
  }
}
</script>