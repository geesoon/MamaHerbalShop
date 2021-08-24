<template>
  <div>
    <input type="checkbox" id="menu-toggle" />
    <label class="close-mobile-menu" for="menu-toggle"></label>
    <div class="sidebar">
      <div class="brand">
        Mama's<br />
        Herbal
      </div>
      <div class="sidemenu">
        <ul>
          <li @click="toggleMenu()">
            <router-link to="/dashboard/product"
              ><span class="material-icons"> home </span>
              <span>Catalogue</span>
            </router-link>
          </li>
          <li @click="toggleMenu()">
            <router-link to="/dashboard/cart"
              ><span class="material-icons"> shopping_basket </span>
              <span>Cart</span></router-link
            >
          </li>
          <li @click="toggleMenu()">
            <router-link to="/dashboard/history"
              ><span class="material-icons"> history </span>
              <span>Order History</span></router-link
            >
          </li>
          <li @click="toggleMenu()">
            <router-link to="/dashboard/statistics"
              ><span class="material-icons"> trending_up </span>
              <span>Statistics</span></router-link
            >
          </li>
          <li @click="toggleMenu()">
            <a href="" @click="logout()">
              <span class="material-icons"> logout </span>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <header>
      <div class="menu-route-container">
        <label for="menu-toggle" class="menu-toggle">
          <span class="material-icons"> menu </span></label
        >
        <h2 class="route-name" v-if="this.$route.name != 'catalogue'">
          {{ capitalizeFirstLetter(this.$route.name) }}
        </h2>
      </div>
      <div class="search-cart-container">
        <div class="search-bar" v-if="this.$route.name == 'catalogue'">
          <input
            type="text"
            class="search-field"
            placeholder="search"
            v-model="search"
          />
        </div>
        <div>
          <router-link to="/dashboard/cart" active-class="cart-route-link">
            <div class="cart-status">{{ cartStatus }}</div>
            <span class="material-icons cart"> shopping_cart </span>
          </router-link>
        </div>
      </div>
    </header>
    <section class="main-content">
      <router-view />
    </section>
    <SnackBar v-show="isShowSnackBar" :message="snackBarMessage" />
  </div>
</template>

<script>
import SnackBar from "@/components/SnackBar.vue";
import Auth from "@/apis/auth.js";

export default {
  components: {
    SnackBar,
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
    isShowSnackBar() {
      return this.$store.getters.getSnackBar.show;
    },
    snackBarMessage() {
      return this.$store.getters.getSnackBar.message;
    },
    cartStatus() {
      return this.$store.getters.getCartStatus;
    },
  },
  data() {
    return {
      search: "",
      viewPort: "",
    };
  },
  watch: {
    search: function () {
      this.$store.commit("setSearchInput", this.search);
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleMenu() {
      if (this.viewPort <= 768) {
        var input = document.getElementById("menu-toggle");
        input.checked = !input.checked;
      }
    },
    showCart() {
      this.$router.push({ name: "cart" });
    },
    async logout() {
      this.$store.commit("setIsLoading", true);
      let res = await Auth.logout();
      if (res.valid) {
        this.$store.commit("setIsLoading", false);
      } else {
        alert(res.res);
      }
    },
  },
  mounted() {
    const resizeObserver = new ResizeObserver((entries) => {
      this.viewPort = entries[0].target.clientWidth;
    });

    resizeObserver.observe(document.body);
  },
};
</script>

<style>
.route-name {
  color: white;
  margin: 0rem 1rem;
}

.menu-route-container,
.search-cart-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cart-status {
  font-size: var(--icon-medium);
  background: white;
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

.menu-toggle > span {
  background: var(--secondary);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.search-bar {
  margin-left: 1rem;
}

.search-field {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  color: var(--primary);
  font-weight: bold;
  background: var(--accent);
  text-align: left;
  width: 90%;
}

.search-icon-container {
  text-align: center;
}

.search-field::placeholder,
.search-field::-moz-placeholder,
.search-field::-ms-input-placeholder {
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
}

#menu-toggle {
  display: none;
}

#menu-toggle:checked ~ .sidebar .brand {
  display: block;
  font-size: 0.8rem;
}

#menu-toggle:checked ~ .sidebar .user {
  display: none;
}

#menu-toggle:checked ~ .sidebar .side-img {
  height: 50px;
  width: 50px;
}

#menu-toggle:checked ~ .sidebar li a span:last-child {
  display: none;
}

#menu-toggle:checked ~ .sidebar {
  width: 80px;
}

/* Collapse */
#menu-toggle:checked ~ header {
  left: calc(80px + 1rem);
  width: calc(100% - 80px - 2rem);
}

/* Collapse */
#menu-toggle:checked ~ .main-content {
  margin-left: calc(80px + 1rem);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background: var(--bg);
  padding: 0.5rem 1rem;
  position: fixed;
  left: calc(280px + 1rem);
  width: calc(100% - 312px);
  top: 0px;
  border-radius: 3px;
  transition: width 300ms, left 300ms;
  z-index: 1000;
}

.main-content {
  margin-left: calc(280px + 1rem);
  margin-top: 5rem;
  transition: margin-left 300ms, margin-left 300ms;
}

.sidebar {
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background: var(--bg);
  width: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 300ms;
}

.brand {
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  display: flex;
  color: white;
  align-items: center;
  transition: font-size 300ms, font-size 300ms;
}

.side-user {
  margin: 1rem 0rem;
}

.side-img {
  height: 150px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
  border: 2px solid #3e454d;
  border-radius: 50%;
}

.user {
  text-align: center;
  color: #fff;
  margin: 1rem;
}

.user small {
  display: inline-block;
  color: var(--primary);
}

.sidemenu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}

.sidemenu > * {
  width: 100%;
}

.sidemenu li {
  margin-bottom: 1rem;
}

.sidemenu a,
li > div {
  color: #fff;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.sidemenu a span:first-child {
  font-size: 1.3rem;
  padding: 0rem 0.6rem;
}

.router-link-active {
  background: var(--secondary);
  color: #fff;
  border-radius: 5px;
  height: 45px;
}

.menu-toggle {
  height: 45px;
  width: 45px;
  background: var(--primary);
  color: #fff;
  display: grid;
  place-items: center;
  border-radius: 5px;
}

.head-icons span {
  font-size: 1.3rem;
  margin-left: 1rem;
  color: #fff;
}

.close-mobile-menu {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background: transparent;
  display: none;
  height: 100%;
  width: calc(100% - 280px);
  opacity: 0.8;
  z-index: 1000;
  transition: right 300ms;
}

#add-fab {
  width: 48px;
  height: 48px;
  position: fixed;
  bottom: 5%;
  right: 5%;
  border-radius: 100%;
  color: white;
  background: var(--secondary);
}

.add-fab > span {
  font-size: 50px;
}

@media only screen and (max-width: 768px) {
  header {
    left: 0;
    top: 0;
    width: 100%;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  #menu-toggle ~ .sidebar .brand h4 {
    display: none;
  }

  #menu-toggle ~ .sidebar .user {
    display: none;
  }

  #menu-toggle ~ .sidebar .side-img {
    height: 50px;
    width: 50px;
  }

  #menu-toggle ~ .sidebar li a span:last-child {
    display: none;
  }

  #menu-toggle ~ .sidebar {
    width: 0px;
  }

  #menu-toggle {
    display: none;
  }

  #menu-toggle ~ header {
    left: 0px;
  }

  #menu-toggle ~ .main-content {
    margin-left: 0px;
  }

  #menu-toggle:checked ~ .sidebar .brand {
    display: block;
  }

  #menu-toggle:checked ~ .sidebar .user {
    display: block;
  }

  #menu-toggle:checked ~ .sidebar .side-img {
    height: 120px;
    width: 120px;
  }

  #menu-toggle:checked ~ .sidebar li a span:last-child {
    display: inline-block;
  }

  #menu-toggle:checked ~ .sidebar {
    width: 280px;
    z-index: 1000;
  }

  #menu-toggle:checked ~ header {
    width: calc(100% - 296px);
    left: calc(280px + 16px);
  }

  #menu-toggle:checked ~ .main-content {
    margin-left: calc(280px + 16px);
  }

  #menu-toggle:checked ~ .close-mobile-menu {
    display: block;
    right: 0;
  }
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
