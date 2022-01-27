<template>
  <v-form class="settings-form register-form" lazy-validation ref="form">
    <h2 class="grid-column-span-all text-center">Life Style</h2>
    <v-divider class="grid-column-span-all text-center mt-2 mb-4"></v-divider>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-diet">Diet</label>
      <horizontal-icon-wrapper icon="fa-utensils">
        <v-radio-group hide-details="true" id="settings-diet" class="f-diet ma-0" row dense required v-model="diet">
          <v-radio label="Veg" value="Veg" dense></v-radio>
          <v-radio label="Vegan" value="Vegan" dense></v-radio>
          <v-radio label="Non-Veg" value="Non-Veg" dense></v-radio>
          <v-radio label="Egg" value="Egg" dense></v-radio>
          <v-radio label="Jain" value="Jain" dense></v-radio> </v-radio-group
      ></horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-drink">Drink</label>
      <horizontal-icon-wrapper icon="fa-glass-martini-alt">
        <v-radio-group
          hide-details="true"
          id="settings-drink"
          class="f-drink ma-0"
          row
          dense
          required
          v-model="drinking"
        >
          <v-radio label="No" value="No" dense></v-radio>
          <v-radio label="Socially" value="Socially" dense></v-radio>
          <v-radio label="Regularly" value="Regularly" dense></v-radio> </v-radio-group
      ></horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-smoke">Smoke</label>
      <horizontal-icon-wrapper icon="fa-smoking">
        <v-radio-group
          hide-details="true"
          id="settings-smoke"
          class="f-smoke ma-0"
          row
          dense
          required
          v-model="smoking"
        >
          <v-radio label="Never" value="Never" dense></v-radio>
          <v-radio label="Ocassionaly" value="Ocassionaly" dense></v-radio>
          <v-radio label="Regularly" value="Regularly" dense></v-radio>
          <v-radio label="Quited" value="Quited" dense></v-radio> </v-radio-group
      ></horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-yoga">Yoga &amp; Meditation</label>
      <horizontal-icon-wrapper icon="fa-dumbbell">
        <v-radio-group hide-details="true" id="settings-yoga" class="f-yoga ma-0" row dense required v-model="yoga">
          <v-radio label="Never" value="Never" dense></v-radio>
          <v-radio label="Daily" value="Daily" dense></v-radio>
          <v-radio label="Weekly" value="Weekly" dense></v-radio>
          <v-radio label="Very Often" value="Very Often" dense></v-radio> </v-radio-group
      ></horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-workout">Workout</label>
      <horizontal-icon-wrapper icon="fa-dumbbell">
        <v-radio-group
          hide-details="true"
          id="settings-workout"
          class="f-workout ma-0"
          row
          dense
          required
          v-model="workout"
        >
          <v-radio label="Never" value="Never" dense></v-radio>
          <v-radio label="Daily" value="Daily" dense></v-radio>
          <v-radio label="Weekly" value="Weekly" dense></v-radio>
          <v-radio label="Very Often" value="Very Often" dense></v-radio> </v-radio-group
      ></horizontal-icon-wrapper>
    </div>
    <div class="grid-column-span-all">
      <label class="body-2 my-1 d-block" for="settings-party">Party</label>
      <horizontal-icon-wrapper icon="fa-glass-cheers">
        <v-radio-group hide-details="true" id="settings-party" class="f-party ma-0" row dense required v-model="party">
          <v-radio label="Never" value="Never" dense></v-radio>
          <v-radio label="Daily" value="Daily" dense></v-radio>
          <v-radio label="Weekly" value="Weekly" dense></v-radio>
          <v-radio label="Very Often" value="Very Often" dense></v-radio> </v-radio-group
      ></horizontal-icon-wrapper>
    </div>

    <span class="grid-column-span-all" style="height: 15px"></span>
    <div class="grid-column-span-all d-flex flex-nowrap align-center justify-end">
      <v-btn @click="save" class="primary">Save</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { commonSettingsPageMixin, CommonSettingsPageTyped } from '../../mixins';
import { User } from '../../models';
import HorizontalIconWrapper from '../HorizontalIconWrapper.vue';

class SettingsLifeStyleState implements Partial<User> {
  diet: string = null;
  drinking: string = null;
  smoking: string = null;
  yoga: string = null;
  workout: string = null;
  party: string = null;
}

export default Vue.extend({
  name: 'SettingsLifeStyle',
  mixins: [commonSettingsPageMixin],
  components: { HorizontalIconWrapper },
  data: () => new SettingsLifeStyleState() as CommonSettingsPageTyped<SettingsLifeStyleState>,
  methods: {
    save() {
      this.defaultSaveAction(Object.keys(new SettingsLifeStyleState()));
    },
  },
});
</script>
