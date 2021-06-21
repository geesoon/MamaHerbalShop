<template>
  <div class="view-product-container">
    <section v-if="!isLoading">
      <section class="view-product-info">
        <img
          v-if="productInfo.picture != ''"
          class="view-product-picture"
          :src="productInfo.picture"
          :alt="productInfo.name"
        />
        <img v-else src="../assets/no-image.svg" class="view-product-picture" />
        <div class="view-product-info-row">
          <div>Product Name:</div>
          {{ productInfo.name }}
        </div>
        <div class="view-product-info-row">
          <div>Intake Price:</div>
          {{ formatPrice(productInfo.intakePrice) }}
        </div>
        <div class="view-product-info-row">
          <div>Selling Price:</div>
          {{ formatPrice(productInfo.sellingPrice) }}
        </div>
        <div class="view-product-info-row">
          <div>Profit:</div>
          {{ calculateProfit }}
        </div>
        <button @click="showEditProduct()" class="secondary-btn">Edit</button>
      </section>

      <button @click="toggleAddToCartDialog()" class="primary-btn">
        Add To Cart
      </button>
      <AddToCartDialog
        @toggleDialog="toggleAddToCartDialog()"
        :productInfo="productInfo"
        v-if="isAddToCartDialog"
      />
    </section>
  </div>
</template>

<script>
import Product from "@/apis/products.js";
import AddToCartDialog from "@/components/AddToCartDialog.vue";

export default {
  data: () => {
    return {
      input: {
        name: "",
        intakePrice: "",
        sellingPrice: "",
      },
      showConfirmationPrompt: false,
      productInfo: "",
      isAddToCartDialog: false,
    };
  },
  components: {
    AddToCartDialog,
  },
  computed: {
    calculateProfit() {
      return `RM${(
        parseFloat(this.productInfo.sellingPrice) -
        parseFloat(this.productInfo.intakePrice)
      ).toFixed(2)}`;
    },
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
  },
  methods: {
    formatPrice(amount) {
      return `RM ${parseFloat(amount).toFixed(2)} /kg`;
    },
    showEditProduct() {
      this.$router.push({
        name: "editProduct",
        query: { id: this.productInfo.id },
      });
    },
    toggleAddToCartDialog() {
      this.isAddToCartDialog = !this.isAddToCartDialog;
    },
    async getProductInfo(id) {
      this.$store.commit("setIsLoading", true);
      this.productInfo = await Product.getProductById(id);
      this.$store.commit("setIsLoading", false);
    },
  },
  created() {
    this.getProductInfo(this.$route.query.id);
  },
};
</script>

<style>
.view-product-info-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.view-product-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
}

.view-product-container > section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.view-product-picture {
  max-width: 80%;
  height: auto;
  margin: 1rem;
}

.view-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 1rem;
  background: white;
}

@media only screen and (min-width: 600px) {
  .view-product-container > section {
    max-width: 60%;
  }
}
</style>
