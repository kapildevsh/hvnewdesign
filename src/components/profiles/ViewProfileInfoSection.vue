<template>
  <v-timeline-item class="pb-1" color="primary" small fill-dot large>
    <template v-slot:icon>
      <v-icon color="white">{{ icon }}</v-icon>
    </template>
    <div class="mt-2">
      <div class="primary d-flex flex-nowrap">
        <h4 class="white--text pa-2 font-weight-medium flex-grow-1">{{ title }}</h4>
        <v-btn v-if="iAmOwner" text color="white" link :href="link"><v-icon left>fa-edit</v-icon>Edit</v-btn>
      </div>
      <p v-html="convertedDescription" class="ma-2 subtitle-2 font-weight-regular"></p>
      <div class="ma-5 main-attributes d-grid" :class="hvmq.sm ? 'grid-columns-2' : 'grid-columns-1'">
        <template v-for="(item, index) in processedData">
          <v-chip
            v-if="item.name && item.value.length < 30"
            color="white"
            :key="index"
            :class="{ 'lang-icon-offset': item.wideIcon }"
          >
            <v-icon color="primary" small left>{{ item.icon }}</v-icon>
            <span class="font-weight-medium mr-1">{{ item.name }}:</span> {{ item.value }}
          </v-chip>
          <p
            v-else
            :key="index"
            class="my-0 mr-0 ml-2 pa-0 chip d-flex align-center"
            :class="{
              'grid-column-span-2': hvmq.sm && item.value.length > 60,
              'lang-icon-offset': item.wideIcon,
            }"
          >
            <v-icon color="primary" small left>{{ item.icon }}</v-icon>
            <span
              ><span class="font-weight-medium mr-1">{{ item.name }}:</span> {{ item.value }}</span
            >
          </p>
        </template>
      </div>
    </div>
  </v-timeline-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { hvmq } from '../../mixins';
import { cmsToFeetInch, joinCastes } from '../../utils';
import marked from 'marked';

export interface ViewProfileField {
  readonly field: string;
  readonly icon: string;
  readonly name: string;
  readonly value?: string;
  readonly wideIcon: boolean;
}

export default Vue.extend({
  name: 'ViewProfileInfoSection',
  mixins: [hvmq],
  props: ['title', 'icon', 'description', 'fields', 'data', 'iAmOwner', 'link'],
  methods: {
    getValue(field: string): string {
      const value = this.data[field] || field;

      if (field === 'casteCommunity') joinCastes(this.data);
      if (field === 'height') return cmsToFeetInch(value);
      if (field === 'weight') return `${value} Kgs`;
      if (field === 'preferredAge') return value.join('-') + ' years';
      if (Array.isArray(value)) return value.join(', ');

      return value;
    },
    wideIcon(icon: string) {
      return icon === 'fa-american-sign-language-interpreting' || icon === 'fa-users';
    },
  },
  computed: {
    processedData(): ViewProfileField[] {
      return (
        this.data &&
        Object.freeze(
          this.fields.map((s: ViewProfileField) => ({
            ...s,
            value: this.getValue(s.field),
            wideIcon: this.wideIcon(s.icon),
          }))
        )
      );
    },
    convertedDescription() {
      return this.description?.trim() && marked(this.description);
    },
  },
});
</script>

<style scoped>
.lang-icon-offset {
  margin-left: -7px;
}

p.chip {
  font-size: 14px;
}
</style>
