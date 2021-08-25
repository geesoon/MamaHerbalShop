<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <div class="card-container">
      <div class="product-picture-container" @click="showViewProduct()">
        <img
          :src="productInfo.picUrl"
          v-if="productInfo.picUrl != ''"
          class="product-picture"
        />
        <img src="../../assets/no-image.svg" v-else class="product-picture" />
      </div>
      <div class="product-info">
        <div class="product-name">
          {{ productInfo.name }}
        </div>
        <div class="product-price">
          <div class="selling-price">
            S.P.
            {{ this.formatCurrency(productInfo.sellingPrice) }}
          </div>
          <div class="intake-price">
            Cost
            {{ this.formatCurrency(productInfo.intakePrice) }}
          </div>
        </div>
      </div>
      <div class="catalogue-add-cart">
        <v-btn
          elevation="0"
          color="primary"
          @click="addToCart()"
          v-if="!showQuantity"
        >
          <v-icon>mdi-plus</v-icon>
          Add
        </v-btn>
        <div v-else class="catalogue-add-cart-actions">
          <v-btn x-large icon color="primary" @click="reduceQuantity">
            <v-icon>mdi-minus-box-outline</v-icon>
          </v-btn>
          <span>{{ formatQuantityLabel }} </span>
          <v-btn x-large icon color="primary" @click="addQuantity">
            <v-icon>mdi-plus-box</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-lazy>
</template>

<script>
export default {
  data() {
    return {
      showQuantity: false,
      isActive: false,
      quantity: 0,
      step: 0,
    };
  },
  props: {
    productInfo: {
      id: String,
      name: String,
      unit: String,
      intakePrice: String,
      sellingPrice: String,
      picUrl: String,
    },
  },
  computed: {
    formatQuantityLabel() {
      let unit = this.productInfo.unit == "unit" ? "unit" : "g";
      return `${this.quantity} ${unit}`;
    },
  },
  methods: {
    formatCurrency(amount) {
      return `RM${parseFloat(amount).toFixed(2)}`;
    },
    addToCart() {
      this.showQuantity = true;
      this.addQuantity();
    },
    addQuantity() {
      this.quantity += this.step;
      this.updateCart();
    },
    reduceQuantity() {
      if (this.quantity == this.step) {
        this.quantity = 0;
        this.showQuantity = false;
      } else if (this.quantity >= this.step) {
        this.quantity -= this.step;
      } else {
        this.showQuantity = false;
        this.quantity = 0;
      }
      this.updateCart();
    },
    updateCart() {
      let item = {
        quantity: this.quantity,
        id: this.productInfo.id,
      };
      this.$store.commit("addToCart", item);
    },
    showViewProduct() {
      this.$router.push({
        name: "view_product",
        query: { id: this.productInfo.id },
      });
    },
  },
  created() {
    this.$store.getters.getCartItem.map((cartItem) => {
      if (cartItem.id === this.productInfo.id) {
        this.showQuantity = true;
        this.quantity = cartItem.quantity;
      }
    });
    this.step = this.productInfo.unit == "unit" ? 1 : 100;
  },
};
</script>

<style>
.catalogue-add-cart-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.catalogue-add-cart {
  min-width: 100%;
  max-width: 100%;
  min-height: 15%;
  max-height: 15%;
}

.catalogue-add-cart > button {
  width: 100%;
}

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 35vh;
}

.product-picture-container {
  width: 100%;
  min-height: 50%;
  max-height: 50%;
}

.product-picture {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.5rem;
  min-width: 100%;
  max-height: 35%;
  min-height: 35%;
}

.product-price {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.product-name {
  text-align: start;
  flex: 1;
  font-size: 1.2rem;
  font-weight: bold;
}

.intake-price {
  text-align: left;
  color: gray;
  font-size: 0.7rem;
}

.selling-price {
  font-size: 1rem;
  font-weight: bold;
  font-size: 0.8rem;
}

@media only screen and (min-width: 1024px) {
  /* For tablet: */
  .card-container {
    width: 100%;
  }
}
</style>
