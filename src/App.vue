<template>
  <div class="app" id="app" v-if="settings" :class="{ rtl: isRtl, dark: isDarkMode }">
    <div class="app-content">
      <AppAside/>
      <div class="right">
        <AppHeader @action="isLoading = true" @endAction="isLoading=false"/>
        <main class="app-main">
          <router-view class="main-content"/>
        </main>
      </div>
    </div>
    <AppFooter/>
    <!-- <Loader v-if="isLoading"/> -->
  </div>
</template>

<script>
import AppHeader from '@/modules/common/cmps/AppHeader.vue';
import AppFooter from '@/modules/common/cmps/AppFooter.vue';
import AppAside from '@/modules/common/cmps/AppAside.vue';
import { socketService } from '@/modules/common/services/socket.service';
import evEmmiter from '@/modules/common/services/event-emmiter.service';
import Loader from './modules/common/cmps/Loader.vue';
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppAside,
    Loader
  },
  data() {
    return {
      isLoading: false,
      isDarkMode: localStorage.isDarkMode === 'true'
    }
  },
  computed: {
    settings() {
      return this.$store.getters['settings/settings'];
    },
    isRtl() {
      const locale = this.$i18n.locale;
      return ['he'].includes(locale);
    },
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    }
  },
  async created() {
    this.isLoading = true;
    await socketService.connect();
    try {
      await Promise.all([
        this.$store.dispatch('settings/loadSettings'),
        this.$store.dispatch('auth/getUserInfo')
      ]);
    } catch(e) {}
    this.isLoading = false;
    evEmmiter.on('set_darkmode', (val) => {
      this.isDarkMode = val;
    });

    if (['HomePage'].includes(this.$route.name) && this.loggedUser && localStorage.logged_organization_id) this.$router.push({ name: 'OrganizationDetails', params: {id: localStorage.logged_organization_id} })
  }
}
</script>
