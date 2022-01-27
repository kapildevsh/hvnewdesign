<template>
  <v-sheet elevation="1" class="pa-2">
    <h2
      class="font-weight-medium primary white--text text-center body-2 font-weight-medium darken-4 pa-2 mb-4"
      :class="{ 'd-flex align-center align-center justify-space-between': closeable }"
    >
      Refine Filters
      <v-tooltip color="primary" left v-if="closeable">
        <template v-slot:activator="{ on }">
          <v-btn class="float-right mb-1" text small @click="$emit('close')" v-on="on"
            ><v-icon color="red">fa-times</v-icon></v-btn
          >
        </template>
        <span>Close This dialog</span>
      </v-tooltip>
    </h2>
    <v-expansion-panels tile class="search-filters custom-expansion-panel" v-model="expanded" multiple>
      <v-expansion-panel v-for="section in data" :key="section.id">
        <v-expansion-panel-header color="primary" class="white--text" expand-icon="fa-plus">
          {{ section.title }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="search-filters-content">
          <ul class="my-2 pa-0 ml-2 unstyled-list filters-list">
            <li v-for="filterItem in section.items" :key="filterItem">
              <v-checkbox
                class="ma-0 pa-0 refine-filter-item"
                dense
                hide-details="auto"
                :ripple="false"
                :label="filterItem"
                @change="update($event, filterItem, section.field)"
              ></v-checkbox>
            </li>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import { Dictionary } from 'vue-router/types/router';

class RefineFilterData {
  expanded = Array.from({ length: 10 }, (_, n) => n);
  selectedFilters: Dictionary<string[]> = {};
}

export default Vue.extend({
  name: 'RefineFilters',
  props: ['data', 'closeable', 'storeKey'],
  data: () => new RefineFilterData(),
  computed: {},
  methods: {
    update(checked: boolean, filterItem: string, field: string) {
      const data = this.selectedFilters?.[field] || [];
      if (checked) data.push(filterItem);
      else if (data.indexOf(filterItem) >= 0) data.splice(data.indexOf(filterItem), 1);

      if (data.length) this.selectedFilters[field] = data;
      else delete this.selectedFilters[field];

      this.$store.dispatch(this.storeKey, this.selectedFilters);
    },
  },
});
</script>

<style>
.refine-filter-item .v-label {
  color: black;
}
</style>
