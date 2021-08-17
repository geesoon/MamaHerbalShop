<template>
  <div class="history-list">
    <HistoryItem v-for="(item, key) in history" :history="item" :key="key" />
  </div>
</template>

<script>
import History from "@/apis/history.js";
import HistoryItem from "@/components/HistoryItem.vue";

export default {
  data() {
    return {
      history: [],
    };
  },
  components: {
    HistoryItem,
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

<style>
.history-list {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
</style>
