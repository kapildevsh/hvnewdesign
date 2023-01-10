import HTTP from '../http/http';
import { Module } from 'vuex';
import { AboutUser, DownloadingItem, User } from '../models';

import { dataLoadAction } from './utils';

export default {
  namespaced: true,
  state: {
    loadingState: new DownloadingItem<User>(undefined),
  },
  mutations: {
    profile(state, data: DownloadingItem<AboutUser>) {
      debugger;
      console.log(data);
      state.loadingState = {data};
    },
  },
  actions: {
    async init({ commit }, profileId) {
      const response = await HTTP.get('/profile');
      commit('profile', response?.data?.data?.profile_data);
      // await dataLoadAction('profileDataSync', 'profile', {}, commit, HTTP.get('/profile'));
    },
    async save({ commit }, payload) {
      await dataLoadAction('profileDataSync', 'profile', {}, commit, HTTP.post('/profile', payload));
    },

    async update({ commit }, payload) {
      await dataLoadAction('profileDataSync', 'profile', {}, commit, HTTP.put(`/profile/${payload.profileID}`, payload));
    }
  },
} as Module<any, any>;
