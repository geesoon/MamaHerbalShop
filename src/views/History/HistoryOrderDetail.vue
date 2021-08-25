<template>
  <div v-if="!isLoading" class="order-detail-container">
    <div class="order-view-toggle">
      <v-btn @click="downloadReceipt">Print Receipt</v-btn>
      <v-switch
        v-model="isSellerView"
        :label="`${isSellerView ? 'Seller' : 'Customer'}`"
      ></v-switch>
    </div>
    <section id="receipt-view-container">
      <CustomerView v-if="!isSellerView" :order="order" />
      <SellerView v-else :order="order" />
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
import { toPng } from "html-to-image";

export default {
  data() {
    return {
      order: null,
      isLoading: false,
      isSellerView: false,
    };
  },
  components: {
    CustomerView,
    SellerView,
  },
  computed: {
    receiptView() {
      return this.isSellerView ? "SellerView" : "CustomerView";
    },
  },
  methods: {
    changeViewport(type) {
      if (type === "desktop") {
        document
          .querySelector('meta[name="viewport"]')
          .setAttribute("content", "width=768");
      } else {
        document
          .querySelector('meta[name="viewport"]')
          .setAttribute(
            "content",
            "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
          );
      }
    },
    async screenshotReceipt() {
      let dataUrl = await toPng(
        document.getElementById("receipt-view-container")
      );
      const image = await fetch(dataUrl);
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = `${this.receiptView}_${this.order.soldTo}_${this.order.date}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.changeViewport("mobile");
    },
    async downloadReceipt() {
      this.changeViewport("desktop");

      setTimeout(() => {
        this.screenshotReceipt();
      }, 2000);
    },
    async getHistory(id) {
      this.isLoading = true;
      History.getHistoryById(id).then((res) => {
        if (res.valid) {
          this.order = res.res;
          this.isLoading = false;
        } else {
          this.$store.commit("setSnackbar", res.res);
          this.isLoading = false;
        }
        this.formatOrderDetail();
      });
    },
    formatOrderDetail() {
      this.order.items.forEach((item) => {
        // Synthesize information
        let conversion = item.unit == "unit" ? 1 : 1000;
        item.subtotal = (item.quantity / conversion) * item.sellingPrice;
        item.subProfit =
          item.subtotal -
          (item.quantity / conversion) * Number(item.intakePrice);

        // format and converting to string
        item.subtotal = `RM${item.subtotal.toFixed(2).toString()}`;
        item.intakePrice = `RM${Number(item.intakePrice)
          .toFixed(2)
          .toString()}`;
        item.sellingPrice = `RM${Number(item.sellingPrice)
          .toFixed(2)
          .toString()}`;
        item.subProfit = `RM${item.subProfit.toFixed(2).toString()}`;
        let suffix = item.unit == "unit" ? "unit" : "g";
        item.quantity = `${item.quantity}${suffix}`;
      });
    },
  },
  created() {
    this.getHistory(this.$route.query.id);
  },
};
</script>

<style>
#receipt-view-container {
  padding: 0.5rem;
  background: whitesmoke;
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
