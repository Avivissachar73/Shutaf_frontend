<template>
  <header class="app-header flex align-center">
    <div class="container width-all flex align-center space-between">
      <router-link :to="{name: 'HomePage'}"><AppLogo/></router-link>

      <!-- <button @click="mobileShow = !mobileShow" class="nav-burger">☰</button> -->
      <button @click="mobileShow = !mobileShow" class="btn nav-burger"><img :src="require('@/assets/images/mine/navBurger.png')"/></button>
      <div class="blure" v-if="mobileShow" @click="mobileShow = false"></div>
      <nav :class="{show: mobileShow}">
        <template v-if="loggedUser">
          <router-link v-if="orgId" :to="{name: 'OrganizationDetails', params: {id: orgId} }">{{$t('organization.organization')}}</router-link>
          <!-- <router-link v-if="orgId" :to="{name: 'PostPage', params: {organizationId: orgId} }">{{$t('post.posts')}}</router-link> -->
          <router-link v-if="orgId" :to="{name: 'ShoppingListPage', params: {organizationId: orgId} }">{{$t('shoppingList.shoppingLists')}}</router-link>
          <router-link v-if="orgId" :to="{name: 'DashboardPage', params: {organizationId: orgId} }">{{$t('dashboard.dashboard')}}</router-link>
          <router-link :to="{name: 'OrganizationPage'}">{{$t('organization.organizations')}}</router-link>
          <router-link v-if="isAdmin" :to="{name: 'AdminPage'}">{{$t('admin')}}</router-link>
        </template>
        <router-link :to="{name: 'AboutPage'}">{{$t('about')}}</router-link> 
        <!-- <router-link :to="{name: 'SettingsPage'}">{{$t('settings')}}</router-link> -->
        <router-link :to="{name: 'SettingsPage'}">{{$t('settings.settings')}}</router-link>
          <router-link :to="{name: 'BugEdit'}">{{$t('bug.reportABug')}}</router-link>
        <router-link v-if="!loggedUser" :to="{name: 'LoginPage'}">{{$t('login')}}</router-link>
        <template v-else>
          <router-link :to="{name: 'AccountDetails', params: {id: loggedUser._id} }"><Avatar :account="loggedUser"/></router-link>
          <button class="btn" @click="logout">{{$t('logout')}}</button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import Avatar from './Avatar.vue';
import AppLogo from './AppLogo.vue'
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
    },
    orgId() {
      // return localStorage.logged_organization_id || this.$store.getters['organization/selectedOrganization']?._id || 'public';
      // return localStorage.logged_organization_id || this.$store.getters['organization/selectedOrganization']?._id;
      return this.$store.getters['organization/selectedOrganization']?._id || this.$route.params.organizationId;
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
  components: { AppLogo, Avatar },
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
      z-index: 11;
    }
    nav {
      display: block;
      position: fixed;
      z-index: 12;
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