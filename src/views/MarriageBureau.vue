<template>
  <data-loading :loadingData="bureau" v-slot="{ data }" class="marriage-bureau">
    <v-sheet elevation="2" class="marriage-bureau-sheet-1">
      <div class="overflow-visible banner-img w-100" :style="{ backgroundImage: `url(${newBanner || data.banner})` }">
        <div class="flex-center profile-avatar">
          <v-avatar color="transparent" size="var(--mb-avatar-size)">
            <v-img :src="newAvatar || data.avatar" alt="Marriage Bureau Profile Photo" />
            <v-btn icon text>
              <input
                accept="image/png, image/jpeg, image/jpg"
                type="file"
                class="file-input"
                @change="changeAvatar($event.target.files[0])"
              />
              <v-icon color="white"> fa-camera </v-icon></v-btn
            >
          </v-avatar>
        </div>
        <v-btn icon text class="upload-photo-btn" large dark>
          <input
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            class="file-input"
            @change="changeBanner($event.target.files[0])"
          />
          <v-icon x-large color="white"> fa-camera </v-icon><span>Upload Photo</span></v-btn
        >
      </div>
    </v-sheet>
    <v-container
      id="mb-container"
      class="dashboard mb-search flex-grow-1 pa-5 pt-16 d-flex flex-md-row flex-nowrap gap-6 flex-column-reverse bureau-container"
    >
      <div
        class="flex-grow-0 mb-4 flex-grow-0 left-panel flex-nowrap d-flex flex-column flex-sm-row flex-md-column gap-4"
      >
        <div class="left-panel-spacer d-none d-sm-block" v-if="hvmq.sm"></div>
        <mb-owner-info class="d-none d-md-block" :data="data" v-if="hvmq.md"></mb-owner-info>

        <v-sheet id="profile-list-left" elevation="2">
          <data-loading :loadingData="uploadedProfiles" v-slot="{ data: profiles }">
            <profiles-list class="pt-0" :data="profiles" :viewAllBtn="false" />
          </data-loading>
        </v-sheet>

        <v-sheet elevation="2" class="w-100 flex-grow-0 d-lg-none d-md-flex flex-row flex-nowrap gap-2 transparent" v-if="!hvmq.lg">
          <marriage-bureau-right-panel :data="data" :similarBureaus="similarBureaus"> </marriage-bureau-right-panel>
        </v-sheet>
      </div>
      <v-sheet class="flex-grow-1 dashboard-content pa-4" elevation="2">
        <div class="d-flex flex-nowrap gap-2 flex-column flex-sm-row">
          <h3 class="primary--text text--darken-1 organization-name">
            {{ data.organizationName }} <v-icon v-if="data.verified" color="success" large>fa-certificate</v-icon>
          </h3>
          <v-spacer class="d-none d-sm-block" v-if="hvmq.sm"></v-spacer>
          <rating-stars :value="data.rating"></rating-stars>
        </div>
        <h4 v-if="data.organizationSubName" class="secondary--text text--darken-4">{{ data.organizationSubName }}</h4>
        <p class="body-1 my-4 secondary--text text--darken-3">{{ data.description }}</p>
        <v-tabs color="primary" left v-model="tab" @change="tabChange($event)">
          <v-tab> About </v-tab>
          <v-tab> Services </v-tab>
          <v-tab> Reviews </v-tab>
          <v-tab> Gallery </v-tab>
          <v-tab> Contacts </v-tab>
          <v-tab> Write Review </v-tab>

          <v-tabs-items v-model="tab">
            <!-- #region About Us Tab -->
            <v-tab-item>
              <div class="my-14 mx-10">
                <h1 class="font-weight-regular">About Us</h1>
                <v-divider class="my-4"></v-divider>
                <h3 class="font-weight-medium mb-4">{{ data.about.summary }}</h3>
                <p class="body-2">{{ data.about.description }}</p>
              </div>
            </v-tab-item>
            <!-- #endregion About Us Tab -->

            <!-- #region services Tab -->
            <v-tab-item>
              <div class="my-14 mx-10">
                <h1 class="font-weight-regular">Services</h1>
                <v-divider class="my-4"></v-divider>
                <p class="mb-4 body">{{ data.services.summary }}</p>
                <v-list dense flat class="ma-0 pa-0">
                  <v-list-item-group color="primary">
                    <v-list-item v-for="item in data.services.services" :key="item.id">
                      <v-list-item-icon class="ml-0 mr-2 px-0">
                        <v-icon color="secondary darken-4" small>{{ item.icon }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="secondary--text text--darken-4">
                        {{ item.text }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
            </v-tab-item>
            <!-- #endregion services Tab -->

            <!-- #region review Tab -->
            <v-tab-item>
              <data-loading :loadingData="reviews" class="my-14 mx-10" v-slot="{ data }">
                <h1 class="font-weight-regular">Client's Reviews</h1>
                <v-divider class="my-4"></v-divider>
                <p v-if="tab.summary" class="mb-4 body">{{ tab.summary }}</p>
                <v-list dense class="bordered-list overflow-auto pt-0 mt-0" outlined>
                  <v-list-item v-for="item in data" :key="item.id" class="my-0 py-1">
                    <v-list-item-avatar size="60px">
                      <v-img v-if="item.avatar" :src="item.avatar"></v-img>
                      <v-avatar v-else color="primary"
                        ><span class="white--text headline">{{ item.name[0] }}</span></v-avatar
                      >
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="d-flex flex-nowrap gap-2"
                        ><span class="text-wrap body-1">{{ item.name }}</span> <rating-stars :value="item.rating" />
                      </v-list-item-title>
                      <p class="caption text-wrap">{{ item.comment }}</p>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </data-loading>
            </v-tab-item>
            <!-- #endregion review Tab -->

            <!-- #region gallery Tab -->
            <v-tab-item>
              <div class="my-14 mx-10">
                <h1 class="font-weight-regular">Gallery</h1>
                <v-divider class="my-4"></v-divider>
                <data-loading :loadingData="gallery" v-slot="{ data }" class="d-flex gap-2 flex-wrap">
                  <v-img v-for="t in data" :key="t.id" :src="t.img" max-width="150px"></v-img>
                </data-loading>
              </div>
            </v-tab-item>

            <!-- #region contact Tab -->
            <v-tab-item>
              <div class="my-14 mx-10">
                <h1 class="font-weight-regular">Contact</h1>
                <v-divider class="my-4"></v-divider>
                <mb-contact-list :data="data" class="d-flex flex-wrap gap-6" />
              </div>
            </v-tab-item>
            <!-- #endregion contact Tab -->

            <v-tab-item>
              <mb-review-form class="my-14 mx-10"> </mb-review-form>
            </v-tab-item>
            <!-- #endregion gallery Tab -->
          </v-tabs-items>
        </v-tabs>
      </v-sheet>
      <div class="left-panel" v-if="hvmq.lg">
        <marriage-bureau-right-panel
          :data="data"
          :similarBureaus="similarBureaus"
          class="flex-grow-0 d-lg-flex d-none flex-column flex-nowrap right-panel"
          
        >
        </marriage-bureau-right-panel>
      </div>
      <v-sheet><mb-owner-info class="d-block d-md-none" v-if="!hvmq.md" :data="data"></mb-owner-info></v-sheet>
    </v-container>
  </data-loading>
</template>

<script lang="ts">
import Vue from 'vue';
import DataLoading from '@/components/DataLoading.vue';
import { mapState } from 'vuex';
import ProfilesList from '@/components/profiles/ProfilesList.vue';
import RatingStars from '@/components/RatingStars.vue';
import MbReviewForm from '@/components/marriage-bureau/MbReviewForm.vue';
import MbOwnerInfo from '@/components/marriage-bureau/MbOwnerInfo.vue';
import MarriageBureauRightPanel from '@/components/marriage-bureau/MarriageBureauRightPanel.vue';
import { hvmq } from '@/mixins';
import MbContactList from '../components/marriage-bureau/MbContactList.vue';
import { fileToUri } from '../utils';
import { isValidImg } from '../data/common-data';

export default Vue.extend({
  mixins: [hvmq],
  name: 'MarriageBureau',
  props: ['marriageBureauId'],
  components: {
    DataLoading,
    ProfilesList,
    RatingStars,
    MbReviewForm,
    MbOwnerInfo,
    MarriageBureauRightPanel,
    MbContactList,
  },
  data: () => ({
    tab: 0,
    newAvatar: null,
    newBanner: null,
  }),
  mounted() {
    this.$store.dispatch('bureau/bureau', this.marriageBureauId);
    this.$store.dispatch('bureau/uploadedProfiles', this.marriageBureauId);
    this.$store.dispatch('bureau/similarBureaus', this.marriageBureauId);
  },
  computed: {
    ...mapState('bureau', ['bureau', 'uploadedProfiles', 'reviews', 'gallery', 'similarBureaus']),
  },
  methods: {
    tabChange(tab: number) {
      if (tab === 2) {
        this.$store.dispatch('bureau/reviews', this.marriageBureauId);
      }
      if (tab === 4) {
        this.$store.dispatch('bureau/gallery', this.marriageBureauId);
      }
    },
    async changeAvatar(file: File) {
      this.newAvatar = file && (await fileToUri(file));
    },
    async changeBanner(file: File) {
      if (isValidImg(file.name)) this.newBanner = file && (await fileToUri(file));
    },
  },
});
</script>

<style lang="scss" scoped>
.about-us {
  .about-us-left {
    img {
      width: 80%;
    }
  }
  // TODO
}

.dashboard .left-panel {
  @media (max-width: 1264px) {
    width: unset;
    max-width: unset;
  }
}

#profile-list-left ::v-deep .v-list {
  @media (min-width: 960px) and (max-width: 1264px) {
    max-height: 300px;
    overflow: auto;
  }
}

.banner-img {
  position: relative;
  height: var(--mb-banner-height);
  background-size: cover;
}

.upload-photo-btn {
  position: absolute;
  bottom: 20px;
  right: 40px;

  ::v-deep .v-btn__content {
    gap: 1rem;
    flex-direction: column;
  }
}

.organization-name {
  font-size: 1.75rem;
  font-weight: 500;
}

.left-panel-spacer {
  height: calc(var(--mb-avatar-size) / 2);
}

.profile-avatar {
  position: absolute;
  bottom: calc(-1 * var(--mb-avatar-size) / 2);
  overflow: visible;
  width: 150px;

  @media (min-width: 960px) {
    width: 350px;
  }

  .v-avatar {
    .v-btn {
      position: absolute;
      bottom: 20%;
    }

    &::before,
    &::after {
      border-radius: 50%;
      content: ' ';
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 5px solid white;
    }

    &::after {
      z-index: 3;
      border: 2px solid red;
    }
  }
}
</style>
