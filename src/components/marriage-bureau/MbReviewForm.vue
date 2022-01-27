<template>
  <v-form>
    <v-text-field
      dense
      id="mb-review-form-first-name"
      placeholder="Your Name"
      outlined
      :error-messages="nameErrors"
      required
      v-model="name"
      class="border-radius-0 text-field-with-icon"
      prepend-inner-icon="fa-user"
    ></v-text-field>
    <v-text-field
      placeholder="Your Email"
      class="border-radius-0 text-field-with-icon"
      prepend-inner-icon="fa-envelope"
      dense
      id="mb-review-form-email-address"
      outlined
      type="email"
      :error-messages="emailErrors"
      required
      v-model="email"
    ></v-text-field>
    <div class="form-group">
      <div class="d-flex flex-nowrap gap-1" ref="rmnAnchor">
        <v-select
          :attach="$refs.rmnAnchor"
          class="border-radius-0 mb-review-form-mobile-number"
          :menu-props="{ offsetY: true }"
          dense
          id="mb-review-form-mobile-number"
          outlined
          placeholder="Select Value"
          :items="['+91']"
          required
          v-model="countryCode"
          :error-messages="countryCodeErrors"
        ></v-select>
        <v-text-field
          class="border-radius-0 text-field-with-icon"
          prepend-inner-icon="fa-mobile"
          dense
          id="mb-review-form-mobile-number-input"
          outlined
          :error-messages="mobileNumberErrors"
          required
          placeholder="Mobile Number"
          v-model="mobileNumber"
        ></v-text-field>
      </div>
    </div>
    <p class="error--text mb-6">Note: Your Phone and email will not be visible to marriage bureau team</p>
    <div class="form-group">
      <v-textarea
        class="border-radius-0 review-comment"
        dense
        id="mb-review-form-review-comment"
        outlined
        :error-messages="reviewCommentErrors"
        required
        placeholder="Review"
        v-model="reviewComment"
      ></v-textarea>
    </div>

    <v-btn color="secondary darken-4" @click="submit()">Post Review</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';

export default Vue.extend({
  mixins: [validationMixin],
  name: 'MbReviewForm',
  props: {
    allowRoute: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    name: null,
    email: null,
    mobileNumber: null,
    countryCode: '+91',
    reviewComment: null,
  }),
  validations: {
    name: { required, minLength: minLength(3), maxLength: maxLength(100) },
    email: { required, email },
    mobileNumber: { required, minLength: minLength(10), maxLength: maxLength(10) },
    countryCode: { required },
    reviewComment: { required, minLength: minLength(50), maxLength: maxLength(140) },
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
  },
  computed: {
    reviewCommentErrors() {
      if (!this.$v.reviewComment.$dirty) return [];
      return [
        !this.$v.reviewComment.minLength && 'Comment too short',
        !this.$v.reviewComment.maxLength && 'Comment too long',
        !this.$v.reviewComment.required && 'Comment is required',
      ].filter(Boolean);
    },
    nameErrors() {
      if (!this.$v.name.$dirty) return [];
      return [
        !this.$v.name.minLength && 'First Name too short',
        !this.$v.name.maxLength && 'First Name too long',
        !this.$v.name.required && 'First Name is required',
      ].filter(Boolean);
    },
    emailErrors() {
      if (!this.$v.email.$dirty) return [];
      return [
        !this.$v.email.required && 'Email is required',
        !this.$v.email.minLength && 'Email too short',
        !this.$v.email.maxLength && 'Email too long',
        !this.$v.email.email && 'Email should be valid',
      ].filter(Boolean);
    },
    countryCodeErrors() {
      if (!this.$v.countryCode.$dirty) return [];
      return [!this.$v.countryCode.required && 'Country Code is required'].filter(Boolean);
    },
    mobileNumberErrors() {
      if (!this.$v.mobileNumber.$dirty) return [];
      return [
        !this.$v.mobileNumber.required && 'Mobile Number is required',
        !this.$v.mobileNumber.maxLength && 'Mobile Number 10 digits long',
      ].filter(Boolean);
    },
  },
});
</script>

<style scoped lang="scss">
.mb-review-form-mobile-number {
  min-width: 90px;
  max-width: 100px;
  width: 2.5rem;
}
</style>
