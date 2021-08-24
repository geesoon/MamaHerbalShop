<template>
  <div class="view-product-container" v-if="!isLoading">
    <v-card class="view-product-info">
      <div class="view-image-container">
        <img
          v-if="productInfo.picture != ''"
          class="view-product-picture"
          :src="productInfo.picUrl"
          :alt="productInfo.name"
        />
        <img v-else src="@/assets/no-image.svg" class="view-product-picture" />
      </div>
      <v-card-title>
        {{ productInfo.name }}
      </v-card-title>
      <v-card-text>
        <div class="view-product-info-row">
          <div>Cost:</div>
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
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showEditProduct()" color="primary">Edit</v-btn>
        <v-btn @click="toggleAddToCartDialog()" color="secondary">
          Add To Cart
        </v-btn>
      </v-card-actions>

      <v-bottom-sheet v-model="isAddToCartDialog" inset>
        <v-sheet height="40vh">
          <AddToCartDialog
            @toggleDialog="toggleAddToCartDialog()"
            :productInfo="productInfo"
          />
        </v-sheet>
      </v-bottom-sheet>
    </v-card>
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
        name: "edit_product",
        query: { id: this.productInfo.id },
      });
    },
    toggleAddToCartDialog() {
      this.isAddToCartDialog = !this.isAddToCartDialog;
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
.view-product-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
}

.view-product-info-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.view-product-picture {
  max-width: 100%;
  object-fit: cover;
  max-height: 30vh;
}

.view-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.view-image-container {
  width: 100%;
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .view-product-info {
    max-width: 80%;
  }
}

@media only screen and (min-width: 1024px) {
  .view-product-info {
    max-width: 100%;
  }

  .view-product-info {
    width: 50%;
  }
}
</style>
