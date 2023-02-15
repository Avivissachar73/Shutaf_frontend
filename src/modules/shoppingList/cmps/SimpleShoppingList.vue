<template>
  <li class="simple-shoppingList item-preview flex column gap10">
    <button class="btn small remove-btn" @click="remove">X</button>
    <pre>{{shoppingList}}</pre>
  </li>
</template>

<script>
export default {
  name: 'SimpleShoppingList',
  props: {
    shoppingList: {
      type: Object,
      required: true,
    }
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
  }
}
</script>
<style lang="scss">
.simple-shoppingList {
  position: relative;
  .remove-btn {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>