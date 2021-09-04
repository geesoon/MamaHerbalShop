<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app v-if="this.$route.name != 'login'">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="search-cart-container">
        <v-text-field
          v-if="this.$route.name == 'catalogue'"
          prepend-inner-icon="mdi-magnify"
          type="text"
          placeholder="Search in Catalogue"
          v-model="search"
          filled
          full-width
          dense
          rounded
          hide-details="auto"
        ></v-text-field>
        <div class="menu-route-container" v-else>
          <h2>
            {{ routeName }}
          </h2>
        </div>
        <div class="cart-icon-container">
          <router-link to="/cart" active-class="cart-route-link">
            <div class="cart-status">{{ cartStatus }}</div>
            <span class="material-icons cart"> shopping_cart </span>
          </router-link>
        </div>
      </div>
    </v-app-bar>

    <!-- Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      bottom
      temporary
      v-if="this.$route.name != 'login'"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title class="brand">
              <img src="./assets/logo/mama_logo.png" />
              <span>Mama's Herbal</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/product" class="drawer-items"
                ><span class="material-icons"> home </span>
                <span>Catalogue</span>
              </router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <router-link to="/cart" class="drawer-items"
                ><span class="material-icons"> shopping_basket </span>
                <span>Cart</span></router-link
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link to="/history" class="drawer-items"
                ><span class="material-icons"> history </span>
                <span>Order History</span></router-link
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link to="/statistics" class="drawer-items"
                ><span class="material-icons"> trending_up </span>
                <span>Statistics</span></router-link
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <a href="" @click="logout()" class="drawer-items">
                <span class="material-icons"> logout </span>
                <span>Logout</span>
              </a></v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <!-- Alert SnackBar -->
      <v-alert
        class="snackbar"
        border="bottom"
        v-show="isShowSnackBar"
        type="success"
        transition="fade-transition"
        >{{ snackBarMessage }}</v-alert
      >
      <router-view />
    </v-main>

    <!-- Logout overlay -->
    <v-overlay :value="isLoading" class="logout-overlay">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Auth from "@/apis/auth.js";
export default {
  name: "App",
  computed: {
    isShowSnackBar() {
      return this.$store.getters.getSnackBar.show;
    },
    snackBarMessage() {
      return this.$store.getters.getSnackBar.message;
    },
    cartStatus() {
      return this.$store.getters.getCartStatus;
    },
    routeName() {
      let word = this.$route.name.split("_");
      word.forEach((w) => {
        let temp = w;
        w.charAt(0).toUpperCase() + temp.slice(1);
      });
      return word.join(" ");
    },
  },
  data() {
    return {
      search: "",
      drawer: false,
      group: null,
      isLoading: false,
    };
  },
  watch: {
    search: function () {
      this.$store.commit("setSearchInput", this.search);
    },
    group: function () {
      this.drawer = false;
    },
  },
  methods: {
    showCart() {
      this.$router.push({ name: "cart" });
    },
    async logout() {
      this.isLoading = true;
      let res = await Auth.logout();
      if (res.valid) {
        this.isLoading = false;
        this.$router.replace({ name: "login" });
      } else {
        this.isLoading = false;
        this.$store.commit("setSnackbar", res.res);
      }
    },
  },
};
</script>

<style>
:root {
  --accent: #e2e2e2;
  --danger: #ff3030;
  --icon-small: 6px;
  --icon-medium: 12px;
  --icon-large: 24px;
  --bg-body: white;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

.material-icons {
  cursor: pointer !important;
}

.snackbar {
  position: absolute !important;
  top: 0px;
  z-index: 999;
  min-width: 100%;
  max-width: 100%;
}

.logout-overlay {
  display: flex;
  justify-content: center;
  align-content: center;
}

/* Drawer */
.drawer-items {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.brand {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
}

.brand > img {
  margin-right: 1rem;
  width: 40px;
  height: 40px;
}

.drawer-items > span {
  margin: 0rem 1rem;
}

/* App bar */
.menu-route-container,
.search-cart-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search-cart-container {
  justify-content: space-between;
  width: 100%;
}

.cart-icon-container {
  margin: 1rem;
}

.cart-status {
  font-size: var(--icon-medium);
  border-radius: 50%;
  padding: 2px;
  position: relative;
  left: 10px;
  top: 10px;
  color: var(--primary);
  text-align: center;
  font-weight: bold;
}

.cart {
  color: orange;
}

@media only screen and (min-width: 600px) {
  /* For tablet: */
  .view-product-info,
  .edit-product-info {
    width: 80%;
    background: white;
  }

  .view-product-picture,
  .edit-product-picture {
    max-height: 500px;
  }
}
@media only screen and (min-width: 768px) {
  /* For desktop: */
  .view-product-info,
  .edit-product-info {
    width: 30%;
  }
  .edit-save-btn,
  .edit-discard-btn {
    width: 30%;
  }

  .confirmation-prompt {
    width: 50%;
  }

  .edit-product-container,
  .view-product-container {
    width: 50%;
  }
}
@media only screen and (min-width: 1440px) {
  /* For desktop: */
  .edit-save-btn,
  .edit-discard-btn {
    width: 20%;
  }

  .edit-product-container,
  .view-product-container {
    width: 30%;
  }
}
</style>
