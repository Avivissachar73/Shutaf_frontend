<template>
  <div class="account-app container inner-app">
    <router-view class="inner-app-content"/>
    <Loader v-if="isLoading"/>
  </div>
</template>


<script>
import Loader from '@/modules/common/cmps/Loader.vue';
export default {
  name: 'AccountApp',
  computed: {
    isLoading() {
      return this.$store.getters['account/isLoading'];
    }
  },
  components: {
    Loader
  }
}
</script>