import axios from 'axios';
import { Module } from 'vuex';
import { Profile } from '../models';
import { dataLoadAction } from './utils';

export class HomeStoreState {
  loadingState = {
    premiumProfiles: [] as Profile[],
    matches: [] as Profile[],
    recentlyUpdated: [] as Profile[],
  };
}

export default {
  namespaced: true,
  state: new HomeStoreState(),
  mutations: {
    loadingState(state, data) {
      state.loadingState = data;
    },
  },
  actions: {
    init({ commit }) {
      dataLoadAction('homeSync', 'loadingState', {}, commit, axios.get('homeData'), new HomeStoreState());
    },
  },
} as Module<HomeStoreState, any>;
