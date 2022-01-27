import Vue from 'vue';
import { fileToUri } from '../utils';

Vue.directive('setImg', (el, binding) => {
  if (!binding.value) return;

  if (typeof binding.value === 'string') {
    (el as HTMLImageElement).src = binding.value;
    return;
  }

  fileToUri(binding.value).then(src => {
    (el as HTMLImageElement).src = src;
  });
});
