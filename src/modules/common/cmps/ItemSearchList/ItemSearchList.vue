<template>
  <div class="item-page flex align-center gap20 column flex-1">
    <div class="width-all flex align-center space-between wrap gap10">
      <ItemFilter :initFilter="filterBy.filter" @filtered="setFilter"/>
      <router-link v-if="newItemPageName" :to="{name: newItemPageName}"><button class="btn secondary mid">{{$t('addNew')}}</button></router-link>
    </div>
    <template v-if="items?.length">
      <ItemList class="stretch-self" :items="items" v-if="items" :singlePreviewCmp="singlePreviewCmp" :itemDetailesPageName="itemDetailesPageName"/>
      <PaginationBtns v-if="filterBy" :total="totalItems" :perPage="filterBy.pagination.limit" v-model="filterBy.pagination.page"/>
    </template>
    <template v-else-if="!isLoading">
      <h3>{{$t('noItemsFound')}}...</h3>
      <router-link v-if="newItemPageName" :to="{name: newItemPageName}">
        <button v-if="isFilterEmpty || true" class="btn big primary">{{$t('createNew')}}!</button>  
      </router-link>
    </template>
    <Loader v-if="isLoading"/>
  </div>
</template>

<script>
import ItemFilter from './ItemFilter.vue';
import ItemList from './ItemList.vue';
import PaginationBtns from '../PaginationBtns.vue';
import { setDeepVal, deepIterateWithObj } from '../../services/util.service';
import Loader from '../Loader.vue';

import { basicStoreService } from '@/modules/common/services/basic-store.service';

export default {
  name: 'ItemSearchList',
  props: {
    initFilterBy: {
      type: Object,
      default: () => {}
    },
    itemsData: [Object],
    itemDetailesPageName: [String],
    newItemPageName: [String],
    singlePreviewCmp: [Object],
    isLoading: [Boolean]
  },
  data() {
    return {
      filterBy: null
    }
  },
  watch: {
    filterBy: {
      deep: true,
      handler(filterVal) {
        const query = {};
        deepIterateWithObj(filterVal, (key, val) => {
          if (this.$route.query[key] != val) query[key] = val;
        }, '_');
        if (Object.keys(query).length) this.$router.push({ query: { ...this.$route.query, ...query} });
        this.$emit('filter', this.filterBy);
      }
    }
  },
  methods: {
    setFilter(filter) {
      this.filterBy.filter = JSON.parse(JSON.stringify(filter));
    }
  },
  computed: {
    items() {
      return this.itemsData.items;
    },
    totalItems() {
      return this.itemsData.total;
    },
    isFilterEmpty() {
      return JSON.stringify(this.filterBy) === JSON.stringify(basicStoreService.initFilterBy())
    }
  },
  created() {
    const filterByToSet = JSON.parse(JSON.stringify(this.initFilterBy));
    const queryParams = this.$route.query;
    deepIterateWithObj(filterByToSet, (key, val) => {
      let valToSet = +queryParams[key];
      if (isNaN(valToSet)) valToSet = queryParams[key]
      if (queryParams[key]) setDeepVal(filterByToSet, key, valToSet, '_');
    }, '_');
    this.filterBy = filterByToSet;
  },
  components: { ItemFilter, ItemList, PaginationBtns, Loader }
}
</script>

<style lang="scss">
@import '@/assets/styles/global/index';
.item-page {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .item-list {
    // flex: 1;
    overflow-y: auto;
    .item-preview {
      width: 300px;
      max-width: 85vw;
      height: 200px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: $light-shadow;
      padding: 20px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .pagination-btns {
    margin-bottom: 10px;
  }
}
</style>