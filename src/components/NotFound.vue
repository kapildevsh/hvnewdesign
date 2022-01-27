<template>
  <h1 class="flex-center" :class="{ 'white--text': !light }">
    <p
      v-for="(t, index) in text"
      :key="index"
      :data-murphy="index | randomSide"
      :data-murphy-animation-delay="index | randomMills"
      v-html="t"
    ></p>
  </h1>
</template>

<script lang="ts">
import Vue from 'vue';
import murphy from 'murphyjs';

export default Vue.extend({
  name: 'NotFound',
  props: {
    light: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    text: Object.freeze(Array.from('404 | Not Found', t => (t === ' ' ? '&thinsp;' : t))),
  }),
  mounted() {
    murphy.play();
  },
  filters: {
    randomSide() {
      return ['bottom-to-top', 'top-to-bottom', 'left-to-right', 'right-to-left'][Math.floor(Math.random() * 4)];
    },
    randomMills() {
      return Math.floor(Math.random() * 500);
    },
  },
});
</script>
