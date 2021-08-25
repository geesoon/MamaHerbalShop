<template>
  <v-progress-circular
    indeterminate
    color="primary"
    class="cart-container"
    v-if="isLoading"
  />
  <div class="cart-container" v-else-if="!isLoading && this.cartLength != 0">
    <div class="remove-all-btn">
      <v-btn text color="secondary" @click="emptyCart">Remove All</v-btn>
    </div>
    <div class="cart-item-list">
      <CartItem v-for="(cartItem, key) in cart" :item="cartItem" :key="key" />
    </div>
    <div class="cart-panel">
      <v-container fluid>
        <v-row>
          <v-col class="cart-order-description">
            <div>
              <v-dialog v-model="showCartSoldToDialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="secondary" v-bind="attrs" v-on="on"
                    >{{ soldTo == "" || soldTo == null ? "Sold to:" : soldTo }}
                  </v-btn>
                </template>
                <CartSoldToDialog
                  @closeDialog="toggleCartSoldToDialog"
                  :soldTo="soldTo"
                />
              </v-dialog>
            </div>
            <div>
              <v-dialog v-model="showCartSoldDateDialog" width="400">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="secondary" v-bind="attrs" v-on="on">
                    <h4>Date:</h4>
                    <h4>
                      {{ soldDate }}
                    </h4></v-btn
                  >
                </template>
                <CartSoldDateDialog
                  @closeDialog="toggleCartSoldDateDialog"
                  :soldDate="soldDate"
                />
              </v-dialog>
            </div>
          </v-col>
          <v-col class="cart-order-prices">
            <h4 class="cost">Total Cost:RM{{ totalCost }}</h4>
            <h4 class="sp">Order Total:RM{{ totalPrice }}</h4>
            <h4 class="profit">
              Profits:
              {{
                totalProfit > 0 ? `+ RM ${totalProfit}` : `- RM ${totalProfit}`
              }}
            </h4>
          </v-col>
        </v-row>
        <v-row class="cart-actions" dense>
          <v-btn color="primary" @click="checkOutOrder()">Check Out</v-btn>
        </v-row>
      </v-container>
    </div>
  </div>
  <div class="no-item-cart-container" v-else>
    <div class="no-items-image-container">
      <img src="../assets/empty_cart.svg" alt="empty cart" />
      <br />
      <span>Nothing in the cart.</span>
    </div>
    <section class="no-item-cart-actions">
      <v-btn outlined>
        <router-link to="/product">Continue Adding</router-link>
      </v-btn>

      <v-btn outlined>
        <router-link to="/history">View Order History</router-link>
      </v-btn>
    </section>
  </div>
</template>

<script>
import CartSoldToDialog from "@/components/Cart/CartSoldToDialog.vue";
import CartSoldDateDialog from "@/components/Cart/CartSoldDateDialog.vue";
import CartItem from "@/components/Cart/CartItem.vue";
import Product from "@/apis/products.js";

export default {
  components: {
    CartItem,
    CartSoldToDialog,
    CartSoldDateDialog,
  },
  data() {
    return {
      soldDate: "",
      soldTo: "",
      showCartSoldToDialog: false,
      showCartSoldDateDialog: false,
      isLoading: false,
    };
  },
  computed: {
    cart() {
      return this.$store.getters.getCartItem;
    },
    cartLength() {
      return this.$store.getters.getCartStatus;
    },
    totalCost() {
      let acc = 0;
      for (let i = 0; i < this.cartLength; i++) {
        let conversion = this.cart[i].unit == "unit" ? 1 : 1000;
        acc +=
          parseFloat(this.cart[i].intakePrice) *
          (parseFloat(this.cart[i].quantity) / conversion);
      }
      return acc.toFixed(2);
    },
    totalPrice() {
      let acc = 0;
      for (let i = 0; i < this.cartLength; i++) {
        let conversion = this.cart[i].unit == "unit" ? 1 : 1000;
        acc +=
          parseFloat(this.cart[i].sellingPrice) *
          (parseFloat(this.cart[i].quantity) / conversion);
      }
      return acc.toFixed(2);
    },
    totalProfit() {
      let profits = (this.totalPrice - this.totalCost).toFixed(2);
      return profits;
    },
  },
  methods: {
    emptyCart() {
      this.$store.commit("clearCart");
      this.resetItems();
    },
    toggleCartSoldToDialog(value) {
      this.showCartSoldToDialog = false;
      this.soldTo = value;
    },
    toggleCartSoldDateDialog(value) {
      this.showCartSoldDateDialog = false;
      this.soldDate = value;
    },
    async updateCartItemInfo() {
      if (this.cartLength != 0) {
        let items = [];
        // Get the latest cart items info
        Product.getProductsByIds(this.cart).then((res) => {
          if (res.valid) {
            items = res.res;
          } else {
            this.$store.commit("setSnackbar", res.res);
          }
          // Clear all item in cart store
          this.$store.commit("clearCart");

          // Insert to cart store all cart item with latest info
          items.forEach((cartItem) => {
            this.$store.commit("addToCart", cartItem);
          });
        });
      } else {
        this.resetItems();
      }
    },
    resetItems() {
      this.soldTo = "";
      this.soldDate = "";
    },
    validateOrder() {
      if (
        this.soldTo != "" &&
        this.soldTo != null &&
        (this.soldDate != "") & (this.cartLength != 0)
      ) {
        return true;
      } else {
        return false;
      }
    },
    async checkOutOrder() {
      if (this.validateOrder()) {
        let res = await Product.checkOutOrder({
          items: this.cart,
          soldTo: this.soldTo,
          date: this.soldDate,
          totalCost: this.totalCost,
          totalPrice: this.totalPrice,
          totalProfit: this.totalProfit,
        });
        if (res.valid) {
          this.$store.commit("clearCart");
          this.updateCartItemInfo();
          this.$store.commit("setSnackbar", "Order checkout successfully");
        } else {
          this.$store.commit("setSnackbar", "Order checkout failed");
        }
      } else {
        this.$store.commit("setSnackbar", "Please complete the order details.");
      }
    },
    initiateDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      this.soldDate = today;
    },
  },
  created() {
    this.isLoading = true;
    this.updateCartItemInfo();
    this.initiateDate();
    this.isLoading = false;
  },
};
</script>

<style>
.cart-order-description > *,
.cart-order-prices > * {
  margin: 0.5rem 0rem;
}

.remove-all-btn {
  width: 100%;
  text-align: end;
  margin: 0.5rem 0rem;
}

.no-item-cart-actions > button {
  width: 80%;
  margin: 1rem 0rem;
}

.cart-actions > button {
  width: 100%;
  margin: 0.5rem 0rem;
}

.cart-actions {
  margin: 1rem 0rem;
}

/* Cart without items */
.no-item-cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
}

.cart-item-list {
  min-width: 100%;
  max-width: 100%;
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
  background: white;
}

@media only screen and (min-width: 1024px) {
  .cart-item-list {
    min-width: 70%;
    max-width: 70%;
  }

  .cart-panel {
    left: 15%;
    width: 70%;
  }
}
</style>
