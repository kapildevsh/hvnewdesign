import axios from 'axios';
import { Module } from 'vuex';
import { DownloadingItem, Profile, User } from '../models';

import { dataLoadAction } from './utils';

export default {
  namespaced: true,
  state: {
    loadingState: new DownloadingItem<Profile[]>([]),
  },
  mutations: {
    similarProfiles(state, data: DownloadingItem<User>) {
      state.loadingState = data;
    },
  },
  actions: {
    async init({ commit }): Promise<void> {
      await dataLoadAction(
        'similarProfilesSync',
        'similarProfiles',
        {},
        commit,
        axios.get('similarProfiles'),
        [] as Profile[]
      );
    },
  },
} as Module<any, any>;
