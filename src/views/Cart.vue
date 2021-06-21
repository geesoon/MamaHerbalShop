<template>
  <div class="cart-container" v-if="!isLoading && this.items.length != 0">
    <div class="cart-item-list">
      <CartItem v-for="(item, key) in items" :item="item" :key="key" />
    </div>
    <div class="cart-panel">
      <div class="cart-panel-order-info">
        <div class="cart-panel-col">
          <div class="cart-panel-row">
            <small>Sold to: </small>
          </div>
          <div class="cart-panel-row">
            <small>Date: </small>
            <small>
              {{ formattedDate }}
            </small>
          </div>
        </div>
        <div class="cart-panel-col">
          <div class="cart-panel-row">
            <small>Total Cost:</small>
            <small
              ><strong>RM{{ totalCost() }}</strong></small
            >
          </div>
          <div class="cart-panel-row">
            <small>Order Total: </small>
            <small
              ><strong>RM{{ totalPrice() }}</strong></small
            >
          </div>
          <div class="cart-panel-row">
            <small>Profits: </small>
            <small>
              <strong>{{
                totalProfit() > 0
                  ? `+ RM ${totalProfit()}`
                  : `- RM ${totalProfit()}`
              }}</strong>
            </small>
          </div>
        </div>
      </div>
      <button class="primary-btn" @click="checkOutOrder()">
        Check Out Order
      </button>
    </div>
  </div>
  <div class="no-item-cart-container" v-else>
    <div class="no-items-image-container">
      <img src="../assets/empty_cart.svg" alt="empty cart" />
      <span>There are no items in the cart.</span>
    </div>
    <div>
      <button class="primary-btn">
        <router-link to="/dashboard/product">Continue Adding</router-link>
      </button>
    </div>
    <div>
      <button class="outline-btn">
        <router-link to="/dashboard/history">View Order History</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import Product from "@/apis/products.js";

export default {
  components: {
    CartItem,
  },
  data() {
    return {
      items: [],
      date: new Date(),
      soldTo: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
    formattedDate() {
      return `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
    },
  },
  methods: {
    async getItems() {
      let cart = this.$store.getters.getCartItem;
      if (cart.length != 0) {
        this.$store.commit("setIsLoading", true);
        this.items = await Product.getProductsByIds(cart);
        this.$store.commit("setIsLoading", false);
      } else {
        this.resetItems();
      }
    },
    resetItems() {
      this.items = [];
      this.soldTo = "";
    },
    totalCost() {
      let acc = 0;
      for (let i = 0; i < this.items.length; i++) {
        acc +=
          parseFloat(this.items[i].intakePrice) *
          (parseFloat(this.items[i].quantity) / 1000);
      }
      return acc.toFixed(2);
    },
    totalPrice() {
      let acc = 0;
      for (let i = 0; i < this.items.length; i++) {
        acc +=
          parseFloat(this.items[i].sellingPrice) *
          (parseFloat(this.items[i].quantity) / 1000);
      }
      return acc.toFixed(2);
    },
    totalProfit() {
      let profits = (this.totalPrice() - this.totalCost()).toFixed(2);
      return profits;
    },
    async checkOutOrder() {
      let res = await Product.checkOutOrder({
        items: this.items,
        soldTo: this.soldTo,
        date: this.formattedDate,
        totalCost: this.totalCost(),
        totalPrice: this.totalPrice(),
        totalProfit: this.totalProfit(),
      });
      if (res.valid) {
        this.$store.commit("clearCart");
        this.getItems();
        alert("order checkout successfully");
      } else {
        alert("order checkout fail");
      }
    },
  },
  created() {
    this.getItems();
  },
};
</script>

<style>
/* Cart without items */
.no-item-cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.no-items-image-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-items-image-container > img {
  width: 40%;
  height: auto;
}

/* Cart with items */
.cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-item-list {
  padding: 0rem 0.5rem;
  max-height: 75vh;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.cart-item-list::-webkit-scrollbar {
  display: none;
}

.cart-panel {
  border: 1px solid var(--accent);
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 1rem;
  background: white;
}

.cart-panel-order-info {
  display: flex;
  flex-direction: row;
}

.cart-panel-col:first-child {
  margin-right: 0.5rem;
}

.cart-panel-col {
  min-width: 48%;
  display: flex;
  flex-direction: column;
}

.cart-panel-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (min-width: 600px) {
  .no-items-image-container > img {
    width: 15%;
  }

  .cart-panel {
    left: calc(280px + 1rem);
    width: calc(100% - 280px - 1rem);
  }

  .cart-item-list {
    width: 70%;
  }
}
</style>
