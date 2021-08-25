<template>
  <div class="cart-item-container">
    <div class="cart-item-pic">
      <img :src="item.picUrl" v-if="item.picUrl != ''" />
      <img src="../../assets/no-image.svg" v-else />
    </div>
    <div class="cart-item-details-container">
      <div class="cart-item-details">
        <h3>
          {{ item.name }}
        </h3>
        <div class="cart-item-prices cost">
          <h3>Cost/{{ this.item.unit }}: {{ cost }}</h3>
        </div>
        <div class="cart-item-prices sp">
          <h3>Price/{{ this.item.unit }}: {{ price }}</h3>
        </div>
        <div class="cart-item-quantity">
          <div class="cart-item-actions">
            <v-btn x-large icon color="primary" @click="reduceQuantity">
              <v-icon>mdi-minus-box-outline</v-icon>
            </v-btn>
            <span>{{ quantity }} {{ suffix }} </span>
            <v-btn x-large icon color="primary" @click="addQuantity">
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="amount">
        <h3>Subtotal: {{ subtotal }}</h3>
        <h3 class="profit">Profit: {{ profit }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0,
    };
  },
  props: {
    item: Object,
  },
  computed: {
    cost() {
      return `RM ${parseFloat(this.item.intakePrice).toFixed(2)}`;
    },
    price() {
      return `RM ${parseFloat(this.item.sellingPrice).toFixed(2)}`;
    },
    profit() {
      let profit = (
        parseFloat((this.item.sellingPrice * this.quantity) / this.conversion) -
        parseFloat((this.item.intakePrice * this.quantity) / this.conversion)
      ).toFixed(2);
      return `RM ${profit}`;
    },
    subtotal() {
      return `RM ${parseFloat(
        (this.item.sellingPrice * this.quantity) / this.conversion
      ).toFixed(2)}`;
    },
    conversion() {
      return this.item.unit === "unit" ? 1 : 1000;
    },
    step() {
      return this.item.unit === "unit" ? 1 : 100;
    },
    suffix() {
      return this.item.unit === "unit" ? "unit" : "g";
    },
  },
  methods: {
    addQuantity() {
      this.quantity += this.step;
      this.updateCart();
    },
    reduceQuantity() {
      if (this.item.quantity == this.step) {
        this.quantity = 0;
      } else if (this.quantity >= this.step) {
        this.quantity -= this.step;
      } else {
        this.quantity = 0;
      }
      this.updateCart();
    },
    updateCart() {
      let cartItem = {
        quantity: this.quantity,
        id: this.item.id,
      };
      this.$store.commit("addToCart", cartItem);
    },
  },
  created() {
    this.quantity = this.item.quantity;
  },
};
</script>

<style>
.cart-item-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.cart-item-container {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  width: 100%;
  margin: 1rem 0rem;
  box-shadow: 0px 2px 0px 0px var(--accent);
}

.cart-item-pic > img {
  max-width: 20vw;
  object-fit: cover;
}

.cart-item-details-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0rem 0.5rem;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.cart-item-prices,
.cart-item-quantity {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.cart-item-quantity {
  width: 100%;
}

.cart-item-quantity > small > input {
  width: 50px;
}

.amount {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.amount > small {
  font-weight: bold;
}

@media only screen and (min-width: 768px) {
  .cart-item-pic > img {
    max-width: 15vw;
    object-fit: cover;
  }
}

@media only screen and (min-width: 1024px) {
  .cart-item-pic > img {
    max-width: 10vw;
    object-fit: cover;
  }
}
</style>
