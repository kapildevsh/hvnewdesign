import axios from 'axios';
import { ActionHandler, Module } from 'vuex';
import { dataLoadAction } from './utils';

function loadAction(key: string) {
  return async function({ commit }, marriageBureauId: string) {
    await dataLoadAction(
      `bureau.${key}Sync`,
      key,
      { marriageBureauId },
      commit,
      axios.get(`bureau/${key}`, { params: { marriageBureauId } })
    );
  } as ActionHandler<any, any>;
}

export default {
  namespaced: true,
  state: () => ({ bureau: {}, analytics: {}, uploadedProfiles: {}, reviews: {}, gallery: {}, similarBureaus: {} }),

  mutations: {
    bureau(state, bureau) {
      state.bureau = bureau;
    },
    analytics(state, analytics) {
      state.analytics = analytics;
    },
    uploadedProfiles(state, uploadedProfiles) {
      state.uploadedProfiles = uploadedProfiles;
    },
    reviews(state, reviews) {
      state.reviews = reviews;
    },
    gallery(state, gallery) {
      state.gallery = gallery;
    },
    similarBureaus(state, similarBureaus) {
      state.similarBureaus = similarBureaus;
    },
  },
  actions: {
    bureau: loadAction('bureau'),
    analytics: loadAction('analytics'),
    uploadedProfiles: loadAction('uploadedProfiles'),
    reviews: loadAction('reviews'),
    gallery: loadAction('gallery'),
    similarBureaus: loadAction('similarBureaus'),
  },
} as Module<any, any>;
