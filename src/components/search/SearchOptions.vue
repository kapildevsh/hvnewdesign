<template>
  <div ref="anchor" class="search-options flex-nowrap gap-1 pl-4 pr-4">
    <v-btn
      v-if="!loggedIn && !hvmq.sm"
      elevation="2"
      rounded
      class="mb-4 d-sm-none"
      color="primary"
      link
      href="/#/register"
      >REGISTER</v-btn
    >
    <v-select
      attach
      :menu-props="{ offsetY: true }"
      hide-details="auto"
      :items="['Male', 'Female']"
      background-color="white"
      class="rounded-0"
      flat
      label="Looking For"
      outlined
      v-model="lookingFor"
    ></v-select>
    <v-select
      attach
      :menu-props="{ offsetY: true }"
      hide-details="auto"
      :items="ageFromItems"
      background-color="white"
      class="rounded-0"
      flat
      label="Age From"
      outlined
      v-model="ageFrom"
    ></v-select>
    <v-select
      attach
      :menu-props="{ offsetY: true }"
      hide-details="auto"
      :items="ageToItems"
      background-color="white"
      class="rounded-0"
      flat
      label="Age To"
      outlined
      v-model="ageTo"
    ></v-select>
    <v-select
      attach
      :menu-props="{ offsetY: true }"
      hide-details="auto"
      :items="religions"
      background-color="white"
      class="rounded-0"
      flat
      label="Religion"
      outlined
      v-model="religion"
    ></v-select>
    <v-btn large color="primary" class="search-btn rounded-0 box-shadow-none" height="56" @click="submit">SEARCH</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { religions, ageRange } from '@/data/common-data';
import { nextId } from '@/utils';
import { hvmq } from '@/mixins';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'SearchOptions',
  mixins: [hvmq],
  data: () => ({
    anchorId: nextId(),
    lookingForItems: ['Men', 'Women'],
    ageFrom: null,
    ageTo: null,
    lookingFor: null,
    religion: null,
    religions,
    ageFromItems: ageRange,
  }),
  computed: {
    ...mapState('login', ['loggedIn']),
    ageToItems() {
      return !this.ageFrom ? ageRange : ageRange.slice(ageRange.indexOf(this.ageFrom));
    },
  },
  methods: {
    submit() {
      this.$router.push({
        path: '/search',
        query: {
          age: this.ageFrom,
          toAge: this.ageTo,
          gender: this.lookingFor === 'Men' ? 'M' : 'F',
          martialReligion: this.religion,
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
.search-options {
  display: grid;
  max-width: 1200px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    .search-btn {
      grid-column: 1 / span 2;
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    .search-btn {
      grid-column: unset;
    }
  }
}
</style>
