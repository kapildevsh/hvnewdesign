import axios from 'axios';
import { Module } from 'vuex';
import { PerfectMatchItem } from '../models';

import { dataLoadAction } from './utils';

export default {
  namespaced: true,
  state: () => ({ perfectMatch: {} }),
  mutations: {
    perfectMatch(state, perfectMatch) {
      state.perfectMatch = perfectMatch;
    },
    setData(state, data) {
      state.perfectMatch.data = data;
    },
  },
  actions: {
    async perfectMatch({ commit }, tab) {
      await dataLoadAction('perfectMatchSync', 'perfectMatch', { tab }, commit, axios.get('perfectMatch'));
    },

    removeItem({ commit, state }, item) {
      // TODO remove from server
      commit(
        'setData',
        state.perfectMatch.data.filter((t: PerfectMatchItem) => t.id !== item.id)
      );
    },
  },
} as Module<any, any>;
