<template>
  <div class="primary lighten-1 w-100">
    <div data-murphy="bottom-to-top" class="pt-8 pb-8 pt-sm-16 pb-sm-16">
      <h2 class="font-font-weight-bold text-center white--text">Find Your Special Someone</h2>
      <h4 class="text-center white--text text--body-2">Three simple steps to meet with your soul partner</h4>
      <div class="mt-8 mt-sm-16 contact-options-wrapper flex-wrap justify-center d-none d-sm-flex">
        <contact-option
          v-for="(item, index) in contactOptions"
          :key="item.title"
          :item="item"
          data-murphy="bottom-to-top"
          :data-murphy-animation-delay="index * 100 + 100"
        />
      </div>
      <v-carousel
        :continuous="true"
        :cycle="true"
        :interval="2000"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="fa-minus"
        class="ma-1 d-sm-none"
        height="300px"
        light
      >
        <v-carousel-item v-for="item in contactOptions" :key="item.title">
          <div class="w-100 h-100 flex-center">
            <contact-option :item="item" />
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ContactOption from './ContactOption.vue';
import { contactOptions } from '@/data/common-data';
import { hvmq } from '@/mixins';

export default Vue.extend({
  mixins: [hvmq],
  components: { ContactOption },
  name: 'ContactOptions',
  computed: {
    contactOptions: () => contactOptions,
  },
});
</script>

<style scoped>
.contact-options-wrapper {
  max-width: 1000px;
}
</style>
