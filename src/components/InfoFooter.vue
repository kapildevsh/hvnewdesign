<template>
  <footer class="info-footer primary darken-4">
    <div class="flex-center">
      <div class="footer-sections pt-8 pb-8 d-grid gap-4 ml-4">
        <div
          v-for="item in footerData"
          :key="item.title"
          class="footer-section d-flex flex-column footer-item align-center align-sm-start"
        >
          <h2 class="section-title">{{ item.title }}</h2>
          <router-link v-for="link in item.items" :key="link.title" :to="link.path" class="text-decoration-none text">
            {{ link.title }}
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <v-container class="d-flex flex-nowrap align-center justify-lg-space-between pt-4 pb-4 flex-column">
        <span class="white--text copyright-text mb-8">All rights reserved © 2019 HappyVivah.com </span>
        <share-btns :dark="true" />
      </v-container>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import ShareBtns from './ShareBtns.vue';
import footerData from '@/data/footer-data';

export default Vue.extend({
  components: { ShareBtns },
  name: 'InfoFooter',
  data: () => ({
    footerData,
  }),
});
</script>

<style scoped lang="scss">
@import '../styles/_mixins.scss';

.share-btns {
  transform: translateY(-32px);
}

.info-footer {
  min-height: 318px;
  @media (max-width: 600px) {
    .d-grid {
      justify-items: stretch;
    }
  }
}

.copyright-text {
  font-size: 80%;
  color: var(--footer-section-link-text);
}

.footer-sections {
  border-bottom: 1px solid var(--footer-section-link-text);
  max-width: 1140px;
  @include variable-at-breakpoints('grid-template-columns', '1fr 1fr', 'repeat(4, 1fr)');
  @include variable-at-breakpoints('width', '90%', '90%', '60%');
  @include variable-at-breakpoints('min-width', null, null, '750px', '1200px');
}

.footer-section {
  min-width: 30px;
  .section-title {
    color: var(--footer-section-title-text);
    font-size: 20px;
  }
  .text {
    color: var(--footer-section-link-text);
    font-size: 16px;
  }

  @media (max-width: 600px) {
    .section-title,
    .text {
      text-align: center;
    }
  }
}
</style>
