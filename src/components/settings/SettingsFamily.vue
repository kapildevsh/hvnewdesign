<template>
  <v-form class="settings-form register-form" lazy-validation ref="form">
    <h2 class="grid-column-span-all text-center">Family</h2>
    <v-divider class="grid-column-span-all text-center mt-2 mb-4"></v-divider>
    <div>
      <label class="body-2 my-1 d-block" for="ec-fathersStatus">Father's Status</label>
      <v-select
        :hide-details="true"
        :items="fathersStatusItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-fathersStatus"
        outlined
        required
        placeholder="Select Your Father's Status"
        prepend-inner-icon="fa-child"
        v-model="fathersStatus"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-mothersStatus">Mother's Status</label>
      <v-select
        :hide-details="true"
        :items="mothersStatusItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-mothersStatus"
        outlined
        required
        placeholder="Select Your Mother's Status"
        prepend-inner-icon="fa-child"
        v-model="mothersStatus"
      ></v-select>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="ec-familyCountry">Family's Location (Country)</label>
      <v-select
        :hide-details="true"
        :items="countriesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyCountry"
        outlined
        required
        placeholder="Select Your Family's Location"
        prepend-inner-icon="fa-globe"
        v-model="familyCountry"
      ></v-select>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="ec-familyState">State</label>
      <v-select
        :hide-details="true"
        :items="stateItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyState"
        outlined
        required
        placeholder="Select Your Family State"
        prepend-inner-icon="fa-map-marker"
        v-model="familyState"
      ></v-select>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="ec-familyCity">City</label>
      <v-select
        :hide-details="true"
        :items="cityItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyCity"
        outlined
        required
        placeholder="Select Your Family City"
        prepend-inner-icon="fa-map-marker"
        v-model="familyCity"
      ></v-select>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="ec-familyNativePlace">Native Place</label>
      <v-select
        :hide-details="true"
        :items="nativePlaceItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyNativePlace"
        outlined
        required
        placeholder="Select Your Family Native Place"
        prepend-inner-icon="fa-home"
        v-model="familyNativePlace"
      ></v-select>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="ec-familyBrothers">Brother(s)</label>
      <v-text-field
        :hide-details="true"
        type="number"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyBrothers"
        outlined
        required
        placeholder="Select Your Number of Brothers"
        prepend-inner-icon="fa-child"
        v-model="familyBrothers"
      ></v-text-field>
    </div>

    <div>
      <label class="body-2 my-1 d-block" for="ec-familyMarriedBrothers">Married Brother(s)</label>
      <v-text-field
        :hide-details="true"
        type="number"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyMarriedBrothers"
        outlined
        required
        placeholder="Select Your Number of Married Brothers"
        prepend-inner-icon="fa-child"
        v-model="familyMarriedBrothers"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-familySisters">Sister(s)</label>
      <v-text-field
        :hide-details="true"
        type="number"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familySisters"
        outlined
        required
        placeholder="Select Your Number of Sisters"
        prepend-inner-icon="fa-child"
        v-model="familySisters"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-familyMarriedSisters">Married Sister(s)</label>
      <v-text-field
        :hide-details="true"
        type="number"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyMarriedSisters"
        outlined
        required
        placeholder="Select Your Number of Married Sisters"
        prepend-inner-icon="fa-child"
        v-model="familyMarriedSisters"
      ></v-text-field>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-familyValues">Family Values</label>
      <v-select
        :hide-details="true"
        :items="familyValuesItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyValues"
        outlined
        required
        placeholder="Select Your Family Values"
        prepend-inner-icon="fa-users"
        v-model="familyValues"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="ec-familyStatus">Family Status</label>
      <v-select
        :hide-details="true"
        :items="familyStatusItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="ec-familyStatus"
        outlined
        required
        placeholder="Select Your Family Status"
        prepend-inner-icon="fa-rupee-sign"
        v-model="familyStatus"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="f-familyType">Family Type</label>
      <horizontal-icon-wrapper icon="fa-users">
        <v-radio-group
          hide-details="true"
          id="f-familyType"
          class="f-familyType ma-0"
          row
          dense
          required
          v-model="familyType"
        >
          <v-radio label="Joint" value="Joint" dense></v-radio>
          <v-radio label="Nuclear" value="Nuclear" dense></v-radio>
          <v-radio label="Only MySelf" value="Only MySelf" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 mb-2 d-block" for="f-about">Write About Your Family</label>
      <v-textarea
        class="border-radius-0"
        dense
        id="f-about"
        outlined
        required
        placeholder="Write About Your Family"
        v-model="aboutFamily"
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
import { commonDataMixin, commonSettingsPageMixin, CommonSettingsPageTyped } from '../../mixins';
import { User } from '../../models';
import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

class SettingsFamilyState implements Partial<User> {
  fathersStatus: string = null;
  mothersStatus: string = null;
  familyCountry: string = null;
  familyState: string = null;
  familyCity: string = null;
  familyNativePlace: string = null;
  familyBrothers: number = null;
  familyMarriedBrothers: number = null;
  familySisters: number = null;
  familyMarriedSisters: number = null;
  familyValues: string = null;
  familyStatus: string = null;
  aboutFamily: string = null;
}

export default Vue.extend({
  name: 'SettingsFamily',
  mixins: [commonDataMixin, commonSettingsPageMixin],
  components: { HorizontalIconWrapper },
  data: () => new SettingsFamilyState() as CommonSettingsPageTyped<SettingsFamilyState>,
  methods: {
    save() {
      this.defaultSaveAction(Object.keys(new SettingsFamilyState()));
    },
  },
});
</script>
