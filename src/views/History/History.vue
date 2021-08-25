<template>
  <section class="history-container" v-if="!isLoading">
    <div class="history-list">
      <HistoryItem
        v-for="(item, key) in history"
        :history="item"
        :key="key"
        @click.native="showOrderDetail(item.id)"
      />
    </div>
  </section>
  <section class="history-container" v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </section>
</template>

<script>
import History from "@/apis/history.js";
import HistoryItem from "@/components/History/HistoryItem.vue";

export default {
  data() {
    return {
      history: [],
      isLoading: true,
    };
  },
  components: {
    HistoryItem,
  },
  methods: {
    showOrderDetail(id) {
      this.$router.push({ name: "order_detail", query: { id: id } });
    },
    async getHistory() {
      this.isLoading = true;
      let res = await History.getHistory();
      if (res.valid) {
        this.history = res.res;
        this.isLoading = false;
      } else {
        this.$store.commit("setSnackbar", res.res);
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getHistory();
  },
};
</script>

<style>
.history-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
}

.history-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media screen and (min-width: 1440px) {
  .history-list {
    width: 50%;
  }
}
</style>
