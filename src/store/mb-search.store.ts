import axios from 'axios';
import { Module } from 'vuex';
import { DownloadingItem, Profile } from '../models';

import { dataLoadAction } from './utils';

class MbSearchStoreState {
  filters = new DownloadingItem(undefined);
  result = new DownloadingItem(undefined);
  allProfiles = new DownloadingItem(undefined as Profile[]);
  profileFilter: { by: 'name' | 'id'; search: string };
  selectedFilters: any;
}

export default {
  namespaced: true,
  state: () => new MbSearchStoreState(),
  mutations: {
    filters(state, filters) {
      state.filters = filters;
    },
    result(state, result) {
      state.result = result;
    },
    allProfiles(state, allProfiles) {
      state.allProfiles = allProfiles;
    },
    selectedFilters(state, selectedFilters) {
      state.selectedFilters = selectedFilters;
    },
  },
  actions: {
    async init({ commit, dispatch, rootState }) {
      await dispatch('bureau/uploadedProfiles', undefined, { root: true });
      commit('allProfiles', rootState.bureau.uploadedProfiles);
      await dataLoadAction('searchFiltersSync', 'filters', {}, commit, axios.get('mb-search/filters'));
    },
    async search({ commit }, selectedFilters) {
      commit('selectedFilters', selectedFilters);
      dataLoadAction('searchResultSync', 'result', {}, commit, axios.post('mb-search/result', selectedFilters));
    },
  },
} as Module<MbSearchStoreState, any>;
