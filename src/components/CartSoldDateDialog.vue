<template>
  <v-card>
    <v-card-title> Pick a date </v-card-title>
    <v-divider></v-divider>
    <div class="calendar-container">
      <v-date-picker v-model="selectedDate"></v-date-picker>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="closeDialog"> Done </v-btn>
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
