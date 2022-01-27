<template>
  <v-sheet class="pa-4 mb-profile-card" elevation="2">
    <div class="result-title">
      <h2
        v-if="profile.matched"
        class="font-weight-medium secondary white--text body-1 font-weight-medium darken-4 pa-2 mb-4"
      >
        Matched Profile for {{ profile.matched.name }}
        <span class="primary--text text--darken-1">({{ profile.matched.id }})</span>
      </h2>
      <div class="d-flex flex-column flex-md-row justify-md-space-between">
        <div class="flex-center flex-nowrap  contact-icons">
          <v-checkbox
            class="ma-0 pa-0 user-title mr-4"
            :label="profile.name"
            :ripple="false"
            dense
            hide-details="auto"
          ></v-checkbox>
          <v-chip tile class="ma-0 pa-0 mr-1  justify-center" color="white"
            ><v-icon color="primary" small>fa-certificate</v-icon></v-chip
          >
          <v-chip tile class="ma-0 pa-0 mr-1 justify-center" color="white"
            ><v-icon color="primary" small>fa-phone</v-icon></v-chip
          >
          <v-chip tile class="ma-0 pa-0 mr-1  justify-center" color="white"
            ><v-icon color="primary" small>fa-rupee-sign</v-icon></v-chip
          >
        </div>
        <search-connect-btns
          class="flex-center flex-nowrap gap-2 flex-column d-none d-md-flex flex-md-row"
          v-if="hvmq.sm"
          :userId="profile.id"
          btnWrapperClass="flex-wrap flex-lg-nowrap"
          :showConnectWithTitle="false"
        ></search-connect-btns>
      </div>
      <div class="caption d-flex align-center justify-center mt-2 flex-column flex-sm-row justify-md-start">
        <caption class="mr-3 caption secondary--text lighten-1">
          Profile created by
          {{
            profile.profileCreatedBy
          }}
        </caption>
        <caption class="caption secondary--text lighten-1">
          <v-icon x-small left color="primary">fa-clock</v-icon
          >Online &emsp;
          <time v-bind-date-time="profile.online"> </time>
        </caption>
      </div>
    </div>
    <div class="result-content my-4 mx-2 d-flex gap-4 flex-nowrap flex-column flex-md-row">
      <div class="d-flex flex-column flex-md-row">
        <div class="flex-grow-0 img flex-center flex-column gap-2 mr-3 mb-2 mb-md-0">
          <v-img :src="profile.img" width="200"></v-img>
          <gallery-carousel :profileId="profile.id">
            <template v-slot:default="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary" class="btn--long" rounded dark link>
                <v-icon left small>fa-user-circle</v-icon>View Album</v-btn
              >
            </template>
          </gallery-carousel>

          <search-connect-btns
            v-if="!hvmq.sm"
            class="mb-4"
            :userId="profile.id"
            :showConnectWithTitle="false"
            btnWrapperClass="flex-nowrap flex-column"
            :btnLong="true"
          ></search-connect-btns>
        </div>
        <div class="flex-grow-1 d-flex flex-nowrap flex-column">
          <div class="d-flex flex-nowrap">
            <attributes-list :attributes="profile.attributes"></attributes-list>
          </div>
          <v-divider class="my-2 body-2"></v-divider>
          <p class="body-2">{{ profile.introduction }}</p>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import GalleryCarousel from '@/components/gallery/GalleryCarousel.vue';
import { hvmq } from '@/mixins';
import Vue from 'vue';
import AttributesList from '../home/AttributesList.vue';
import SearchConnectBtns from '../search/SearchConnectBtns.vue';

export default Vue.extend({
  components: { AttributesList, SearchConnectBtns, GalleryCarousel },
  mixins: [hvmq],
  name: 'MbProfileCard',
  props: ['profile'],
});
</script>

<style lang="scss" scoped>
.contact-icons ::v-deep .v-chip {
  min-width: 18px;
  cursor: pointer;
  &::before {
    display: none;
  }
}
</style>
