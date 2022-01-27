import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import chat from './chat.store';
import index from './index.store';
import perfectMatch from './perfect-match.store';
import mbSearch from './mb-search.store';
import search from './search.store';
import profile from './profile.store';
import bureau from './bureau.store';
import home from './home.store';
import login from './login.store';
import gallery from './gallery.store';
import advertisement from './advertisement.store';
import similarProfiles from './similar-profiles.store';

Vue.use(Vuex);

export default new Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    home,
    index,
    chat,
    profile,
    perfectMatch,
    'mb-search': mbSearch,
    search,
    bureau,
    gallery,
    advertisement,
    similarProfiles,
  },
});
