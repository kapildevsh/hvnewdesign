import HTTP from '../http/http';
import { Module } from 'vuex';
import { PerfectMatchItem } from '../models';

import { dataLoadAction } from './utils';

export default {
  namespaced: true,
  state: () => ({ languages: {} }),
  mutations: {
    setLanguages(state, languages) {
        debugger;
        console.log(languages?.data?.data);
      state.languages = languages?.data?.data;
    },
    setData(state, data) {
      state.perfectMatch.data = data;
    },
  },
  actions: {
    async languages({ commit }, tab) {
      await dataLoadAction('languagesSync', 'setLanguages', { tab }, commit, HTTP.get('languages'));
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
