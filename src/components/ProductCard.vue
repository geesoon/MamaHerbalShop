<template>
  <div class="card-container">
    <div class="product-picture"></div>
    <div class="product-info">
      <div class="product-name">
        <h4>{{ productInfo.name }}</h4>
      </div>
      <div class="product-price">
        <div class="intake-price">
          {{ this.formatCurrency(productInfo.intakePrice) }}
        </div>
        <div class="selling-price">
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
      productPic: String,
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
  justify-content: center;
  align-items: center;
  background: var(--primary);
  border-radius: 2rem;
  width: 90%;
  height: 40vh;
  margin: 1rem;
  box-shadow: 5px 5px 5px 5px var(--accent);
}

.product-picture {
  height: 70%;
  width: 100%;
  background: white;
  border-radius: 2rem;
}

.product-info {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0rem 1rem;
}

.product-price {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  font-size: 1rem;
  text-align: left;
}

@media only screen and (min-width: 1024px) {
  /* For tablet: */
  .card-container {
    width: 100%;
    margin: 0;
    height: 50vh;
  }
}
</style>
