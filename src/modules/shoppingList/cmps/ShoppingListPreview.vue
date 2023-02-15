<template>
  <li class="shoppingList-preview item-preview">
    <SmartShoppingList v-if="shoppingList.type === 'smart'" :shoppingList="shoppingList" @updateData="onUpdate" @remove="removeShoppingList"/>
    <SimpleShoppingList v-else :shoppingList="shoppingList" @updateData="onUpdate" @remove="removeShoppingList"/>
  </li>
</template>

<script>
import SmartShoppingList from './SmartShoppingList.vue';
import { socketService } from '@/modules/common/services/socket.service';
import SimpleShoppingList from './SimpleShoppingList.vue';

export default {
  name: 'ShoppingListPreview',
  components: { SmartShoppingList, SimpleShoppingList },
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      shoppingListToEdit: null,
      dontEmit: false
    }
  },
  computed: {
    shoppingList() {
      return this.item;
    },
    orgId() {
      return this.$route.params.organizationId;
    },
  },
  methods: {
    onUpdate(updatedShoppingList) {
      this.shoppingListToEdit = JSON.parse(JSON.stringify(updatedShoppingList));
    },

    removeShoppingList() {
      this.$store.dispatch({type: 'shoppingList/removeShoppingList', id: this.shoppingList._id, organizationId: this.orgId, reload: true });
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
    },
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
      async handler(curr, prev = null) {
        if (!prev || !curr) return;
        if (this.dontEmit) return;
        if (JSON.stringify(prev) === JSON.stringify(curr)) return;
        await this.$store.dispatch({type: 'shoppingList/saveShoppingList', shoppingList: this.shoppingListToEdit, organizationId: this.orgId });
      }
    },
    shoppingList: {
      deep: true,
      async handler() {
        this.setEditItem();
      }
    }
  },
}
</script>

<style lang="scss">
.shoppingList-preview {
  overflow: unset !important;
  height: unset !important;
  .header {
    height: 30px;
  }
  .form-input {
    .input.number {
      width: 40px;
    }
    input {
      color: black;
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