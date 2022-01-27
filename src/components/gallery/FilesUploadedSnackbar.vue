<template>
  <v-snackbar v-model="uploadCompleteSnackbar" :timeout="3000" color="success">
    Files Uploaded Successfully
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="uploadCompleteSnackbar = false">
        <v-icon color="white">fa-times</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FilesUploadedSnackbar',
  data: () => ({ uploadCompleteSnackbar: false }),
  methods: {
    open() {
      this.uploadCompleteSnackbar = true;
    },
  },
});
</script>

<style></style>
