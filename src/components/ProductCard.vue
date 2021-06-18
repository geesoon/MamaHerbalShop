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
          Intake:
          {{ this.formatCurrency(productInfo.intakePrice) }}
        </div>
        <div class="selling-price">
          Selling:
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
  justify-content: center;
  align-items: center;
  background: var(--primary);
  border-radius: 2rem;
  margin: 1rem;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* https://tobiasahlin.com/demo/animate-box-shadow/ */
.card-container::after {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--primary);
  border-radius: 2rem;
  width: 100%;
  height: 20vh;
  margin: 1rem;
  opacity: 0;
  position: absolute;
  z-index: -1;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.card-container:hover {
  transform: scale(1.05, 1.05);
}

.card-container:hover::after {
  opacity: 1;
}

.product-picture {
  height: 50%;
  width: auto;
  background: white;
  border-radius: 2rem;
  object-fit: cover;
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
}

@media only screen and (min-width: 1024px) {
  /* For tablet: */
  .card-container {
    width: 100%;
    margin: 0;
    height: 40vh;
  }
}
</style>
