<template>
  <div class="catalogue-page">
    <div class="title"><h2>Mama's Herbal</h2></div>
    <Catalogue />
  </div>
</template>

<script>
import Catalogue from "@/components/Catalogue.vue";

export default {
  components: {
    Catalogue,
  },
};
</script>

<style>
.catalogue-page > .title {
  margin-top: 1rem;
}
</style>
