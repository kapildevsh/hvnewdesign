<template>
  <v-container class="gallery flex-grow-1 py-5 d-flex flex-row flex-nowrap gap-2">
    <div class="flex-grow-1 gallery-container position-relative w-100">
      <v-toolbar class="elevation-0">
        <v-toolbar-title v-if="iAmOwner || !galleryOwner" class="text-h5">My Gallery</v-toolbar-title>
        <v-toolbar-title v-else class="text-h5">{{ galleryOwner | fullName }}'s Gallery</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip color="primary" top v-if="iAmOwner">
          <template #activator="{ on }">
            <v-btn rounded color="primary" class="white--text gallery-btns" v-on="on"
              ><input
                type="file"
                multiple
                class="file-input"
                accept="image/png, image/jpeg, image/jpg"
                @change="$refs.filesUploadView.setFiles($event.target.files)"
              />
              <v-icon left small> fa-upload </v-icon>Upload</v-btn
            >
          </template>
          <span>Click to add new images to gallery</span>
        </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
      <files-upload-view
        ref="filesUploadView"
        @refresh="init(profileId || (loggedInUser && loggedInUser.id))"
        @openSnackbar="$refs.snackbar.open()"
      />
      <data-loading
        :handleUnauthorized="true"
        :loadingData="galleryState"
        v-slot="{ data: gallery }"
        class="gallery-data-loading-container"
      >
        <div v-if="gallery.length" class="mt-3 overflow-auto photo-gallery">
          <v-slide-x-transition group tag="div" class="images-container gap-3">
            <v-img
              v-for="(item, itemIndex) in gallery"
              :key="item.img + item.id"
              :src="item.img"
              aspect-ratio="1"
              class="pointer"
              @click.native="openDialog($event, itemIndex)"
            >
              <v-tooltip color="primary" top v-if="iAmOwner">
                <template v-slot:activator="{ on }">
                  <v-btn class="remove-btn" x-small fab dark color="error" @click.prevent="removeItem = item" v-on="on">
                    <v-icon x-small>fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>Remove this image</span>
              </v-tooltip>
            </v-img>
          </v-slide-x-transition>
        </div>
        <gallery-carousel v-if="dialog" v-model="dialog" :gallery="gallery" :index="index" />
        <div v-if="gallery && gallery.length === 0" class="h-100 grid-centered white">
          <h1 v-if="iAmOwner">Upload Images for Better Your Matches</h1>
          <h1 v-else>{{ galleryState.owner | fullName }} Does Not Have Images in Public Gallery</h1>
        </div>
      </data-loading>
    </div>
    <advertisement v-if="hvmq.lg" width="250px" />
    <v-dialog v-if="removeItem" :value="!!removeItem" @input="removeItemAfterConfirm" width="400" max-width="100%">
      <v-card>
        <v-card-title class="font-weight-medium primary white--text text-center pa-2">
          <v-icon class="v-icon--left white--text mr-2">fa-trash</v-icon> Remove Image from Gallery
        </v-card-title>

        <v-card-text class="pa-4">
          Are You Sure to Remove this from Your Gallery ?
          <span class="d-block error--text font-weight-bold">{{ removeItem.name || removeItem.img }}</span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="removeItemAfterConfirm(true)">
            Yes
          </v-btn>
          <v-btn color="warn" @click="removeItemAfterConfirm(false)">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <files-uploaded-snackbar ref="snackbar" />
  </v-container>
</template>

<script lang="ts">
import Advertisement from '@/components/Advertisement.vue';
import DataLoading from '@/components/DataLoading.vue';
import GalleryCarousel from '@/components/gallery/GalleryCarousel.vue';
import FilesUploadView from '@/components/gallery/FilesUploadView.vue';
import FilesUploadedSnackbar from '@/components/gallery/FilesUploadedSnackbar.vue';
import Vue from 'vue';
import { mapState } from 'vuex';
import { hvmq, profileIdLoaderMixin, ProfileIdLoaderProps } from '../mixins';
import { GalleryItem } from '../models';

class GalleryComponentData {
  dialog = false;
  index = 0;
  removeItem: GalleryItem;
}

export default Vue.extend({
  name: 'Gallery',
  components: { DataLoading, Advertisement, GalleryCarousel, FilesUploadView, FilesUploadedSnackbar },
  mixins: [profileIdLoaderMixin, hvmq],
  data: () => new GalleryComponentData() as GalleryComponentData & ProfileIdLoaderProps,
  computed: {
    ...mapState('gallery', { galleryState: 'gallery', galleryOwner: 'owner' }),
  },
  methods: {
    init(id: string | number) {
      this.$store.dispatch('gallery/init', id);
    },
    removeItemAfterConfirm(remove: boolean) {
      if (remove) this.$store.dispatch('gallery/galleryRemoveItem', this.removeItem);
      this.removeItem = undefined;
    },
    openDialog(event: Event, index: number) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('remove-btn') || target.closest('.remove-btn')) return;
      this.index = index;
      this.dialog = true;
    },
  },
});
</script>

<style scoped lang="scss">
.images-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 750px) {
    grid-template-columns: repeat(5, 1fr);
  }
}

.gallery-container {
  min-height: 400px;
}

.gallery-data-loading-container {
  height: calc(100% - 64px);
  overflow: auto;
}
.remove-btn {
  position: absolute;
  right: 2px;
  top: 2px;
}

.v-image ::v-deep .v-image__image {
  background-position: top center !important;
}

.files-upload-view ::v-deep {
  z-index: 100;
  .v-list-item__avatar {
    border-radius: 0;

    img {
      height: unset !important;
    }
  }
  .v-list-item__title {
    line-height: 2.5rem;
  }

  .v-list-item {
    height: 100px;
  }
}

.photo-gallery {
  min-height: 500px;
}

.gallery-data-loading-container {
  padding: 2px;
}
</style>
