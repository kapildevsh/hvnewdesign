<template>
  <span class="d-flex flex-nowrap gap-1">
    <v-icon small v-for="n in value" :key="n" color="#FFCC00">fa-star</v-icon>
    <v-icon small v-for="n in 5 - value" :key="n + 10" color="secondary lighten-1">fa-star</v-icon>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['value'],
});
</script>

<style></style>
