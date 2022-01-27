<template>
  <v-form class="d-grid">
    <h2 class="grid-column-span-2 text-center">Address</h2>
    <v-divider class="grid-column-span-2 text-center mt-2 mb-4"></v-divider>

    <label class="body-2" for="register-address">Address</label>
    <v-text-field
      dense
      id="register-address"
      outlined
      :error-messages="addressErrors"
      required
      v-model="address"
      class="border-radius-0 text-field-with-icon"
      prepend-inner-icon="fa-address-book-o"
      placeholder="Enter Your Address"
    ></v-text-field>
    <label class="body-2" for="register-address-line-2">Address Line 2</label>
    <v-text-field
      dense
      id="register-address-line-2"
      outlined
      :error-messages="addressLine2Errors"
      required
      v-model="addressLine2"
      class="border-radius-0 text-field-with-icon"
      prepend-inner-icon="fa-address-book-o"
      placeholder="Enter Your Address Line 2"
    ></v-text-field>
    <label class="body-2" for="register-address-line-3">Address Line 3</label>
    <v-text-field
      dense
      id="register-address-line-3"
      outlined
      :error-messages="addressLine3Errors"
      required
      v-model="addressLine3"
      class="border-radius-0 text-field-with-icon"
      prepend-inner-icon="fa-address-book-o"
      placeholder="Enter Your Address Line 3"
    ></v-text-field>
    <label class="body-2" for="register-city">City</label>
    <v-select
      cache-items
      class="text-field-with-icon border-radius-0 register-city"
      :menu-props="{ offsetY: true }"
      dense
      id="register-city"
      outlined
      :items="_cityItems"
      required
      v-model="city"
      prepend-inner-icon="fa-globe"
      :error-messages="cityErrors"
      placeholder="Select Your City"
    ></v-select>
    <label class="body-2" for="register-state">State</label>
    <v-select
      cache-items
      class="text-field-with-icon border-radius-0 register-state"
      :menu-props="{ offsetY: true }"
      dense
      id="register-state"
      outlined
      :items="_stateItems"
      required
      v-model="state"
      :error-messages="stateErrors"
      prepend-inner-icon="fa-globe"
      placeholder="Select Your State"
    ></v-select>
    <label class="body-2" for="register-country">Country</label>
    <v-select
      cache-items
      class="text-field-with-icon border-radius-0 register-country"
      :menu-props="{ offsetY: true }"
      dense
      id="register-country"
      outlined
      :items="_countryItems"
      required
      v-model="country"
      prepend-inner-icon="fa-globe"
      :error-messages="countryErrors"
      placeholder="Select Your Country"
    ></v-select>
    <label class="body-2" for="register-zip-postal-code">Zip/Postal Code</label>
    <v-text-field
      dense
      id="register-zip-postal-code"
      outlined
      :error-messages="zipPostalCodeErrors"
      required
      v-model="zipPostalCode"
      class="border-radius-0 text-field-with-icon"
      prepend-inner-icon="fa-building"
      placeholder="Enter Your Zip/Postal Code"
    ></v-text-field>
    <span></span>
    <div class="d-flex flex-nowrap align-center justify-end"><v-btn class="primary">Save</v-btn></div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { countries } from '@/data/common-data';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default Vue.extend({
  name: 'RegisterAddress',
  mixins: [validationMixin],
  data: () => ({
    address: null,
    addressLine2: null,
    state: null,
    city: null,
    country: null,
    zipPostalCode: null,
    addressLine3: null,
  }),
  validations: {
    address: { required },
    addressLine2: { required },
    addressLine3: { required },
    state: { required },
    city: { required },
    country: { required },
    zipPostalCode: { required },
  },
  methods: {
    validate() {
      this.$v.$touch();
      return !this.$v.$invalid;
    },
  },
  computed: {
    _cityItems: () => ['Delhi', 'Mumbai'],
    _stateItems: () => ['Delhi', 'Mumbai'],
    _countryItems: () => countries,
    addressLine3Errors() {
      if (!this.$v.addressLine3.$dirty) return [];
      return [!this.$v.addressLine3.required && 'Address Line 3 is required'].filter(Boolean);
    },
    addressErrors() {
      if (!this.$v.address.$dirty) return [];
      return [!this.$v.address.required && 'Address is required'].filter(Boolean);
    },
    addressLine2Errors() {
      if (!this.$v.addressLine2.$dirty) return [];
      return [!this.$v.addressLine2.required && 'Address Line 2 is required'].filter(Boolean);
    },
    cityErrors() {
      if (!this.$v.city.$dirty) return [];
      return [!this.$v.city.required && 'City is required'].filter(Boolean);
    },
    stateErrors() {
      if (!this.$v.state.$dirty) return [];
      return [!this.$v.state.required && 'State is required'].filter(Boolean);
    },
    countryErrors() {
      if (!this.$v.country.$dirty) return [];
      return [!this.$v.country.required && 'Country is required'].filter(Boolean);
    },
    zipPostalCodeErrors() {
      if (!this.$v.zipPostalCode.$dirty) return [];
      return [!this.$v.zipPostalCode.required && 'Zip/Postal Code is required'].filter(Boolean);
    },
  },
});
</script>

<style></style>
