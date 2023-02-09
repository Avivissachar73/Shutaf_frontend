<template>
  <li class="shoppingList-preview item-preview flex column gap10">
    <div class="header flex align-center space-between">
      <h3 v-if="!showActions">{{shoppingListToEdit.title}}</h3>
      <FormInput v-else v-model="shoppingListToEdit.title" placeholder="title"/>
      <div class="flex gap5">
        <button @click="removeShoppingList" class="btn icon" v-if="showActions"><img :src="require('@/assets/images/garbage.png')"/></button>
        <button @click="toggleItemsView(!itemsView)" class="btn icon"><img :src="require(`@/assets/images/${itemsView? '' : 'check-'}list.png`)"/></button>
        <button @click="toggleShowActions(!showActions)" class="btn icon"><img :src="require('@/assets/images/pencil.png')"/></button>
      </div>
    </div>
    <div v-if="itemsView" class="flex column gap20">
      <h4>{{$t('shoppingList.products')}}</h4>
      <ul v-if="shoppingListToEdit.products.length" class="width-all flex column gap5">
        <li v-for="item in shoppingListToEdit.products" :key="item.id" class="flex gap5 space-between">
          <div class="flex align-center gap5">
            <button @click="updateProductIdx(item.id, -1)" class="btn small icon"><img :src="require('@/assets/images/small-arrow-head-up.png')"/></button>
            <button @click="updateProductIdx(item.id, 1)" class="btn small icon"><img :src="require('@/assets/images/small-arrow-head-down.png')"/></button>
            <p class="flex-1">{{item.name}}:</p>
          </div>
          <div class="flex align-center gap5">
            <div class="flex align-center gap5">
              <button @click="updateItemCount(item, 1)" class="btn small">+</button>
              <FormInput :min="0" type="number" placeholder="shoppingList.count" v-model="item.count"/>
              <button :disabled="(+item.count <= 0)" @click="updateItemCount(item, -1)" class="btn small">-</button>
            </div>
            <div v-if="showActions" class="flex align-center gap5">
              <button @click="removeProduct(item.id)" class="btn icon"><img :src="require('@/assets/images/garbage.png')"/></button>
              <button @click="setProductToEdit(item)" class="btn icon"><img :src="require('@/assets/images/pencil.png')"/></button>
            </div>
          </div>
        </li>
      </ul>
      <p v-else>{{$t('shoppingList.noProducts')}}..</p>
      <div class="new-product-section flex column gap15">
        <div class="flex align-center space-between">
          <button class="btn" @click="toggleAddProductSection(!showAddProductSection)">
            {{$t(showAddProductSection? 'close' : 'shoppingList.addProduct')}}
          </button>
          <button v-if="showAddProductSection" @click="saveNewProduct()" class="btn icon"><img :src="require('@/assets/images/save.png')"/></button>
        </div>
        <div v-if="showAddProductSection" class="new-product-section flex column align-center gap10">
          <div class="flex column width-all gap5">
            <FormInput type="text" placeholder="title" v-model="productToEdit.name"/>
            <FormInput type="autocomplete" :items="allCategories" placeholder="shoppingList.category" v-model="productToEdit.category"/>
            <div class="flex align-center width-all space-between gap10">
              <FormInput class="flex-1" type="number" placeholder="shoppingList.count" label="shoppingList.count" v-model="productToEdit.count"/>
              <Tooltip :attachToElement="$el" msg="shoppingList.tooltip.count"/>
            </div>
            <div class="flex align-center width-all space-between gap10">
              <FormInput class="flex-1" type="number" :min="0" placeholder="shoppingList.minCount" label="shoppingList.minCount" v-model="productToEdit.minCount"/>
              <Tooltip :attachToElement="$el" msg="shoppingList.tooltip.minCount"/>
            </div>
            <div class="flex align-center width-all space-between gap10">
              <FormInput class="flex-1" type="number" :min="0" placeholder="shoppingList.maxCount" label="shoppingList.maxCount" v-model="productToEdit.maxCount"/>
              <Tooltip :attachToElement="$el" msg="shoppingList.tooltip.maxCount"/>
            </div>
            <div class="flex align-center width-all space-between gap10">
              <FormInput class="flex-1" type="number" :min="1" :max="10" placeholder="shoppingList.healthRate" label="shoppingList.healthRate" v-model="productToEdit.healthRate"/>
              <Tooltip :attachToElement="$el" msg="shoppingList.tooltip.healthRate"/>
            </div>
          </div>
          <div class="flex column width-all gap10">
            <p class="flex align-center gap5">
              <span>{{$t('shoppingList.prices')}}</span>
              <Tooltip :attachToElement="$el" msg="shoppingList.tooltip.prices"/>
            </p>
            <ul class="flex column gap10">
              <li v-for="(price, i) in productToEdit.prices" :key="price.id" class="flex space-between align-end">
                <FormInput type="autocomplete" :items="allShops" placeholder="shoppingList.shopName" v-model="price.shopName"/>
                <FormInput type="number" :min="0" placeholder="price" v-model="price.value"/>
                <button @click="productToEdit.prices.splice(i, 1)" class="btn icon"><img :src="require('@/assets/images/garbage.png')"/></button>
              </li>
              <li>
                <button class="btn" @click="addPrice">
                  {{$t('shoppingList.addPrice')}}
                </button>
              </li>
            </ul>
          </div>
          <button class="btn" @click="saveNewProduct()">{{$t('save')}}</button>
        </div>
      </div>
    </div>
    <div v-else class="flex column gap10 space-between align-center height-all">
      <template v-if="shoppingItemsToRender.total">
        <div class="flex column gap20 width-all">
          <nav class="flex space-between wrap gap3">
            <button class="btn" @click="viewdShop = shop" :class="{ selected: viewdShop === shop }" v-for="shop in shopViewData.shops" :key="shop">{{shop}} </button>
          </nav>
          <ul  v-for="(items, key) in shoppingItemsToRender.data" :key="key" class="flex column gap10">
            <p>{{key}}:</p>
            <li v-for="item in items" :key="item.id" class="flex space-between">
              <p class="flex align-center gap5"><FormInput type="checkbox" @click.native="val => toggleItemToCart(item.id, val)" :value="isProdactInCart(item.id)"/> {{item.toBuyCount}} {{item.name}}</p>
              <p>{{item.totalPrice}}</p>
            </li>
          </ul>
          <p class="flex space-between"><span>{{$t('total')}}:</span> <span>{{totalPrice}}</span></p>
        </div>
        <button class="btn" @click="settleUpCatr">{{$t('shoppingList.settleUp')}}</button>
      </template>
      <template v-else>
        <p>{{$t('shoppingList.allSettledUp')}}!</p>
      </template>
    </div>
  </li>
</template>

<script>
import FormInput from '@/modules/common/cmps/FormInput.vue';
import { shoppingListService } from '../services/shoppingList.service';
import { socketService } from '@/modules/common/services/socket.service';
import { alertService } from '@/modules/common/services/alert.service';
import { randItem } from '@/modules/common/services/util.service';
import Tooltip from '../../common/cmps/Tooltip.vue';

export default {
  name: 'ShoppingListPreview',
  props: {
    item: {
      type: Object,
      required: true,
      dontEmit: false
    }
  },
  data() {
    return {
      showAddProductSection: false,
      showActions: false,
      itemsView: true,
      shoppingListToEdit: null,
      productToEdit: shoppingListService.getEmptyShoppingProduct(),
      
      viewdShop: '',
    }
  },
  computed: {
    shoppingList() {
      return this.item;
    },
    orgId() {
      return this.$route.params.organizationId;
    },

    shopViewData() {
      return {
        shops: Array.from(new Set(this.shoppingList.products.reduce((acc, c) => [...acc, ...c.prices.map(i => i.shopName)], [])))
                .sort((a, b) => {
                  const priceA = this.calcTotalPricePerShop(a);
                  const priceB = this.calcTotalPricePerShop(b);
                  if (typeof priceA === 'string') return 1;
                  if (typeof priceB === 'string') return -1;
                  return priceA - priceB;
                }),
        products: this.shoppingList.products
      }
    },
    shoppingItemsToRender() {
      const _products = this.calcShoppingItemsDataPerShop(this.viewdShop);
      return {
        total: _products.length,
        data: _products.reduce((acc, c) => {
          if (!acc[c.category]) acc[c.category] = [];
          acc[c.category].push(c)
          return acc;
        }, {})
      }
    },
    totalPrice() {
      return this.calcTotalPricePerShop(this.viewdShop);
    },

    allShops() {
      return this.shoppingList.products.reduce((acc, c) => {
        c.prices.forEach(price => {
          if (!acc.includes(price.shopName || 'unknown')) acc.push(price.shopName || 'unknown');
        });
        return acc;
      }, []);
    },
    allCategories() {
      return this.shoppingList.products.reduce((acc, c) => {
        if (!acc.includes(c.category || 'unknown')) acc.push(c.category || 'unknown');
        return acc;
      }, []);
    }
  },
  methods: {
    toggleAddProductSection(val) {
      this.showAddProductSection = val
    },
    toggleShowActions(val) {
      this.showActions = val;
    },
    toggleItemsView(val) {
      this.itemsView = val;
      if (!val) {
        if (!this.viewdShop) this.viewdShop = this.shopViewData.shops[0] || '';
      }
    },

    addPrice() {
      this.productToEdit.prices.push(shoppingListService.getEmptyPrice());
    },
    saveNewProduct() {
      const idx = this.shoppingListToEdit.products.findIndex(c => c.id === this.productToEdit.id);
      if (idx === -1) this.shoppingListToEdit.products.push(this.productToEdit);
      else this.shoppingListToEdit.products.splice(idx, 1, this.productToEdit);
      this.productToEdit = shoppingListService.getEmptyShoppingProduct();
      this.toggleAddProductSection(false);
    },
    async removeProduct(id) {
      if (!await alertService.Confirm(this.$t('shoppingList.alerts.confirmRemoveProduct'))) return;
      const idx = this.shoppingListToEdit.products.findIndex(c => c.id === id);
      this.shoppingListToEdit.products.splice(idx, 1);
    },
    setProductToEdit(product) {
      this.productToEdit = JSON.parse(JSON.stringify(product));
      this.toggleAddProductSection(true);
    },

    setEditItem() {
      this.dontEmit = true;
      this.shoppingListToEdit = JSON.parse(JSON.stringify(this.shoppingList));
      this.dontEmit = false;
    },

    onSocketUpdateShoppongList({ shoppingList }) {
      this.dontEmit = true;
      this.shoppingListToEdit = null;
      this.$store.commit({ type: 'shoppingList/saveShoppingList', shoppingList });
      this.dontEmit = false;
      // this.setEditItem()
    },


    calcShoppingItemsDataPerShop(shop) {
      return this.shoppingList.products.filter(c => c.count <= c.minCount).map(c => {
        const price = c.prices.find(i => i.shopName === shop)?.value || 'unknown';
        const toBuyCount = c.maxCount - c.count;
        return {
          id: c.id,
          name: c.name,
          price,
          toBuyCount,
          totalPrice: price === 'unknown' ? price : price*toBuyCount,
          category: c.category
        }
      });
    },
    calcTotalPricePerShop(shop) {
      const currPrices = this.calcShoppingItemsDataPerShop(shop).map(c => c.totalPrice);
      const isNotShure = currPrices.includes('unknown');
      const pricesToCalc = currPrices.filter(c => c !== 'unknown');
      const totalPrice = pricesToCalc.reduce((sum, c) => sum+c, 0);
      if (isNotShure) return 'min ~ ' + totalPrice;
      return totalPrice;
    },

    toggleItemToCart(prodartId, val) {
      const idx = this.shoppingListToEdit.cart.findIndex(c => c === prodartId);
      if (idx === -1) this.shoppingListToEdit.cart.push(prodartId);
      else this.shoppingListToEdit.cart.splice(idx, 1);
    },
    isProdactInCart(id) {
      return this.shoppingList.cart.includes(id);
    },
    settleUpCatr() {
      this.createProductCountActivity(
        this.shoppingListToEdit.cart.map(id => {
          const item = this.shoppingList.products.find(c => c.id === id);
          return { item, updateBy: item.max - item.count };
        }) , false);
      this.shoppingListToEdit.products.forEach(c => {
        if (this.isProdactInCart(c.id)) c.count = c.maxCount
      });
      this.shoppingListToEdit.cart = [];
    },

    removeShoppingList() {
      this.$store.dispatch({type: 'shoppingList/removeShoppingList', id: this.shoppingListToEdit._id, organizationId: this.orgId });
    },

    updateProductIdx(id, diff) {
      const idx = this.shoppingListToEdit.products.findIndex(c => c.id === id);
      let newIdx = idx + diff;
      const len = this.shoppingListToEdit.products.length;
      if (newIdx < 0) newIdx = len-newIdx;
      else if (newIdx >= len) newIdx = newIdx - len;
      console.log(newIdx)
      const item = this.shoppingListToEdit.products.splice(idx, 1)[0];
      this.shoppingListToEdit.products.splice(newIdx, 0, item);
    },


    updateItemCount(item, updateBy = 0) {
      item.count += updateBy;
      this.healthAlertToUser(item, updateBy);
      this.createProductCountActivity([{ item, updateBy }], updateBy < 0);
    },

    createProductCountActivity(itemsData, isMinus = false) {
      let activity = {
        name: isMinus? 'productEaten' : 'boughtProduct',
        data: {
          listId: this.shoppingList._id,
          items: itemsData.map(({ item, updateBy }) => ({
            product: item.name,
            healthRate: item.healthRate,
            count: (isMinus? -1 : 1) * updateBy,
            price: item.prices.find(c => c.shopName === (this.viewdShop || this.shopViewData.shops[0] || ''))?.value || 0
          }))
        }
      };
      this.$store.dispatch({ type: 'activity/addActivity', activity, attachedId: this.orgId });
    },

    healthAlertToUser(item, diff) {
      if (diff >= 0) return;
      const msgsMap = {
        safe: ['Sweet!', 'Kaboom!', 'Getting health!', 'Nice shape!', 'Looking good!', 'Warthy!'],
        warning: ['Bon apatite!', 'Nice!'],
        danger: ['The summer body wont shape itself..', 'NOT worthy!', 'WoopyDoo!', 'Getting Fatty!']
      }
      const { healthRate } = item;
      let type;
      if (healthRate > 7) type = 'safe';
      else if (healthRate > 3) type = 'warning';
      else type = 'danger';
      alertService.toast({ type, msg: randItem(msgsMap[type]) });
    }
  },
  created() {
    this.setEditItem();
    socketService.on('update-shoppingList-' + this.shoppingList._id, this.onSocketUpdateShoppongList);
  },
  destroyed() {
    socketService.off('update-shoppingList-' + this.shoppingList._id, this.onSocketUpdateShoppongList);
  },
  watch: {
    shoppingListToEdit: {
      deep: true,
      async handler(curr, prev) {
        if (!prev || !curr) return;
        if (this.dontEmit) return;
        if (JSON.stringify(prev) === JSON.stringify(this.shoppingList)) return;
        await this.$store.dispatch({type: 'shoppingList/saveShoppingList', shoppingList: this.shoppingListToEdit, organizationId: this.orgId });
        // this.setEditItem();
      }
    },
    shoppingList: {
      deep: true,
      async handler() {
        this.setEditItem();
      }
    }
  },
  components: { FormInput, Tooltip }
}
</script>

<style lang="scss">
.shoppingList-preview {
  .header {
    height: 30px;
  }
  // min-height: 350px !important;
  overflow: unset !important;
  height: unset !important;
  // min-height: 500px;
  .form-input {
    .input.number {
      width: 40px;
    }
  }
  .new-product-section {
    .form-input {
      justify-content: space-between;
    }
  }

  button {
    &.selected {
      border-width: 2px;
      font-weight: bold;
      transform: scale(1.05);
    }
  }
}
</style>