import Vue from 'vue';

Vue.directive('progressTextColor', {
  bind(el, { value }) {
    if (value < 60) el.style.color = 'black';
    else if (value < 85) el.style.color = 'black';
    else el.style.color = 'white';
  },
  update(el, { value }) {
    if (value < 60) el.style.color = 'black';
    else if (value < 85) el.style.color = 'black';
    else el.style.color = 'white';
  },
});
