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
    ></v-data-table>
    <v-container>
      <v-col align="end">
        <div style="font-weight: bold">Order Total: {{ order.totalPrice }}</div>
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
        { text: "Price/Unit", value: "sellingPrice" },
        { text: "Unit", value: "unit" },
        { text: "Quantity", value: "quantity" },
        { text: "Subtotal", value: "subtotal" },
      ],
    };
  },
  props: {
    order: Object,
  },
};
</script>

<style></style>
