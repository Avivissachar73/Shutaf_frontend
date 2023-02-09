<template>
  <li class="bug-preview item-preview flex column gap15">
    <div class="flex align-center space-between width-all gap10">
      <h3>{{item.title}}</h3>
      <div class="flex align-center space-between gap5">
        <button class="btn primary" @click="updateBugStatus('resolved')">{{$t('bug.resolve')}}</button>
        <button class="btn danger" @click="updateBugStatus('ignored')">{{$t('bug.ignore')}}</button>
      </div>
    </div>
    <p>{{item.desc}}</p>
    <!-- <router-link :to="{ name: 'BugDetails', params: { id: item._id } }">
    </router-link> -->
  </li>
</template>

<script>
export default {
  name: 'BugPreview',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateBugStatus(status) {
      this.$store.dispatch({ type: 'bug/saveBug', bug: { ...this.item, status } });
    }
  }
}
</script>