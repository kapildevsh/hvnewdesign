<template>
  <div class="data-loading-error-handler" :class="{ 'flex-center': loadingData.loading || loadingData.failed }">
    <v-progress-circular size="50" v-if="loadingData.loading" indeterminate color="primary"></v-progress-circular>
    <not-found class="w-100" light v-else-if="allowRender && (loadingData.failed || !loadingData.data || loadingData.notFound)" />
    <slot v-else :data="loadingData.data"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DownloadingItem } from '../models';
import NotFound from './NotFound.vue';

export default Vue.extend({
  components: { NotFound },
  name: 'DataLoading',
  data: () => ({ allowRender: true }),
  props: {
    loadingData: {
      type: Object,
      default: () => ({ loading: true }),
    },
    handleUnauthorized: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    loadingData(value: DownloadingItem<unknown>) {
      this.allowRender = false;
      setTimeout(() => {
        this.allowRender = true;
      }, 300);
      if (this.handleUnauthorized && value?.unauthorized)
        this.$router.push({ path: '/login', query: { redirectTo: this.$route.fullPath } });
    },
  },
});
</script>

<style></style>
