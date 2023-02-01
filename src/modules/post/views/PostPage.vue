<template>
  <section class="post-page height-all width-all flex column">
    <h2>{{$t('posts')}}</h2>
    <ItemSearchList
      :itemsData="postsData"
      :initFilterBy="filterBy"
      @filter="getPosts"
      itemDetailesPageName="PostDetails"
      newItemPageName="PostEdit"
      :singlePreviewCmp="PostPreview"
    />
    <!-- <Loader v-if="isLoading" /> -->
  </section>
</template>

<script>
import PostPreview from '../cmps/PostPreview.vue';
import ItemSearchList from '@/modules/common/cmps/ItemSearchList/ItemSearchList.vue';
import Loader from '@/modules/common/cmps/Loader.vue';
export default {
  name: 'PostPage',
  data() {
    return {
      PostPreview
    }
  },
  methods: {
    getPosts(filterBy) {
      this.$store.dispatch({ type: 'post/loadPosts', filterBy, organizationId: this.$route.params.organizationId });
    }
  },
  computed: {
    postsData() {
      return this.$store.getters['post/postsData'];
    },
    filterBy() {
      return this.$store.getters['post/filterBy'];
    },
    isLoading() {
      return this.$store.getters['post/isLoading'];
    }
  },
  watch: {
    '$route.params.organizationId'() {
      this.getPosts();
    }
  },
  components: { PostPreview, ItemSearchList, Loader }
}
</script>