<template>
  <div>
    <v-subheader
      v-if="header"
      class="d-flex flex-nowrap align-center justify-space-between font-weight-medium primary white--text text-center pa-2"
      ><h2 class="body-2">{{ title }} ({{ data.length }})</h2>
      <div class="flex-center gap-2">
        <v-btn v-if="viewAllBtn" small text color="white" class="body-2" link :href="'/#/search?type=' + title"
          ><v-icon left>fa-eye</v-icon>View All</v-btn
        >
        <v-tooltip color="primary" v-if="closeable" left>
          <template v-slot:activator="{ on }">
            <v-btn text small @click="$emit('close')" v-on="on"><v-icon color="white">fa-times</v-icon></v-btn>
          </template>
          <span>Close This dialog</span>
        </v-tooltip>
      </div>
    </v-subheader>
    <v-list dense class="pt-0 bordered-list mb-loaded-profiles overflow-auto" outlined :max-height="maxHeight">
      <v-list-item v-for="item in data" :key="item.id" class="my-0 py-1" link :href="item.id | createUrl(urlBuilder)">
        <v-list-item-avatar size="50px" class="align-self-start">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-wrap body-2">{{ item.name }}</v-list-item-title>
          <v-list-item-title class="text-wrap body-2 primary--text text--darken-1">{{ item.id }}</v-list-item-title>
          <v-list-item-subtitle v-for="t in item.attributes" :key="t">{{ t }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfilesList',
  props: {
    data: Array,
    closeable: Boolean,
    title: {
      type: String,
      default: 'Uploaded Profiles',
    },
    showCount: {
      type: Boolean,
      default: true,
    },
    viewAllBtn: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Boolean,
      default: true,
    },
    urlBuilder: {
      type: Function,
      required: false,
    },
    maxHeight: Number,
  },
  filters: {
    createUrl(id: string, builder = (id: string) => `/#/profile/${id}`) {
      return builder(id);
    },
  },
});
</script>
