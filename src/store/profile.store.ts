import axios from 'axios';
import { Module } from 'vuex';
import { DownloadingItem, User } from '../models';

import { dataLoadAction } from './utils';

export default {
  namespaced: true,
  state: {
    loadingState: new DownloadingItem<User>(undefined),
  },
  mutations: {
    profile(state, data: DownloadingItem<User>) {
      state.loadingState = data;
    },
  },
  actions: {
    async init({ commit }, profileId) {
      await dataLoadAction('profileDataSync', 'profile', {}, commit, axios.get('profileData/' + profileId));
    },
  },
} as Module<any, any>;
