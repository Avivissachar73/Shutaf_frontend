<template>
  <div class="login-page">
    <router-link :to="{name: 'SignupPage'}"><button>{{$t('signup')}}</button></router-link>
    <form @submit.prevent="login">
      <FormInput type="text" placeholder="username" label="username" v-model="userCred.username"/>
      <FormInput type="password" placeholder="password" label="password" v-model="userCred.password"/>
      <button :disabled="!isUserValid">{{$t('submit')}}</button>
    </form>
  </div>
</template>

<script>
import FormInput from '../../common/cmps/FormInput.vue'
export default {
  name: 'LoginPage',
  data() {
    return {
      userCred: JSON.parse(localStorage.userCred || 'null') || {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    isUserValid() {
      return this.userCred.username && this.userCred.password;
    }
  },
  methods: {
    async login() {
      if (!this.isUserValid) return;
      localStorage.userCred = JSON.stringify(this.userCred);
      await this.$store.dispatch({ type: 'auth/login', cred: this.userCred });
      this.$router.push('/');
    }
  },
  components: {
    FormInput
  }
}
</script>