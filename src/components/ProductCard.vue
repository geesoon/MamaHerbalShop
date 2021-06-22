<template>
  <div class="card-container">
    <img
      :src="productInfo.picture"
      v-if="productInfo.picture != ''"
      class="product-picture"
    />
    <img src="../assets/no-image.svg" v-else class="product-picture" />
    <div class="product-info">
      <div class="product-name">
        <h4>{{ productInfo.name }}</h4>
      </div>
      <div class="product-price">
        <div class="intake-price">
          Buy:
          {{ this.formatCurrency(productInfo.intakePrice) }}
        </div>
        <div class="selling-price">
          Sell:
          {{ this.formatCurrency(productInfo.sellingPrice) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productInfo: {
      name: String,
      intakePrice: String,
      sellingPrice: String,
      picture: String,
    },
  },
  methods: {
    formatCurrency(amount) {
      return `RM${parseFloat(amount).toFixed(2)}/kg`;
    },
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: var(--primary);
  border-radius: 1rem;
  margin: 1rem 0rem;
  width: 100%;
}

.product-picture {
  height: auto;
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
}

.product-info {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
}

.product-price {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
}

.product-name {
  color: white;
  text-align: center;
  flex: 1;
}

.intake-price,
.selling-price {
  color: white;
  text-align: left;
  font-size: 0.8rem;
}

@media only screen and (min-width: 1024px) {
  /* For tablet: */
  .card-container {
    width: 100%;
  }
}
</style>
