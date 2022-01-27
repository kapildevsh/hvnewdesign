<template>
  <v-list dense flat class="ma-2 pa-0 progress-list progress-status-list">
    <v-list-item-group color="primary">
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-icon class="ml-0 mx-0 mb-0 mt-1 pa-0">
          <v-icon v-if="item.completed" color="secondary" small>fa-check</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="item.completed" class="secondary--text text--darken-4">
          {{ item.text }}
        </v-list-item-content>
        <v-list-item-content v-else class="secondary--text text--darken-4">
          <router-link :to="item.link">{{ item.text }}</router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'ProgressStatus',
  props: ['items'],
};
</script>
