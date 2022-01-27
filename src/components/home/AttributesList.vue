<template>
  <ul class="d-grid grid-columns-2 unstyled-list flex-grow-1 attributes-list gap-2">
    <template v-for="t in attributes">
      <li class="text-body-2" :key="t.name">{{ t.name }}</li>
      <li class="text-body-2" :key="t.value">{{ t.value }}</li>
    </template>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AttributesList',
  props: ['attributes'],
});
</script>

<style scoped></style>
