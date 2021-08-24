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
  --icon-small: 6px;
  --icon-medium: 12px;
  --icon-large: 24px;
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

#app {
  font-family: "Passion One", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.material-icons {
  cursor: pointer !important;
}

.primary-btn {
  padding: 0.5rem;
  background: var(--primary);
  color: white;
  margin: 0.5rem 0rem;
  width: 100%;
}

.primary-btn > *,
.secondary-btn > *,
.danger-btn > * {
  color: white;
}

.secondary-btn {
  padding: 0.5rem;
  background: var(--secondary);
  color: white;
  margin: 0.5rem 0rem;
  width: 100%;
}

.danger-btn {
  padding: 0.5rem;
  background: var(--danger);
  color: white;
  margin: 0.5rem 0rem;
  width: 100%;
}

.outline-btn {
  padding: 0.5rem;
  background: white;
  color: var(--primary);
  margin: 0.5rem 0rem;
  border-radius: 2rem;
  border: 1px solid var(--primary);
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
