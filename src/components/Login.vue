<template>
  <div class="login-container component-view-child d-flex flex-nowrap white">
    <v-img
      class="d-none d-md-block h-100"
      src="/images/loginside.jpg"
      v-if="hvmq.md"
      height="100%"
      max-width="50%"
      width="50%"
    >
      <template v-slot:placeholder>
        <v-skeleton-loader height="100%" width="100%" type="image" class="login-img-placeholder"></v-skeleton-loader>
      </template>
    </v-img>
    <div class="login-form d-flex flex-column flex-nowrap align-stretch justify-center pa-5 text-center flex-grow-1">
      <h1 class="justify text-center">Login to your account</h1>
      <h4 class="secondary--text font-weight-light">And begin a beutiful journey</h4>
      <v-form class="d-flex flex-column flex-nowrap align-stretch mb-2 mt-2">
        <label class="text-left mt-5 mb-1" for="login-page-email-input">Email Address</label>
        <v-text-field
          :error-messages="emailErrors"
          class="flex-grow-1 border-radius-0 text-field-with-icon"
          dense
          id="login-page-email-input"
          outlined
          placeholder="Enter email address"
          required
          type="email"
          name="email"
          v-model="email"
          prepend-inner-icon="fa-user"
          @keyup.enter="submit"
        ></v-text-field>
        <label for="login-page-password-input" class="text-left mb-1">Password</label>
        <v-text-field
          class="flex-grow-1 border-radius-0 text-field-with-icon"
          dense
          id="login-page-password-input"
          outlined
          placeholder="Enter password"
          type="password"
          name="password"
          v-model="password"
          :error-messages="passwordErrors"
          prepend-inner-icon="fa-lock"
          @keyup.enter="submit"
        ></v-text-field>
        <div v-if="attemptingLogin" class="flex-center">
          <v-progress-circular size="20" indeterminate color="primary"></v-progress-circular>
        </div>
        <p class="mt-2 error--text" v-if="loginFailed">{{ loginFailed }}</p>
        <v-checkbox label="Remember Me" class="pa-0 mt-0"></v-checkbox>
        <v-btn :disabled="attemptingLogin" rounded color="primary" @click="submit">LOGIN</v-btn>
      </v-form>
      <v-btn rounded color="#4267b2" class="facebook-btn white--text">
        <svg
          aria-hidden="true"
          data-prefix="fab"
          data-icon="facebook-f"
          class="svg-inline--fa fa-facebook-f fa-w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
          />
        </svg>
        Login With Facebook
      </v-btn>
      <v-btn rounded class="secondary--text text--darken-1 facebook-btn secondary--text ma-3" text
        >Lost Password?</v-btn
      >
      <hr />
      <span class="text-center secondary--text text--darken-1 ma-3">Have't account yet?</span>
      <router-link v-if="allowRoute" to="/register" class="white--text text-decoration-none">
        <v-btn rounded color="primary" class="w-100">REGISTER FREE</v-btn>
      </router-link>
      <v-btn v-else rounded color="primary" @click="$emit('register')">REGISTER FREE</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators';
import { hvmq } from '@/mixins';
import { mapState } from 'vuex';
import HTTP from '../http/http';
import { uRLSearchParams } from '@/utils';

export default Vue.extend({
  mixins: [hvmq, validationMixin],
  props: {
    allowRoute: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    email: null,
    password: null,
    attemptingLogin: false,
    loginFailed: false as boolean | string,
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(30) },
  },
  name: 'Login',
  computed: {
    ...mapState('login', ['loggedIn','loggedInUser']),
    passwordErrors() {
      if (!this.$v.password.$dirty) return [];
      return [
        !this.$v.password.required && 'Password is required',
      ].filter(Boolean);
    },

    emailErrors() {
      if (!this.$v.email.$dirty) return [];
      return [!this.$v.email.email && 'Must be valid e-mail', !this.$v.email.required && 'E-mail is required'].filter(
        Boolean
      );
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.attemptingLogin = true;
        this.loginFailed = false;

        await HTTP.post(
          'http://localhost:8000/api/login',
          uRLSearchParams({ email: this.email, password: this.password })
        )
          .then(res => {
            const user = {
              id: 992,
              firstName: res.data.data.user_full_name,
              lastName: res.data.data.user_full_name,
              // img:res.data.data.user_full_name,
              account_status: res.data.data.account_status,
              user_profile_status: res.data.data.user_profile_status,
              userType: res.data.data.user_role
            }
            this.$store.dispatch('login/check', {data: {...user}});
          })
          .catch(({ response }) => {
            this.loginFailed = response.data;
          });

        this.attemptingLogin = false;
      }
    },
  },

  watch: {
    loggedInUser(value) {
      if (value) {
        if (this.$route.path === '/register') this.$router.replace('/');
        else if ( value.account_status == 'created' && !value.user_profile_status  ) {
          this.$router.replace('/profile/about-me');
        }

        if (!this.allowRoute) this.$emit('close');
      }
    },
  },
});
</script>

<style scoped lang="scss">
.login-container {
  height: 650px;
  box-shadow: 10px 10px 73px -41px rgba(0, 0, 0, 0.75);
}

.facebook-btn .v-icon {
  font-size: 1rem;
}

.input-icon {
  line-height: 2.4;
  flex-basis: 44px;
}

.svg-inline--fa.fa-facebook-f {
  height: 1em;
  width: 1em;
  font-size: 1rem;
  margin-right: 1rem;
}

::v-deep .login-img-placeholder .v-skeleton-loader__image {
  height: 100%;
}
</style>
