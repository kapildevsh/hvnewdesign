<template>
  <v-dialog  v-model="dialog" height="90vh" content-class="gallery-carousel-dialog" @input="$emit('input', false)">
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind:on="on" v-bind:attrs="attrs"></slot>
    </template>
    <v-tooltip color="primary" bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          x-small
          color="error"
          fab
          @click="
            $emit('input', false);
            dialog = false;
          "
          v-on="on"
          class="dialog-close-btn"
          ><v-icon style="font-size: 2em" color="white" large>fa-times</v-icon></v-btn
        >
      </template>
      <span>Close This dialog</span>
    </v-tooltip>
    <div v-if="error" class="flex-center">
      <h1>{{ error }}</h1>
    </div>
    <v-carousel
      v-else-if="dialog && effectiveGallery"
      v-model="effectiveIndex"
      height="80vh"
      hide-delimiters
      class="gallery-carousel"
      ref="carousel"
    >
      <v-carousel-item
        v-for="item in effectiveGallery"
        :key="item.img + item.id"
        :src="item.img"
        class="dialog-carousel-img"
      ></v-carousel-item>
    </v-carousel>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: 'GalleryCarousel',
  props: ['gallery', 'index', 'value', 'profileId'],
  data: () => ({
    dialog: false,
    effectiveIndex: 0,
    loading: false,
    urlLoadedGallery: [],
    error: undefined,
    destroy: () => null,
  }),
  computed: {
    effectiveGallery() {
      return this.gallery || this.urlLoadedGallery;
    },
  },
  watch: {
    index: {
      immediate: true,
      handler(value: number) {
        this.effectiveIndex = value || 0;
      },
    },
    profileId: {
      immediate: true,
      handler() {
        this.updateUrlGallery();
      },
    },
    value: {
      immediate: true,
      handler(value) {
        this.dialog = value;
      },
    },
    dialog: {
      immediate: true,
      async handler(value) {
        if (!value) {
          this.destroy();
          return;
        }

        this.updateUrlGallery();

        const keyEventHandler = (event: KeyboardEvent) => {
          if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

          const increment = event.key === 'ArrowRight' ? 1 : -1;
          if (this.effectiveIndex + increment < 0 || this.effectiveIndex + increment >= this.effectiveGallery.length)
            return;

          this.effectiveIndex = this.effectiveIndex + increment;
        };

        this.destroy = Object.freeze(() => window.removeEventListener('keydown', keyEventHandler));
        window.addEventListener('keydown', keyEventHandler);
      },
    },
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    updateUrlGallery() {
      if (!(this.profileId && this.dialog)) return false;

      this.error = undefined;

      axios
        .get('gallery/' + this.profileId)
        .then(res => {
          this.urlLoadedGallery = res.data.data;
        })
        .catch(err => {
          this.error = err.response?.data || err.message;
        });
      return false;
    },
  },
});
</script>

<style>
.dialog-carousel-img .v-image__image--cover {
  background-size: contain;
}
.gallery-carousel .fa-chevron-right,
.gallery-carousel .fa-chevron-left {
  font-size: 24px !important;
}
.gallery-carousel-dialog {
  margin: 0;
}
</style>

<style scoped>
.dialog-close-btn {
  position: absolute;
  z-index: 1000;
  right: 10px;
}
</style>
