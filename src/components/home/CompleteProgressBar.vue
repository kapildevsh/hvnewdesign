<template>
  <v-sheet elevation="1" class="flex-grow-1"
    ><v-progress-linear :value="value" :color="value | progressColor" dark height="25">
      <strong v-progress-text-color="value">{{ Math.ceil(value) }}%</strong>
    </v-progress-linear></v-sheet
  >
</template>

<script lang="ts">
export default {
  name: 'CompleteProgressBar',
  props: ['value'],
};
</script>

<style></style>
