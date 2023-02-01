<template>
  <div class="loader">
    <div class="blure"></div>
    <!-- <img class="preview" :src="require('@/assets/images/loader.gif')"> -->
    <AnimationLoader class="preview" />
  </div>
</template>

<script>
import AnimationLoader from './AnimationLoader.vue'
export default {
  name: 'Loader',
  components: { AnimationLoader }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global/index';
.loader {
  &:hover {
    pointer-events: none;
  }
  .blure {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: $blure-clr;
    z-index: 9;
  }
  .preview {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    transform: translate(-50%, -50%);
  }
}
</style>