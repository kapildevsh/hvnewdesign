<template>
  <div>
    <v-img
      class="banner-img d-none d-sm-flex overflow-visible"
      src="/images/homeheaderBg.jpg"
      lazy-src="data:image/jpeg;base64,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"
      max-height="var(--index-banner-max-height)"
      v-if="hvmq.sm"
    >
      <div class="w-100 h-100 d-flex align-start flex-column justify-space-between p-4">
        <v-container />
        <v-container class="banner-title-wrapper w-100 h-100 d-flex align-start flex-column justify-center p-4">
          <div class="d-none d-sm-inline-block" v-if="hvmq.sm">
            <h1 class="title-1 primary--text text--lighten-2 text-center">HappyVivah.com</h1>
            <h3 class="title-2 text-center mb-2 font-weight-light">We provide dedicated matrimonial services</h3>
            <h2 class="title-3 text-center mt-5">Dream it. Believe it. Make it happen!</h2>
          </div>
        </v-container>
        <div class="flex-center w-100 banner-controls position-relative pt-8 pb-8">
          <v-overlay
            opacity="0.5"
            z-index="0"
            color="white"
            class="banner-bottom-overlay position-absolute"
          ></v-overlay>
          <search-options />
        </div>
      </div>
    </v-img>
    <div class="banner-img-mobile w-100 h-100 d-sm-none flex-center flex-column" v-if="!hvmq.sm">
      <h1 class="title-1 text-center white--text">HappyVivah.com</h1>
      <h3 class="title-2 text-center font-weight-light">We provide dedicated matrimonial services</h3>
      <h2 class="title-3 text-center">Dream it. Believe it. Make it happen!</h2>
    </div>
    <search-options class="d-sm-none pt-8 pb-1 pt-sm-16 pb-sm-16" v-if="!hvmq.sm" />
    <v-container data-murphy="bottom-to-top" class="pt-8 pb-1 pt-sm-16 pb-sm-16">
      <h2 class="font-font-weight-bold text-center">Find Your Special Someone</h2>
      <h4 class="text-center">Three simple steps to meet with your soul partner</h4>
      <div class="mt-8 mt-sm-16">
        <div class="d-grid grid-columns-3 justify-center align-center gap-2">
          <div v-for="item in steps" :key="item.title" class="d-flex flex-column align-center">
            <v-avatar
              class="steps-avatar lighten-1"
              color="primary"
              size="var(--index-steps-avatar-size)"
              :style="{
                backgroundImage: `url('${item.img}')`,
              }"
            >
              <v-avatar
                color="transparent"
                class="steps-avatar--inner"
                size="calc(var(--index-steps-avatar-size) - 5%)"
              />
            </v-avatar>
            <h2 class="text-center text-h5 text-sm-h4">{{ item.title }}</h2>
            <p class="text-center text-caption text-sm-body-2">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </v-container>
    <contact-options />
    <v-lazy>
      <article-cards
        title="Meet With Happy Stories"
        caption="You Could Be The Next Success Story For Our Display"
        class="happy-stories-wrapper"
        :articles="happyStories"
        dispatchKey="index/happyStories"
        height="560px"
      />
    </v-lazy>
    <small-banner />
    <v-lazy min-height="650px"
      ><article-cards title="Recent blogs" :articles="recentBlogs" dispatchKey="index/recentBlogs" height="650px"
    /></v-lazy>
    <profile-filters />
  </div>
</template>

<script lang="ts">
import ArticleCards from '@/components/index/ArticleCards.vue';
import ContactOptions from '@/components/index/ContactOptions.vue';
import SmallBanner from '@/components/index/SmallBanner.vue';
import SearchOptions from '@/components/search/SearchOptions.vue';
import { steps } from '@/data/common-data';
import { hvmq } from '@/mixins';
import murphy from 'murphyjs';
import Vue from 'vue';
import { mapState } from 'vuex';
import ProfileFilters from '../components/index/ProfileFilters.vue';

export default Vue.extend({
  mixins: [hvmq],
  components: { SearchOptions, ArticleCards, ContactOptions, SmallBanner, ProfileFilters },
  name: 'Index',
  data: () => ({ steps }),
  mounted() {
    murphy.play();
  },
  computed: {
    ...mapState('index', ['recentBlogs', 'happyStories']),
  },
});
</script>

<style lang="scss">
@media (max-width: 900px) {
  .profile-filter-section {
    flex-direction: column;
  }

  .banner-title-wrapper {
    transform: scale(0.7);
  }
}

.banner-img {
  z-index: 1;
}

.profile-filter-section .v-chip {
  min-width: 55px;
}

.banner-img-mobile {
  background: var(--index-banner-2-img) no-repeat 50% 50%;
  height: var(--index-banner-2-height);
  background-size: cover;
  padding-top: 1rem;

  .title-2 {
    font-size: 0.95rem;
    color: white;
  }

  .title-3 {
    font-size: 1.2rem;
    color: white;
  }
}

.title-1 {
  font-size: var(--index-title-1-font-size);
}

.steps-avatar {
  background-size: 70%, 70%;
  background-position: center center;
}

.steps-avatar--inner {
  border: 2px solid white !important;
}

.contact-options-wrapper {
  gap: 1rem;
  width: 80%;
  margin: auto;
}

.happy-stories-wrapper {
  background-repeat: repeat;
  background-image: var(--happy-stories-bg);
}

.profile-filter-item {
  border-right: 1px solid gray;
  height: 20px;
  line-height: 1;
  color: black;
  text-decoration: none;

  &:hover {
    color: var(--v-primary-base);
    text-decoration: underline;
  }
}
</style>
