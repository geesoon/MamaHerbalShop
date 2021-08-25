<template>
  <div class="view-product-picture-container">
    <img :src="picUrl" alt="product picture" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      picUrl: "",
    };
  },
  created() {
    this.picUrl = this.$route.query.picUrl;
  },
};
</script>

<style>
.view-product-picture-container {
  max-width: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.view-product-picture-container > img {
  max-width: 100%;
  max-height: 100vh;
}
</style>
