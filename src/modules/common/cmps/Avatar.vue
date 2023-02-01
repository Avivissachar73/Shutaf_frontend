<template>
  <section class="app-avatar">
    <slot v-if="$slots.default"/>
    <img class="avatar-img" v-else :src="imgSrc" alt="">
  </section>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    account: [Object, undefined]
  },
  computed: {
    imgSrc() {
      return this.account.img || `https://robohash.org/${this.account.username}`;
    }
  }
}
</script>

<style lang="scss">
.app-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background: #dbdbdb;
  .avatar-img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>