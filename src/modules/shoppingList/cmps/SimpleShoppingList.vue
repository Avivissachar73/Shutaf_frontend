<template>
  <div class="simple-shoppingList flex column space-between gap15">
    <div class="flex align-center space-between">
      <h3>{{shoppingListToEdit.title}}</h3>
      <button class="btn remove-btn" @click="remove">X</button>
    </div>
    <ul class="flex column gap10 flex-1">
      <li class="flex space-between" v-for="product in shoppingListToEdit.products" :key="product.id">
        <p class="flex align-center gap5">
          <FormInput type="checkbox" @click.native="togleCheckProduct(product, !product.checked)" :value="product.checked"/>
          <span @click="togleCheckProduct(product, !product.checked)" :class="{ checked: product.checked }">{{product.toBuyCount}} {{product.name}}</span>
        </p>
        <button @click="removeProduct(product.id)" class="btn small">X</button>
      </li>
    </ul>
    <form @submit.prevent="addNewProduct" class="flex space-between">
      <FormInput v-model="newProductName" type="text" placeholder="shoppingList.newProduct"/>
      <button class="btn">{{$t('add')}}</button>
    </form>
    <!-- SEARCH INPUT? -->
  </div>
</template>

<script>
import BasicShoppingListCmp from './BasicShopingListCmp';
import FormInput from '@/modules/common/cmps/FormInput.vue';
import { getRandomId } from '@/modules/common/services/util.service';


export default {
  extends: BasicShoppingListCmp,
  name: 'SimpleShoppingList',
  components: { FormInput },
  props: {
    shoppingList: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      newProductName: ''
    }
  },
  methods: {
    togleCheckProduct(product, val) {
      // product.checked = !product.checked;
      product.checked = val;
    },
    addNewProduct() {
      const newProduct = {
        name: this.newProductName,
        checked: false,
        id: getRandomId(),
      }
      this.shoppingListToEdit.products.push(newProduct);
      this.newProductName = '';
    },
    removeProduct(id) {
      const idx = this.shoppingListToEdit.products.findIndex(c => c.id === id);
      if (idx === -1) return;
      this.shoppingListToEdit.products.splice(idx, 1);
    }
  }
}
</script>
<style lang="scss">
.simple-shoppingList {
  overflow: unset !important;
  height: unset !important;
  position: relative;
  // .remove-btn {
  //   position: absolute;
  //   top: -5px;
  //   left: -5px;
  // }
  input {
    color: black !important;
  }
}
</style>