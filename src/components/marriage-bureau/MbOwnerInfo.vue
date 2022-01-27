<template>
  <v-sheet elevation="2">
    <h2 class="font-weight-medium secondary white--text text-center body-2 font-weight-medium darken-4 pa-2 mb-1">
      <v-icon small left color="white">fa-mobile-phone</v-icon>
      <a class="white--text text-decoration-none" :href="'tel:' + data.contactNumber">{{ data.contactNumber }}</a>
    </h2>
    <h2 class="font-weight-medium text-center body-1 font-weight-medium pa-1 mb-2">
      {{ data.ownerName }}
    </h2>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MbOwnerInfo',
  props: ['data'],
});
</script>

<style></style>
