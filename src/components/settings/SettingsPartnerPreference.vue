<template>
  <v-form class="settings-form register-form" lazy-validation ref="form">
    <h2 class="grid-column-span-all text-center">Partner Preference</h2>
    <v-divider class="grid-column-span-all text-center mt-2 mb-4"></v-divider>
    <div>
      <label for="settings-preferred-age" class="body-2 mb-1 d-block">Age From</label>
      <v-select
        hide-details="true"
        attach
        :menu-props="{ offsetY: true }"
        dense
        id="hps-age"
        class="border-radius-0 text-field-with-icon"
        prepend-inner-icon="fa-child"
        outlined
        :items="ageItems"
        required
        v-model="preferredAge[0]"
      ></v-select>
    </div>
    <div>
      <label for="settings-preferred-to-age" class="body-2 mb-1 d-block">Age To</label>
      <v-select
        active-class="primary--text"
        attach
        class="border-radius-0 text-field-with-icon"
        dense
        hide-details="true"
        id="hps-to-age"
        outlined
        prepend-inner-icon="fa-child"
        required
        :items="ageToItems"
        :menu-props="{ offsetY: true }"
        v-model="preferredAge[1]"
      ></v-select>
    </div>

    <div>
      <label class="body-2 mb-1 d-block" for="settings-preferred-gender">Gender</label>
      <horizontal-icon-wrapper icon="fa-venus-mars">
        <v-radio-group
          class="settings-preferred-gender ma-0"
          dense
          hide-details="true"
          id="settings-preferred-gender"
          required
          row
          v-model="preferredGender"
        >
          <v-radio label="Male" value="M" dense></v-radio>
          <v-radio label="Female" value="F" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>

    <div>
      <label class="body-2 mb-1 d-block" for="settings-martial-status">Marital Status</label>
      <v-select
        :hide-details="true"
        :items="maritalStatusItems"
        :menu-props="{ offsetY: true }"
        attach
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-martial-status"
        outlined
        placeholder="Select Marital Status"
        prepend-inner-icon="fa-ring"
        required
        v-model="preferredMaritalStatus"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-language">Language</label>
      <v-select
        :hide-details="true"
        :items="languagesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-language"
        outlined
        placeholder="Select Your Preferred Language"
        prepend-inner-icon="fa-american-sign-language-interpreting"
        v-model="preferredLanguage"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-religion">Religion</label>
      <v-select
        :hide-details="true"
        :items="religionsItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-religion"
        outlined
        placeholder="Select Your Religion"
        prepend-inner-icon="fa-pray"
        v-model="preferredReligion"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-caste">Caste</label>
      <v-select
        :hide-details="true"
        :items="casteItems"
        :menu-props="{ maxHeight: '400' }"
        @change="preferredSubCaste = null"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-caste"
        outlined
        placeholder="Select Your Caste"
        prepend-inner-icon="fa-users"
        v-model="preferredCaste"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-subCaste">Sub-Caste</label>
      <v-select
        :hide-details="true"
        :items="subCasteItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-subCaste"
        outlined
        placeholder="Select Your Sub-Caste"
        prepend-inner-icon="fa-users"
        v-model="preferredSubCaste"
      ></v-select>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="pp-preferredCountry">Family's Location (Country)</label>
      <v-select
        :hide-details="true"
        :items="countriesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="pp-preferredCountry"
        outlined
        placeholder="Select Your Family's Location"
        prepend-inner-icon="fa-globe"
        required
        v-model="preferredCountry"
      ></v-select>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="pp-preferredState">State</label>
      <v-select
        :hide-details="true"
        :items="stateItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="pp-preferredState"
        multiple
        outlined
        placeholder="Select Your Family State"
        prepend-inner-icon="fa-map-marker"
        required
        v-model="preferredState"
      ></v-select>
    </div>

    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="pp-preferredCity">City</label>
      <v-select
        :hide-details="true"
        :items="cityItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="pp-preferredCity"
        multiple
        outlined
        placeholder="Select Your Family City"
        prepend-inner-icon="fa-map-marker"
        required
        v-model="preferredCity"
      ></v-select>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 mb-2 d-block" for="pp-about">Write About Your Preference</label>
      <v-textarea
        class="border-radius-0"
        dense
        id="pp-about"
        outlined
        required
        placeholder="Write About Your Preference"
        v-model="aboutPreference"
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
import { ageRange, castes } from '../../data/common-data';
import { commonDataMixin, commonSettingsPageMixin, CommonSettingsPageTyped } from '../../mixins';
import { User } from '../../models';
import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

class SettingsPartnerPreferenceState implements Partial<User> {
  preferredAge: number[] = [];
  preferredCastCommunity: string = null;
  preferredCaste: string = null;
  preferredCity: string[] = null;
  preferredCountry: string = null;
  preferredGender: string = null;
  preferredLanguage: string = null;
  preferredMaritalStatus: string = null;
  preferredReligion: string = null;
  preferredState: string[] = null;
  preferredSubCaste: string = null;
}

export default Vue.extend({
  name: 'SettingsPartnerPreference',
  components: { HorizontalIconWrapper },
  mixins: [commonSettingsPageMixin, commonDataMixin],
  data: () => new SettingsPartnerPreferenceState() as CommonSettingsPageTyped<SettingsPartnerPreferenceState>,
  methods: {
    save() {
      this.defaultSaveAction(Object.keys(new SettingsPartnerPreferenceState()));
    },
  },
  computed: {
    ageToItems() {
      return !this.preferredAge ? ageRange : ageRange.slice(ageRange.indexOf(this.preferredAge[0]));
    },
    subCasteItems() {
      return !this.preferredCaste
        ? []
        : Object.freeze(castes.find(item => item.value === this.preferredCaste).subcastes);
    },
  },
});
</script>
