import axios from 'axios';
import { Module } from 'vuex';
import { DownloadingItem } from '../models';
import { Advertisement } from '../models/advertisement.model';
import { dataLoadAction } from './utils';

export class AdvertisementStoreState {
  loadingState = new DownloadingItem<Advertisement>(undefined);
}

export default {
  namespaced: true,
  state: new AdvertisementStoreState(),
  mutations: {
    loadingState(state, data) {
      state.loadingState = data;
    },
  },
  actions: {
    init({ commit }) {
      dataLoadAction('advertisementSync', 'loadingState', {}, commit, axios.get('advertisement'));
    },
  },
} as Module<AdvertisementStoreState, any>;
