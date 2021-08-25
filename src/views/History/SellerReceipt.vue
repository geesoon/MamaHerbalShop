<template>
  <section>
    <v-container>
      <v-col align="end">
        <p>Date: {{ order.date }}</p>
      </v-col>
      <v-col>
        <p>Seller: Cheng Bee Kiun</p>
        <p>Bill To: {{ order.soldTo }}</p>
      </v-col>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="order.items"
      disable-sort
      hide-default-footer
    >
      <template v-slot:item.intakePrice="{ item }">
        <v-chip color="maroon" dark>
          {{ item.intakePrice }}
        </v-chip>
      </template>
      <template v-slot:item.subProfit="{ item }">
        <v-chip color="green" dark>
          {{ item.subProfit }}
        </v-chip>
      </template>
    </v-data-table>
    <v-container>
      <v-col align="end">
        <div>Cost Total: {{ order.totalCost }}</div>
        <div>Price Total: {{ order.totalPrice }}</div>
        <div>Total Profit: {{ order.totalProfit }}</div>
      </v-col>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Product Name",
          value: "name",
        },
        { text: "Cost/Unit", value: "intakePrice" },
        { text: "Price/Unit", value: "sellingPrice" },
        { text: "Unit", value: "unit" },
        { text: "Quantity", value: "quantity" },
        { text: "Subtotal", value: "subtotal" },
        { text: "Profit", value: "subProfit" },
      ],
    };
  },
  props: {
    order: Object,
  },
};
</script>

<style>
.receipt-total {
  margin: 0.5rem 0rem;
}
</style>
