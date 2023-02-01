<template>
  <li class="item-preview">
    <router-link :to="{name: itemDetailesPageName, params: {id: item._id}}">
      <pre>{{item}}</pre>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'ItemPreview',
  props: {
    item: {
      type: Object,
      required: true
    },
    itemDetailesPageName: [String]
  }
}
</script>