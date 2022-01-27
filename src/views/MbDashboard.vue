<template>
  <v-container
    class="dashboard mb-dashboard flex-grow-1 pa-5 pt-16 d-flex flex-nowrap flex-column flex-sm-row gap-2 bureau-container"
  >
    <data-loading class="class flex-grow-0 left-panel mb-4" :loadingData="analytics" v-slot="{ data }">
      <v-sheet elevation="1" class="pa-2">
        <analytics-list :data="data" title="Analytics" />
      </v-sheet>
      <v-sheet
        v-if="!uploadedProfiles.loading && !uploadedProfiles.failed && hvmq.sm && !hvmq.lg"
        elevation="1"
        class="pa-2 d-none d-sm-block mt-4 d-lg-none"
      >
        <profiles-list :data="uploadedProfiles.data" />
      </v-sheet>
    </data-loading>
    <data-loading class="flex-grow-1 dashboard-content" :loadingData="result" v-slot="{ data }">
      <div class="mx-1 d-flex flex-column flex-nowrap gap-2">
        <mb-profile-card v-for="item in data.data" :key="item.id" :profile="item"></mb-profile-card>
      </div>
    </data-loading>

    <data-loading
      class="class d-block d-sm-none d-lg-block flex-grow-0 left-panel mb-4"
      v-if="!hvmq.sm || hvmq.lg"
      :loadingData="uploadedProfiles"
      v-slot="{ data }"
    >
      <v-sheet elevation="1" class="pa-2">
        <profiles-list :data="data" />
      </v-sheet>
    </data-loading>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DataLoading from '@/components/DataLoading.vue';
import { mapState } from 'vuex';
import AnalyticsList from '@/components/home/AnalyticsList.vue';
import ProfilesList from '@/components/profiles/ProfilesList.vue';
import MbProfileCard from '@/components/marriage-bureau/MbProfileCard.vue';
import { hvmq } from '@/mixins';

export default Vue.extend({
  mixins: [hvmq],
  components: { DataLoading, AnalyticsList, ProfilesList, MbProfileCard },
  name: 'MarriageBureauDashboard',
  data: () => ({
    uploadedProfilesDialog: false,
    analyticsDialog: false,
  }),
  created() {
    this.$store.dispatch('bureau/analytics');
    this.$store.dispatch('bureau/uploadedProfiles');
    this.$store.dispatch('mb-search/init', {});
    this.$store.dispatch('mb-search/search', {});
  },

  computed: {
    ...mapState('bureau', ['analytics', 'uploadedProfiles']),
    ...mapState('mb-search', ['result']),
  },
});
</script>

<style lang="scss" scoped></style>
