<template>
  <div class="flex-column flex-center white pa-2 pa-sm-8 contact-option-card">
    <v-icon color="primary" class="mb-5">{{ item.icon }}</v-icon>
    <h3 class="text-center">{{ item.title }}</h3>
    <p class="text-center">{{ item.description }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ContactOption',
  props: ['item'],
});
</script>

<style lang="scss">
.contact-option-card {
  width: var(--index-contact-option-card-width);

  .v-icon {
    font-size: 4.5rem;
  }
}
</style>
