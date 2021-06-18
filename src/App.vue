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
  --accent: #e2e2e2;
  --danger: #ff3030;
  --icon-small: 24px;
  --icon-medium: 48px;
  --icon-large: 64px;
  --bg: #0f0326;
  --bg-body: white;
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

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  text-decoration: none;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
