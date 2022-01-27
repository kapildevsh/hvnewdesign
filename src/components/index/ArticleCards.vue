<template>
  <div class="w-100 position-relative flex-center pt-8 pb-8 pt-md-16 pb-md-16">
    <div class="articles-container flex-grow-1">
      <h2 class="font-font-weight-bold text-center">{{ title }}</h2>
      <h4 v-if="caption" class="text-center">{{ caption }}</h4>
      <div class="mt-8 mt-md-16 contact-options-wrapper flex-wrap justify-center d-none d-md-flex" v-if="hvmq.md">
        <article-card
          v-for="(item, index) in articles"
          :key="index"
          :item="item"
          max-width="var(--index-article-card-width)"
        />
      </div>

      <v-carousel
        :continuous="true"
        :cycle="true"
        :height="height"
        :interval="4000"
        :show-arrows="false"
        class="mt-4 mb-4 d-md-none"
        delimiter-icon="fa-minus"
        hide-delimiter-background
        light
        v-else
      >
        <v-carousel-item v-for="(item, index) in articles" :key="index">
          <div class="w-100 h-100 flex-center">
            <article-card :item="item" max-width="var(--index-article-card-width)" />
          </div>
        </v-carousel-item>
      </v-carousel>
      <div class="w-100 flex-center pt-4 pt-md-16">
        <v-btn color="primary" rounded> View All </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleCard from '@/components/index/ArticleCard.vue';
import { hvmq } from '@/mixins';

export default Vue.extend({
  mixins: [hvmq],
  components: { ArticleCard },
  name: 'ArticleCards',
  props: ['articles', 'dispatchKey', 'caption', 'title', 'height'],

  mounted() {
    this.$store.dispatch(this.dispatchKey);
  },
});
</script>

<style lang="scss">
.articles-container {
  max-width: 95%;
}

.contact-options-wrapper {
  gap: 2rem;
  width: 90%;
  margin: auto;

  @media (min-width: 960px) {
    width: 100%;

    .profile-filter-section {
      align-items: center;
    }
  }

  @media (min-width: 1264px) {
    width: 80%;
  }
}
</style>
