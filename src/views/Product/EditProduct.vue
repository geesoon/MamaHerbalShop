<template>
  <div class="edit-product-container" v-if="!isLoading">
    <img
      v-if="productInfo.picUrl != ''"
      class="edit-product-picture"
      :src="productInfo.picUrl"
      :alt="productInfo.name"
    />
    <img v-else src="../../assets/no-image.svg" class="edit-product-picture" />
    <div class="edit-product-info">
      <v-text-field
        type="text"
        label="Name"
        :placeholder="productInfo.name"
        v-model="productInfo.name"
        class="edit-product-name-field"
        :rules="[rules.required]"
      />
      <v-select
        :items="units"
        label="Unit"
        v-model="productInfo.unit"
        class="add-product-unit-field"
        :rules="[rules.required]"
      ></v-select>
      <v-text-field
        type="number"
        label="Cost"
        prefix="RM"
        :placeholder="formatPrice(productInfo.intakePrice)"
        v-model="productInfo.intakePrice"
        class="edit-product-price-field"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Selling Price"
        prefix="RM"
        type="number"
        :placeholder="formatPrice(productInfo.sellingPrice)"
        v-model="productInfo.sellingPrice"
        class="edit-product-price-field"
        :rules="[rules.required]"
      />
      <div class="profit">
        <h6>Profit:</h6>
        {{ calculateProfit }}
      </div>
    </div>
    <div class="edit-product-actions">
      <v-btn color="primary" @click="updateProduct()">Save</v-btn>
      <v-btn color="secondary" @click="closeDialog()">Discard</v-btn>
    </div>
  </div>
  <div v-else class="edit-product-container">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import Product from "@/apis/products.js";

export default {
  data: () => {
    return {
      productInfo: "",
      units: ["unit", "kg"],
      rules: {
        required: (value) => !!value || "Required.",
      },
      isLoading: false,
    };
  },
  computed: {
    calculateProfit() {
      return `RM${(
        parseFloat(this.productInfo.sellingPrice) -
        parseFloat(this.productInfo.intakePrice)
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
    validateForm() {
      if (
        this.productInfo.name != "" &&
        this.productInfo.unit != "" &&
        this.productInfo.sellingPrice != "" &&
        this.productInfo.intakePrice != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    async updateProduct() {
      if (this.validateForm()) {
        this.isLoading = true;
        let res = await Product.updateProduct(this.productInfo);
        if (res.valid) {
          this.isLoading = false;
          this.$store.commit("setSnackbar", "Product updated successfully.");
          this.$router.go(-1);
        } else {
          this.isLoading = false;
          this.$store.commit("setSnackbar", res.res);
        }
      } else {
        this.$store.commit(
          "setSnackbar",
          "Product description cannot be empty."
        );
      }
    },

    async getProductInfo(id) {
      this.isLoading = true;
      let res = await Product.getProductById(id);
      if (res.valid) {
        this.productInfo = res.res;
      } else {
        this.$store.commit("setSnackbar", res.res);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getProductInfo(this.$route.query.id);
  },
};
</script>

<style>
.edit-product-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
}

.edit-product-picture {
  max-width: 100%;
  max-height: 35vh;
  height: auto;
}

.edit-product-info {
  width: 100%;
  padding: 0rem 1rem;
  margin: 1rem 0rem;
}

.edit-product-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.edit-product-actions > button {
  margin: 1rem 0rem;
  width: 100%;
}

@media only screen and (min-width: 768px) {
  .edit-product-info {
    width: 90%;
  }
}

@media only screen and (min-width: 1024px) {
  .edit-product-actions,
  .edit-product-info {
    width: 50%;
  }

  .edit-product-actions {
    flex-direction: row;
    justify-content: space-around;
  }

  .edit-product-actions > button {
    width: 30%;
  }

  .edit-product-picture {
    max-width: 50%;
  }
}
</style>
