<template>
  <div class="modal-container" @click.stop="">
    <div class="blure" @click.stop="$emit('close')" @touchstart.stop="" @touchend.stop=""></div>
    <div class="modal" :class="{ 'modal-style': styling }">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    styling: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/global/index';
.modal-container {
  position: absolute;
  z-index: 30;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  .blure {
    position: absolute;
    z-index: 30;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: $blure-clr;
  }
  .modal {
    position: absolute;
    z-index: 30;
    top: 50%;
    left: 50%;
    width: fit-content;
    height: fit-content;
    transform: translate(-50%, -50%);

    &.modal-style {
      padding: 10px;
      border-radius: 5px;
      box-shadow: $light-shadow;
      background-color: #fff;
      color: black;
      input, select {
        color: black;
      }
    }
  }
}
</style>