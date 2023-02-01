<template>
  <li class="account-preview item-preview">
    <router-link :to="'/account/' + item._id">
      <pre>{{item}}</pre>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'AccountPreview',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>