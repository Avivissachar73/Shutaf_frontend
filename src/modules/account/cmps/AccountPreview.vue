<template>
  <li class="account-preview item-preview">
    <router-link :to=" { name: 'AccountDetails', params: { id: item._id } }" class="flex column gap20">
      <!-- <pre>{{item}}</pre> -->
      <MiniAccountPreview :account="item"/>
      <h3>{{item.firstname}} {{item.lastname}}</h3>
      <p>{{item.email}}</p>
    </router-link>
  </li>
</template>

<script>
import MiniAccountPreview from './MiniAccountPreview.vue'
export default {
  components: { MiniAccountPreview },
  name: 'AccountPreview',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>