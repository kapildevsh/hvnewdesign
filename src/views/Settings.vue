<template>
  <div class="settings-container d-flex flex-nowrap gap-4 position-relative justify-md-center ma-4">
    <v-navigation-drawer
      
      disable-resize-watcher
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      :absolute="!hvmq.mw1000"
      width="265px"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar size="var(--app-bar-logged-in-user-avatar-size)">
          <img :src="loggedInUser.img" :alt="loggedInUser.name" />
        </v-list-item-avatar>
        <v-list-item-title>{{ loggedInUser.name }}</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon small>fa-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group :value="selected ? selected.index : 0">
          <v-list-item
            v-for="item in links"
            :key="item.title"
            link
            :href="'/#/settings/' + item.link"
            class="primary--text"
          >
            <v-list-item-icon>
              <v-icon class="settings-nav-icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-sheet
      elevation="2"
      class="flex-grow-1 w-0"
      :style="{ 'margin-left': hvmq.mw1000 ? '0' : '76px' }"
      max-width="800px"
    >
      <template v-if="loadingState && loadingState.data">
        <v-progress-linear
          :value="loadingState.data.registerProgress"
          :color="loadingState.data.registerProgress | progressColor"
        ></v-progress-linear>
        <div class="d-flex flex-row-reverse w-100">
          <v-chip
            label
            :color="loadingState.data.registerProgress | progressColor"
            :text-color="loadingState.data.registerProgress | progressTextColor"
            style="margin-top:2px"
          >
            {{ Math.ceil(loadingState.data.registerProgress) }}% Completed
          </v-chip>
        </div>
      </template>
      <data-loading :loadingData="loadingState" :handleUnauthorized="true" v-slot="{ data }" class=" pa-4 ">
        <component v-if="selected" :is="selected.component" v-bind="{ userData: data }"></component>
        <not-found v-else></not-found>
      </data-loading>
    </v-sheet>
    <v-sheet elevation="2" v-if="hvmq.lg" class="align-self-baseline">
      <advertisement></advertisement>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Advertisement from '@/components/Advertisement.vue';
import { hvmq } from '@/mixins';
import SettingsAboutMe from '../components/settings/SettingsAboutMe.vue';
import SettingsEducationCareer from '../components/settings/SettingsEducationCareer.vue';
import DataLoading from '../components/DataLoading.vue';
import NotFound from '../components/NotFound.vue';
import SettingsFamily from '../components/settings/SettingsFamily.vue';
import SettingsReligion from '../components/settings/SettingsReligion.vue';
import SettingsLifeStyle from '../components/settings/SettingsLifeStyle.vue';
import SettingsPartnerPreference from '../components/settings/SettingsPartnerPreference.vue';

const links = Object.freeze(
  [
    { title: 'About Me', icon: 'fa-heart', link: 'about-me', component: SettingsAboutMe, index: 0 },
    {
      title: 'Education and Career',
      icon: 'fa-graduation-cap',
      link: 'education-and-career',
      component: SettingsEducationCareer,
    },
    {
      title: 'Family',
      icon: 'fa-home',
      link: 'family',
      component: SettingsFamily,
    },
    {
      title: 'Religion',
      icon: 'fa-pray',
      link: 'religion-community',
      component: SettingsReligion,
    },
    {
      title: 'Life Style',
      icon: 'fa-glass-martini-alt',
      link: 'life-style',
      component: SettingsLifeStyle,
    },
    {
      title: 'Partner Preference',
      icon: 'fa-heart',
      link: 'partner-preference',
      component: SettingsPartnerPreference,
    },
  ].map((item, index) => ({ ...item, index }))
);

export default Vue.extend({
  components: { Advertisement, DataLoading, NotFound },
  name: 'Settings',
  props: {
    settingsName: {
      type: String,
      required: true,
    },
  },
  mixins: [hvmq],
  data: () => ({
    drawer: true,
    links,
    mini: window.innerWidth < 1000,
    manualMini: false,
  }),
  computed: {
    ...mapState('login', ['loggedInUser']),
    ...mapState('profile', ['loadingState']),
    selected() {
      return links.find(item => item.link === this.settingsName);
    },
  },
  watch: {
    hvmq: {
      immediate: true,
      handler(value, oldValue) {
        if (value.mw1000 === oldValue?.mw1000) return;
        this.mini = !value.mw1000;
      },
    },
    loggedInUser: {
      immediate: true,
      handler(value) {
        this.$store.dispatch('profile/init', value.id);
      },
    },
  },
});
</script>

<style lang="scss">
.settings-nav-icon.fa.fa-user {
  margin-left: 3px;
}
.settings-container .v-navigation-drawer--absolute {
  // margin-top: 12px;
  height: 96% !important;
}

.settings-form {
  gap: 1rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    column-gap: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .grid-column-span-all {
      grid-column: 1 / span 2;
    }
  }
}
</style>
