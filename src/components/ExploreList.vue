<template>
  <v-sheet elevation="2" class="explore-list">
    <div
      class="d-flex flex-nowrap align-center justify-space-between font-weight-medium primary white--text text-center pa-2"
    >
      <h2 class="body-2">Explore</h2>
    </div>
    <v-list dense flat class="ma-2 pa-0 progress-list pb-2">
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content class="secondary--text text--darken-4">
            <router-link :to="item.link" class="text-decoration-none secondary--text text--darken-3">{{
              item.text
            }}</router-link>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text class="white--text body-2"
              ><v-chip x-small color="primary">{{ item.count }}</v-chip>
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
export default {
  name: 'ExploreList',
  props: ['items'],
};
</script>
