<template>
  <div class="card-container">
    <div class="product-picture"></div>
    <div class="product-info">
      <div class="product-name">
        <h4>{{ productInfo.name }}</h4>
      </div>
      <div class="product-price">
        <div class="intake-price">
          Intake:
          <h5>{{ this.formatCurrency(productInfo.intakePrice) }}</h5>
        </div>
        <div class="selling-price">
          Selling:
          <h5>{{ this.formatCurrency(productInfo.sellingPrice) }}</h5>
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
  width: 100%;
  height: 40vh;
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
  transform: scale(1.1, 1.1);
}

.card-container:hover::after {
  opacity: 1;
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
