<template>
  <v-list-item class="mx-12 my-6">
    <v-list-item-avatar rounded>
      <v-img src="/images/social1.png" />
    </v-list-item-avatar>
    <v-list-item-content class="d-flex gap-4">
      <v-list-item-title class="text--secondary text--darken-4 text-wrap"
        >Connect with Facebook to unlock <strong>'Social Profile'</strong> Trust Badge</v-list-item-title
      >
      <router-link to="/todo"><v-btn rounded color="primary" dark>Connect</v-btn></router-link>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FacebookConnectPrompt',
});
</script>

<style></style>
