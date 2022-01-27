<template>
  <div class="w-100 flex-grow-0 transparent">
    <div
      class="d-flex flex-nowrap align-center justify-space-between font-weight-medium primary white--text text-center pa-2"
    >
      <h2 class="body-2">Contacts</h2>
      <v-spacer />
      <v-btn text color="white" link small class="pa-0 ma-0"><v-icon left>fa-edit</v-icon>Edit</v-btn>
    </div>
    <mb-contact-list :data="data" class="px-4 mb-4 pb-4" titleClass="text-h6 primary--text" />
    <data-loading :loadingData="similarBureaus" v-slot="{ data }" class="elevation-2">
      <v-list dense flat class="bordered-list">
        <v-subheader
          class="d-flex flex-nowrap align-center justify-space-between font-weight-medium primary white--text text-center pa-2"
          ><h2 class="body-2">Similar Marriage Bureau</h2>
        </v-subheader>
        <v-list-item v-for="item in data" :key="item.id" link :href="'/#/marriage-bureau/' + item.id">
          <v-list-item-content>
            <h3 class="mb-2 text-wrap primary--text font-weight-regular text--h5">{{ item.name }}</h3>
            <rating-stars :value="item.rating"></rating-stars>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </data-loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DataLoading from '../DataLoading.vue';
import RatingStars from '../RatingStars.vue';
import MbContactList from './MbContactList.vue';

export default Vue.extend({
  components: { DataLoading, RatingStars, MbContactList },
  name: 'MarriageBureauRightPanel',
  props: ['data', 'similarBureaus'],
});
</script>

<style></style>
