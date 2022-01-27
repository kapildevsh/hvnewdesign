<template>
  <v-card :max-width="maxWidth">
    <v-img :src="item.img"> </v-img>
    <v-card-subtitle v-if="item.publisher || item.date" class="d-flex pb-0">
      <v-icon class="mr-2" small>fa-user</v-icon><span>{{ item.publisher }}</span>
      <v-spacer></v-spacer>
      <v-icon class="mr-2" small>fa-calendar-alt</v-icon> <time v-set-article-date="item.date"></time>
    </v-card-subtitle>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>{{ item.description | truncated }}</v-card-text>
    <v-card-actions class="mb-2 justify-end">
      <v-btn color="primary" rounded> READ MORE </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { cardTextTruncateLength } from '@/data/common-data';

const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

export default Vue.extend({
  name: 'ArticleCard',
  props: ['item', 'max-width'],
  filters: {
    truncated(text: string) {
      return text && text.length > cardTextTruncateLength ? text.substr(0, cardTextTruncateLength - 4) + ' ...' : text;
    },
  },

  directives: {
    setArticleDate: {
      bind(el, binding) {
        if (!binding.value) return;
        const d = new Date(binding.value);
        (el as HTMLTimeElement).dateTime = d.toISOString();
        el.innerText = dateFormatter.format(d);
      },
    },
  },
});
</script>
