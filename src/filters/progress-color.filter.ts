import Vue from 'vue';

Vue.filter('progressColor', (progress: number) => {
  if (progress < 60) return 'red';
  if (progress < 85) return 'yellow';
  return 'green';
});

Vue.filter('progressTextColor', (progress: number) => {
  if (progress < 60) return 'black';
  if (progress < 85) return 'black';
  return 'white';
});
