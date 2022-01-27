<template>
  <v-list dense class="analytics-list pt-0" outlined>
    <v-subheader
      v-if="title"
      class="d-flex flex-nowrap align-center justify-space-between font-weight-medium secondary white--text text-center font-weight-medium darken-4 pa-2 mb-4"
    >
      <h2 class="body-2">{{ title }}</h2>
      <div class="flex-center gap-2">
        <v-btn small text color="white" class="body-2"><v-icon left>fa-eye</v-icon>View All</v-btn>
        <v-tooltip color="primary" v-if="closeable" left>
          <template v-slot:activator="{ on }">
            <v-btn text small @click="$emit('close')" v-on="on"><v-icon color="red">fa-times</v-icon></v-btn>
          </template>
          <span>Close This dialog</span>
        </v-tooltip>
      </div>
    </v-subheader>
    <v-list-item v-for="item in data" :key="item.title" class="my-0 py-0 primary lighten-1 white--text">
      <v-list-item-icon class="mx-0 pa-0">
        <v-icon small color="white" v-text="item.icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="white--text text-wrap body-2">{{ item.title }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text class="white--text body-2">{{ item.count }}</v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AnalyticsList',
  props: ['data', 'closeable', 'title'],
});
</script>

<style lang="scss" scoped>
.analytics-list {
  ::v-deep .v-list-item {
    margin-bottom: 1px !important;
  }
}
</style>
