<template>
  <div class="cart-container" v-if="!isLoading && this.items.length != 0">
    <div class="cart-item-list">
      <CartItem v-for="(item, key) in items" :item="item" :key="key" />
    </div>

    <div class="cart-panel">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-dialog v-model="showCartSoldToDialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small color="secondary" v-bind="attrs" v-on="on"
                  >Sold to:
                </v-btn>
              </template>
              <CartSoldToDialog
                @closeDialog="toggleCartSoldToDialog"
                :soldTo="soldTo"
              />
            </v-dialog>
            <div>
              {{ soldTo }}
            </div>
          </v-col>
          <v-col>
            <small>Total Cost:</small>
            <small
              ><strong>RM{{ totalCost() }}</strong></small
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-dialog v-model="showCartSoldDateDialog" width="400">
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small color="secondary" v-bind="attrs" v-on="on">
                  <small>Date: </small>
                  <small>
                    {{ formattedDate }}
                  </small></v-btn
                >
              </template>
              <CartSoldDateDialog
                @closeDialog="toggleCartSoldDateDialog"
                :soldDate="soldDate"
              />
            </v-dialog>
          </v-col>
          <v-col>
            <small>Order Total:</small>
            <small>RM{{ totalPrice() }}</small>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <small
              >Profits:
              <small>
                <strong>{{
                  totalProfit() > 0
                    ? `+ RM ${totalProfit()}`
                    : `- RM ${totalProfit()}`
                }}</strong>
              </small></small
            >
          </v-col>
        </v-row>
        <v-row class="cart-actions">
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
    <section class="cart-actions">
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
import CartSoldToDialog from "@/components/CartSoldToDialog.vue";
import CartSoldDateDialog from "@/components/CartSoldDateDialog.vue";
import CartItem from "@/components/CartItem.vue";
import Product from "@/apis/products.js";

export default {
  components: {
    CartItem,
    CartSoldToDialog,
    CartSoldDateDialog,
  },
  data() {
    return {
      items: [],
      soldDate: "",
      soldTo: "",
      showCartSoldToDialog: false,
      showCartSoldDateDialog: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
    formattedDate() {
      return this.soldDate;
      // return `${this.soldDate.getDate()}/${this.soldDate.getMonth()}/${this.soldDate.getFullYear()}`;
    },
  },
  methods: {
    toggleCartSoldToDialog(value) {
      console.log(value);
      this.showCartSoldToDialog = false;
      this.soldTo = value;
    },
    toggleCartSoldDateDialog(value) {
      this.showCartSoldDateDialog = false;
      this.soldDate = value;
    },
    async getItems() {
      let cart = this.$store.getters.getCartItem;
      if (cart.length != 0) {
        this.$store.commit("setIsLoading", true);
        let res = await Product.getProductsByIds(cart);
        if (res.valid) {
          this.items = res.res;
          this.$store.commit("setIsLoading", false);
        } else {
          this.$store.commit("setIsLoading", false);
          this.$store.commit("setSnackBar", res.res);
        }
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
        this.$store.commit("setSnackBar", "Order checkout successfully");
      } else {
        this.$store.commit("setSnackBar", "Order checkout failed");
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
    this.getItems();
    this.initiateDate();
  },
};
</script>

<style>
.cart-actions > button {
  width: 80%;
  margin: 1rem 0rem;
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

@media only screen and (min-width: 600px) {
  .no-items-image-container > img {
    width: 15%;
  }
  .cart-item-list {
    min-width: 80%;
    max-width: 80%;
  }

  .cart-panel {
    left: 10%;
    width: 80%;
  }
}

@media only screen and (min-width: 1024px) {
  .cart-item-list {
    min-width: 50%;
    max-width: 50%;
  }

  .cart-panel {
    left: 25%;
    width: 50%;
  }
}
</style>
