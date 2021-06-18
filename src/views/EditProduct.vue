<template>
  <div class="edit-product-container">
    <!-- <Header /> -->
    <img
      v-if="productInfo.picture != ''"
      class="edit-product-picture"
      :src="productInfo.picture"
      :alt="productInfo.name"
    />
    <img v-else src="../assets/no-image.svg" class="edit-product-picture" />
    <section class="edit-product-info">
      <label for="edit-product-name-field">Product Name</label>
      <input
        type="text"
        :placeholder="productInfo.name"
        v-model="input.name"
        class="edit-product-name-field"
      />
      <label for="edit-product-intake-price">Intake Price</label>
      <div class="edit-product-price">
        <input
          type="number"
          :placeholder="formatPrice(productInfo.intakePrice)"
          v-model="input.intakePrice"
          class="edit-product-price-field"
          id="edit-product-intake-price"
        />
        <h6 class="kg">/kg</h6>
      </div>
      <label for="edit-product-selling-price">Selling Price</label>
      <div class="edit-product-price">
        <input
          type="number"
          :placeholder="formatPrice(productInfo.sellingPrice)"
          v-model="input.sellingPrice"
          class="edit-product-price-field"
          id="edit-product-selling-price"
        />
        <h6 class="kg">/kg</h6>
      </div>
      <div class="profit">
        <h5>Profit: {{ calculateProfit }}</h5>
      </div>
    </section>
    <button class="edit-save-btn" @click="updateProduct()">
      <h5>Save</h5>
    </button>
    <button class="edit-discard-btn" @click="closeDialog()">
      <h5>Discard</h5>
    </button>
    <button class="remove-product-btn" @click="showConfirmationPrompt = true">
      <span class="material-icons"> delete </span>
    </button>

    <div class="confirmation-mask" v-if="showConfirmationPrompt"></div>
    <div class="confirmation-prompt" v-if="showConfirmationPrompt">
      <h4>Confirm Remove This Product?</h4>
      <div class="confirmation-btn-bar">
        <button class="confirm-remove-btn" @click="confirmRemoveProduct()">
          <h5>Confirm</h5>
        </button>
        <button
          class="cancel-remove-btn"
          @click="showConfirmationPrompt = false"
        >
          <h5>Cancel</h5>
        </button>
      </div>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="base-wave"
    >
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
    <Loader v-if="isLoading" />
  </div>
</template>

<script>
import Loader from "@/components/Loading.vue";
import Product from "@/apis/products.js";

export default {
  data: () => {
    return {
      isLoading: true,
      input: {
        name: "",
        intakePrice: "",
        sellingPrice: "",
      },
      showConfirmationPrompt: false,
      productInfo: "",
    };
  },
  components: {
    Loader,
  },
  computed: {
    calculateProfit() {
      return `RM${(
        parseFloat(this.sellingPrice) - parseFloat(this.intakePrice)
      ).toFixed(2)}`;
    },
  },
  methods: {
    closeDialog() {
      this.$router.go(-1);
    },
    formatPrice(amount) {
      return `RM ${parseFloat(amount).toFixed(2)}`;
    },
    async updateProduct() {
      this.isLoading = true;
      await Product.updateProduct(this.input);
      console.log("Successfully updated the product");
      this.isLoading = false;
      this.$router.replace({ name: "catalogue" });
    },
    async confirmRemoveProduct() {
      this.isLoading = true;
      await Product.removeProductById(this.productInfo.id);
      console.log("Successfully deleted the product");
      this.isLoading = false;
      this.showConfirmationPrompt = false;
      this.$router.replace({ name: "catalogue" });
    },
    async getProductInfo(id) {
      this.productInfo = await Product.getProductById(id);
      this.isLoading = false;
    },
  },
  created() {
    this.getProductInfo(this.$route.query.id);
  },
};
</script>

<style></style>
