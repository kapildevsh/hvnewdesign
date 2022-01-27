<template>
  <div class="w-100 filter-profiles-wrapper">
    <v-container class="pt-8 pb-8 pt-sm-16 pb-sm-16">
      <h2 class="font-font-weight-bold text-center">Browse Profile by</h2>
      <div class="mt-4 mt-sm-8 contact-options-wrapper flex-wrap flex-column flex-nowrap flex-center">
        <div
          v-for="(item, index) in profileFilters"
          :key="item.title"
          class="d-flex align-center profile-filter-section"
          data-murphy="right-to-left"
          :data-murphy-animation-delay="index * 100 + 100"
        >
          <v-chip color="primary" class="white--text font-weight-bold mr-2">{{ item.title }}</v-chip>
          <div class="d-flex flex-wrap justify-center justify-md-start profile-filter-chips my-2">
            <a
              v-for="text in item.items"
              :key="text"
              class="profile-filter-item pr-2 ma-1"
              :href="'/#/search?' + item.title + '=' + text"
              >{{ text }}</a
            >
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { profileFilters } from '@/data/common-data';

export default {
  name: 'ProfileFilters',
  data: () => ({ profileFilters }),
};
</script>

<style>
.filter-profiles-wrapper {
  background-color: whitesmoke;
}
</style>
