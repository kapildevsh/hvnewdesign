import axios from 'axios';
import { Module } from 'vuex';
import { Article } from '@/models';

export default {
  namespaced: true,
  state: () => ({
    happyStories: [] as Article[],
    recentBlogs: [] as Article[],
  }),
  mutations: {
    recentBlogs(state, { data }) {
      state.recentBlogs = data;
    },
    happyStories(state, { data }) {
      state.happyStories = data;
    },
  },
  actions: {
    async happyStories({ commit }) {
      commit('happyStories', await axios.get('happyStories'));
    },
    async recentBlogs({ commit }) {
      commit('recentBlogs', await axios.get('recentBlogs'));
    },
  },
} as Module<any, any>;
