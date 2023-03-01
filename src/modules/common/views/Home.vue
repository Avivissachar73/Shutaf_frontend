<template>
  <div class="home-page container flex column align-center justify-center gap30 height-all">
    <AppLogo/>
    <h3>Make living easier</h3>
  </div>
</template>

<script>
import AppLogo from '../cmps/AppLogo.vue'
export default {
  components: { AppLogo },
  name: 'Home'
}
</script>

<style lang="scss">
@import '@/assets/styles/global/index';
.dark {
  .app-logo {
    color: white;
  }
}
.home-page {
  font-family: 'Nanum Brush Script', cursive;
  h3 {
    font-size: rem(30px);
  }
}
</style>