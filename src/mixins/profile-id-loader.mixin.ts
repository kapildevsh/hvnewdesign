import Vue from 'vue';
import { Route } from 'vue-router';
import { mapState } from 'vuex';
import { User } from '../models';

export interface ProfileIdLoaderProps {
  profileId: string;
  loggedInUser: User;
  iAmOwner: boolean;
}

export const profileIdLoaderMixin = Vue.extend({
  props: ['profileId'],
  computed: {
    ...mapState('login', ['loggedInUser']),
    iAmOwner() {
      return this.loggedInUser?.id && (!this.profileId || this.profileId === this.loggedInUser.id);
    },
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loggedInUser(value: User) {
      this.init(this.profileId || value?.id);
    },
    $route(to: Route) {
      this.init(to.params.profileId || this.loggedInUser?.id);
    },
  },
  mounted() {
    this.init(this.profileId || this.loggedInUser?.id);
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    init(id: string | number) {
      throw new Error('this method is expected to be overridden');
    },
  },
});
