<template>
  <div class="catalogue-container">
    <!-- Product Card List -->
    <div class="product-list" v-if="products.length != 0">
      <ProductCard
        :productInfo="product"
        v-for="(product, key) in products"
        :key="key"
        @click.native="showEditProduct(product)"
      />
    </div>

    <!-- No Products -->
    <div v-else-if="products.length == 0 && isLoading == false && search == ''">
      <div class="add-product-prompt">
        <h5>No products</h5>
        <br />
        <h6>Start Adding Now!</h6>
      </div>
    </div>

    <!-- No Search Result -->
    <div v-else-if="isLoading == false">
      <h4>No result for: {{ search }}</h4>
    </div>
    <Loader v-if="isLoading" />
    <!-- Floating Add Product Button -->
    <button id="add-fab" @click="showAddProduct()">
      <span class="material-icons"> add </span>
    </button>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import Loader from "@/components/Loading.vue";
import Product from "@/apis/products.js";

export default {
  data: () => {
    return {
      isLoading: true,
    };
  },
  components: {
    ProductCard,
    Loader,
  },
  computed: {
    products() {
      return this.$store.getters.getProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    search() {
      return this.$store.getters.getSearchInput;
    },
  },
  methods: {
    updateSearch(search) {
      this.search = search;
    },
    showEditProduct(product) {
      this.$router.push({ name: "editProduct", query: { id: product.id } });
    },
    showAddProduct() {
      document.getElementById("add-fab").style.display = "none";
      this.$router.push({ name: "addProduct" });
    },
    async getProducts() {
      let products = await Product.getProducts();
      this.$store.commit("setProducts", products);
      this.isLoading = false;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.catalogue-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0rem 2rem;
}

.product-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media only screen and (min-width: 600px) {
  /* For tablet: */
  .product-list {
    display: grid;
    width: 95%;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .search-bar {
    justify-content: flex-end;
  }

  .search-container {
    width: 30%;
  }
}

@media only screen and (min-width: 1024px) {
  /* For tablet: */
  .product-list {
    display: grid;
    width: 100%;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1440px) {
  /* For large desktop: */
  .product-list {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 4rem;
    margin: 2rem 0rem;
    width: 90%;
  }
}
</style>
