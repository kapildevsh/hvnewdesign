import Vue from 'vue';
import { formatDate } from '../utils';

Vue.directive('bind-date-time', (el, binding) => {
  const { str, iso } = formatDate(binding.value);
  el.innerText = str;
  (el as HTMLTimeElement).dateTime = iso;
});
