<template>
  <v-container
    class="dashboard mb-search flex-grow-1 pa-5 pt-8 d-flex flex-nowrap flex-column flex-sm-row gap-2 bureau-container"
  >
    <data-loading
      class="class d-none d-sm-block flex-grow-0 inline left-panel mb-4"
      :loadingData="filters"
      v-if="hvmq.sm"
    >
      <template v-slot="{ data }">
        <v-sheet v-if="!allProfiles.loading && !allProfiles.failed" elevation="1" class="pa-2">
          <div>
            <v-text-field
              hide-details="auto"
              dense
              outlined
              placeholder="Search profile"
              append-icon="fa-search"
              class="mb-2"
              v-model="search"
            ></v-text-field>
            <v-select
              attach
              :menu-props="{ offsetY: true }"
              class="mb-2"
              hide-details="auto"
              dense
              outlined
              placeholder="Search Profile by"
              :items="searchByItems"
              v-model="searchBy"
            ></v-select>
          </div>
          <profiles-list
            class="overflow-auto"
            :header="false"
            :data="filteredProfiles"
            :style="{ height: '460px' }"
            :urlBuilder="id => '/#/marriage-bureau/search?for=' + id"
          />
        </v-sheet>
        <v-sheet elevation="1" class="pa-2 d-lg-none mt-4" v-if="!hvmq.lg">
          <refine-filters :data="data" storeKey="mb-search/search" />
        </v-sheet>
      </template>
    </data-loading>
    <data-loading class="flex-grow-1 dashboard-content" :loadingData="result" v-slot="{ data }">
      <div class="ma-1 d-flex flex-column flex-nowrap gap-2">
        <v-sheet class="left-panel-toggle gap-2 pa-2 justify-end" elevation="2">
          <v-btn
            color="primary"
            rounded
            @click="
              dialogContent = 'filters';
              dialogOpen = true;
            "
            >Refine Filters</v-btn
          >
          <v-btn
            color="primary"
            rounded
            @click="
              dialogContent = 'profiles';
              dialogOpen = true;
            "
            >Uploaded Profiles</v-btn
          >
        </v-sheet>
        <mb-profile-card v-for="item in data.data" :key="item.id" :profile="item"></mb-profile-card>
      </div>
    </data-loading>

    <data-loading
      v-if="hvmq.lg"
      class="class d-none d-lg-block flex-grow-0 inline left-panel mb-4"
      :loadingData="filters"
      v-slot="{ data }"
    >
      <v-sheet elevation="1" class="pa-2">
        <refine-filters :data="data" storeKey="mb-search/search" />
      </v-sheet>
    </data-loading>

    <advertisement v-if="hvmq.mw1570"></advertisement>

    <v-dialog  v-if="!hvmq.md" hide-overlay transition="dialog-bottom-transition" v-model="dialogOpen">
      <profiles-list
        :closeable="true"
        v-if="dialogContent === 'profiles'"
        :data="allProfiles.data"
        class="h-100"
        @close="
          dialogContent = '';
          dialogOpen = false;
        "
      ></profiles-list>
      <refine-filters
        :closeable="true"
        v-if="dialogContent === 'filters'"
        :data="filters.data"
        class="h-100"
        @close="
          dialogContent = '';
          dialogOpen = false;
        "
        storeKey="mb-search/search"
      ></refine-filters>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DataLoading from '@/components/DataLoading.vue';
import { mapState } from 'vuex';
import ProfilesList from '@/components/profiles/ProfilesList.vue';
import MbProfileCard from '@/components/marriage-bureau/MbProfileCard.vue';
import RefineFilters from '@/components/search/RefineFilters.vue';
import { hvmq } from '@/mixins';
import Advertisement from '../components/Advertisement.vue';
import { Profile } from '../models';

export default Vue.extend({
  mixins: [hvmq],
  components: { DataLoading, ProfilesList, MbProfileCard, RefineFilters, Advertisement },
  name: 'MarriageBureauDashboard',
  data: () => ({
    dialogContent: '',
    dialogOpen: false,
    allProfilesDialog: false,
    filtersDialog: false,
    search: undefined as string,
    searchBy: 'name' as 'id' | 'name',
    searchByItems: Object.freeze([
      { text: 'Search By ID', value: 'id' },
      { text: 'Search By Name', value: 'name' },
    ]),
  }),
  created() {
    this.$store.dispatch('mb-search/init');
  },
  watch: {
    $route: {
      immediate: true,
      handler(value) {
        this.$store.dispatch('mb-search/search', value.query || {});
      },
    },
  },
  computed: {
    ...mapState('bureau', ['allProfiles']),
    ...mapState('mb-search', ['result', 'filters', 'allProfiles']),
    filteredProfiles() {
      if (!this.searchBy || !this.search?.trim() || !this.allProfiles?.data) return this.allProfiles?.data;

      const search = this.search.trim().toLowerCase();
      return this.allProfiles.data.filter((p: Profile) => p[this.searchBy].toLowerCase().includes(search));
    },
  },
});
</script>
