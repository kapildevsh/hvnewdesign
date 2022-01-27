import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// const primaries = ['#ff1180', '#bf3338', '#840133', '#ff4962'];

const theme = {
  options: {
    customProperties: true,
  },
  themes: {
    disable: true,
    light: {
      primary: '#F165A4',
      secondary: '#A9A9A9',
      accent: '#F165A4',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107',
    },
  },
};

Vue.use(Vuetify);

export default new Vuetify({
  theme,
  icons: { iconfont: 'fa' },
});
