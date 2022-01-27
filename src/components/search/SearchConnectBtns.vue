<template>
  <div class="search-connect-btns" :class="$attrs.class">
    <h3 v-if="showConnectWithTitle">Connect With</h3>
    <div class="flex-center gap-2" :class="btnWrapperClass">
      <v-btn color="primary" rounded dark link :href="'/#/profile/' + userId" :class="{ 'btn--long': btnLong }">
        <v-icon left small>fa-user-circle</v-icon>View Full Profile</v-btn
      >
      <v-btn :class="{ 'btn--long': btnLong }" color="secondary darken-4" rounded dark
        ><v-icon left small>fa-phone</v-icon>View Contact</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchConnectBtns',
  props: {
    btnLong: {
      default: true,
      type: Boolean,
    },
    userId: {
      type: [String, Number],
      required: true,
    },
    btnWrapperClass: {
      type: String,
      default: 'flex-wrap',
    },
    showConnectWithTitle: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped></style>
