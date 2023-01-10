<template>
  <div class="app-bar-controls toolbar-links h-100 d-flex align-center">
    <!-- <v-btn text class="priority-6 font-weight-bold primary--text"><v-icon left> fa-edit </v-icon>Free Register</v-btn>
    <v-btn class="priority-7" small text><v-icon small left> fa-key </v-icon> Login</v-btn> -->
    <div class="in-nav-btns transition-ease-in-out d-flex align-center">
      <v-btn class="priority-5 hover-text" small text link href="/#/horoscope"
        ><v-icon small left> fa-star-of-life </v-icon>Free Horoscope</v-btn
      >
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="priority-2 hover-text" small text v-on="on"
            ><v-icon small left> fa-id-card </v-icon>Membership</v-btn
          >
        </template>
        <v-list class="app-bar-controls-membership-list">
          <v-list-item>
            <v-list-item-title>Silver Plan</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Gold Plan</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Diamond Plan</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="priority-1 hover-text" small text link href="/#/help"
        ><v-icon small left> fa-question-circle </v-icon>Help</v-btn
      >
      <v-btn class="priority-3 hover-text" small text link href="/#/blog"
        ><v-icon small left> fa-book </v-icon>Blog</v-btn
      >
      <v-btn class="priority-4 hover-text" small text link href="/#/contact"
        ><v-icon small left> fa-tty </v-icon>Contact</v-btn
      >
    </div>
    <v-divider vertical class="h-100"></v-divider>
    <v-dialog
      
      v-model="dialogVisible"
      :width="850"
      :content-class="carousel === 0 ? 'carousel-650' : 'carousel-850'"
    >
      <template v-slot:activator="{ on }">
        <div
          class="app-bar-btns d-flex flex-nowrap gap-2 align-center justify-end"
          :class="{ 'logged-in': !!loggedInUser }"
        >
          <router-link to="/login" class="d-inline-block d-sm-none" v-if="!hvmq.sm && !loggedInUser">
            <v-btn rounded color="primary"> LOGIN </v-btn>
          </router-link>
          <v-btn
            v-if="hvmq.sm && !loggedInUser && !$route.meta.registerPage"
            elevation="2"
            rounded
            class="ml-2 d-none d-sm-inline-block"
            v-on:click="carousel = 1"
            color="primary"
            v-on="on"
            >REGISTER FREE!</v-btn
          >
          <v-btn
            v-if="hvmq.sm && !loggedInUser && !$route.meta.loginPage"
            rounded
            color="primary"
            class="ml-2 d-none d-sm-inline-block"
            v-on:click="carousel = 0"
            v-on="on"
          >
            LOGIN
          </v-btn>
          <div class="font-weight-regular text-truncate text-username transition-ease-in-out" v-if="loggedInUser">
            Welcome, {{ loggedInUser.firstName }}
          </div>
          <v-btn
            v-if="loggedInUser"
            elevation="5"
            fab
            raised
            rounded
            x-small
            class="ml-2"
            color="primary"
            link
            href="/#/profile"
          >
            <v-avatar size="var(--app-bar-logged-in-user-avatar-size)">
              <img v-if="loggedInUser.img" :src="loggedInUser.img" :alt="loggedInUser | fullName" />
              <i v-else class="fas fa-user-circle fa-2x"></i>
            </v-avatar>
          </v-btn>
          <v-btn elevation="5" fab raised rounded x-small class="ml-2" color="primary" @click="$emit('drawer')">
            <v-icon>fa-bars</v-icon>
          </v-btn>
        </div>
      </template>
      <v-btn elevation="2" icon class="position-absolute close-btn" color="white" @click="dialogVisible = false">
        <v-icon color="white">fa-times</v-icon>
      </v-btn>
      <v-carousel
        :class="{ 'auth-carousel': carousel === 1 }"
        v-if="dialogVisible"
        v-model="carousel"
        hide-delimiters
        hide-delimiter-background
        :height="carousel === 0 ? 650 : 660"
        light
        :show-arrows="false"
      >
        <v-carousel-item>
          <login :allowRoute="false" @register="carousel = carousel + 1" @close="dialogVisible = false" />
        </v-carousel-item>
        <v-carousel-item>
          <register :allowRoute="false" @login="carousel = carousel - 1" />
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { hvmq } from '@/mixins';
import Vue from 'vue';
import { mapState } from 'vuex';
import Login from './Login.vue';
import Register from './Register.vue';

export default Vue.extend({
  mixins: [hvmq],
  components: { Login, Register },
  name: 'AppBarControls',
  data: () => ({
    dialogVisible: false,
    carousel: 0,
    loginMode: true,
  }),
  computed: {
    ...mapState('login', ['loggedInUser']),
  },
});
</script>

<style lang="scss">
.text-username {
  color: var(--v-primary-base);
  caret-color: var(--v-primary-base);
  transition-property: background-color, color;
}
.v-app-bar--hide-shadow {
  .in-nav-btns {
    opacity: 0;
    transition-property: opacity;
    pointer-events: none;
  }
  .text-username {
    background: rgba(0, 0, 0, 0.2);
    padding: 2px 5px;
    color: white;
  }
}
</style>

<style scoped lang="scss">
$toolbar-breakpoints: 915px, 730px, 630px, 550px, 400px, 0px;
$toolbar-breakpoints-offset: 150px;

.drawer-btn {
  display: none;
  @media (max-width: #{nth($toolbar-breakpoints, 1)}) {
    display: flex;
  }
}

@for $i from 1 through length($toolbar-breakpoints) {
  .priority-#{length($toolbar-breakpoints) - $i} {
    display: none;

    @media (min-width: #{nth($toolbar-breakpoints, $i) + $toolbar-breakpoints-offset}) {
      display: flex;
    }
  }
}

.toolbar-links .v-btn {
  text-transform: none;
}

.auth-carousel {
  overflow: visible;
  background-color: white;
  ::v-deep .v-responsive {
    overflow: visible;
    background-color: white;
  }
}

.app-bar-btns {
  .text-username {
    display: none;
  }

  @media (min-width: 490px) {
    .text-username {
      display: block;
      max-width: 242px;
    }
  }
}

.v-btn.hover-text,
.v-btn.hover-text .v-btn__content {
  color: rgba(0, 0, 0, 0.87);
  font-weight: 400;
  font-size: 14px;

  .v-icon {
    color: rgba(0, 0, 0, 0.65);
  }

  &::before {
    display: none;
  }

  &:hover,
  &:hover .v-icon {
    color: var(--v-primary-lighten1);
  }
}

.app-bar-controls-membership-list {
  padding: 0;

  .v-list-item {
    cursor: pointer;
    &:hover {
      background-color: var(--v-primary-lighten1);

      .v-list-item__title {
        color: white;
      }
      &::before {
        opacity: 1;
        background-color: var(--v-primary-lighten1);
      }
    }

    .v-list-item__title {
      cursor: pointer;
    }
  }
}
</style>
