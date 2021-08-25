<template>
  <v-card>
    <div class="calendar-container">
      <v-date-picker v-model="selectedDate"></v-date-picker>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="closeDialog"> Select </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: "",
    };
  },
  props: {
    soldDate: String,
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", this.selectedDate);
    },
  },
};
</script>

<style>
.calendar-container {
  text-align: center;
}
</style>
