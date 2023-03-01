<template>
  <section class="shoppingList-page height-all width-all flex column gap10">
    <h2>{{$t('shoppingList.shoppingList')}}</h2>
    <ItemSearchList
      class="width-all"
      :itemsData="shoppingListsData"
      :initFilterBy="filterBy"
      @filter="getShoppingList"
      itemDetailesPageName="ShoppingListDetails"
      newItemPageName="ShoppingListEdit"
      :singlePreviewCmp="ShoppingListPreview"
      :isLoading="isLoading && !shoppingListsData?.items?.length"
      :showLoader="false"
      @remove="removeShoppingList"
    />
    <Loader v-if="isLoading" />
  </section>
</template>

<script>
import ShoppingListPreview from '../cmps/ShoppingListPreview.vue';
import ItemSearchList from '@/modules/common/cmps/ItemSearchList/ItemSearchList.vue';
import Loader from '@/modules/common/cmps/Loader.vue';
export default {
  name: 'ShoppingListPage',
  data() {
    return {
      ShoppingListPreview
    }
  },
  methods: {
    getShoppingList(filterBy) {
      this.$store.dispatch({ type: 'shoppingList/loadShoppingLists', filterBy, organizationId: this.orgId });
    },
    removeShoppingList(id) {
      this.$store.dispatch({type: 'shoppingList/removeShoppingList', id, organizationId: this.orgId, reload: true });
    },
  },
  computed: {
    orgId() {
      return this.$route.params.organizationId;
    },
    shoppingListsData() {
      return this.$store.getters['shoppingList/data'];
    },
    filterBy() {
      return this.$store.getters['shoppingList/filterBy'];
    },
    isLoading() {
      return this.$store.getters['shoppingList/isLoading'];
    }
  },
  watch: {
    'orgId'() {
      this.getShoppingList();
    }
  },
  components: { ShoppingListPreview, ItemSearchList, Loader }
}
</script>