<template>
  <section class="add-cart-dialog">
    <div class="add-cart-dialog-body">
      <div class="add-cart-selection-container">
        <div class="add-cart-selections">
          <div>
            <v-btn icon color="primary" @click="reduceQuantity">
              <v-icon>mdi-minus-box</v-icon>
            </v-btn>
          </div>
          <div>{{ quantity }}g</div>
          <div>
            <v-btn icon color="primary" @click="addQuantity">
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="add-cart-selections">
          <h4>Cost:</h4>
          <span>RM{{ calculateCost }}</span>
        </div>
        <div class="add-cart-selections">
          <h4>Price:</h4>
          <span>RM{{ calculatePrice }}</span>
        </div>
        <div class="add-cart-selections">
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
      quantity: 100,
    };
  },
  props: {
    productInfo: Object,
    showDialog: Boolean,
  },
  computed: {
    calculateCost() {
      return parseFloat(
        this.productInfo.intakePrice * (this.quantity / 1000)
      ).toFixed(2);
    },
    calculatePrice() {
      return parseFloat(
        this.productInfo.sellingPrice * (this.quantity / 1000)
      ).toFixed(2);
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
      this.quantity += 100;
      this.addToCart();
    },
    reduceQuantity() {
      if (this.quantity >= 100) {
        this.quantity -= 100;
        this.addToCart();
      }
    },
    addToCart() {
      let item = {
        quantity: this.quantity,
        id: this.productInfo.id,
      };
      this.$store.commit("addToCart", item);
    },
  },
  created() {
    this.$store.getters.getCartItem.map((cartItem) => {
      if (cartItem.id === this.productInfo.id) {
        this.quantity = cartItem.quantity;
      }
    });
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

@media screen and (min-width: 1024px) {
  .add-cart-dialog-action,
  .add-cart-dialog-body {
    width: 60%;
  }
}
</style>
