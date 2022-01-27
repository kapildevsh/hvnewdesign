<template>
  <v-form class="settings-form register-form" lazy-validation ref="form">
    <h2 class="grid-column-span-all text-center">About Me</h2>
    <v-divider class="grid-column-span-all text-center mt-2 mb-4"></v-divider>
    <v-sheet class="profile-img" elevation="2"
      ><v-avatar size="150" tile class="profile-avatar" color="transparent">
        <img v-set-img="img" :alt="userData | fullName" />
        <v-btn class="position-absolute" icon text>
          <input
            accept="image/png, image/jpeg, image/jpg"
            class="file-input"
            type="file"
            @change="setImg($event.target.files[0])"
          />
          <v-icon color="white"> fa-camera </v-icon></v-btn
        >
      </v-avatar></v-sheet
    >
    <div>
      <label class="body-2 my-1 d-block" for="about-me-first-name">First Name</label>
      <v-text-field
        :error-messages="firstNameErrors"
        :hide-details="true"
        class="border-radius-0 text-field-with-icon"
        dense
        id="about-me-first-name"
        outlined
        placeholder="Enter Your First Name"
        prepend-inner-icon="fa-user"
        required
        v-model="firstName"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="about-me-last-name">Last Name</label>
      <v-text-field
        :error-messages="lastNameErrors"
        :hide-details="true"
        class="border-radius-0 text-field-with-icon"
        dense
        id="about-me-last-name"
        outlined
        placeholder="Enter Your Last Name"
        prepend-inner-icon="fa-user"
        required
        v-model="lastName"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-gender">Gender</label>
      <horizontal-icon-wrapper icon="fa-venus-mars">
        <v-radio-group
          hide-details="true"
          :error-messages="genderErrors"
          class="register-gender ma-0"
          dense
          id="about-me-gender"
          required
          row
          v-model="gender"
        >
          <v-radio label="Male" value="M" dense></v-radio>
          <v-radio label="Female" value="F" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-are-you-select">You Are A</label>
      <horizontal-icon-wrapper icon="fa-building">
        <v-radio-group hide-details="true" class="register-are-you-select ma-0" row dense required v-model="userType">
          <v-radio label="User" value="U" dense></v-radio>
          <v-radio label="Marriage Bureau" value="MB" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-dob">Date of Birth</label>
      <div ref="dobAnchor">
        <v-menu
          :close-on-content-click="false"
          :return-value.sync="dob"
          min-width="auto"
          offset-y
          ref="menu"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :error-messages="dobErrors"
              :hide-details="true"
              v-bind="attrs"
              v-model="dob"
              v-on="on"
              class="border-radius-0 text-field-with-icon"
              dense
              id="about-me-dob"
              outlined
              placeholder="Enter Your Date Of Birth"
              prepend-inner-icon="fa-calendar"
              readonly
              required
            ></v-text-field>
          </template>
          <v-date-picker v-model="dob" no-title scrollable :max="maxDob">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dob)"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-email-address">Email address</label>
      <v-text-field
        :error-messages="emailErrors"
        :hide-details="true"
        class="border-radius-0 text-field-with-icon"
        dense
        id="about-me-email-address"
        outlined
        placeholder="Enter Your Email Address"
        prepend-inner-icon="fa-envelope"
        required
        type="email"
        v-model="email"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-mobile-number">Mobile number</label>
      <div class="d-flex flex-wrap flex-sm-nowrap gap-1" ref="rmnAnchor">
        <v-select
          :attach="$refs.rmnAnchor"
          :error-messages="countryCodeErrors"
          :items="['+91']"
          :menu-props="{ offsetY: true }"
          class="border-radius-0 register-mobile-number"
          dense
          hide-details="true"
          id="about-me-mobile-number"
          outlined
          required
          v-model="countryCode"
        ></v-select>
        <v-text-field
          :error-messages="mobileNumberErrors"
          :hide-details="true"
          class="border-radius-0 text-field-with-icon"
          dense
          id="about-me-mobile-number-input"
          outlined
          placeholder="Enter Your Mobile number"
          prepend-inner-icon="fa-mobile"
          required
          type="tel"
          v-model="mobileNumber"
        ></v-text-field>
      </div>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-maritalStatus">Marital Status</label>
      <v-select
        :items="maritalStatusItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-maritalStatus"
        outlined
        placeholder="Select Your Marital Status"
        prepend-inner-icon="fa-graduation-cap"
        v-model="maritalStatus"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="about-me-height">Height</label>
      <v-select
        :items="heightItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-height"
        outlined
        placeholder="Select Your Height"
        prepend-inner-icon="fa-ruler"
        v-model="height"
      ></v-select>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-weight">Weight (In Kgs)</label>
      <v-text-field
        :hide-details="true"
        class="border-radius-0 text-field-with-icon"
        dense
        id="about-me-weight"
        outlined
        placeholder="Enter Your Weight"
        prepend-inner-icon="fa-weight"
        required
        type="number"
        v-model="weight"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-body-type">Body Type</label>
      <v-select
        :items="bodyTypesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-body-type"
        outlined
        placeholder="Select Body Type"
        prepend-inner-icon="fa-child"
        v-model="bodyType"
      ></v-select>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-complexion">Complexion</label>
      <v-select
        :items="complexionItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-complexion"
        outlined
        placeholder="Select Your Complexion"
        prepend-inner-icon="fa-user"
        v-model="complexion"
      ></v-select>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-ethenicities">Ethenic Group</label>
      <v-select
        :items="ethenicitiesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-ethenicities"
        outlined
        placeholder="Select Your Ethenic Group"
        prepend-inner-icon="fa-users"
        v-model="ethenicGroup"
      ></v-select>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-disabilities">Any Disability</label>
      <horizontal-icon-wrapper icon="fa-wheelchair">
        <v-radio-group
          hide-details="true"
          class="register-are-you-select ma-0"
          dense
          id="about-me-disabilities"
          required
          row
          v-model="disability"
        >
          <v-radio label="Yes" value="Yes" dense></v-radio>
          <v-radio label="No" value="No" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all" v-if="disability === 'Yes'">
      <label class="body-2 mb-2 d-block" for="about-me-disabilityDescription">Please Describe Your Disability</label>
      <v-text-field
        :hide-details="true"
        class="border-radius-0 text-field-with-icon"
        dense
        id="about-me-disabilityDescription"
        outlined
        placeholder="Please Describe Your Disability"
        prepend-inner-icon="fa-wheelchair"
        required
        v-model="disabilityDescription"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-mother-tongue">Your Mother Tongue</label>
      <v-select
        :items="languagesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-mother-tongue"
        outlined
        placeholder="Select Your Mother Tongue"
        prepend-inner-icon="fa-american-sign-language-interpreting"
        v-model="motherTongue"
      ></v-select>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-spoken-language">Secondary Language(s)</label>
      <v-select
        :items="languagesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-spoken-language"
        multiple
        outlined
        placeholder="Select Languages You can Speak"
        prepend-inner-icon="fa-american-sign-language-interpreting"
        v-model="secondaryLanguages"
      ></v-select>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-hobbies">Hobbies</label>
      <v-select
        :items="hobbiesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-hobbies"
        multiple
        outlined
        placeholder="Select Your Hobbies"
        prepend-inner-icon="fa-running"
        v-model="hobbies"
      ></v-select>
    </div>
    <div>
      <label class="body-2 mb-2 d-block" for="about-me-interest">Interest</label>
      <v-select
        :items="interestItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="about-me-interest"
        multiple
        outlined
        placeholder="Select Your Interests"
        prepend-inner-icon="fa-book"
        v-model="interest"
      ></v-select>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 mb-2 d-block" for="about-me-about-me">Write About Yourself</label>
      <v-textarea
        class="border-radius-0"
        dense
        id="about-me-about-me"
        outlined
        required
        placeholder="Write About Yourself"
        v-model="aboutMe"
      ></v-textarea>
    </div>
    <span class="grid-column-span-all" style="height: 15px"></span>
    <div class="grid-column-span-all d-flex flex-nowrap align-center justify-end">
      <v-btn @click="save" class="primary">Save</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { isValidImg } from '../../data/common-data';
import {
  basicDetailsMixin,
  basicDetailsValidations,
  commonDataMixin,
  commonSettingsPageMixin,
  CommonSettingsPageTyped,
} from '../../mixins';
import { User } from '../../models';
import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

class SettingsAboutMeState implements Partial<User> {
  aboutMe: string = null;
  bodyType: string = null;
  disability = 'No';
  dob: string = null;
  ethenicGroup: string = null;
  height: number = null;
  hobbies: string[] = [];
  img: string | File = null;
  interest: string[] = [];
  motherTongue: string = null;
  secondaryLanguages: string[] = [];
  weight = 0;
  gender: User['gender'] = null;
  maritalStatus: string = null;
  disabilityDescription: string;
}

export default Vue.extend({
  name: 'SettingsAboutMe',
  mixins: [validationMixin, basicDetailsMixin, commonDataMixin, commonSettingsPageMixin],
  components: { HorizontalIconWrapper },
  data: () => new SettingsAboutMeState() as CommonSettingsPageTyped<SettingsAboutMeState>,
  validations: basicDetailsValidations('password', 'confirmPassword', 'agreed'),
  methods: {
    save() {
      this.defaultSaveAction(Object.keys(new SettingsAboutMeState()), true);
    },
    setImg(file: File) {
      if (isValidImg(file.name)) this.img = file;
    },
  },
});
</script>

<style scoped lang="scss">
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
