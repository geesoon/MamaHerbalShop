<template>
  <div class="edit-product-container" v-if="!isLoading">
    <img
      v-if="productInfo.picUrl != ''"
      class="edit-product-picture"
      :src="productInfo.picUrl"
      :alt="productInfo.name"
    />
    <img v-else src="@/assets/no-image.svg" class="edit-product-picture" />
    <div class="edit-product-info">
      <v-text-field
        type="text"
        label="Name"
        :placeholder="productInfo.name"
        v-model="productInfo.name"
        class="edit-product-name-field"
      />
      <v-text-field
        type="number"
        label="Cost"
        prefix="RM"
        :placeholder="formatPrice(productInfo.intakePrice)"
        v-model="productInfo.intakePrice"
        class="edit-product-price-field"
      />
      <v-text-field
        label="Selling Price"
        prefix="RM"
        type="number"
        :placeholder="formatPrice(productInfo.sellingPrice)"
        v-model="productInfo.sellingPrice"
        class="edit-product-price-field"
      />
      <div class="profit">
        <h6>Profit:</h6>
        {{ calculateProfit }}
      </div>
    </div>
    <div class="edit-product-actions">
      <v-btn color="primary" @click="updateProduct()">Save</v-btn>
      <v-btn color="secondary" @click="closeDialog()">Discard</v-btn>
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="remove-product-btn" v-bind="attrs" v-on="on">
            <span class="material-icons"> delete </span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Confirm remove {{ productInfo.name }}?
          </v-card-title>
          <v-card-text>Product removed cannot be restored.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="confirmRemoveProduct">
              Yes
            </v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
  <Loader v-else />
</template>

<script>
import Loader from "@/components/Loading.vue";
import Product from "@/apis/products.js";

export default {
  data: () => {
    return {
      productInfo: "",
      dialog: false,
    };
  },
  components: {
    Loader,
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
        this.$router.go(-1);
      } else {
        this.$store.commit("setIsLoading", false);
        this.$store.commit("setSnackBar", res.res);
      }
    },
    async confirmRemoveProduct() {
      this.dialog = false;
      this.$store.commit("setIsLoading", true);
      await Product.removeProductById(this.productInfo.id);
      this.$store.commit("setSnackBar", "Successfully deleted the product");
      this.$store.commit("setIsLoading", false);
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
  margin: 1rem;
}

.edit-product-info {
  width: 100%;
  margin: 2rem 0rem;
}

.edit-product-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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

  .edit-product-picture {
    max-width: 50%;
  }
}
</style>
