<template>
  <v-container
    class="dashboard search flex-grow-1 pa-5 pt-16 d-flex flex-nowrap flex-column flex-sm-row gap-2"
    :class="{ 'justify-center align-center': editSearch }"
  >
    <v-sheet v-if="editSearch" elevation="2" class="partner-search-wrapper">
      <partner-search :data="queryFilters" :large="hvmq.sm"></partner-search>
    </v-sheet>
    <data-loading
      v-if="hvmq.sm && !editSearch"
      class="class d-none d-sm-block flex-grow-0 inline left-panel mb-4"
      :loadingData="filters"
      v-slot="{ data }"
    >
      <refine-filters :data="data" storeKey="search/search"></refine-filters>
    </data-loading>
    <data-loading v-if="!editSearch" class="flex-grow-1 dashboard-content" :loadingData="result" v-slot="{ data }">
      <v-sheet
        class="white d-flex align-center justify-sm-space-between white pa-2 ma-1 flex-column flex-sm-row"
        elevation="1"
      >
        <span class="d-flex d-sm-block align-center justify-center gap-2 map-2">
          <h2 class="found-count font-weight-regular text-uppercase primary--text">{{ data.count }} Profiles</h2>
          <h3 class="body-2 tags font-weight-regular mt-1 mt-sm-0">{{ data.tags }}</h3>
        </span>
        <div class="d-flex flex-nowrap gap-2 flex-nowrap mt-2 mt-sm-0">
          <v-btn color="primary" rounded @click="modifySearch()">Modify Search</v-btn>
          <v-btn
            class="left-panel-toggle"
            v-if="!filters.loading && !filters.failed"
            color="primary refile-filters-toggle"
            rounded
            @click="refineFiltersDialog = !refineFiltersDialog"
            >Refine Filters</v-btn
          >
        </div>
      </v-sheet>
      <div class="ma-1 d-flex flex-column flex-nowrap gap-2">
        <v-sheet v-for="item in data.data" :key="item.id" elevation="2" class="pa-4">
          <div class="result-title d-flex flex-column flex-sm-row justify-sm-space-between">
            <div>
              <div class="d-flex flex-nowrap d-flex align-center justify-center justify-sm-start">
                <v-checkbox
                  class="ma-0 pa-0 user-title mr-4"
                  dense
                  hide-details="auto"
                  :ripple="false"
                  :label="item.name"
                ></v-checkbox>
                <v-chip color="white" class="ma-0 pa-0 mr-1"
                  ><v-icon color="secondary" small>fa-certificate</v-icon></v-chip
                >
                <v-chip color="white" class="ma-0 pa-0 mr-1"><v-icon color="secondary" small>fa-phone</v-icon></v-chip>
                <v-chip color="white" class="ma-0 pa-0 mr-1"
                  ><v-icon color="secondary" small>fa-rupee-sign</v-icon></v-chip
                >
              </div>
              <div class="caption d-flex align-center flex-column flex-sm-row ">
                <caption class="mr-3 caption secondary--text lighten-1">
                  Profile created by
                  {{
                    item.profileCreatedBy
                  }}
                </caption>
                <caption class="caption secondary--text lighten-1">
                  <span>Last Login at</span>
                  <v-icon x-small class="mx-2">fa-clock</v-icon
                  ><time v-bind-date-time="item.online" />
                </caption>
              </div>
            </div>
            <trust-score :score="item.trustScore"></trust-score>
          </div>
          <div class="result-content my-4 mx-2 d-flex gap-4 flex-nowrap flex-column flex-md-row">
            <div class="d-flex flex-column flex-sm-row">
              <div class="flex-grow-0 img flex-center flex-column gap-2 mr-3">
                <v-img :src="item.img" width="200"></v-img>
                <gallery-carousel :profileId="item.id">
                  <template v-slot:default="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" rounded dark class="mb-2">
                      <v-icon left small>fa-user-circle</v-icon>View Album</v-btn
                    >
                  </template>
                </gallery-carousel>
              </div>
              <div class="flex-grow-1 d-flex flex-nowrap flex-column">
                <div class="d-flex flex-nowrap">
                  <attributes-list :attributes="item.attributes"></attributes-list>
                  <search-connect-btns
                    :userId="item.id"
                    class="flex-center flex-column gap-2 flex-grow-0 d-none d-md-flex"
                    v-if="hvmq.md"
                  >
                  </search-connect-btns>
                </div>
                <v-divider class="my-2 body-2 d-none d-sm-block" v-if="hvmq.sm"></v-divider>
                <p class="d-none body-2 d-sm-block" v-if="hvmq.sm">{{ item.introduction }}</p>
                <search-connect-btns
                  :userId="item.id"
                  class="flex-center gap-2 flex-grow-0 d-none d-sm-none flex-nowrap"
                  v-if="hvmq.md"
                ></search-connect-btns>
              </div>
            </div>
            <v-divider class="my-1 d-sm-none"></v-divider>
            <p class="d-sm-none body-2">{{ item.introduction }}</p>
            <search-connect-btns
              :userId="item.id"
              class="flex-center gap-2 flex-grow-0 d-flex d-md-none flex-wrap"
              v-if="!hvmq.md"
            >
            </search-connect-btns>
          </div>
        </v-sheet>
      </div>
    </data-loading>
    <v-navigation-drawer  fixed right v-model="refineFiltersDialog" v-if="!hvmq.md && !editSearch">
      <refine-filters
        class="left-panel h-100"
        storeKey="search/search"
        :data="filters.data"
        :closeable="true"
        @close="refineFiltersDialog = false"
      ></refine-filters>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import DataLoading from '@/components/DataLoading.vue';
import GalleryCarousel from '@/components/gallery/GalleryCarousel.vue';
import AttributesList from '@/components/home/AttributesList.vue';
import PartnerSearch from '@/components/search/PartnerSearch.vue';
import RefineFilters from '@/components/search/RefineFilters.vue';
import SearchConnectBtns from '@/components/search/SearchConnectBtns.vue';
import TrustScore from '@/components/TrustScore.vue';
import { hvmq } from '@/mixins';
import Vue from 'vue';
import { Route } from 'vue-router/types/router';
import { mapState } from 'vuex';

export default Vue.extend({
  mixins: [hvmq],
  components: {
    DataLoading,
    SearchConnectBtns,
    RefineFilters,
    AttributesList,
    PartnerSearch,
    TrustScore,
    GalleryCarousel,
  },
  name: 'Search',
  data: () => ({
    refineFiltersDialog: false,
    queryFilters: {} as Route['query'] | undefined,
  }),
  created() {
    this.queryFilters = Object.keys(this.$route.query || {}).length ? this.$route.query : undefined;
    this.$store.dispatch('search/init');
  },

  computed: {
    ...mapState('search', ['filters', 'result']),
    editSearch() {
      return !this.queryFilters || this.queryFilters.modify === 'true';
    },
  },
  watch: {
    $route(value) {
      this.queryFilters = Object.keys(value.query || {}).length ? value.query : undefined;
    },
  },
  methods: {
    modifySearch() {
      this.$router.replace({ path: '/search', query: { ...this.queryFilters, modify: 'true' } });
    },
  },
});
</script>

<style scoped lang="scss">
.partner-search-wrapper {
  width: 850px;
  max-width: 100%;
}
</style>
