<template>
  <ol class="primary--text ma-4">
    <li v-for="item in links" :key="item.path">
      <router-link :to="item.path">
        {{ item.name }}
      </router-link>
    </li>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue';
import { Dictionary } from '@/models';

export default Vue.extend({
  name: 'Links',
  data: () => ({ links: [] }),
  mounted() {
    const mapped: Dictionary<string> = {
      '/profile/:profileId': '/profile/HVIPU94088',
      '/home/:profileId': '/home/T850HY7K',
      '*': '/404',
      '/marriage-bureau/:marriageBureauId': '/marriage-bureau/1',
    };

    const set = new Set();

    this.links = this.$router.options.routes
      .filter(p => p.path !== '/links')
      .map(route => {
        let path = mapped[route.path] || route.path;
        if (path.includes('/:')) {
          path = path.substring(0, route.path.indexOf('/:'));
        }

        return {
          name: route.name,
          path,
        };
      })
      .filter(route => (set.has(route.path) ? false : set.add(route.path) || true))
      .sort((a, b) => a.name.localeCompare(b.name))
      .concat([
        {
          name: 'Settings - About Me',
          path: '/settings/about-me',
        },
        {
          name: 'Settings - Education and Career',
          path: '/settings/education-and-career',
        },
        {
          name: 'Settings - Family',
          path: '/settings/family',
        },
        {
          name: 'Settings - Religion',
          path: '/settings/religion-community',
        },
        {
          name: 'Settings - Life Style',
          path: '/settings/life-style',
        },
        {
          name: 'Partner Preference',
          path: '/settings/partner-preference',
        },
      ]);
  },
});
</script>
