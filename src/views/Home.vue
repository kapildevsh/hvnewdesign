<template>
  <data-loading
    class="container flex-grow-1"
    :loadingData="loadingState"
    v-slot="{ data: { user: profile, matches, premiumProfiles, recentlyUpdated } }"
  >
    <h6 class="text-h6 mt-4 mx-5 text-center text-sm-left">
      Hi, {{ loggedInUser | fullName }} <span class="primary--text">({{ loggedInUser.id }})</span
      ><v-icon v-if="profile.verified" color="success" class="ml-2 mb-1">fa-certificate</v-icon>
    </h6>
    <v-divider class="w-100 my-2 mx-5 top-title-divider"></v-divider>
    <div class="dashboard flex-grow-1 pa-5 pt-4 d-flex flex-nowrap gap-2">
      <div class="class flex-grow-0 left-panel mb-4 d-none d-md-block" v-if="hvmq.md">
        <v-sheet elevation="2">
          <v-card class="flex-grow-0" elevation="0">
            <v-img :src="profile.img" height="300px" dark position="top center"> </v-img>
            <v-btn class="view-profile-btn" rounded color="primary " small link href="/#/gallery">View Album</v-btn>
            <v-card-text class="ma-0 pa-0">
              <progress-status :items="profile.progressStatus"></progress-status>
              <analytics-list :data="profile.analytics" class="mb-0 pb-0"> </analytics-list>
            </v-card-text>
          </v-card>
        </v-sheet>
        <v-sheet elevation="2" class="my-2">
          <profiles-list class="recently-updated-list" :data="recentlyUpdated" title="Recently Updated"></profiles-list>
        </v-sheet>
        <explore-list :items="profile.explore"></explore-list>
      </div>
      <div class="dashboard-content flex-grow-1">
        <v-sheet
          elevation="2"
          class="class flex-grow-0 left-panel mb-4 d-md-none d-flex flex-column flex-sm-row flex-nowrap"
          v-if="!hvmq.md"
        >
          <v-card class="flex-grow-0 d-none d-sm-block" elevation="0" v-if="hvmq.sm">
            <v-img :src="profile.img" max-width="300px" dark position="top center"> </v-img>
            <v-btn class="view-profile-btn" rounded color="primary " small link href="/#/gallery">View Album</v-btn>
          </v-card>
          <v-avatar size="200px" class="align-self-center mt-2 d-sm-none" v-if="!hvmq.sm">
            <img :src="profile.img" />
            <v-btn class="view-profile-btn" rounded color="primary " small link href="/#/gallery">View Album</v-btn>
          </v-avatar>
          <div class="flex-1-1 d-flex justify-space-between flex-column">
            <progress-status :items="profile.progressStatus"></progress-status>
            <analytics-list :data="profile.analytics" class="mb-0 pb-0"> </analytics-list>
            <explore-list :items="profile.explore"></explore-list>
          </div>
        </v-sheet>
        <v-sheet elevation="2 pa-2">
          <div class="d-flex gap-4 flex-center">
            <span class="flex-grow-0 text-center text-wrap">Complete your profile</span>
            <complete-progress-bar v-if="hvmq.sm" :value="profile.registerProgress"></complete-progress-bar>
            <v-spacer v-else></v-spacer>
            <v-tooltip color="primary" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="flex-grow-0" color="primary" fab dark v-bind="attrs" v-on="on">
                  <v-icon small> fa-question</v-icon>
                </v-btn>
              </template>
              <span>This is help box about profile completion.</span>
            </v-tooltip>
          </div>
          <complete-progress-bar v-if="!hvmq.sm" :value="profile.registerProgress"></complete-progress-bar>
          <v-divider class="w-100 ma-2"></v-divider>
          <v-carousel continuous cycle :interval="2000" dark height="170" hide-delimiter-background hide-delimiters>
            <template v-slot:prev="{ on, attrs }">
              <v-btn class="white" text icon v-bind="attrs" v-on="on"
                ><v-icon color="secondary darken-2">fa-chevron-left</v-icon></v-btn
              >
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn class="white" text icon v-bind="attrs" v-on="on"
                ><v-icon color="secondary darken-2">fa-chevron-right</v-icon></v-btn
              >
            </template>

            <v-carousel-item v-for="(prompt, index) in profile.prompts" :key="index">
              <facebook-connect-prompt v-if="prompt.type === 'FACEBOOK_CONNECT'"></facebook-connect-prompt>
              <update-address-prompt v-else-if="prompt.type === 'UPDATE_ADDRESS'"></update-address-prompt>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
        <v-sheet elevation="2" class="my-2" v-if="!hvmq.md">
          <profiles-list class="recently-updated-list" :data="recentlyUpdated" title="Recently Updated"></profiles-list>
        </v-sheet>
        <v-sheet class="mt-4" elevation="2">
          <div class="primary flex-center py-3 px-2">
            <h2 class="pt-1 white--text white--text body-1 font-weight-medium">
              Premium Member Wall ({{ premiumProfiles.length }})
            </h2>
            <v-spacer></v-spacer>
            <v-icon color="white" small>fa-star</v-icon>
            <div style="width: 15px"></div>
            <v-tooltip color="primary" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="premiumProfilesCarousal === 0"
                  class="pa-0 mr-1"
                  color="white"
                  elevation="0"
                  fab
                  tile
                  v-bind="attrs"
                  v-on="on"
                  x-small
                  @click="premiumProfilesCarousal = premiumProfilesCarousal - 1"
                  ><v-icon>fa-chevron-up</v-icon></v-btn
                >
              </template>
              <span>Show Previous Profile</span>
            </v-tooltip>

            <v-tooltip color="primary" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="!(premiumProfiles && premiumProfilesCarousal < premiumProfiles.length - 1)"
                  v-bind="attrs"
                  v-on="on"
                  class="pa-0"
                  elevation="0"
                  fab
                  color="white"
                  tile
                  x-small
                  @click="premiumProfilesCarousal = premiumProfilesCarousal + 1"
                  ><v-icon>fa-chevron-down</v-icon></v-btn
                >
              </template>
              <span>Show Next Profile</span>
            </v-tooltip>
          </div>
          <v-carousel
            vertical
            height="480px"
            dark
            hide-delimiter-background
            hide-delimiters
            :show-arrows="false"
            light
            v-model="premiumProfilesCarousal"
            class="premium-profiles-carousel"
          >
            <v-carousel-item v-for="item in premiumProfiles" :key="item.id" light>
              <div class="d-flex flex-column flex-sm-row align-center align-sm-left flex-nowrap pa-2">
                <v-img :src="item.img" max-width="200px" class="ma-2" />
                <div class="ma-2">
                  <h1 class="secondary--text text--darken-4 text-h6 my-2">
                    {{ item.name }} <span class="primary--text lighten-1">({{ item.id }})</span>
                  </h1>
                  <attributes-list :attributes="item.attributes"></attributes-list>
                </div>
              </div>
              <v-list-item v-if="item.promptPremium" class="ma-2 prompt-premium">
                <v-list-item-icon class="ml-1 mr-4 my-0 pa-0 align-self-center">
                  <v-icon large color="secondary">fa-envelope-o</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="secondary--text text--darken-4">
                  <p class="caption text-wrap">
                    {{ item.promptPremium }} sent you a message in the interest of Our Premium Member. We allow only
                    premium or verified users to read messages.
                  </p>
                  <div>
                    <router-link class="caption text-decoration-none" to="/TODO">Upgrade Now</router-link> or
                    <router-link class="caption text-decoration-none" to="/TODO">Get Facebook Verified</router-link>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <div class="flex-center gap-2">
                <v-btn rounded color="primary" dark>Accept</v-btn>
                <v-btn rounded color="secondary darken-4">Decline</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
        <div class="my-2">
          <v-sheet elevation="2">
            <profiles-list title="New Matches" :data="matches.new" :max-height="340"></profiles-list>
          </v-sheet>

          <v-sheet class="my-4" elevation="2">
            <profiles-list title="My Matches" :data="matches.my" :max-height="340"></profiles-list>
          </v-sheet>
        </div>
      </div>
      <div class="right-panel">
        <advertisement />
        <v-sheet elevation="2">
          <partner-search></partner-search>
        </v-sheet>
      </div>
    </div>
  </data-loading>
</template>

<script lang="ts">
import Advertisement from '@/components/Advertisement.vue';
import DataLoading from '@/components/DataLoading.vue';
import ExploreList from '@/components/ExploreList.vue';
import AnalyticsList from '@/components/home/AnalyticsList.vue';
import AttributesList from '@/components/home/AttributesList.vue';
import FacebookConnectPrompt from '@/components/home/FacebookConnectPrompt.vue';
import UpdateAddressPrompt from '@/components/home/UpdateAddressPrompt.vue';
import ProfilesList from '@/components/profiles/ProfilesList.vue';
import ProgressStatus from '@/components/ProgressStatus.vue';
import PartnerSearch from '@/components/search/PartnerSearch.vue';
import { hvmq } from '@/mixins';
import Vue from 'vue';
import { mapState } from 'vuex';
import CompleteProgressBar from '../components/home/CompleteProgressBar.vue';

export default Vue.extend({
  mixins: [hvmq],
  data: () => ({
    premiumProfilesCarousal: 0,
  }),
  components: {
    DataLoading,
    AnalyticsList,
    ProfilesList,
    FacebookConnectPrompt, // : () => import(/* webpackChunkName: "facebook-connect" */ '@/components/home/FacebookConnectPrompt.vue'),
    UpdateAddressPrompt, // : () => import(/* webpackChunkName: "update-address" */ '@/components/home/UpdateAddressPrompt.vue'),
    AttributesList,
    PartnerSearch,
    Advertisement,
    ExploreList,
    ProgressStatus,
    CompleteProgressBar,
  },
  name: 'Home',
  props: ['profileId'],
  computed: {
    ...mapState('login', ['loggedInUser']),
    ...mapState('home', ['loadingState']),
  },

  mounted() {
    this.$store.dispatch('home/init');
  },
});
</script>

<style scoped lang="scss">
.top-title-divider {
  width: calc(100% - 36px);
}

.dashboard {
  flex-direction: column;
  @media (min-width: 800px) {
    flex-direction: row;
  }
}

.view-profile-btn {
  position: absolute;
  left: 50%;
  transform: translateY(-40px) translateX(-50%);
}

.v-avatar .view-profile-btn {
  bottom: 0;
  transform: translateY(-20px) translateX(-50%);
}

.prompt-premium {
  border: 1px solid var(--v-secondary-lighten2);
}

.dashboard-content {
  @media (max-width: 600px) {
    width: 100%;
  }

  @media (min-width: 600px) {
    min-width: 500px;
  }
}

.recently-updated-list ::v-deep .v-list {
  max-height: 300px;
  overflow: auto;
}
</style>

<style lang="scss">
.premium-profiles-carousel .v-responsive__content {
  overflow: auto;
  @media (max-width: 600px) {
    padding-bottom: 16px;
  }
}
</style>
