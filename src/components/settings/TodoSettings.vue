<template>
  <div>
    <h1>TODO {{ settingName }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TodoSettings',
  props: ['settingName'],
});
</script>

<style></style>
