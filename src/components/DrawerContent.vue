<template>
  <div
    id="drawer-content"
    class="drawer-content position-relative h-100 w-100 d-flex flex-column flex-nowrap overflow-auto"
  >
    <div v-if="loggedInUser" class="flex-center flex-column mt-4">
      <v-row class="pl-4 mt-4 mb-4 w-100">
        <img alt="Site Logo" src="/images/logo.png" /> <v-spacer />
        <v-btn text icon @click="$emit('close')"><v-icon color="red">fa-times</v-icon> </v-btn>
      </v-row>
      <v-avatar>
        <img alt="Site Logo" :src="loggedInUser.img" />
      </v-avatar>
      <h3 class="primary--text font-weight-regular text-truncate">Welcome, {{ loggedInUser | fullName }}</h3>
    </div>
    <div v-else class="d-flex align-center flex-column">
      <v-btn class="align-self-end" text icon @click="$emit('close')"><v-icon color="red">fa-times</v-icon> </v-btn>
      <img alt="Site Logo" src="/images/logo.png" />
    </div>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item link href="/#/home">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="notLoggedIn" link href="/#/about-us">
          <v-list-item-title>About Us</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isBureau" link href="/#/marriage-bureau/dashboard">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="loggedIn" link href="/#/profile">
          <v-list-item-title>My Profile</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isUser" link href="/#/inbox">
          <v-list-item-title>Inbox</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isUser" link href="/#/perfect-match">
          <v-list-item-title>Match</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isUser" link href="/#/gallery">
          <v-list-item-title>Gallery</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isUser" link href="/#/search">
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isBureau" link href="/#/marriage-bureau/search">
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item>
        <v-list-group :value="true" class="membership-list">
          <template v-slot:activator>
            <v-list-item-title>Membership Plan</v-list-item-title>
          </template>

          <v-list-item link class="bordered border-radius-0">
            <v-list-item-title class="my-3 ml-6">Silver Plan</v-list-item-title>
          </v-list-item>
          <v-list-item link class="bordered border-radius-0">
            <v-list-item-title class="my-3 ml-6">Gold Plan</v-list-item-title>
          </v-list-item>
          <v-list-item link class="bordered border-radius-0">
            <v-list-item-title class="my-3 ml-6">Diamond Plan</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item v-if="loggedIn" link href="/#/profile">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>

        <v-list-item link href="/#/horoscope">
          <v-list-item-title>Free Horoscope</v-list-item-title>
        </v-list-item>

        <v-list-item link href="/#/help">
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title link href="/#/blog">Blog</v-list-item-title>
        </v-list-item>

        <v-list-item link href="/#/contact">
          <v-list-item-title>Contact Us</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="notLoggedIn" link href="/#/marriage-bureau">
          <v-list-item-title>Marriage Bureau</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <share-btns />
    <div class="d-flex flex-column flex-nowrap align-center justify-center gap-2 mb-4 flex-grow-1">
      <v-btn
        v-if="!loggedInUser"
        elevation="2"
        rounded
        class="btn--long"
        color="primary"
        link
        href="/#/register"
        @click="delayClose"
        >REGISTER FREE!</v-btn
      >
      <v-btn v-if="!loggedInUser" rounded color="primary" class="btn--long" link href="/#/login" @click="delayClose">
        LOGIN
      </v-btn>
      <v-progress-circular size="20" v-if="loggingOut" indeterminate color="primary"></v-progress-circular>
      <v-btn v-else-if="loggedInUser" rounded color="primary" class="btn--long" @click="logout"> Logout </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
// import axios from 'axios';
import Vue from 'vue';
import { mapState } from 'vuex';
import ShareBtns from './ShareBtns.vue';

export default Vue.extend({
  components: { ShareBtns },
  name: 'DrawerContent',
  data: () => ({ loggingOut: false }),
  computed: {
    ...mapState('login', ['loggedInUser', 'loggedIn']),
    notLoggedIn() {
      return !this.loggedIn;
    },
    isBureau() {
      return this.loggedInUser?.userType === 'MB';
    },
    isUser() {
      return this.loggedInUser?.userType === 'U';
    },
  },
  methods: {
    delayClose() {
      setTimeout(() => this.$emit('close'), 250);
    },
    async logout() {
      // this.loggingOut = true;
      localStorage.removeItem('user');
      location.reload();
      // await axios
      //   .post('logout', {})
      //   .then(() => location.reload())
      //   .catch(({ response }) => alert('Failed to logout' + response.data));

      // this.loggingOut = false;
      setTimeout(() => this.$emit('close'), 250);
    },
  },
});
</script>

<style lang="scss">
#drawer-content {
  z-index: 100;

  .v-list-item:hover::before {
    opacity: 0;
    .v-list-item__title {
      color: var(--v-primary-lighten1);
    }
  }

  .membership-list {
    .bordered {
      border-bottom: 1px solid gray;
      margin-left: -5px;
      margin-right: -5px;

      &.v-list-item::before {
        border-radius: 0;
      }

      &.v-list-item:hover {
        .v-list-item__title {
          color: white;
        }
        &::before {
          opacity: 1;
          background-color: var(--v-primary-lighten1);
        }
      }

      .v-list-item__title {
        padding-left: 2rem;
      }
    }

    .fa-chevron-down {
      font-size: small;
    }
  }

  .v-list-item--link:before {
    color: transparent;
  }

  .v-ripple__container {
    display: none !important;
  }

  .v-list-item--dense,
  .v-list--dense .v-list-item {
    min-height: 26px;

    .v-list-item__title {
      padding: 0;
      margin: 0;
      font-size: 1rem;
      font-weight: 400;
      line-height: 24px;
      z-index: 1;

      &:hover {
        color: var(--v-primary-lighten1);
      }
    }
  }

  .v-list-group__items {
    margin-bottom: 0.5rem;

    .v-list-item--dense,
    .v-list-item {
      min-height: 20px;
      height: 45px;

      .v-list-item__title {
        min-height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
