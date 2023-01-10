import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators';

const validations = {
  firstName: { required, minLength: minLength(3), maxLength: maxLength(100) },
  lastName: { required, minLength: minLength(3), maxLength: maxLength(100) },
  email: { required, email },
  password: { required, minLength: minLength(6), maxLength: maxLength(20) },
  confirmPassword: { required, confirmSame: sameAs('password') },
  mobileNumber: { required, minLength: minLength(10), maxLength: maxLength(10) },
  countryCode: { required },
  userType: { required },
  gender: { required },
  agreed: { sameAs: sameAs(() => true) },
  dateOfBirth: { required },
  profileFor: { required },
};

export function basicDetailsValidations(...exclude: (keyof typeof validations)[]): typeof validations {
  return exclude.length === 0
    ? validations
    : (Object.fromEntries(
        Object.entries(validations).filter(([key]) => !exclude.includes(key as keyof typeof validations))
      ) as typeof validations);
}

export const basicDetailsMixin = Vue.extend({
  mixins: [validationMixin],
  data: () => ({
    dateOfBirth: null,
    maxDob: new Date().toISOString(),
    userType: 'U',
    firstName: null,
    lastName: null,
    email: null,
    mobileNumber: null,
    countryCode: '+91',
    gender: 'M',
    profileFor: null,
    agreed: false,
  }),
  computed: {
    firstNameErrors() {
      if (!this.$v.firstName.$dirty) return [];
      return [
        !this.$v.firstName.minLength && 'First Name too short',
        !this.$v.firstName.maxLength && 'First Name too long',
        !this.$v.firstName.required && 'First Name is required',
      ].filter(Boolean);
    },
    lastNameErrors() {
      if (!this.$v.lastName.$dirty) return [];
      return [
        !this.$v.lastName.required && 'Last Name is required',
        !this.$v.lastName.minLength && 'Last Name too short',
        !this.$v.lastName.maxLength && 'Last Name too long',
      ].filter(Boolean);
    },
    emailErrors() {
      if (!this.$v.email.$dirty) return [];
      return [!this.$v.email.required && 'Email is required', !this.$v.email.email && 'Email should be valid'].filter(
        Boolean
      );
    },
    passwordErrors() {
      if (!this.$v.password.$dirty) return [];
      return [
        !this.$v.password.required && 'Password is required',
        !this.$v.password.minLength && 'Password too short',
        !this.$v.password.maxLength && 'Password too long',
      ].filter(Boolean);
    },
    confirmPasswordErrors() {
      if (!this.$v.confirmPassword.$dirty) return [];
      return [
        !this.$v.confirmPassword.required && 'Confirm Password is required',
        !this.$v.confirmPassword.confirmSame && 'Confirm Password should match with password',
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
        (!this.$v.mobileNumber.maxLength || !this.$v.mobileNumber.minLength) &&
          'Mobile Number should be 10 digits long',
      ].filter(Boolean);
    },
    userTypeErrors() {
      if (!this.$v.userType.$dirty) return [];
      return [!this.$v.userType.required && 'User type is required'].filter(Boolean);
    },
    genderErrors() {
      if (!this.$v.gender.$dirty) return [];
      return [!this.$v.gender.required && 'Gender is required'].filter(Boolean);
    },
    agreedErrors() {
      if (!this.$v.agreed.$dirty) return [];
      return [!this.$v.agreed.sameAs && 'Agreement is required'].filter(Boolean);
    },
    dobErrors() {
      if (!this.$v.dateOfBirth.$dirty) return [];
      return [!this.$v.dateOfBirth.required && 'Date of birth is required'].filter(Boolean);
    },
    profileForErrors() {
      if (!this.$v.profileFor.$dirty) return [];
      return [!this.$v.profileFor.required && 'Profile Creating For is required'].filter(Boolean);
    },
  },
});
