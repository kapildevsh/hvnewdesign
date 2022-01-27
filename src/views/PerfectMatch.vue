<template>
  <v-container class="perfect-match flex-grow-1 pa-0 pa-md-5 d-flex flex-nowrap gap-2 flex-column flex-md-row">
    <div class="d-flex flex-column flex-nowrap mx-5 flex-grow-1">
      <v-toolbar class="flex-grow-0 mb-3" elevation="1">
        <v-toolbar-title>Sent Interest</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>

      <v-sheet elevation="1" class="flex-grow-1 d-flex flex-nowrap gap-2 tabs">
        <v-tabs :icons-and-text="!hvmq.sm" class="tabs" color="primary" left @change="tabChange($event)">
          <v-tab v-for="tab in tabs" :key="tab.title" class="flex-column flex-sm-row">
            <v-icon small left>{{ tab.icon }}</v-icon> {{ tab.title }}</v-tab
          >
          <v-tab-item v-for="tab in tabs" :key="tab.title" class="overflow-auto">
            <div
              v-if="perfectMatch.failed || perfectMatch.loading || perfectMatch.tab !== tab.title"
              class="tabs-item-placeholder w-100 flex-center flex-column gap-2"
            >
              <template v-if="perfectMatch.failed">
                <h1>Failed to Load</h1>
                <caption>
                  {{
                    perfectMatch.failed
                  }}
                </caption>
              </template>
              <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
            </div>
            <v-list-item
              v-for="item in perfectMatch.data"
              :key="item.id"
              class="flex-column flex-sm-row justify-center justify-sm-start"
            >
              <v-list-item-action class="mr-2 d-none d-sm-block" v-if="hvmq.sm">
                <v-checkbox></v-checkbox>
              </v-list-item-action>
              <v-list-item-avatar size="var(--perfect-match-avatar-size)" class="mr-4 mr-md-16" tile>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="d-flex d-md-block flex-column">
                  <a class="d-flex flex-nowrap">
                    <v-checkbox dense hide-details="auto" class="ma-0 pa-0 d-sm-none"></v-checkbox> {{ item.id }}</a
                  >
                  <span class="match-item-title"> {{ item.content[0] }}</span>
                </v-list-item-title>
                <v-list-item-subtitle v-for="t in item.content.slice(1)" :key="t">{{ t }}</v-list-item-subtitle>
                <time class="caption mt-2 d-inline-block d-sm-none" v-bind-time="item.date" />
                <div class="d-sm-flex gap-2 mt-1 mt-sm-3 align-center">
                  <v-btn color="primary" class="mr-2 mr-sm-0" rounded dark small @click="removeItem(item)"
                    >Delete</v-btn
                  >
                  <v-btn color="#343a40" rounded dark small
                    ><router-link class="white--text text-decoration-none" :to="'/profile/' + item.id"
                      >View Profile</router-link
                    ></v-btn
                  >
                  <v-spacer></v-spacer>
                  <time class="caption d-none d-sm-inline-block" v-bind-time="item.date" v-if="hvmq.sm" />
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-tab-item>
        </v-tabs>
      </v-sheet>
    </div>
    <advertisement class="align-self-center mb-2" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { formatDate, fullFormatter } from '@/utils';
import { mapState } from 'vuex';
import { hvmq } from '@/mixins';
import Advertisement from '@/components/Advertisement.vue';
import { PerfectMatchItem } from '@/models';

export default Vue.extend({
  components: { Advertisement },
  mixins: [hvmq],
  name: 'PerfectMatch',
  data: () => ({
    tabs: [
      { title: 'Accepted', icon: 'fa-heart' },
      { title: 'Received', icon: 'fa-envelope' },
      { title: 'Send', icon: 'fa-paper-plane' },
    ],
  }),
  created() {
    this.$store.dispatch('perfectMatch/perfectMatch', 'Accepted');
  },
  computed: {
    ...mapState('perfectMatch', ['perfectMatch']),
  },
  methods: {
    tabChange(tabIndex: number) {
      this.$store.dispatch('perfectMatch/perfectMatch', this.tabs[tabIndex].title);
    },
    removeItem(item: PerfectMatchItem) {
      this.$store.dispatch('perfectMatch/removeItem', item);
    },
  },
  directives: {
    bindTime(el, binding) {
      const { str, iso, short } = formatDate(binding.value);
      el.innerText = fullFormatter.format(new Date(binding.value)) + (short ? ` (${str})` : '');
      (el as HTMLTimeElement).dateTime = iso;
    },
  },
});
</script>

<style lang="scss" scoped>
.v-tabs ::v-deep .v-slide-group__prev--disabled {
  display: none !important;
}

.advertisement {
  max-width: 300px;
}

.perfect-match {
  --perfect-match-avatar-size: 150px;
}

.match-item-title {
  @media (max-width: 600px) {
    white-space: pre-wrap;
  }
}

.tabs-item-placeholder {
  height: 350px;
}

.perfect-match {
  ::v-deep .v-tab--active {
    background-color: var(--v-primary-lighten1);
    color: white;
  }
  ::v-deep .v-tabs-slider {
    background-color: var(--v-primary-darken3);
  }
}
</style>
