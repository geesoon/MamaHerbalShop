<template>
  <div class="catalogue-container">
    <Header />
    <div class="search-bar">
      <div class="search-container">
        <input
          type="text"
          class="search-field"
          placeholder="search"
          v-model="search"
        />
        <div class="search-icon-container">
          <span class="material-icons search-bar-icon" @click="filterProduct()">
            search
          </span>
        </div>
      </div>
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

    <section v-if="search == '' && products.length == 0 && isLoading == false">
      <div class="add-product-prompt">
        <h5>No products</h5>
        <br />
        <h6>Start Adding Now!</h6>
      </div>
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

    <!-- Floating Add Product Button -->
    <button id="add-fab" @click="showAddProduct()">
      <span class="material-icons"> add </span>
    </button>

    <!-- Base Wave -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="base-wave"
      v-if="products.length != 0"
    >
      <path
        fill="#0099ff"
        fill-opacity="0.8"
        d="M0,64L34.3,106.7C68.6,149,137,235,206,234.7C274.3,235,343,149,411,133.3C480,117,549,171,617,208C685.7,245,754,267,823,277.3C891.4,288,960,288,1029,245.3C1097.1,203,1166,117,1234,74.7C1302.9,32,1371,32,1406,32L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
      ></path>
    </svg>
    <Loader v-if="isLoading" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loader from "@/components/Loading.vue";
import ProductCard from "@/components/ProductCard.vue";
import firebase from "firebase";

export default {
  data: () => {
    return {
      isLoading: false,
      products: [],
      showEditProductDialog: false,
      showAddProductDialog: false,
      search: "",
      searchResult: [],
    };
  },
  components: {
    ProductCard,
    Header,
    Loader,
  },
  watch: {
    search: function () {
      this.searchResult = this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    filterProduct() {
      this.searchResult = this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    showEditProduct(product) {
      this.$store.commit("setEditProduct", product);
      this.$router.push({ name: "editProduct" });
    },
    showAddProduct() {
      document.getElementById("add-fab").style.display = "none";
      this.$router.push({ name: "addProduct" });
    },
    getProducts() {
      const db = firebase.firestore();
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push({
              name: doc.data().name,
              intakePrice: doc.data().intakePrice,
              sellingPrice: doc.data().sellingPrice,
              picture: doc.data().picture,
              id: doc.id,
            });
          });
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log("Error getting products collection", error);
        });
    },
  },
  created() {
    this.isLoading = true;
    this.getProducts();
  },
};
</script>

<style>
.add-product-prompt {
  text-align: center;
  padding: 1rem;
  background: var(--accent);
  border-radius: 1rem;
  border: 1px solid var(--accent);
}

.base-wave {
  position: fixed;
  bottom: 0;
  z-index: -1;
  width: 100%;
}

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
  padding: 0rem 2rem;
}

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0rem 0rem 2rem 0rem;
}

.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.search-field {
  width: 100%;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  color: var(--primary);
  font-size: 1.3rem;
  font-weight: bold;
  background: var(--accent);
}

.search-icon-container {
  position: relative;
  width: 10%;
  text-align: center;
}

.search-bar-icon {
  cursor: pointer;
  font-size: var(--icon-medium);
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
  width: 100%;
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
