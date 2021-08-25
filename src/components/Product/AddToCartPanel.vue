<template>
  <section class="add-cart-dialog">
    <div class="add-cart-dialog-body">
      <div class="add-cart-selection-container">
        <div class="add-cart-selections">
          <div>
            <v-btn x-large icon color="primary" @click="reduceQuantity">
              <v-icon>mdi-minus-box-outline</v-icon>
            </v-btn>
          </div>
          <div>{{ formatQuantityLabel }}</div>
          <div>
            <v-btn x-large icon color="primary" @click="addQuantity">
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="add-cart-selections cost">
          <h4>Cost:</h4>
          <span>RM{{ calculateCost }}</span>
        </div>
        <div class="add-cart-selections sp">
          <h4>Price:</h4>
          <span>RM{{ calculatePrice }}</span>
        </div>
        <div class="add-cart-selections profit">
          <h4>Profit:</h4>
          <span>{{ calculateProfit }}</span>
        </div>
      </div>
    </div>
    <div class="add-cart-dialog-action">
      <v-btn @click="addToCart()" color="primary">Add To Cart</v-btn>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0,
      step: 0,
    };
  },
  props: {
    productInfo: Object,
    showDialog: Boolean,
  },
  computed: {
    formatQuantityLabel() {
      let unit = this.productInfo.unit == "unit" ? "unit" : "g";
      return `${this.quantity} ${unit}`;
    },
    calculateCost() {
      let cost = 0;
      if (this.productInfo.unit == "unit") {
        cost = this.productInfo.intakePrice * this.quantity;
      } else {
        cost = this.productInfo.intakePrice * (this.quantity / 1000);
      }

      return parseFloat(cost).toFixed(2);
    },
    calculatePrice() {
      let sp = 0;
      if (this.productInfo.unit == "unit") {
        sp = this.productInfo.sellingPrice * this.quantity;
      } else {
        sp = this.productInfo.sellingPrice * (this.quantity / 1000);
      }
      return parseFloat(sp).toFixed(2);
    },
    calculateProfit() {
      let profit = parseFloat(this.calculatePrice - this.calculateCost).toFixed(
        2
      );
      if (profit > 0) {
        return `+ RM ${profit}`;
      } else {
        return `- RM ${profit}`;
      }
    },
  },
  methods: {
    addQuantity() {
      this.quantity += this.step;
    },
    reduceQuantity() {
      if (this.quantity >= this.step) {
        this.quantity -= this.step;
      }
    },
    addToCart() {
      if (this.quantity == 0) {
        this.$store.commit(
          "setSnackbar",
          "Quantity does not satisfies minimum amount."
        );
      } else {
        let item = {
          quantity: this.quantity,
          id: this.productInfo.id,
        };
        this.$store.commit("addToCart", item);
        this.$store.commit("setSnackbar", "Product is added to the cart.");
      }
    },
  },
  created() {
    this.$store.getters.getCartItem.map((cartItem) => {
      if (cartItem.id === this.productInfo.id) {
        this.quantity = cartItem.quantity;
      }
    });
    this.step = this.productInfo.unit == "unit" ? 1 : 100;
    this.quantity = this.step;
  },
};
</script>

<style>
.add-cart-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.add-cart-dialog-body {
  width: 100%;
}

.cart-product-picture {
  width: 100%;
  max-height: 35vh;
  height: auto;
}

.add-cart-dialog-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.add-cart-product-pic {
  max-width: 30%;
  margin-right: 0.5rem;
}

.add-cart-product-prices {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.cart-quantity {
  width: 35%;
}

.cart-quantity > input {
  width: 80%;
  margin-right: 0.5rem;
  text-align: center;
}

.add-cart-selection-container > * {
  margin: 1rem 0rem;
}

.add-cart-selections {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.add-cart-dialog-action {
  width: 100%;
  text-align: center;
}

.add-cart-dialog-action > button {
  width: 100%;
}
</style>
