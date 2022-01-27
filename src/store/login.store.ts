import axios from 'axios';
import { Module } from 'vuex';
import { User } from '../models';

export class LoginStoreState {
  loggedIn = false;
  loggedInUser: User;
}

export default {
  namespaced: true,
  state: () => new LoginStoreState(),
  getters: {
    isBureau: state => state.loggedInUser?.userType === 'MB',
  },
  mutations: {
    updateLogin(state, { data }) {
      state.loggedInUser = data;
      state.loggedIn = !!data;
    },
  },
  actions: {
    async check({ commit }) {
      try {
        commit('updateLogin', await axios.get('login/check', { validateStatus: status => status === 200 }));
      } catch (error) {
        commit('updateLogin', {});
      }
    },
  },
} as Module<LoginStoreState, any>;
