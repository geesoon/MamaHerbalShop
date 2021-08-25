<template>
  <div class="history-item-container">
    <div class="history-order-detail">
      <div class="history-sold-to">
        <h2>{{ history.soldTo == "" ? "None" : history.soldTo }}</h2>
      </div>
      <div class="history-sold-date">
        <h5>{{ history.date }}</h5>
      </div>
      <div class="history-items">
        <small
          ><strong>{{ showHistoryItems }}</strong></small
        >
      </div>
    </div>
    <div class="history-order-price">
      <h5 class="sp">SP: RM{{ history.totalPrice }}</h5>
      <h5 class="cost">Cost: RM{{ history.totalCost }}</h5>
      <h5 class="profit">Profit: RM{{ history.totalProfit }}</h5>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  box-shadow: 0px 2px 0px 0px var(--accent);
  margin: 1rem 0rem;
}

.history-order-detail {
  flex: 1;
  padding-right: 0.5rem;
}

.history-order-price {
  text-align: end;
}
</style>
