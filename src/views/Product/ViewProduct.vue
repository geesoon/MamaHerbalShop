<template>
  <div class="view-product-container" v-if="!isLoading">
    <div class="view-product-info">
      <div class="view-image-container">
        <img
          v-if="productInfo.picUrl != ''"
          class="view-product-picture"
          :src="productInfo.picUrl"
          :alt="productInfo.name"
          @click="showFullProductPicture"
        />
        <img
          v-else
          src="../../assets/no-image.svg"
          class="view-product-picture"
        />
      </div>
      <div class="view-product-actions">
        <v-btn icon @click="showEditProduct()" color="primary"
          ><v-icon>mdi-pencil-circle</v-icon></v-btn
        >
        <v-dialog v-model="dialog" persistent max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="remove-product-btn" v-bind="attrs" v-on="on">
              <v-icon>mdi-delete-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Confirm remove {{ productInfo.name }}?
            </v-card-title>
            <v-card-text>Product removed cannot be restored.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                No
              </v-btn>
              <v-btn color="red darken-1" text @click="confirmRemoveProduct">
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="view-product-description">
        <div class="product-title">
          {{ productInfo.name }}
        </div>
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
      </div>
      <AddToCart :productInfo="productInfo" />
    </div>
  </div>
</template>

<script>
import Product from "@/apis/products.js";
import AddToCart from "@/components/Product/AddToCartPanel.vue";

export default {
  data: () => {
    return {
      dialog: false,
      productInfo: "",
      isAddToCartDialog: false,
      isLoading: false,
    };
  },
  components: {
    AddToCart,
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
    showFullProductPicture() {
      this.$router.push({
        name: "product_picture",
        query: { picUrl: this.productInfo.picUrl },
      });
    },
    async confirmRemoveProduct() {
      this.dialog = false;
      this.isLoading = true;
      await Product.removeProductById(this.productInfo.id);
      this.$store.commit("setSnackbar", "Successfully deleted the product");
      this.isLoading = false;
      this.$router.replace({ name: "catalogue" });
    },
    formatPrice(amount) {
      return `RM ${parseFloat(amount).toFixed(2)} /${this.productInfo.unit}`;
    },
    showEditProduct() {
      this.$router.push({
        name: "edit_product",
        query: { id: this.productInfo.id },
      });
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
.view-product-actions {
  display: flex;
  flex-direction: row;
}

.product-title {
  font-size: 1.5rem;
  margin: 0.5rem 0rem;
}
.view-product-description {
  width: 100%;
}

.view-product-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 1rem;
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
  max-height: 25vh;
}

.add-to-cart-container,
.view-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.add-to-cart-container {
  margin-top: 1rem;
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
    width: 50%;
  }
}
</style>
