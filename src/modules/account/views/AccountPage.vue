<template>
  <section class="account-page height-all width-all flex column">
    <h2>{{$t('accounts')}}</h2>
    <ItemSearchList
      :itemsData="accountData"
      :initFilterBy="filterBy"
      @filter="setFilter"
      itemDetailesPageName="AccountDetails"
      newItemPageName="AccountEdit"
      :singlePreviewCmp="$options.AccountPreview"
    />
  </section>
</template>

<script>
import AccountPreview from '../cmps/AccountPreview.vue';
import PaginationBtns from '@/modules/common/cmps/PaginationBtns.vue';
import ItemSearchList from '@/modules/common/cmps/ItemSearchList/ItemSearchList.vue';
import Loader from '@/modules/common/cmps/Loader.vue';
export default {
  name: 'AccountPage',
  data() {
    return {
      filterBy: null
    }
  },
  watch: {
    filterBy: {
      deep: true,
      handler(val) {
        this.getAccounts();
      }
    }
  },
  methods: {
    getAccounts() {
      this.$store.dispatch({ type: 'account/loadAccounts', filterBy: this.filterBy });
    },
    setFilter(filter) {
      this.filterBy = JSON.parse(JSON.stringify(filter));
    }
  },
  computed: {
    accountData() {
      return this.$store.getters['account/data'];
    }
  },
  created() {
    this.setFilter(this.$store.getters['account/filterBy']);
  },
  components: { AccountPreview, PaginationBtns, ItemSearchList, Loader }
}
</script>