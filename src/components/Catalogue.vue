<template>
  <div class="catalogue-container">
    <div class="search-bar">
      <input
        type="text"
        class="search-field"
        placeholder="search"
        v-model="search"
      />
      <span class="material-icons search-bar-icon"> search </span>
    </div>

    <!-- Product Card List -->
    <section class="product-list" v-if="search == '' && products.length != 0">
      <ProductCard
        :productInfo="product"
        v-for="(product, key) in products"
        :key="key"
        @click.native="showEditProduct(product)"
      />
    </section>

    <section v-if="search == '' && products.length == 0">
      <h4>Add Product To Show Here!</h4>
    </section>

    <!-- Search Result list -->
    <section
      class="product-list"
      v-if="search != '' && searchResult.length != 0"
    >
      <ProductCard
        :productInfo="product"
        v-for="(product, key) in searchResult"
        :key="key"
        @click.native="showEditProduct(product)"
      />
    </section>
    <section v-if="search != '' && searchResult.length == 0">
      <h4>No result</h4>
    </section>

    <div
      class="background-mask"
      v-show="showEditProductDialog || showAddProductDialog"
    ></div>

    <!-- Edit Product Dialog -->
    <section v-if="showEditProductDialog" class="edit-product-dialog">
      <EditProduct @closeEditDialog="closeEditDialog()" />
    </section>

    <!-- Add Product Dialog -->
    <section v-if="showAddProductDialog" class="add-product-dialog">
      <AddProduct @closeAddDialog="closeAddDialog()" />
    </section>

    <!-- Floating Add Product Button -->
    <button id="add-fab" @click="showAddProduct()">
      <span class="material-icons"> add </span>
    </button>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import EditProduct from "@/components/EditProduct.vue";
import AddProduct from "@/components/AddProduct.vue";

export default {
  data: () => {
    return {
      products: [
        { name: "黑米", intakePrice: "10", sellingPrice: "18", productPic: "" },
        { name: "黑枣", intakePrice: "10", sellingPrice: "18", productPic: "" },
        { name: "红枣", intakePrice: "20", sellingPrice: "30", productPic: "" },
        {
          name: "当归",
          intakePrice: "180",
          sellingPrice: "210",
          productPic: "",
        },
      ],
      showEditProductDialog: false,
      showAddProductDialog: false,
      search: "",
      searchResult: [],
    };
  },
  components: {
    ProductCard,
    EditProduct,
    AddProduct,
  },
  watch: {
    search: function () {
      this.searchResult = this.products.filter((product) => {
        return product.name.includes(this.search);
      });
    },
  },
  methods: {
    showEditProduct(product) {
      this.$store.commit("setEditProduct", product);
      this.showEditProductDialog = true;
    },
    showAddProduct() {
      document.getElementById("add-fab").style.display = "none";
      this.showAddProductDialog = true;
    },
    closeEditDialog() {
      this.showEditProductDialog = false;
    },
    closeAddDialog() {
      document.getElementById("add-fab").style.display = "block";
      this.showAddProductDialog = false;
    },
  },
};
</script>

<style>
#add-fab {
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 5%;
  right: 5%;
  border-radius: 100%;
  color: white;
  background: var(--secondary);
}

.add-fab > span {
  font-size: 40px;
}

.catalogue-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.search-bar {
  flex: 1;
  margin: 1rem 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.search-field {
  padding: 0.5rem;
  flex: 1;
  margin-right: 0.5rem;
  box-shadow: 2px 2px 2px 2px var(--accent);
  border: none;
  color: var(--primary);
  font-size: 1.3rem;
  font-weight: bold;
  background: var(--accent);
}

.search-bar-icon {
  position: relative;
  cursor: pointer;
  width: 20%;
}

.search-field::placeholder,
.search-field::-moz-placeholder,
.search-field::-ms-input-placeholder {
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
}

.product-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.background-mask {
  bottom: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.8;
  position: fixed;
}

.add-product-dialog,
.edit-product-dialog {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  overflow-y: scroll;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 600px) {
  /* For tablet: */
  .product-list {
    display: grid;
    width: 95%;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 1024px) {
  /* For tablet: */
  .product-list {
    display: grid;
    width: 95%;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (min-width: 1440px) {
  /* For large desktop: */
  .product-list {
    display: grid;
    width: 95%;
    grid-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
