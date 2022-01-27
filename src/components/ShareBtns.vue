<template>
  <div class="share-btns flex-center mt-4 mb-4 gap-2">
    <v-btn v-for="(item, index) in _shareOptions" :key="index" elevation="2" icon>
      <router-link :to="item.path" class="text-decoration-none">
        <img v-if="item.img" :src="item.img" />
        <font-awesome-icon v-else-if="item.fab" :icon="item.icon" :class="{ 'white--text': dark }" />
        <v-icon v-else class="fab" :class="{ 'white--text': dark }">{{ item.icon }}</v-icon>
      </router-link>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { shareOptions } from '@/data/common-data';

export default Vue.extend({
  name: 'ShareBtns',
  props: ['dark'],
  computed: {
    _shareOptions: () => shareOptions,
  },
});
</script>

<style scoped>
img {
  width: 35px;
  height: 35px;
  transition: transform 0.3s;
}

a {
  transition: transform 0.3s;
}

a:hover {
  transform: scale(1.2);
}

.dark .v-icon {
  color: black;
}
.light .v-icon {
  color: white;
}
</style>
