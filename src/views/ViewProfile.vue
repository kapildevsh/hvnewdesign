<template>
  <data-loading
    class="container view-profile flex-grow-1 d-flex mt-10 pa-5 flex-nowrap gap-4 flex-column flex-md-row"
    :loadingData="loadingState"
    :handleUnauthorized="true"
    v-slot="{ data }"
  >
    <div class="left-panel d-flex gap-2 justify-center justify-sm-start">
      <v-card class="flex-grow-0" elevation="0" :class="{ transparent: iAmOwner }">
        <v-img :src="newImg || data.img" height="300px" dark position="top center">
          <v-btn class="position-absolute profile-change-btn" icon text>
            <v-tooltip top color="primary">
              <template v-slot:activator="{ on, attrs }">
                <input
                  v-bind="attrs"
                  v-on="on"
                  accept="image/png, image/jpeg, image/jpg"
                  class="file-input"
                  type="file"
                  @change="setProfileImg($event.target.files[0])"
                />
              </template>
              <span>Change Profile Picture</span>
            </v-tooltip>

            <v-icon color="white"> fa-camera </v-icon>
          </v-btn>
          <v-hover v-slot="{ hover }">
            <div class="view-album-btn-wrapper" :class="{ hovered: hover }">
              <gallery-carousel :profileId="data.id">
                <template v-slot:default="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" rounded color="primary " small>View Album</v-btn>
                </template>
              </gallery-carousel>
            </div>
          </v-hover>
        </v-img>
        <div>
          <div v-if="!iAmOwner" class="report-btns d-grid grid-columns-2">
            <v-btn text class="caption">Block Him</v-btn>
            <v-btn text class="caption">Report Misuse</v-btn>
          </div>
        </div>

        <view-profile-upload-btns
          class="my-2 d-none flex-column flex-nowrap d-md-flex"
          v-if="iAmOwner && hvmq.md"
        ></view-profile-upload-btns>

        <v-sheet v-if="hvmq.md" class="my-2 flex-column flex-nowrap d-none d-md-flex" outlined elevation="1">
          <h4 class="primary white--text pa-2 font-weight-medium">
            {{ iAmOwner ? 'Interesting Profiles' : 'Similar Profiles' }}
          </h4>
          <v-list two-line>
            <v-list-item v-for="item in similarProfiles.data" :key="item.id">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.content"></v-list-item-title>
                <v-list-item-subtitle><time v-bind-date-time="item.date"/></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-card>
      <v-sheet
        elevation="2"
        class="pa-2 flex-grow-1 flex-column d-none d-sm-flex d-md-none justify-space-between"
        v-if="hvmq.sm && !hvmq.md"
        min-width="400px"
        ><view-profile-main-attributes :data="data" :iAmOwner="iAmOwner"> </view-profile-main-attributes>
        <view-profile-upload-btns
          class="d-none flex-column flex-nowrap d-sm-flex"
          v-if="iAmOwner && hvmq.sm"
          :inline="true"
        ></view-profile-upload-btns>
      </v-sheet>
    </div>
    <view-profile-upload-btns
      v-if="iAmOwner"
      class="my-2 d-flex d-sm-none flex-column flex-nowrap"
    ></view-profile-upload-btns>

    <v-sheet class="content flex-grow-1 pa-2" elevation="2">
      <view-profile-main-attributes
        :iAmOwner="iAmOwner"
        :data="data"
        class="d-block d-sm-none d-md-block"
        :showAttrs="false"
      ></view-profile-main-attributes>

      <v-timeline align-top dense>
        <v-timeline-item class="pb-1 d-flex d-sm-none d-md-flex" color="primary" small hide-dot large>
          <view-profile-main-attributes
            :iAmOwner="iAmOwner"
            :data="data"
            :showTitle="false"
          ></view-profile-main-attributes>
        </v-timeline-item>
        <view-profile-info-section
          :data="data"
          :title="aboutTitle"
          icon="fa-user"
          :description="data.aboutMe"
          :iAmOwner="iAmOwner"
          :fields="aboutMeFields"
          link="/#/settings/about-me"
        ></view-profile-info-section>
        <view-profile-info-section
          :data="data"
          title="Education and Career"
          icon="fa-graduation-cap"
          :description="data.aboutEducation"
          :iAmOwner="iAmOwner"
          :fields="educationAndCareerFields"
          link="/#/settings/education-and-career"
        ></view-profile-info-section>
        <view-profile-info-section
          :data="data"
          title="Family"
          icon="fa-home"
          :description="data.aboutFamily"
          :iAmOwner="iAmOwner"
          :fields="familyFields"
          link="/#/settings/family"
        ></view-profile-info-section>
        <view-profile-info-section
          :data="data"
          title="Religion and Community"
          icon="fa-university"
          :description="data.aboutReligion"
          :iAmOwner="iAmOwner"
          :fields="religionAndCommunityFields"
          link="/#/settings/religion-community"
        ></view-profile-info-section>
        <view-profile-info-section
          :data="data"
          title="Life Style"
          icon="fa-glass-martini-alt"
          :description="data.aboutLifeStyleDescription"
          :iAmOwner="iAmOwner"
          :fields="lifeStyleFields"
          link="/#/settings/life-style"
        ></view-profile-info-section>
        <view-profile-info-section
          :data="data"
          title="Partner Preference"
          icon="fa-heart"
          :description="data.aboutPreference"
          :iAmOwner="iAmOwner"
          :fields="preferenceFields"
          link="/#/settings/partner-preference"
        ></view-profile-info-section>
      </v-timeline>
    </v-sheet>
  </data-loading>
</template>

<script lang="ts">
import DataLoading from '@/components/DataLoading.vue';
import GalleryCarousel from '@/components/gallery/GalleryCarousel.vue';
import ViewProfileInfoSection from '@/components/profiles/ViewProfileInfoSection.vue';
import ViewProfileMainAttributes from '@/components/profiles/ViewProfileMainAttributes.vue';
import ViewProfileUploadBtns from '@/components/profiles/ViewProfileUploadBtns.vue';
import { hvmq, profileIdLoaderMixin } from '@/mixins';
import { About } from '@/models';
import Vue from 'vue';
import { mapState } from 'vuex';
import { isValidImg } from '../data/common-data';
import { fileToUri } from '../utils';

export default Vue.extend({
  mixins: [hvmq, profileIdLoaderMixin],
  components: {
    DataLoading,
    ViewProfileMainAttributes,
    ViewProfileInfoSection,
    GalleryCarousel,
    ViewProfileUploadBtns,
  },
  name: 'ViewProfile',
  data: () =>
    ({
      newImg: null,
      aboutMeFields: Object.freeze([
        { name: 'Height', icon: 'fa-ruler-vertical', field: 'height' },
        { name: 'Weight', icon: 'fa-weight', field: 'weight' },
        { name: 'Mother Tongue', icon: 'fa-american-sign-language-interpreting', field: 'motherTongue' },
        { name: 'Second Language', icon: 'fa-american-sign-language-interpreting', field: 'secondaryLanguages' },
        { name: 'Body Type', icon: 'fa-child', field: 'bodyType' },
        { name: 'Complexion', icon: 'fa-user', field: 'complexion' },
        { name: 'Ethenic Group', icon: 'fa-users', field: 'ethenicGroup' },
        { name: 'Any Disability', icon: 'fa-wheelchair', field: 'disability' },
      ]),
      educationAndCareerFields: Object.freeze([
        { name: 'Working With', icon: 'fa-building', field: 'workingWith' },
        { name: 'Occupation', icon: 'fa-user-md', field: 'occupation' },
        { name: 'Company/Department', icon: 'fa-building', field: 'companyDepartment' },
        { name: 'Work Location', icon: 'fa-map-marker-alt', field: 'workLocation' },
        { name: 'Income', icon: 'fa-rupee-sign', field: 'income' },
        { name: 'Own Car', icon: 'fa-car', field: 'ownCar' },
        { name: 'Own House/Flat', icon: 'fa-home', field: 'ownHouseFlat' },
      ]),
      familyFields: Object.freeze([
        { name: 'Father', icon: 'fa-user-md', field: 'father' },
        { name: 'Mother', icon: 'fa-user', field: 'mother' },
        { name: 'Family Location', icon: 'fa-map-marker', field: 'familyLocation' },
        { name: 'Native Place', icon: 'fa-map-marker', field: 'familyNativePlace' },
        { name: 'Brothers', icon: 'fa-users', field: 'brothers' },
        { name: 'Married Brother', icon: 'fa-bomb', field: 'marriedBrother' },
        { name: 'Sisters', icon: 'fa-users', field: 'sisters' },
        { name: 'Married Sister', icon: 'fa-magic', field: 'marriedSister' },
        { name: 'Family Type', icon: 'fa-neuter', field: 'familyType' },
        { name: 'Family Value', icon: 'fa-book', field: 'familyValues' },
        { name: 'Family Status', icon: 'fa-house-user', field: 'familyStatus' },
      ]),
      religionAndCommunityFields: Object.freeze([
        { name: 'Religion', icon: 'fa-book', field: 'religion' },
        { name: 'Manglik', icon: 'fa-asl-interpreting', field: 'manglik' },
        { name: 'Caste/Community', icon: 'fa-users', field: 'casteCommunity' },
        { name: 'Religious Belief', icon: 'fa-bell', field: 'religiousBelief' },
        { name: 'Guru', icon: 'fa-user-circle', field: 'guru' },
        { name: 'Guru Organization', icon: 'fa-building', field: 'guruOrganization' },
        { name: 'Kundali Match', icon: 'fa-file', field: 'kundaliMatch' },
      ]),
      lifeStyleFields: Object.freeze([
        { name: 'Diet', icon: 'fa-utensils', field: 'diet' },
        { name: 'Smoking', icon: 'fa-smoking', field: 'smoking' },
        { name: 'Drinking', icon: 'fa-glass-martini-alt', field: 'drinking' },
        { name: 'Yoga', icon: 'fa-dumbbell', field: 'yoga' },
        { name: 'Workout', icon: 'fa-dumbbell', field: 'workout' },
        { name: 'Party', icon: 'fa-glass-cheers', field: 'party' },
      ]),
      preferenceFields: Object.freeze([
        { name: 'Age', icon: 'fa-calendar', field: 'preferredAge' },
        { name: 'Gender', icon: 'fa-female', field: 'preferredGender' },
        { name: 'Marital Status', icon: 'fa-crosshairs', field: 'preferredMaritalStatus' },
        { name: 'Language', icon: 'fa-american-sign-language-interpreting', field: 'preferredLanguage' },
        { name: 'Religion', icon: 'fa-book', field: 'preferredReligion' },
        { name: 'Cast/Community', icon: 'fa-users', field: 'preferredCastCommunity' },
        { name: 'Sub Cast', icon: 'fa-user-secret', field: 'preferredSubCaste' },
        { name: 'Country', icon: 'fa-globe', field: 'preferredCountry' },
        { name: 'State', icon: 'fa-map', field: 'preferredState' },
        { name: 'City', icon: 'fa-map-marker', field: 'preferredCity' },
      ]),
    } as any),
  computed: {
    ...mapState('profile', ['loadingState']),
    ...mapState('similarProfiles', { similarProfiles: 'loadingState' }),
    aboutTitle() {
      if (this.iAmOwner) return 'About You';
      if (!this.loadingState.data) return 'About';
      return this.loadingState.data.gender === 'F' ? 'About Her' : 'About Him';
    },
  },
  filters: {
    toLink(item: About) {
      return `/#/settings/${item.title.toLowerCase().replace(/\W+/g, '-')}`;
    },
  },
  methods: {
    init() {
      this.$store.dispatch('profile/init', this.profileId || this.loggedInUser?.id);
      this.$store.dispatch('similarProfiles/init');
    },
    async setProfileImg(file: File) {
      if (isValidImg(file.name)) this.newImg = file && (await fileToUri(file));
    },
  },
});
</script>

<style lang="scss">
@media (max-width: 700px) {
  .view-profile .v-timeline {
    &::before {
      display: none;
    }

    .v-timeline-item__divider {
      display: none;
    }

    .v-timeline-item__body {
      max-width: 100% !important;
    }
  }
}
</style>

<style scoped lang="scss">
.view-album-btn-wrapper {
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  transition: background-color 0.25s;
  &.hovered {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.profile-change-btn {
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
}

.theme--light.v-timeline:before {
  background: var(--v-primary-lighten1);
}

.actions-btns-1 .v-btn.v-btn--outlined.v-btn--text {
  border-color: black;
}
.report-btns {
  background-color: #a89a99;
  .v-btn {
    text-transform: none;
    color: white;
    &:first-child {
      border-right: 1px solid white;
    }
  }
}

.left-panel {
  @media (min-width: 960px) {
    max-width: 375px;
    min-width: 300px;
    width: 33.33%;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    > .v-card {
      max-width: 375px;
      width: 30%;
    }
  }
}
</style>
