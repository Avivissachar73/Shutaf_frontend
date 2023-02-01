<template>
  <header class="app-header flex align-center">
    <div class="container width-all flex align-center space-between">
      <router-link :to="{name: 'HomePage'}"><CreditLogo/></router-link>

      <!-- <button @click="mobileShow = !mobileShow" class="nav-burger">☰</button> -->
      <button @click="mobileShow = !mobileShow" class="nav-burger"><img :src="require('@/assets/images/mine/navBurger.png')"/></button>
      <div class="blure" v-if="mobileShow" @click="mobileShow = false"></div>
      <nav :class="{show: mobileShow}">
        <router-link :to="{name: 'AboutPage'}">{{$t('about')}}</router-link> 
        <!-- <router-link :to="{name: 'SettingsPage'}">{{$t('settings')}}</router-link> -->
        <router-link :to="{name: 'ExamplePage'}">{{$t('example')}}</router-link>
        <router-link :to="{name: 'SettingsPage'}">{{$t('settings')}}</router-link>
        <router-link :to="{name: 'PostPage', params: {organizationId: 'public'} }">{{$t('posts')}}</router-link>
        <router-link :to="{name: 'SandBox' }">{{$t('SandBox')}}</router-link>
        <template>
          <router-link v-if="!loggedUser" :to="{name: 'LoginPage'}">{{$t('login')}}</router-link>
          <template v-else>
            <router-link :to="{name: 'AccountDetails', params: {id: loggedUser._id} }">{{loggedUser.username}}</router-link>
            <router-link v-if="isAdmin" :to="{name: 'AccountPage'}">{{$t('admin')}}</router-link>
            <router-link v-if="isAdmin" :to="{name: 'DashboardPage'}">{{$t('dashboard')}}</router-link>
            <router-link :to="{name: 'OrganizationPage'}">{{$t('organizations')}}</router-link>
            <router-link :to="{name: 'ChatApp'}">{{$t('chat')}}</router-link>
            <router-link :to="{name: 'EdMapPage'}">ED</router-link>
            <button @click="logout">{{$t('logout')}}</button>
          </template>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import CreditLogo from './CreditLogo.vue'
export default {
  name: 'AppHeader',
  data() {
    return {
      mobileShow: false
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin'];
    }
  },
  methods: {
    async logout() {
      this.$emit('action');
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.push({name: 'LoginPage'});
      } catch(e) {}
      this.$emit('endAction');
    }
  },
  watch: {
    '$route.path'() {
      this.mobileShow = false;
    }
  },
  components: { CreditLogo },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global/index';
.app-header {
  position: relative;
  nav {
    @include flex-center;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 10px;
  }
  .nav-burger {
    display: none;
  }
  @media (max-width: $small-screen-breake) {
    $height: calc(100vh - #{$header-height});
    .nav-burger {
      display: block;
      width: 25px;
      height: 25px;
      font-weight: bold;
      @include font-size-big;
      // font-size: 22px;
    }
    .blure {   
      position: fixed;
      top: $header-height;
      right: 0;
      height: $height;
      width: 100vw;
      background-color: $blure-clr;
      z-index: 9;
    }
    nav {
      display: block;
      position: fixed;
      z-index: 10;
      height: $height;
      top: $header-height;
      overflow-y: auto;
      right: 0;
      transform: translateX(100%);
      transition: 0.3s;
      &.show {
        transform: translateX(0);
      }
      width: 175px;
      border-inline-start: 1px solid black;

      background-color: white;
      >* {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: unset;
        border-radius: unset;
        border-bottom: 1px solid black;
        &.router-link-exact-active {
          color: rgb(157, 255, 157);
        }
        &:hover {
          background-color: rgb(190, 190, 250);
        }
      }
    }
  }
}
</style>