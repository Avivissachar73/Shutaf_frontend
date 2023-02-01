<template>
  <span class="tooltip">
    <span ref="elPreview" class="tooltip-preview" @click="toggleShow" @mouseleave="toggleHoverShow(false)" @mouseover="handleHover($event)">
      <!-- <img class="tooltip-img" v-if="!$slots.preview" :src="require('@/assets/tooltip.svg')" alt="" /> -->
      <span v-if="!$slots.preview">(?)</span>
      <slot v-else name="preview"/>
    </span>
    <div v-show="show || hoverShow" ref="elMsg" class="tooltip-msg">
      <p v-if="!$slots.content">{{ msg? $t(msg) : 'No tooltip message...' }}</p>
      <slot v-else name="content"/>
    </div>
  </span>
</template>

<script>
import { getElPosOnScreen } from '../services/util.service';
export default {
  name: 'Tooltip',
  props: {
    msg: {
      type: String, required: false,
      default: ''
    },
    attachToElement: {
      type: String,
      required: false,
      default: 'body'
    }
  },
  data() {
    return {
      show: false,
      hoverShow: false
    }
  },
  
  methods: {
    toggleShow(val) {
      this.show = typeof val === 'boolean'? val : !this.show;
      if (this.show) this.viewMsg();
      else this.hoverShow = false;
    },
    toggleHoverShow(val) {
      this.hoverShow = typeof val === 'boolean'? val : !this.hoverShow;
      if (this.show) this.viewMsg();
    },
    handleHover(ev) {
      // this.toggleHoverShow(true);
      this.hoverShow = true;
      this.viewMsg(ev);
    }, 
    viewMsg(ev) {
      const { elPreview, elMsg } = this.$refs;
      const { offsetWidth: preWidth, offsetHeight: preHeight } = elPreview;
      const { offsetWidth: msgWidth, offsetHeight: msgHeight } = elMsg;
      const { offsetWidth: parentWidth, offsetHeight: parentHeight } = document.querySelector(this.attachToElement);

      const elPreviewPos = getElPosOnScreen(elPreview);

      const { clientX, clientY } = ev? ev : { clientX: elPreviewPos.x, clientY: elPreviewPos.y };

      const style = {};
      style.left = style.right = style.bottom = style.top = style.width = style.transform = '';
      
      let width = 270;

      style.left = 0;
      let diffXFromBorder;
      if ((parentWidth - clientX) < width) {
        style.left -= width
        diffXFromBorder = elPreviewPos.x - width;
      } else diffXFromBorder = elPreviewPos.x + width;
      if (diffXFromBorder < 0) style.left -= diffXFromBorder;
      else if (diffXFromBorder > parentWidth) style.left += diffXFromBorder;
      else style.left += preWidth / 2;
      style.left += 'px';
      
      style.top = 0;
      let diffYFromBorder;
      if ((parentHeight - clientY) < msgHeight) {
        style.top -= preHeight
        diffYFromBorder = elPreviewPos.y - preHeight;
      } else diffYFromBorder = elPreviewPos.y + preHeight;
      if (diffYFromBorder < 0) style.top -= diffYFromBorder;
      else if (diffYFromBorder > parentHeight) style.top += diffYFromBorder;
      else style.top += preHeight / 2;
      style.top += 'px';

      const windowWidth = window.innerWidth;

      if ((width*1.5) > windowWidth) {
        style.width = '95vw';
        style.left = windowWidth / 2 - elPreviewPos.x + 'px';
        style.transform = 'translateX(-50%)';
      } else style.width = width + 'px';

      for (let key in style) elMsg.style[key] = style[key];
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  .tooltip-preview {
    .tooltip-img {
      height: 100%;
      width: 100%;
    }
  }
  .tooltip-msg {
    position: absolute;
    z-index: 1000;
    width: 270px;
    padding: 15px;
    line-height: 1.3;
    background-color: #5a5a5a;
    color: #ffffff;
    box-shadow: 0 5px 13px 0 #44444478;
    font-weight: normal;
  }
}
</style>