<template>
  <section>
    <div class="add-cart-dialog-mask" @click="toggleAddToCartDialog()"></div>
    <section class="add-cart-dialog">
      <div class="add-cart-dialog-header">
        <div class="add-cart-product-pic">
          <img
            v-if="productInfo.picture != ''"
            class="cart-product-picture"
            :src="productInfo.picture"
            :alt="productInfo.name"
          />
          <img
            v-else
            src="../assets/no-image.svg"
            class="cart-product-picture"
          />
        </div>
        <div class="add-cart-product-prices">
          <small
            >Intake Price: RM{{
              parseFloat(this.productInfo.intakePrice).toFixed(2)
            }}</small
          >
          <small
            >Selling Price: RM{{
              parseFloat(this.productInfo.sellingPrice).toFixed(2)
            }}</small
          >
        </div>
        <span
          class="material-icons add-cart-close"
          @click="toggleAddToCartDialog()"
        >
          close
        </span>
      </div>
      <div class="add-cart-dialog-body">
        <div class="add-cart-selection-container">
          <div class="add-cart-selections">
            <small>Quantity:</small>
            <div class="cart-quantity">
              <input type="number" placeholder="1000" v-model="quantity" />
              <span>g</span>
            </div>
          </div>
          <div class="add-cart-selections">
            <small>Cost:</small>
            <span>RM{{ calculateCost }}</span>
          </div>
          <div class="add-cart-selections">
            <small>Price:</small>
            <span>RM{{ calculatePrice }}</span>
          </div>
          <div class="add-cart-selections">
            <small>Profit:</small>
            <span>{{ calculateProfit }}</span>
          </div>
        </div>
      </div>
      <div class="add-cart-dialog-action">
        <button @click="addToCart()" class="primary-btn">Add To Cart</button>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1000,
    };
  },
  props: {
    productInfo: Object,
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
      console.log(profit);
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
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: whitesmoke;
  z-index: 3;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.add-cart-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: white;
  opacity: 0.8;
  z-index: 2;
}

.cart-product-picture {
  width: 100%;
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

@media only screen and (min-width: 600px) {
  .add-cart-dialog > div {
    width: 60%;
  }
}
</style>
