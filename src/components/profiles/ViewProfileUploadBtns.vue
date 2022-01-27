<template>
  <div class="flex-center white">
    <v-btn rounded class="ma-2" color="secondary darken-4" dark>
      <v-icon left>fa-camera-retro</v-icon>Upload Photos</v-btn
    >
  </div>
  <!-- <v-sheet outlined elevation="1">
    <h4 class="primary white--text pa-2 font-weight-medium">Upload Photos</h4>
    <div class="d-grid" :class="{ 'grid-columns-2': inline }">
      <v-btn rounded color="primary" class="ma-2">
        <v-icon left>fa-camera-retro</v-icon>
        Browse</v-btn
      >
      <v-btn rounded class="ma-2" color="secondary darken-4" dark> <v-icon left>fa-camera-retro</v-icon> Upload</v-btn>
    </div>
  </v-sheet> -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ViewProfileUploadBtns',
  props: {
    inline: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style></style>
