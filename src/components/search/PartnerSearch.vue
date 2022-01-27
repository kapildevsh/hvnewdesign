<template>
  <div class="partner-search">
    <h3 class="pa-2">Partner Search</h3>
    <v-divider class="w-100 mt-1 mb-2"></v-divider>
    <div class="section-1 d-grid align-center justify-center gap-2 px-2">
      <div class="col-span-2" :class="{ 'd-flex flex-nowrap gap-2': large }">
        <label for="age-range" class="range-label align-self-end" :class="large ? 'mb-2' : 'text-center w-100 d-block'"
          >Age Range</label
        >
        <v-range-slider
          id="age-range"
          :max="MAX_AGE"
          :min="MIN_AGE"
          class="flex-grow-1 mt-8 mx-2"
          :class="large ? 'mt-8' : 'mt-10'"
          hide-details
          thumb-label="always"
          v-model="ageRange"
        >
          <template v-slot:prepend>
            <span>{{ MIN_AGE }}</span>
          </template>
          <template v-slot:append>
            <span>{{ MAX_AGE }}</span>
          </template>
        </v-range-slider>
      </div>
      <div class="col-span-2" :class="{ 'd-flex flex-nowrap': large }">
        <label
          for="height-range"
          class="range-label align-self-end"
          :class="large ? 'mb-2' : 'text-center w-100 d-block'"
          >Height Range
        </label>
        <v-range-slider
          id="height-range"
          :max="MAX_HEIGHT"
          :min="MIN_HEIGHT"
          class="flex-grow-1 mx-2"
          :class="large ? 'mt-6' : 'mt-10'"
          hide-details
          thumb-label="always"
          v-model="heightRange"
        >
          <template v-slot:thumb-label="{ value }">
            <span>{{ value | convertHeight }}</span>
          </template>
          <template v-slot:prepend>
            <span>{{ MIN_HEIGHT | convertHeight }}</span>
          </template>
          <template v-slot:append>
            <span>{{ MAX_HEIGHT | convertHeight }}</span>
          </template>
        </v-range-slider>
      </div>
    </div>
    <div class="section-2 mt-2 d-flex flex-column flex-nowrap gap-2 px-2">
      <horizontal-icon-wrapper icon="fa-venus-mars">
        <label class="body-2 mt-1" for="about-me-gender">Gender</label>
        <v-radio-group
          id="about-me-gender"
          class="register-gender my-0 mx-2 flex-nowrap"
          row
          dense
          required
          v-model="gender"
          hide-details="true"
        >
          <v-radio label="Male" value="M" dense></v-radio>
          <v-radio label="Female" value="F" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>

      <v-select
        hide-details="auto"
        attach
        class="border-radius-0 hps-select-martial-status"
        :menu-props="{ offsetY: true }"
        dense
        id="hps-select-martial-status"
        outlined
        placeholder="Select Marital Status"
        :items="['Single', 'Divorced']"
        required
        v-model="maritalStatus"
      ></v-select>

      <v-select
        hide-details="auto"
        attach
        class="border-radius-0 hps-select-martial-religion"
        :menu-props="{ offsetY: true }"
        dense
        id="hps-select-martial-religion"
        outlined
        placeholder="Select Martial Religion"
        :items="religionsItems"
        required
        v-model="martialReligion"
      ></v-select>

      <v-select
        hide-details="auto"
        attach
        class="border-radius-0 hps-select-martial-mother-tongue"
        :menu-props="{ offsetY: true }"
        dense
        id="hps-select-martial-mother-tongue"
        outlined
        placeholder="Select Martial Mother Tongue"
        :items="languagesItems"
        required
        v-model="martialMotherTongue"
      ></v-select>

      <v-select
        hide-details="auto"
        attach
        class="border-radius-0 hps-select-community"
        :menu-props="{ offsetY: true }"
        dense
        id="hps-select-community"
        outlined
        placeholder="Select Community"
        :items="casteItems"
        required
        v-model="community"
      ></v-select>

      <v-select
        hide-details="auto"
        attach
        class="border-radius-0 hps-select-country"
        :menu-props="{ offsetY: true }"
        dense
        id="hps-select-country"
        outlined
        placeholder="Select Country"
        :items="countriesItems"
        required
        v-model="country"
      ></v-select>
      <span></span>
      <v-checkbox
        class="mx-2 my-0 pa-0 hps-checkbox"
        hide-details="auto"
        dense
        v-model="onlyProfilesWithPhotos"
        label="Only profile with photos"
      ></v-checkbox>
      <v-checkbox
        class="mx-2 my-0 pa-0 hps-checkbox"
        hide-details="auto"
        dense
        v-model="noFilteredMeProfiles"
        label="Hide profile that have filtered me"
      ></v-checkbox>
    </div>
    <div class="w-100 flex-center my-4"><v-btn color="primary" dark rounded @click="submit">Search</v-btn></div>
    <div class="w-100 d-flex align-center justify-space-between primary px-2 py-1">
      <v-btn link small plain dark href="/#/TODO/profile-id-search"
        >Profile ID Search <v-icon small class="v-icon--right ml-1 text--white">fa-chevron-right</v-icon></v-btn
      >
      <v-btn link small plain dark href="/#/TODO/more-options"
        >More Options <v-icon small class="v-icon--right ml-1  text--white">fa-chevron-right</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { ageRange } from '@/data/common-data';
import { commonDataMixin, hvmq } from '@/mixins';
import { parseQueryToPartnerSearchData, PartnerSearchData } from '@/models';
import Vue from 'vue';
import { Dictionary } from 'vue-router/types/router';
import { cmsToFeetInch } from '../../utils';
import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

class PartnerSearchData2 extends PartnerSearchData {
  ageRange: [number, number] = [0, 0];
  heightRange: [number, number] = [0, 0];
}

export default Vue.extend({
  components: { HorizontalIconWrapper },
  name: 'PartnerSearch',
  mixins: [commonDataMixin, hvmq],
  props: ['data', 'large'],
  data: () => new PartnerSearchData2(),
  filters: {
    convertHeight: cmsToFeetInch,
  },
  watch: {
    data: {
      immediate: true,
      handler(value: Dictionary<string | string[]>) {
        value && Object.assign(this, parseQueryToPartnerSearchData(value));
        this.ageRange = [this.age, this.toAge];
        this.heightRange = [this.height, this.toHeight];
      },
    },
  },
  computed: {
    ageToItems() {
      return !this.age ? ageRange : ageRange.slice(ageRange.indexOf(this.age));
    },
  },
  methods: {
    submit() {
      this.$router.push({
        path: '/search',
        query: Object.keys(new PartnerSearchData()).reduce((acc, key) => {
          acc[key] = (this as any)[key];
          return acc;
        }, {} as Dictionary<any>),
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.height-feet-label {
  min-width: 70px;
}

.range-label {
  min-width: 120px;
}
.section-1 {
  grid-template-columns: 1fr 1fr;

  .col-span-2 {
    grid-column: 1 / span 2;
  }
}

.section-2 {
  ::v-deep #about-me-gender {
    flex-wrap: nowrap;
  }

  ::v-deep .v-select__selections input::placeholder {
    color: black;
  }
  .hps-checkbox ::v-deep .v-label {
    font-size: 0.9rem;
    color: black;
  }
}
</style>
