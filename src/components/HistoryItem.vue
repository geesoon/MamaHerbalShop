<template>
  <div class="history-item-container">
    <div class="history-sold-to">
      <h5>Sold To: {{ history.soldTo == "" ? "None" : history.soldTo }}</h5>
    </div>
    <div class="history-sold-date">
      <h5>Sold Date: {{ history.date }}</h5>
    </div>
    <div class="history-detail-row">
      <div class="history-items">
        <small
          ><strong>Item Sold: {{ showHistoryItems }}</strong></small
        >
      </div>
      <div class="history-order-total">
        <small
          ><strong>Total: RM{{ history.totalPrice }}</strong></small
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    history: Object,
  },
  computed: {
    showHistoryItems() {
      let itemList = [];
      this.history.items.forEach((item) => {
        itemList.push(item.name);
      });
      return itemList.join(", ");
    },
  },
};
</script>

<style>
.history-item-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 0px 2px 0px 0px var(--accent);
  margin: 1rem 0rem;
}

.history-detail-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.history-items {
  max-width: 70%;
  min-width: 70%;
}

.history-order-total {
  max-width: 30%;
  min-width: 30%;
  text-align: right;
}
</style>
