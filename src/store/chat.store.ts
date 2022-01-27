import axios from 'axios';
import { Module } from 'vuex';
import { ChatMessage, ChatUser, DownloadingItem, extendDownloadingItem } from '../models';
import { uRLSearchParams } from '../utils';

import { dataLoadAction } from './utils';

class ChatStoreState {
  chatUserListLoading = new DownloadingItem([] as ChatUser[]);
  userFilter: string = undefined;
  userSelected: ChatUser;
  chatData = extendDownloadingItem<ChatMessage[], { user2: ChatUser }>();
}

export default {
  namespaced: true,
  state: () => new ChatStoreState(),
  mutations: {
    chatUserListLoading(state, data: DownloadingItem<ChatUser[]>) {
      state.chatUserListLoading = data;
    },
    chatData(state, chatData) {
      state.chatData = chatData;
    },
    userFilter(state, keyword) {
      state.userFilter = keyword;
    },
    userSelected(state, user: ChatUser) {
      console.log(user);
      state.userSelected = user;
    },
    addMsg(state, msg: ChatMessage) {
      state.chatData.data.push(msg);
    },
  },
  getters: {
    chatUserList: state => state.chatUserListLoading?.data,
    chatUserListFiltered(state) {
      if (!state.userFilter?.trim() || !state.chatUserListLoading?.data?.length) {
        return state.chatUserListLoading?.data;
      } else {
        const find = state.userFilter.toLowerCase();
        return state.chatUserListLoading?.data.filter((t: ChatUser) => t.name.toLowerCase().includes(find));
      }
    },
  },
  actions: {
    async init({ commit }) {
      await dataLoadAction('chatUserListSync', 'chatUserListLoading', {}, commit, axios.get('chatUserList'));
    },

    async userSelected({ commit }, user2: ChatUser) {
      commit('userSelected', user2);
      if (!user2) commit('chatData');
      else {
        await dataLoadAction(
          'chatDataSync',
          'chatData',
          { user: user2 },
          commit,
          axios.get('chatData/' + user2.id),
          undefined,
          false
        );
      }
    },

    async sendMsg({ commit, state }, msg: string) {
      await axios
        .post('send-msg', uRLSearchParams({ to: state.userSelected.id, msg }))
        .then(({ data }) => commit('addMsg', data));
    },

    userFilter({ commit }, keyword: string) {
      commit('userFilter', keyword);
    },
  },
} as Module<ChatStoreState, any>;
