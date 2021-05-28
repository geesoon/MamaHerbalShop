<template>
  <div id="app">
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
  --accent: #f5f5f5;
  --danger: #ff3030;
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

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

h4 {
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
