<template>
  <div v-if="!isLoading" class="order-detail-container">
    <div class="order-view-toggle">
      <v-btn>Print Receipt</v-btn>
      <v-switch
        v-model="isSellerView"
        :label="`${isSellerView ? 'Seller' : 'Customer'}`"
      ></v-switch>
    </div>
    <section class="receipt-view-container">
      <component :is="receiptView"></component>
    </section>
  </div>
  <div v-else class="order-detail-loading-container">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import History from "@/apis/history.js";
import CustomerView from "@/views/History/CustomerReceipt.vue";
import SellerView from "@/views/History/SellerReceipt.vue";

export default {
  data() {
    return {
      order: "",
      isLoading: false,
      isSellerView: false,
      receiptView: "",
    };
  },
  components: {
    CustomerView,
    SellerView,
  },
  methods: {
    async getHistory(id) {
      this.isLoading = true;
      let res = await History.getHistoryById(id);
      if (res.valid) {
        this.order = res.res;
        this.isLoading = false;
      } else {
        this.$store.commit("setSnackbar", res.res);
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getHistory(this.$route.query.id);
  },
};
</script>

<style>
.receipt-view-container {
  padding: 0.5rem;
  background: whitesmoke;
  border: dashed 1px;
}

.order-view-toggle {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
}

.order-view-toggle > * {
  margin: 0rem 1rem;
}

.order-detail-loading-container {
  width: 100%;
  text-align: center;
  padding: 1rem 0rem;
}

@media screen and (min-width: 768px) {
  .order-detail-container {
    padding-top: 1rem;
  }
}

@media screen and (min-width: 1024px) {
  .order-detail-container {
    padding: 1rem;
  }
}
</style>
