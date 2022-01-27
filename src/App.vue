<template>
  <v-app
    ref="vApp"
    class="css-priority-0 css-priority-1 css-priority-2 css-priority-3 w-100 h-100 overflow-auto"
    :class="{ 'bureau-mode': isBureau }"
  >
    <v-app-bar
      v-if="!$route.meta.noAppBar"
      ref="toolbar"
      fixed
      :elevate-on-scroll="$route.meta.indexToolbar"
      scroll-target="#scrolling-techniques-7"
    >
      <v-container class="d-flex flex-nowrap align-center" :class="{ 'bureau-container': $route.meta.bureauPage }">
        <router-link to="/"> <img alt="Site Logo" src="/images/logo.png"/></router-link>
        <v-spacer></v-spacer>
        <app-bar-controls @drawer="navDrawer = true" />
      </v-container>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto position-relative h-100 w-100 main-sheet"
      :class="{ 'inline-app-bar': !$route.meta.indexToolbar && !$route.meta.noAppBar }"
      max-height="100vh"
    >
      <v-main class="position-relative h-100 w-100" :class="{ 'component-view-main': $route.meta.componentView }">
        <div v-if="$route.meta.componentView" class="child-container-wrapper flex-center flex-grow-1">
          <div class="child-container" :style="{ width: $route.meta.width || null }">
            <router-view />
          </div>
        </div>
        <router-view v-else />
        <transition v-if="!$route.meta.noFooter">
          <v-lazy min-height="318"><info-footer /></v-lazy>
        </transition>
      </v-main>
    </v-sheet>
    <v-navigation-drawer
      
      v-if="!$route.meta.noAppBar"
      width="300"
      id="nav-drawer"
      class="nav-drawer"
      v-model="navDrawer"
      absolute
      right
    >
      <drawer-content v-if="navDrawer" @close="navDrawer = false" />
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import AppBarControls from './components/AppBarControls.vue';
import DrawerContent from './components/DrawerContent.vue';
import InfoFooter from './components/InfoFooter.vue';

export default Vue.extend({
  components: { AppBarControls, DrawerContent, InfoFooter },
  name: 'App',

  data: () => ({
    loading: true,
    navDrawer: false,
    footerVisible: false,
  }),
  computed: {
    ...mapGetters('login', ['isBureau']),
  },
  watch: {
    $route() {
      this.navDrawer = false;
    },
  },
});
</script>

<style scoped lang="scss">
.main-sheet {
  background: #f8f9fa;
}
::v-deep .v-navigation-drawer__content {
  overflow: hidden;
}

.nav-drawer {
  z-index: 100;
}

.inline-app-bar {
  padding-top: 64px;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
  transition: background-color 250ms linear;
  background-color: white;

  &.v-app-bar--hide-shadow {
    background-color: transparent;
  }
}

.v-main ::v-deep > .v-main__wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.component-view-main {
  .child-container-wrapper {
    background: white;

    @media (min-width: 500px) {
      background: var(--component-view-bg) no-repeat 50% 50%;
      background-size: cover;
    }
  }
  .child-container {
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media (min-width: 500px) {
      margin-top: 100px;
      margin-bottom: 64px;
    }

    @media (max-width: 500px) {
      width: 100% !important;
      .component-view-child {
        box-shadow: none;
      }
    }

    @media (max-width: 960px) {
      max-width: 500px;
    }

    @media (min-width: 960px) {
      width: 850px;
    }
  }
}
</style>

<style lang="scss">
@import './styles/_styles.scss';
@import './styles/_vuetify.scss';
@import './styles/_variables.scss';
@import './styles/_grid.scss';
@import './styles/_expansion-panel.scss';
@import './styles/_dashboard-view.scss';

.app-toolbar {
  z-index: 10000;
  height: 4rem;
}

*[data-murphy] {
  opacity: 0;
}

.v-application.css-priority-0 {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  .container {
    max-width: var(--container-max-width);
  }
}
</style>
