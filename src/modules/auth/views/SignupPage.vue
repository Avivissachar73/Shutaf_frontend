<template>
  <div class="signup-page">
    <router-link :to="{name: 'LoginPage'}"><button>{{$t('login')}}</button></router-link>
    <form @submit.prevent="signup">
      <FormInput type="text" placeholder="username" label="username" v-model="user.username"/>
      <FormInput type="text" placeholder="firstname" label="firstname" v-model="user.firstname"/>
      <FormInput type="text" placeholder="lastname" label="lastname" v-model="user.lastname"/>
      <FormInput type="text" placeholder="email" label="email" v-model="user.email"/>
      <FormInput type="password" placeholder="password" label="password" v-model="user.password"/>
      <button :disabled="!isUserValid">{{$t('submit')}}</button>
    </form>
  </div>
</template>

<script>
import FormInput from '../../common/cmps/FormInput.vue'
import { accountService } from '@/modules/account/services/account.service';
export default {
  name: 'SignupPage',
  data() {
    return {
      user: accountService.getEmptyAccount()
    }
  },
  computed: {
    isUserValid() {
      const { user } = this;
      return user.username && user.password && user.firstname && user.lastname && user.email;
    }
  },
  methods: {
    async signup() {
      if (!this.isUserValid) return;
      await this.$store.dispatch({ type: 'auth/signup', cred: this.user });
      this.$router.push('/');
    }
  },
  components: {
    FormInput
  }
}
</script>