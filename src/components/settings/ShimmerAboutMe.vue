<template>
  <v-form class="settings-form register-form" lazy-validation ref="form">
    <h2 class="grid-column-span-all text-center">About Me</h2>
    <v-divider class="grid-column-span-all text-center mt-2 mb-4"></v-divider>
    <v-sheet class="profile-img" elevation="2"
      ><v-avatar size="150" tile class="profile-avatar animate" color="transparent">
        <img>
        <v-btn class="position-absolute" icon text>
         <div>test</div>
          <v-icon color="white"> fa-camera </v-icon></v-btn
        >
      </v-avatar></v-sheet
    >
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-are-you-select">You Are A</label>
      <horizontal-icon-wrapper icon="fa-building">
        <v-radio-group hide-details="true" class="register-are-you-select ma-0" row dense required>
          <v-radio label="Daughter" value="Daughter" dense></v-radio>
          <v-radio label="MySelf" value="MySelf" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="about-me-first-name">First Name</label>
      <div>test1</div>
    </div>
    
    
    
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
// import { validationMixin } from 'vuelidate';
// import { mapState } from 'vuex';
// import { isValidImg } from '../../data/common-data';
// import { basicDetailsMixin, basicDetailsValidations, commonDataMixin, commonSettingsPageMixin } from '../../mixins';

import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

export default Vue.extend({
  name: 'ShimmerAboutMe',
  // mixins: [validationMixin, basicDetailsMixin, commonDataMixin, commonSettingsPageMixin],
  components: { HorizontalIconWrapper },
  // data: () => {},
  // validations: basicDetailsValidations('password', 'confirmPassword', 'agreed', 'email', 'mobileNumber'),
  // computed: {
  //   ...mapState('masterdata', ['languages']),
  //   languagesitems() {
  //     debugger;
  //     return this.languages;
  //   },
  // },
  
});
</script>

<style scoped lang="scss">
.animate {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 1000px 100%;
}
.profile-img {
  align-self: center;

  @media (min-width: 600px) {
    grid-column: 2;
    grid-row: 3 / span 2;
    place-self: center;
  }
}

.v-btn {
  bottom: 0;
}
</style>
