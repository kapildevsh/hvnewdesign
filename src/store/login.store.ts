import HTTP from '../http/http';
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
    check({ commit }, loggedInUser) {
      try {
        const sessionStr = localStorage.getItem('user');
        

        if(sessionStr) {
          const session = JSON.parse(sessionStr);
          const data = {
            firstName: session.user_full_name,
            lastName: session.user_full_name,
            // img:session.user_full_name,
            account_status: session.account_status,
            user_profile_status: session.user_profile_status,
            userType: session.user_role
        }
          loggedInUser = {data}
        }
        commit('updateLogin', loggedInUser);
      } catch (error) {
        commit('updateLogin', {});
      }
    },
  },
} as Module<LoginStoreState, any>;
