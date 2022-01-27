<template>
  <v-app class="css-priority-0 css-priority-1 css-priority-2 css-priority-3 w-100 h-100 overflow-auto">
    <v-app-bar>
      <v-container class="d-flex flex-nowrap">
        <img alt="Site Logo" src="/images/logo.png" />
        <v-spacer></v-spacer>
        <!-- <login-register-controls /> -->
      </v-container>
    </v-app-bar>
    <v-main class="position-relative h-100 w-100">
      <div class="child-container-wrapper flex-center flex-grow-1">
        <div class="child-container ma-10"><router-view /></div>
      </div>
      <info-footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import InfoFooter from '@/components/InfoFooter.vue';

export default Vue.extend({
  components: { InfoFooter },
  name: 'ComponentView',
});
</script>
