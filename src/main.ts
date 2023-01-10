import '@fortawesome/fontawesome-free/css/all.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';  
import './directives';
import './filters';
// import axios from 'axios';

// axios.defaults.baseURL = '/api';

(async function() {
  await store.dispatch('login/check');  

  new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App),
  });
})();
