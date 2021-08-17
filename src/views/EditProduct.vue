<template>
  <div class="edit-product-container">
    <section v-if="!isLoading">
      <img
        v-if="productInfo.picUrl != ''"
        class="edit-product-picture"
        :src="productInfo.picUrl"
        :alt="productInfo.name"
      />
      <img v-else src="../assets/no-image.svg" class="edit-product-picture" />
      <section class="edit-product-info">
        <div class="edit-product-info-row">
          <h6>Product Name</h6>
          <div class="edit-product-name">
            <input
              type="text"
              :placeholder="productInfo.name"
              v-model="productInfo.name"
              class="edit-product-name-field"
            />
          </div>
        </div>

        <div class="edit-product-info-row">
          <h6>Intake Price</h6>
          <div class="edit-product-price">
            <div>RM</div>
            <input
              type="number"
              :placeholder="formatPrice(productInfo.intakePrice)"
              v-model="productInfo.intakePrice"
              class="edit-product-price-field"
            />
            <small>/kg</small>
          </div>
        </div>

        <div class="edit-product-info-row">
          <h6>Selling Price</h6>
          <div class="edit-product-price">
            <div>RM</div>
            <input
              type="number"
              :placeholder="formatPrice(productInfo.sellingPrice)"
              v-model="productInfo.sellingPrice"
              class="edit-product-price-field"
            />
            <small>/kg</small>
          </div>
        </div>

        <div class="edit-product-info-row">
          <h6>Profit:</h6>
          <div class="profit">
            {{ calculateProfit }}
          </div>
        </div>
      </section>
      <button class="primary-btn" @click="updateProduct()">Save</button>
      <button class="danger-btn" @click="closeDialog()">Discard</button>
      <button class="remove-product-btn" @click="showConfirmationPrompt = true">
        <span class="material-icons"> delete </span>
      </button>
      <div class="confirmation-mask" v-if="showConfirmationPrompt"></div>
      <div class="confirmation-prompt" v-if="showConfirmationPrompt">
        <h6>Confirm remove "{{ productInfo.name }}"?</h6>
        <div class="confirmation-btn-bar">
          <button class="primary-btn" @click="confirmRemoveProduct()">
            Confirm
          </button>
          <button class="danger-btn" @click="showConfirmationPrompt = false">
            Cancel
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Product from "@/apis/products.js";

export default {
  data: () => {
    return {
      showConfirmationPrompt: false,
      productInfo: "",
    };
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
    closeDialog() {
      this.$router.go(-1);
    },
    formatPrice(amount) {
      return `RM ${parseFloat(amount).toFixed(2)}`;
    },
    async updateProduct() {
      this.$store.commit("setIsLoading", true);
      let res = await Product.updateProduct(this.productInfo);
      if (res.valid) {
        this.$store.commit("setIsLoading", false);
        this.$store.commit("setSnackBar", "Product updated successfully.");
        this.$router.replace({ name: "catalogue" });
      } else {
        this.$store.commit("setIsLoading", false);
        this.$store.commit("setSnackBar", res.res);
      }
    },
    async confirmRemoveProduct() {
      this.$store.commit("setIsLoading", true);
      await Product.removeProductById(this.productInfo.id);
      console.log("Successfully deleted the product");
      this.$store.commit("setIsLoading", false);
      this.showConfirmationPrompt = false;
      this.$router.replace({ name: "catalogue" });
    },
    async getProductInfo(id) {
      this.$store.commit("setIsLoading", true);
      let res = await Product.getProductById(id);
      if (res.valid) {
        this.productInfo = res.res;
      } else {
        this.$store.commit("setSnackBar", res.res);
      }
      this.$store.commit("setIsLoading", false);
    },
  },
  created() {
    this.getProductInfo(this.$route.query.id);
  },
};
</script>

<style>
.background-mask {
  bottom: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.8;
  position: fixed;
}

.confirmation-mask {
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.8;
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
}

.confirmation-prompt {
  position: fixed;
  top: 25%;
  background: white;
  border: 2px solid var(--primary);
  z-index: 1001;
  padding: 1rem;
}

.confirmation-btn-bar {
  margin: 1rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.confirm-remove-btn {
  background: var(--danger);
}

.cancel-remove-btn {
  background: var(--primary);
}

.confirm-remove-btn,
.cancel-remove-btn {
  color: white;
  border-radius: 1rem;
  width: 50%;
  padding: 1rem;
  margin: 1rem 0rem;
}

.edit-product-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
}

.edit-product-container > section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.edit-product-picture {
  max-width: 80%;
  height: auto;
  margin: 1rem;
}

.edit-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.edit-product-info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0.3rem 0rem;
}

.edit-product-info-row > h7 {
  width: 50%;
}

.edit-product-name,
.profit,
.edit-product-price {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.edit-product-price-field,
.edit-product-name-field {
  border: 1px solid var(--primary);
  padding: 0.5rem;
  color: var(--primary);
  font-weight: bold;
  width: 90%;
}

.edit-product-price-field::placeholder,
.edit-product-price-field::-moz-placeholder,
.edit-product-price-field::-ms-placeholder,
.edit-product-name-field::placeholder,
.edit-product-name-field::-moz-placeholder,
.edit-product-name-field::-ms-placeholder {
  color: var(--primary);
  font-weight: bold;
}

.edit-save-btn,
.edit-discard-btn {
  color: white;
  margin: 0.5rem 0rem;
  padding: 0.5rem;
  width: 100%;
}

.remove-product-btn {
  border-radius: 100%;
  background: var(--accent);
  padding: 1rem;
}

.edit-save-btn,
.add-save-btn {
  background: var(--primary);
}

.edit-discard-btn,
.add-discard-btn {
  background: var(--danger);
}

.remove-product-btn {
  margin: 1rem 0rem;
}

@media only screen and (min-width: 600px) {
  .edit-product-container > section {
    max-width: 60%;
  }
}
</style>
