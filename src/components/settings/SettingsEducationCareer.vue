<template>
  <v-form class="settings-form register-form" lazy-validation ref="form">
    <h2 class="grid-column-span-all text-center">Education and Career</h2>
    <v-divider class="grid-column-span-all text-center mt-2 mb-4"></v-divider>
    <div>
      <label class="body-2 my-1 d-block" for="ec-highestEducation">Highest Education</label>
      <v-select
        :items="educationItems"
        :menu-props="{ maxHeight: '400' }"
        :error-messages="highestEducationErrors"
        required
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-highestEducation"
        outlined
        placeholder="Select Your Highest Education"
        prepend-inner-icon="fa-graduation-cap"
        v-model="highestEducation"
        @change="clear"
      ></v-select>
    </div>
    <span class="d-none d-sm-block"></span>
    <div>
      <label class="body-2 my-1 d-block" for="ec-highestEducation">Highest Degree</label>
      <v-select
        :items="highestDegreeItems"
        :error-messages="highestDegreeErrors"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-highestEducation"
        outlined
        placeholder="Select Your Highest Education"
        prepend-inner-icon="fa-graduation-cap"
        v-model="highestDegree"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="about-me-highestDegreeInstitution"
        >College / University (Highest Degree)</label
      >
      <v-text-field
        :error-messages="highestDegreeInstitutionErrors"
        class="border-radius-0 text-field-with-icon"
        dense
        id="about-me-highestDegreeInstitution"
        outlined
        placeholder="Enter Your College / University (Highest Degree)"
        prepend-inner-icon="fa-university"
        v-model="highestDegreeInstitution"
      ></v-text-field>
    </div>

    <template v-if="highestEducationLevel > 9">
      <div>
        <label class="body-2 my-1 d-block" for="ec-masterDegree">Master Degree</label>
        <v-select
          :items="masterDegreeItems"
          :error-messages="masterDegreeErrors"
          :menu-props="{ maxHeight: '400' }"
          active-class="primary--text"
          class="border-radius-0 text-field-with-icon"
          dense
          id="ec-masterDegree"
          outlined
          required
          placeholder="Select Your Master Degree"
          prepend-inner-icon="fa-graduation-cap"
          v-model="masterDegree"
        ></v-select>
      </div>
      <div>
        <label class="body-2 my-1 d-block" for="about-me-masterDegreeInstitution">College of Master Degree</label>
        <v-text-field
          class="border-radius-0 text-field-with-icon"
          dense
          required
          :error-messages="masterDegreeInstitutionErrors"
          id="about-me-masterDegreeInstitution"
          outlined
          placeholder="Enter Your College Name"
          prepend-inner-icon="fa-university"
          v-model="masterDegreeInstitution"
        ></v-text-field>
      </div>
    </template>

    <template v-if="highestEducationLevel > 8">
      <div>
        <label class="body-2 my-1 d-block" for="ec-bachelorDegree">Bachelor Degree</label>
        <v-select
          :items="bachelorDegreeItems"
          :error-messages="bachelorDegreeErrors"
          :menu-props="{ maxHeight: '400' }"
          active-class="primary--text"
          class="border-radius-0 text-field-with-icon"
          dense
          id="ec-bachelorDegree"
          outlined
          required
          placeholder="Select Your Bachelor Degree"
          prepend-inner-icon="fa-graduation-cap"
          v-model="bachelorDegree"
        ></v-select>
      </div>
      <div>
        <label class="body-2 my-1 d-block" for="about-me-bachelorDegreeInstitution">College of Bachelor Degree</label>
        <v-text-field
          class="border-radius-0 text-field-with-icon"
          dense
          required
          :error-messages="bachelorDegreeInstitutionErrors"
          id="about-me-bachelorDegreeInstitution"
          outlined
          placeholder="Enter Your College Name"
          prepend-inner-icon="fa-university"
          v-model="bachelorDegreeInstitution"
        ></v-text-field>
      </div>
    </template>
    <div>
      <label class="body-2 my-1 d-block" for="ec-workingWith">Working With</label>
      <v-select
        :items="workingWithItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-workingWith"
        outlined
        required
        placeholder="Select Your Working With"
        prepend-inner-icon="fa-graduation-cap"
        v-model="workingWith"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-companyDepartment">Department / Company Name</label>
      <v-select
        :items="companyDepartmentItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-companyDepartment"
        outlined
        required
        placeholder="Select Your Department / Company Name"
        prepend-inner-icon="fa-graduation-cap"
        v-model="companyDepartment"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-occupation">Occupation</label>
      <v-select
        :items="occupationItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-occupation"
        outlined
        required
        placeholder="Select Your Occupation"
        prepend-inner-icon="fa-graduation-cap"
        v-model="occupation"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-annualIncome">Annual Income</label>
      <v-select
        :items="annualIncomeItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-annualIncome"
        outlined
        required
        placeholder="Select Your Annual Income"
        prepend-inner-icon="fa-graduation-cap"
        v-model="annualIncome"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-workLocation">Work Location</label>
      <v-select
        :items="locationItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-workLocation"
        outlined
        required
        placeholder="Select Your Work Location"
        prepend-inner-icon="fa-graduation-cap"
        v-model="workLocation"
      ></v-select>
    </div>
    <span class="d-none d-sm-block"></span>
    <div>
      <label class="body-2 my-1 d-block" for="ec-own-car">Own A Car</label>
      <horizontal-icon-wrapper icon="fa-car">
        <v-radio-group hide-details="true" id="ec-own-car" class="ec-own-car ma-0" row dense required v-model="ownCar">
          <v-radio label="Yes" value="Yes" dense></v-radio>
          <v-radio label="No" value="No" dense></v-radio>
          <v-radio label="Planning To Buy" value="Planning To Buy" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-own-car">Own A House</label>
      <horizontal-icon-wrapper icon="fa-home">
        <v-radio-group
          hide-details="true"
          id="ec-own-house"
          class="register-own-house ma-0"
          row
          dense
          required
          v-model="ownHouseFlat"
        >
          <v-radio label="Yes" value="Yes" dense></v-radio>
          <v-radio label="No" value="No" dense></v-radio>
          <v-radio label="Planning To Buy" value="Planning To Buy" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>

    <div class="grid-column-span-all">
      <label class="body-2 mb-2 d-block" for="ec-about">Write About Your Education and Career</label>
      <v-textarea
        class="border-radius-0"
        dense
        id="ec-about"
        outlined
        required
        placeholder="Write About Your Education and Career"
        v-model="aboutEducation"
      ></v-textarea>
    </div>
    <span class="grid-column-span-all" style="height: 15px"></span>
    <div class="grid-column-span-all d-flex flex-nowrap align-center justify-end">
      <v-btn @click="save" class="primary">Save</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { educations } from '@/data/common-data';
import Vue from 'vue';
import { Dictionary } from 'vue-router/types/router';
import { validationMixin } from 'vuelidate';
import { or, required } from 'vuelidate/lib/validators';
import { commonDataMixin, commonSettingsPageMixin, CommonSettingsPageTyped } from '../../mixins';
import { User } from '../../models';
import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

function selectValidation(field: string) {
  return function() {
    if (!this.$v[field].$dirty) return [];
    return this.$v[field].required ? [] : ['Select A value'];
  } as (this: Dictionary<any>) => string[];
}

function textValidation(field: string) {
  return function() {
    if (!this.$v[field].$dirty) return [];
    return this.$v[field].required ? [] : ['A valid value is required'];
  } as (this: any) => string[];
}

function minLevelValidation(minLevel: number) {
  return function() {
    return this.highestEducationLevel < minLevel;
  } as (this: any) => boolean;
}

class SettingsEducationCareerState implements Partial<User> {
  highestEducation: string = null;
  highestDegree: string = null;
  highestDegreeInstitution: string = null;
  bachelorDegree: string = null;
  bachelorDegreeInstitution: string = null;
  masterDegree: string = null;
  masterDegreeInstitution: string = null;
  workingWith: string = null;
  companyDepartment: string = null;
  occupation: string = null;
  ownCar: string = null;
  workLocation: string = null;
  ownHouseFlat: string = null;
  aboutEducation: string = null;
}

export default Vue.extend({
  name: 'SettingsEducationCareer',
  mixins: [validationMixin, commonDataMixin, commonSettingsPageMixin],
  components: { HorizontalIconWrapper },
  data: () => new SettingsEducationCareerState() as CommonSettingsPageTyped<SettingsEducationCareerState>,
  validations: {
    highestEducation: { required },
    highestDegree: { required },
    highestDegreeInstitution: { required },
    bachelorDegree: { required: or(minLevelValidation(9), required) },
    bachelorDegreeInstitution: { required: or(minLevelValidation(9), required) },
    masterDegree: { required: or(minLevelValidation(10), required) },
    masterDegreeInstitution: { required: or(minLevelValidation(10), required) },
  },
  computed: {
    highestDegreeItems() {
      return !this.highestEducation ? [] : educations.find(e => e.value === this.highestEducation).values;
    },
    highestEducationLevel() {
      return this.highestEducation ? educations.find(e => e.value === this.highestEducation).level : 0;
    },
    bachelorDegreeErrors: selectValidation('bachelorDegree'),
    bachelorDegreeInstitutionErrors: textValidation('bachelorDegreeInstitution'),
    masterDegreeErrors: selectValidation('masterDegree'),
    masterDegreeInstitutionErrors: textValidation('masterDegreeInstitution'),
    highestEducationErrors: selectValidation('highestEducation'),
    highestDegreeErrors: selectValidation('highestDegree'),
    highestDegreeInstitutionErrors: textValidation('highestDegreeInstitution'),
  },
  methods: {
    clear() {
      Object.assign(this, {
        highestDegree: null,
        highestDegreeInstitution: null,
        bachelorDegree: null,
        bachelorDegreeInstitution: null,
        masterDegree: null,
        masterDegreeInstitution: null,
      });
    },
    save() {
      this.defaultSaveAction(Object.keys(new SettingsEducationCareerState()), true);
    },
  },
});
</script>
