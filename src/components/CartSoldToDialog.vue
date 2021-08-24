<template>
  <v-card>
    <v-card-title>Customer Name </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field
        type="text"
        label="Name"
        v-model="customerName"
        clearable
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="closeDialog()"> Done </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      customerName: "",
    };
  },
  props: {
    soldTo: String,
  },
  methods: {
    closeDialog() {
      console.log(this.customerName);
      this.$emit("closeDialog", this.customerName);
    },
  },
  created() {
    this.customerName = this.soldTo;
  },
};
</script>

<style></style>
