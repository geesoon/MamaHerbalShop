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
      <div class="product-picture-container">
        <img
          :src="productInfo.picUrl"
          v-if="productInfo.picUrl != ''"
          class="product-picture"
        />
        <img src="../assets/no-image.svg" v-else class="product-picture" />
      </div>
      <div class="product-info">
        <div class="product-name">
          <h4>{{ productInfo.name }}</h4>
        </div>
        <div class="product-price">
          <div class="intake-price">
            Cost
            {{ this.formatCurrency(productInfo.intakePrice) }}
          </div>
          <div class="selling-price">
            S.P.
            {{ this.formatCurrency(productInfo.sellingPrice) }}
          </div>
        </div>
      </div>
    </div>
  </v-lazy>
</template>

<script>
export default {
  props: {
    productInfo: {
      name: String,
      intakePrice: String,
      sellingPrice: String,
      picUrl: String,
    },
  },
  methods: {
    formatCurrency(amount) {
      return `RM${parseFloat(amount).toFixed(2)}`;
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: var(--accent);
  border-radius: 0.5rem;
  width: 100%;
  height: 30vh;
}

.product-picture-container {
  width: 100%;
  min-height: 60%;
  max-height: 60%;
}

.product-picture {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.5rem;
  min-width: 100%;
  max-height: 40%;
  min-height: 40%;
}

.product-price {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.product-name {
  text-align: center;
  flex: 1;
  font-size: 0.8rem;
}

.intake-price,
.selling-price {
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
