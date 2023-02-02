<template>
  <div class="account-details flex column gap10" v-if="account">
    <router-link :to="{name: 'AccountEdit', params: {id: account._id}}"><button>{{$t('edit')}}</button></router-link>
    <MiniAccountPreview :account="account"/>
    <p>{{account.firstname}} {{account.lastname}}</p>
    <p>{{account.email}}</p>
    <p>{{$t('systemRoles')}}: {{account.roles.map(c => $t(c)).join(', ')}}</p>
    <div class="flex column gap5">
      <p>{{$t('organizations')}}:</p>
      <ul class="flex column gap5">
        <li v-for="org in account.organizations" :key="org._id">
          <router-link :to="{ name: 'OrganizationDetails', params: { id: org._id } }">
            <button>{{org.name}}</button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MiniAccountPreview from '../cmps/MiniAccountPreview.vue';
export default {
  components: { MiniAccountPreview },
  name: 'AccountDetails',
  methods: {
    getAccount() {
      this.$store.dispatch({ type: 'account/loadAccount', id: this.$route.params.id });
      console.log('WOWO?');
      setTimeout(() => {
        console.log(this.$store.getters['account/selectedAccount']);
      })
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