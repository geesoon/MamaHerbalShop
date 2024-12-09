<template>
  <section class="catalogue-container" v-if="!isLoading">
    <div v-if="search != '' && products.length != 0" class="search-result-info">
      <h4>Search result for : {{ search }}</h4>
      <h4>{{ products.length }} products found.</h4>
    </div>
    <!-- Product Card List -->
    <div class="product-list" v-if="products.length != 0">
      <ProductCard
        :productInfo="product"
        v-for="(product, key) in products"
        :key="key"
      />
    </div>

    <!-- No Products -->
    <div v-else-if="products.length == 0 && isLoading == false && search == ''">
      <div class="add-product-prompt">
        <img src="../assets/empty_catalogue.svg" alt="empty catalogue" />
        <h4>No products</h4>
        <v-btn text @click="showAddProduct()">Start Adding</v-btn>
      </div>
    </div>

    <!-- No Search Result -->
    <div v-else-if="isLoading == false" style="text-align: center">
      <h1>(T_T)</h1>
      <h4>No result for: {{ search }}</h4>
    </div>

    <v-btn fab id="add-fab" color="secondary" @click="showAddProduct()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </section>
  <section v-else class="catalogue-container">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </section>
</template>

<script>
import ProductCard from "@/components/Product/ProductCard.vue";
import Product from "@/apis/products.js";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    ProductCard,
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
    showAddProduct() {
      this.$router.push({ name: "add_product" });
    },
    async getProducts() {
      let res = await Product.getProducts();
      if (res.valid) {
        this.$store.commit("setProducts", res.res);
      } else {
        this.$store.commit("setSnackbar", res.res);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.sp {
  color: navy;
}
.cost {
  color: maroon;
}
.profit {
  color: green;
}

.search-result-info {
  text-align: start;
  margin: 1rem 0rem;
  width: 100%;
}

#add-fab {
  position: fixed;
  bottom: 5%;
  right: 5%;
  color: white;
}

.add-product-prompt {
  text-align: center;
  width: 100%;
}

.add-product-prompt > img {
  width: 40%;
  height: auto;
}

.catalogue-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;
  padding: 1rem;
}

.product-list {
  display: grid;
  min-width: 100%;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 8rem;
}

@media only screen and (min-width: 425px) {
  /* For tablet: */

  .add-product-prompt > img {
    width: 15%;
    height: auto;
  }
  /* 
  .product-list {
    grid-template-columns: repeat(2, 1fr);
  } */
}

@media only screen and (min-width: 768px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1024px) {
  /* For tablet: */
  .product-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media only screen and (min-width: 1440px) {
  /* For tablet: */
  .product-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
