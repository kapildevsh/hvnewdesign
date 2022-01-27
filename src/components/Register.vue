<template>
  <div class="register-form white component-view-child px-10 py-5 flex align-space-between">
    <div class="hv-timeline-wrapper d-grid grid-columns-3 align-center">
      <h1 class="primary--text">Register</h1>
    </div>
    <v-form class="register-form-grid d-grid" lazy-validation ref="form">
      <h2 class="grid-column-span-2 text-center d-none">Basic Details</h2>
      <v-divider class="grid-column-span-2 text-center mt-2 mb-4"></v-divider>
      <!--<label class="body-2" for="register-profile-creating-for">Profile Creating For</label>
     <v-select
      :error-messages="profileCreatingForErrors"
      :items="['Select value', 'Self', 'Son', 'Sister', 'Brother', 'Daughter', 'Friend', 'Relative']"
      :menu-props="{ offsetY: true }"
      attach
      class="text-field-with-icon border-radius-0 register-profile-creating-for"
      dense
      id="register-profile-creating-for"
      outlined
      placeholder="Select Value"
      prepend-inner-icon="fa-user"
      required
      v-model="profileCreatingFor"
    ></v-select> -->
      <label class="body-2" for="register-first-name">First Name</label>
      <v-text-field
        dense
        id="register-first-name"
        outlined
        :error-messages="firstNameErrors"
        required
        v-model="firstName"
        class="border-radius-0 text-field-with-icon"
        prepend-inner-icon="fa-user"
        placeholder="Enter Your First Name"
      ></v-text-field>
      <label class="body-2" for="register-last-name">Last Name</label>
      <v-text-field
        placeholder="Enter Your Last Name"
        class="border-radius-0 text-field-with-icon"
        prepend-inner-icon="fa-user"
        dense
        id="register-last-name"
        outlined
        :error-messages="lastNameErrors"
        required
        v-model="lastName"
      ></v-text-field>
      <label class="body-2" for="register-gender">Gender</label>
      <horizontal-icon-wrapper icon="fa-venus-mars" class="mb-6">
        <v-radio-group
          id="register-gender"
          class="register-gender ma-0"
          row
          dense
          required
          v-model="gender"
          hide-details="true"
        >
          <v-radio label="Male" value="M" dense></v-radio>
          <v-radio label="Female" value="F" dense></v-radio>
        </v-radio-group>
      </horizontal-icon-wrapper>

      <!-- <label class="body-2" for="register-dob">Date of Birth</label>
    <div ref="dobAnchor">
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        :return-value.sync="dob"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            placeholder="Enter Your Date Of Birth"
            :error-messages="dobErrors"
            class="border-radius-0 text-field-with-icon"
            dense
            id="register-dob"
            outlined
            prepend-inner-icon="fa-calendar"
            readonly
            required
            v-bind="attrs"
            v-model="dob"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dob" no-title scrollable :max="maxDob">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(dob)"> OK </v-btn>
        </v-date-picker>
      </v-menu>
    </div> -->
      <label class="body-2" for="register-email-address">Email address</label>
      <v-text-field
        placeholder="Enter Your Email Address"
        class="border-radius-0 text-field-with-icon"
        prepend-inner-icon="fa-envelope"
        dense
        id="register-email-address"
        outlined
        type="email"
        :error-messages="emailErrors"
        required
        v-model="email"
      ></v-text-field>
      <label class="body-2" for="register-password">Passowrd</label>
      <v-text-field
        placeholder="Enter Your Password"
        class="border-radius-0 text-field-with-icon"
        prepend-inner-icon="fa-lock"
        dense
        id="register-password"
        outlined
        type="password"
        :error-messages="passwordErrors"
        required
        v-model="password"
      ></v-text-field>
      <label class="body-2" for="register-confirm-password">Confirm Password</label>
      <v-text-field
        placeholder="Re Enter Your Password"
        class="border-radius-0 text-field-with-icon"
        prepend-inner-icon="fa-lock"
        dense
        id="register-confirm-password"
        outlined
        type="password"
        :error-messages="confirmPasswordErrors"
        required
        v-model="confirmPassword"
      ></v-text-field>
      <label class="body-2" for="register-mobile-number">Mobile number</label>
      <div class="d-flex flex-nowrap gap-1" ref="rmnAnchor">
        <v-select
          :attach="$refs.rmnAnchor"
          class="border-radius-0 register-mobile-number"
          :menu-props="{ offsetY: true }"
          dense
          id="register-mobile-number"
          outlined
          :items="['+91']"
          required
          v-model="countryCode"
          :error-messages="countryCodeErrors"
        ></v-select>
        <v-text-field
          placeholder="Enter Your Mobile number"
          class="border-radius-0 text-field-with-icon"
          prepend-inner-icon="fa-mobile"
          dense
          id="register-mobile-number-input"
          outlined
          :error-messages="mobileNumberErrors"
          required
          v-model="mobileNumber"
          type="tel"
        ></v-text-field>
      </div>
      <label class="body-2" for="register-are-you-select">Are You?</label>
      <v-radio-group
        class="register-are-you-select ma-0"
        row
        dense
        :error-messages="userTypeErrors"
        required
        v-model="userType"
      >
        <v-radio label="User" value="U" dense></v-radio>
        <v-radio label="Marriage Bureau" value="MB" dense></v-radio>
      </v-radio-group>
      <span class="grid-column-span-2 flex-md-center "
        ><v-checkbox v-model="agreed" :error-messages="agreedErrors" required class="agreement-checkbox text-no-wrap">
          <template v-slot:label>
            I agree with <router-link to="terms-conditions" class="mx-2">Terms &amp; Conditions</router-link>
            <span class="d-none d-sm-inline-block">of HappyVivah.com</span>
          </template>
        </v-checkbox>
      </span>
    </v-form>

    <div class="grid-column-span-2 d-flex flex-nowrap align-center mt-4 gap-2">
      <span>Already a member?</span>
      <router-link v-if="allowRoute" to="/login" class="white--text text-decoration-none ml-2">
        <v-btn color="primary"> Log in </v-btn>
      </router-link>
      <v-btn v-else color="primary" class="ml-2" @click="$emit('login')">Log in</v-btn>
      <v-spacer></v-spacer>
      <v-btn width="100" rounded color="info" @click="submit()">Register</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { basicDetailsMixin, basicDetailsValidations } from '../mixins';
import HorizontalIconWrapper from './HorizontalIconWrapper.vue';

export default Vue.extend({
  components: { HorizontalIconWrapper },
  mixins: [validationMixin, basicDetailsMixin],
  name: 'Register',
  validations: basicDetailsValidations('dob', 'profileCreatingFor'),
  props: {
    allowRoute: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    password: null,
    confirmPassword: null,
  }),
  methods: {
    submit() {
      this.$v.$touch();
      console.log(this.$v.$invalid);
      // if (!this.$v.$invalid) {
      //   // this.$router.replace('/settings');
      // }
    },
  },
});
</script>

<style lang="scss">
.register-form {
  .register-form-grid {
    @media (max-width: 960px) {
      display: flex !important;
      flex-direction: column;

      > label {
        margin-bottom: 0.25rem;
      }
    }
  }
  .title-spacer {
    min-height: 20px;
  }
  .v-avatar {
    transition: all 1s;
  }
  form.d-grid {
    gap: 0 12px;
    grid-template-columns: 1fr 2fr;

    > label {
      margin-top: 0.5rem;
      font-size: 0.8rem;
    }
  }
  .dob-selects > div {
    gap: 0.4rem;
  }
  .register-mobile-number {
    min-width: 73px;
    max-width: 80px;
    width: 73px;

    .v-input__append-inner {
      padding: 0;
      width: 15px;
    }
  }
}

.agreement-checkbox .v-label.error--text {
  color: black !important;
}
</style>
