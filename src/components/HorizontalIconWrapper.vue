<template>
  <div class="d-flex align-center horizontal-icon-wrapper">
    <div v-if="icon" class="icon-with-background flex-center">
      <v-icon>{{ icon }}</v-icon>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'HorizontalIconWrapper',
  props: ['icon'],
};
</script>

<style>
.horizontal-icon-wrapper {
  gap: 0.5rem;
  border: 1px solid var(--v-secondary-lighten1);
}

.horizontal-icon-wrapper:focus-within {
  border-color: var(--v-primary-lighten1);
}
</style>
