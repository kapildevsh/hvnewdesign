<template>
  <v-form class="settings-form register-form" lazy-validation ref="form">
    <h2 class="grid-column-span-all text-center">Religion and Community</h2>
    <v-divider class="grid-column-span-all text-center mt-2 mb-4"></v-divider>
    <div>
      <label class="body-2 my-1 d-block" for="settings-religion">Religion</label>
      <v-select
        :items="religionsItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-religion"
        outlined
        placeholder="Select Your Religion"
        prepend-inner-icon="fa-pray"
        v-model="religion"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-caste">Caste</label>
      <v-select
        :items="casteItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-caste"
        outlined
        placeholder="Select Your Caste"
        prepend-inner-icon="fa-users"
        v-model="caste"
        @change="subCaste = null"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-subCaste">Sub-Caste</label>
      <v-select
        :items="subCasteItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-subCaste"
        outlined
        placeholder="Select Your Sub-Caste"
        prepend-inner-icon="fa-users"
        v-model="subCaste"
      ></v-select>
    </div>
    <div>
      <label class="body-2 my-1 d-block" for="settings-religiousBelief">Religious Belief</label>
      <v-select
        :items="religiousBeliefItems"
        :menu-props="{ maxHeight: '400' }"
        active-class="primary--text"
        class="border-radius-0 text-field-with-icon"
        dense
        id="settings-religiousBelief"
        outlined
        placeholder="Select Your Religious Belief"
        prepend-inner-icon="fa-pray"
        v-model="religiousBelief"
      ></v-select>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-manglik">Manglik</label>
      <horizontal-icon-wrapper icon="fa-street-view">
        <v-radio-group
          hide-details="true"
          id="settings-manglik"
          class="f-manglik ma-0"
          row
          dense
          required
          v-model="manglik"
        >
          <v-radio label="No" value="No" dense></v-radio>
          <v-radio label="Anshik Manglik" value="Anshik Manglik" dense></v-radio>
          <v-radio label="Manglik" value="Manglik" dense></v-radio>
          <v-radio label="Dont' Know" value="Dont' Know" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-kundliMatch">Kundli Match</label>
      <horizontal-icon-wrapper icon="fa-book">
        <v-radio-group
          hide-details="true"
          id="settings-kundliMatch"
          class="f-kundliMatch ma-0"
          row
          dense
          required
          v-model="kundliMatch"
        >
          <v-radio label="Not Required" value="Not Required" dense></v-radio>
          <v-radio label="Must" value="Must" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>
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
import { castes } from '@/data/common-data';
import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

class SettingsReligionState implements Partial<User> {
  religion: string = null;
  caste: string = null;
  subCaste: string = null;
  religiousBelief: string = null;
  manglik: string = null;
  kundliMatch: string = null;
}

export default Vue.extend({
  name: 'SettingsReligion',
  components: { HorizontalIconWrapper },
  mixins: [commonDataMixin, commonSettingsPageMixin],
  data: () => new SettingsReligionState() as CommonSettingsPageTyped<SettingsReligionState>,
  computed: {
    subCasteItems() {
      return !this.caste ? [] : Object.freeze(castes.find(item => item.value === this.caste).subcastes);
    },
  },
  methods: {
    save() {
      this.defaultSaveAction(Object.keys(new SettingsReligionState()));
    },
  },
});
</script>
