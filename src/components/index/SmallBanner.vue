<template>
  <div class="small-banner flex-center pa-14 primary position-relative">
    <div class="bg position-absolute primary lighten-1 h-100"></div>
    <div class="bg-2 position-absolute primary h-100"></div>
    <h1 class="text white--text position-absolute mr-2 mr-sm-5 text-sm-h6 text-caption">
      Your Story Waiting To Happen
    </h1>
    <v-btn color="white" class="primary--text position-absolute">Get Started</v-btn>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SmallBanner',
};
</script>

<style lang="scss">
.small-banner {
  > .bg {
    width: 55%;
    right: 0;
  }
  > .bg-2 {
    width: 10%;
    left: 45%;
    clip-path: polygon(0 0, 0 100%, 100% 100%);
  }
  > .text {
    right: 50%;
  }
  > .v-btn {
    left: 50%;
  }
}
</style>
