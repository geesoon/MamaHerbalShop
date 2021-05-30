<template>
  <div id="app">
    <div class="nav-container">
      <div class="nav-bar">
        <div class="title"><h2>Mama's Herbal</h2></div>
        <div>
          <h5>Catalogue</h5>
          <h5>Order</h5>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
:root {
  --primary: #0f0326;
  --secondary: #41453e;
  --accent: #e2e2e2;
  --danger: #ff3030;
  --icon-small: 24px;
  --icon-medium: 48px;
  --icon-large: 64px;
}

.nav-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 0rem;
  width: 85%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

button {
  border: none;
}

button:hover {
  opacity: 0.9;
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

h3 {
  font-size: 2.5rem;
}

h4 {
  font-size: 2rem;
}

h5 {
  font-size: 1.5rem;
}

h6 {
  font-size: 1.3rem;
}

#app {
  font-family: "Passion One", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  margin: 0;
}
</style>
