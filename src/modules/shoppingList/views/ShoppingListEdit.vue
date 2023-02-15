<template>
  <div class="shoppingList-edit flex column gap20">
    <h2>{{$t('shoppingList.createNewShoppingList')}}</h2>
    <form v-if="shoppingListToEdit" @submit.prevent="saveShoppingList" class="simple-form">
      <FormInput placeholder="name" type="text" v-model="shoppingListToEdit.title"/>
      <FormInput placeholder="type" type="select" :items="['smart', 'simple']" v-model="shoppingListToEdit.type"/>
      <button class="btn big primary" :disabled="!isItemValid">{{$t('submit')}}</button>
    </form>
  </div>
</template>

<script>
import FormInput from '../../common/cmps/FormInput.vue';
export default {
  name: 'shoppingListEdit',
  data() {
    return {
      shoppingListToEdit: null
    }
  },
  computed: {
    isItemValid() {
      return this.shoppingListToEdit && this.shoppingListToEdit.title;
    }
  },
  methods: {
    async getItem() {
      this.shoppingListToEdit = await this.$store.dispatch({ type: 'shoppingList/loadShoppingList', id: this.$route.params.id, organizationId: this.$route.params.organizationId });
    },
    async saveShoppingList() {
      if (!this.isItemValid) return;
      if (!this.shoppingListToEdit._id && this.shoppingListToEdit.type === 'simple') {
        delete this.shoppingListToEdit.cart;
      }
      await this.$store.dispatch({ type: 'shoppingList/saveShoppingList', shoppingList: this.shoppingListToEdit, organizationId: this.$route.params.organizationId });
      this.$router.push('/shopping-list/' + this.$route.params.organizationId);
    }
  },
  created() {
    this.getItem();
  },
  watch: {
    '$route.params.id'() {
      this.getItem();
    }
  },
  components: {
    FormInput
  }
}
</script>