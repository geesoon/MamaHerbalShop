<template>
  <div class="cart-item-container">
    <div class="cart-item-pic">
      <img :src="item.picture" v-if="item.picture != ''" />
      <img src="../assets/no-image.svg" v-else />
    </div>
    <div class="cart-item-details-container">
      <div class="cart-item-details">
        <small>
          <strong>
            {{ item.name }}
          </strong>
        </small>
        <div class="cart-item-prices">
          <small>Cost: {{ cost }}</small>
          <small>Price: {{ price }}</small>
        </div>
        <div class="cart-item-quantity">
          <small>Quantity</small>
          <small>
            <input
              type="number"
              :placeholder="item.quantity"
              v-model="item.quantity"
            />g
          </small>
        </div>
      </div>

      <div class="amount">
        <small>Subtotal: {{ subtotal }}</small>
        <small>Profit: {{ profit }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        parseFloat((this.item.sellingPrice * this.item.quantity) / 1000) -
        parseFloat((this.item.intakePrice * this.item.quantity) / 1000)
      ).toFixed(2);
      return `RM ${profit}`;
    },
    subtotal() {
      return `RM ${parseFloat(
        (this.item.sellingPrice * this.item.quantity) / 1000
      ).toFixed(2)}`;
    },
  },
};
</script>

<style>
.cart-item-container {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  width: 100%;
  margin: 1rem 0rem;
}

.cart-item-pic {
  max-width: 30%;
}

.cart-item-pic > img {
  width: 100%;
  height: auto;
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
  justify-content: space-between;
  align-items: center;
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
</style>
