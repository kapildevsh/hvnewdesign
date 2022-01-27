<template>
  <data-loading class="advertisement" :loadingData="loadingState" v-slot="{ data }" :style="{ width: width }">
    <v-sheet elevation="2">
      <router-link :to="data.link"><v-img :src="data.img"></v-img></router-link>
    </v-sheet>
  </data-loading>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import DataLoading from './DataLoading.vue';

export default Vue.extend({
  components: { DataLoading },
  name: 'Advertisement',
  props: {
    width: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState('advertisement', ['loadingState']),
  },
  mounted() {
    this.$store.dispatch('advertisement/init');
  },
});
</script>

<style></style>
