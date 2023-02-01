<template>
  <ul class="item-list flex align-start space-around wrap gap20">
    <component :is="componentToRender" :item="item" v-for="item in items" :itemDetailesPageName="itemDetailesPageName" :key="item._id"/>
  </ul>
</template>

<script>
import ItemPreview from './ItemPreview.vue'
export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      required: true
    },
    singlePreviewCmp: [Object],
    itemDetailesPageName: [String]
  },
  computed: {
    componentToRender() {
      return this.singlePreviewCmp || 'ItemPreview';
    }
  },
  components: { ItemPreview }
}
</script>