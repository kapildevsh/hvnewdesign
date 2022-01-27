<template>
  <div class="view-profile-main-attributes">
    <div class="d-flex flex-nowrap justify-space-between" v-if="showTitle">
      <div>
        <h2 class="font-weight-medium">
          {{ data | fullName }} <span class="primary--text">({{ data.id }})</span>
        </h2>
        <p class="caption secondary--text">Profile created by {{ data.profileCreatedBy }}</p>
      </div>
      <trust-score :score="data.trustScore" height="55px"></trust-score>
    </div>

    <template v-if="interestRequestSent && showTitle">
      <p class="text-h5 text-center text-sm-left">You have sent interest to this profile</p>
      <div class="flex-center d-sm-block">
        <v-btn small rounded color="success" dark class="mr-2">
          <v-icon small left>fa-check-circle</v-icon>
          Interest Request Sent
        </v-btn>
        <v-btn small rounded color="error" dark>
          <v-icon small left>fa-times-circle-o</v-icon>
          Cancel Interest
        </v-btn>
      </div>
    </template>

    <div v-if="!iAmOwner && showTitle" elevation="2" class="d-flex flex-nowrap align-center">
      <v-btn small outlined text icon> <v-icon small>fa-lock</v-icon></v-btn>
      <div class="actions-btns-1 mt-4 mb-3 d-flex flex-wrap gap-2 pa-2">
        <v-btn small color="primary" dark> <v-icon small left>fa-paper-plane</v-icon>Send Message</v-btn>
        <v-btn small color="primary" dark>
          <v-icon small left>fa-envelope</v-icon
          ><span class="d-none d-md-inline-block mr-1" v-if="hvmq.md">View</span>Email</v-btn
        >
        <v-btn small color="primary" dark>
          <v-icon small left>fa-phone</v-icon
          ><span class="d-none d-md-inline-block mr-1" v-if="hvmq.md">View</span>Phone</v-btn
        >
        <v-btn small color="primary" dark>
          <i
            data-v-e9635642=""
            aria-hidden="true"
            class="v-icon v-icon--left fab fa-whatsapp theme--dark"
            style="font-size: 16px"
          ></i>
          <span class="d-none d-md-inline-block mr-1" v-if="hvmq.md">View</span>WhatsApp</v-btn
        >
      </div>
    </div>
    <div v-if="showAttrs" class="ma-5 main-attributes d-grid" :class="hvmq.sm ? 'grid-columns-2' : 'grid-columns-1'">
      <v-tooltip color="primary" top>
        <template v-slot:activator="{ on, attrs }">
          <v-chip color="white" v-bind="attrs" v-on="on">
            <v-icon color="primary" small left>fa-user</v-icon>
            {{ data.dob | dobToAge }} years, {{ data.height | cmsToFeetInch }}
          </v-chip>
        </template>
        <span>Age &amp; Height</span>
      </v-tooltip>

      <v-tooltip color="primary" top v-for="item of fields" :key="item.name">
        <template v-slot:activator="{ on, attrs }">
          <v-chip v-bind="attrs" v-on="on" color="white" :data-field="item.field">
            <v-icon color="primary" small left>{{ item.icon }}</v-icon>
            {{ item.field === 'cast_community' ? joinedCastes : data[item.field] }}
          </v-chip>
        </template>
        <span>{{ item.name }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { hvmq } from '@/mixins';
import axios from 'axios';
import Vue from 'vue';
import { User } from '../../models';
import { joinCastes } from '../../utils';
import TrustScore from '../TrustScore.vue';

export default Vue.extend({
  components: { TrustScore },
  mixins: [hvmq],
  name: 'ViewProfileMainAttributes',
  data: () => ({
    interestRequestSent: false,
    fields: Object.freeze([
      { name: 'Marital Status', field: 'maritalStatus', icon: 'fa-ring' },
      { name: 'Religion', field: 'religion', icon: 'fa-pray' },
      { name: 'Cast & Community', field: 'cast_community', icon: 'fa-users' },
      { name: 'Education', field: 'education', icon: 'fa-graduation-cap' },
      { name: 'Occupation', field: 'occupation', icon: 'fa-briefcase' },
      { name: 'Salary', field: 'annualIncome', icon: 'fa-credit-card' },
      { name: 'Mother Tongue', field: 'motherTongue', icon: 'fa-american-sign-language-interpreting' },
      { name: 'Country', field: 'country', icon: 'fa-globe' },
      { name: 'Current Location', field: 'familyLocation', icon: 'fa-map-marker-alt' },
    ]),
  }),
  props: {
    data: Object,
    iAmOwner: Boolean,
    showTitle: {
      type: Boolean,
      default: true,
    },
    showAttrs: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    joinedCastes() {
      return this.data && joinCastes(this.data);
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(value: User) {
        if (!value) return;

        if (this.iAmOwner || !value?.id) this.interestRequestSent = false;
        else {
          axios
            .get('interestRequestSent/' + value.id)
            .then(res => {
              this.interestRequestSent = typeof res.data === 'boolean' ? res.data : res.data?.toLowerCase() === 'true';
            })
            .catch(() => {
              this.interestRequestSent = false;
            });
        }
      },
    },
  },
});
</script>

<style scoped></style>
