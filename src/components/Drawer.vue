<template>
  <section>
    <input type="checkbox" id="menu-toggle" />
    <label class="close-mobile-menu" for="menu-toggle"></label>
    <div class="sidebar">
      <div class="brand">
        <h4>Mama's Herbal</h4>
      </div>
      <div class="sidemenu">
        <div class="side-user">
          <div
            class="side-img"
            style="background-image: url('https://i.pravatar.cc/150')"
          ></div>
        </div>
        <div class="user">
          <small>Admin</small>
        </div>
        <ul>
          <li>
            <router-link to="/dashboard/main"
              ><span class="material-icons"> home </span>
              <span>Catalogue</span>
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/cart"
              ><span class="material-icons"> shopping_basket </span>
              <span>Cart</span></router-link
            >
          </li>
          <li>
            <router-link to="/dashboard/history"
              ><span class="material-icons"> history </span>
              <span>Order History</span></router-link
            >
          </li>
          <li>
            <router-link to="/dashboard/statistics"
              ><span class="material-icons"> trending_up </span>
              <span>Statistics</span></router-link
            >
          </li>
        </ul>
        <div>Logout</div>
      </div>
    </div>
    <header>
      <div class="header-bar">
        <label for="menu-toggle" class="menu-toggle">
          <span class="material-icons"> menu </span></label
        >
        <span v-if="this.$route.name != 'catalogue'">Mama's Herbal</span>
      </div>
      <div class="search-bar" v-if="this.$route.name == 'catalogue'">
        <div class="search-container">
          <input
            type="text"
            class="search-field"
            placeholder="search"
            v-model="search"
          />
          <div class="search-icon-container">
            <span
              class="material-icons search-bar-icon"
              @click="filterProduct()"
            >
              search
            </span>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search: function () {
      this.$store.commit("setSearchInput", this.search);
    },
  },
};
</script>

<style>
.menu-toggle > span {
  background: var(--secondary);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.search-bar {
  margin-left: 1rem;
  width: 100%;
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
  color: white;
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

#menu-toggle:checked ~ .sidebar .brand h4 {
  display: none;
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
  width: 65px;
}

#menu-toggle:checked ~ header {
  left: calc(65px + 1rem);
}

#menu-toggle:checked .main-content {
  margin-left: 65px;
}

header {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
  padding: 0rem 1rem;
  position: fixed;
  left: calc(280px + 1rem);
  right: 1rem;
  top: 0.5rem;
  border-radius: 3px;
  transition: left 300ms;
  width: 100%;
  z-index: 999;
}

.header-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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
  padding: 0.5rem 1rem;
  display: flex;
  color: var(--primary);
  align-items: center;
  height: 70px;
}

.brand span {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.side-user {
  margin: 1.8rem 0rem;
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
  padding: 0.5rem;
}

.sidemenu li {
  margin-bottom: 1rem;
}

.sidemenu a {
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

.main-content {
  margin-left: 280px;
  margin-top: calc(70px + 1rem);
  min-height: 100vh;
  background: var(--bg-body);
  padding: 0.5rem 1rem;
  transition: margin-left 300ms;
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
  z-index: 100;
  transition: right 300ms;
}

@media only screen and (max-width: 1124px) {
  header {
    left: 0;
    top: 0;
  }

  .main-content {
    margin-left: 0;
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

  #menu-toggle:checked ~ .sidebar .brand h4 {
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
    z-index: 100;
  }

  #menu-toggle:checked ~ .close-mobile-menu {
    display: block;
    right: 0;
  }
}
</style>
