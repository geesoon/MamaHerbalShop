<template>
  <section class="add-cart-dialog">
    <div class="add-cart-dialog-body">
      <div class="add-cart-selection-container">
        <v-slider
          v-model="quantity"
          step="100"
          min="0"
          max="10000"
          ticks
          label="Quantity(g)"
          thumb-label="always"
        ></v-slider>
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
    toggleAddToCartDialog() {
      this.$emit("toggleDialog");
    },
    addToCart() {
      let item = [
        {
          quantity: this.quantity,
          id: this.productInfo.id,
        },
      ];
      this.$store.commit("addToCart", item);
      this.$store.commit(
        "setSnackBar",
        `Added ${this.productInfo.name} to cart.`
      );
      this.toggleAddToCartDialog();
    },
  },
};
</script>

<style>
.add-cart-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
}

.add-cart-dialog-body {
  width: 100%;
  margin-top: 1rem;
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
