<template>
  <div>
    <div>History</div>
    <div>
      {{ history }}
    </div>
  </div>
</template>

<script>
import History from "@/apis/history.js";

export default {
  data() {
    return {
      history: "",
    };
  },
  methods: {
    async getHistory() {
      this.$store.commit("setIsLoading", true);
      let res = await History.getHistory();

      if (res.valid) {
        this.history = res.res;
      } else {
        alert(res.res);
      }
      this.$store.commit("setIsLoading", false);
    },
  },
  created() {
    this.getHistory();
  },
};
</script>

<style></style>
