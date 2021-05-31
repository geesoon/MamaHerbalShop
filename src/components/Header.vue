<template>
  <section class="header-bar">
    <div class="top-background-block"></div>
    <div class="title-bar">
      <div class="title">
        <router-link to="home"><h3>Mama's Herbal</h3></router-link>
      </div>
      <!-- <div class="nav-bar">
        <h5><router-link to="home">Catalogue</router-link></h5>
        <h5>Order</h5>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
.header-bar {
  width: 90%;
  margin: 1rem 0rem;
}

.header-bar > * {
  cursor: pointer;
}

.top-background-block {
  width: 100%;
  background: #0099ff;
  height: 30vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.title-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 85%;
  margin: 1rem 0rem;
}

.nav-bar > * {
  margin: 0rem 1.5rem;
}

@media only screen and (min-width: 800px) {
  .title-bar {
    flex-direction: row;
    justify-content: space-between;
  }

  .top-background-block {
    height: 20vh;
  }

  .nav-bar {
    justify-content: flex-start;
  }
}
</style>
