export default {
  name: 'BasicShoppingListCmp',
  data() {
    return {
      shoppingListToEdit: null
    }
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
    setEditItem() {
      // this.dontEmit = true;
      this.shoppingListToEdit = JSON.parse(JSON.stringify(this.shoppingList));
      // this.dontEmit = false;
    },
  },
  created() {
    this.setEditItem();
  },
  watch: {
    shoppingListToEdit: {
      deep: true,
      async handler(curr, prev) {
        this.$emit('updateData', this.shoppingListToEdit);
      }
    },
    shoppingList: {
      deep: true,
      async handler() {
        this.setEditItem();
      }
    }
  }
}