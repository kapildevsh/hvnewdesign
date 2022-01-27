import axios from 'axios';
import { Module } from 'vuex';
import { DownloadingItem, GalleryItem, User } from '../models';
import { dataLoadAction } from './utils';

export class GalleryStoreState {
  gallery = new DownloadingItem([] as GalleryItem[]);
  owner: User;
}

export default {
  namespaced: true,
  state: new GalleryStoreState(),
  mutations: {
    gallery(state, data: DownloadingItem<{ owner: User; data: GalleryItem[] }>) {
      state.gallery = { ...data, data: data.data?.data };
      state.owner = data.data?.owner;
    },
    galleryRemoveItem(state, item) {
      const index = state.gallery.data.findIndex((t: GalleryItem) => t.id === item.id);
      if (index < 0) {
        console.warn('Item not Found', item);
      }

      state.gallery.data.splice(index, 1);
    },
  },
  actions: {
    async init({ commit }, ownerId = '') {
      await dataLoadAction('gallerySync', 'gallery', {}, commit, axios.get('gallery/' + ownerId));
    },

    async galleryRemoveItem({ commit }, item) {
      await axios.post('gallery/remove/' + item.id);
      commit('galleryRemoveItem', item);
    },
  },
} as Module<GalleryStoreState, unknown>;
