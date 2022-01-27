import Vue from 'vue';

const state = {
  xs: true,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  mw1000: false,
  mw1570: false,
};

export type HvmqState = typeof state;

const registered = [] as any[];

const updater = () => {
  state.sm = matchMedia('(min-width: 600px)').matches;
  state.md = matchMedia('(min-width: 960px)').matches;
  state.mw1000 = matchMedia('(min-width: 1000px)').matches;
  state.lg = matchMedia('(min-width: 1264px)').matches;
  state.mw1570 = matchMedia('(min-width: 1570px)').matches;
  state.xl = matchMedia('(min-width: 1904px)').matches;

  registered.forEach(context => {
    context.hvmq = Object.freeze({ ...state });
  });
};

updater();
window.addEventListener('resize', updater);

export const hvmq = Vue.extend({
  data: () => ({ hvmq: Object.freeze({ ...state }) }),
  beforeCreate() {
    registered.push(this);
  },
  destroyed() {
    registered.splice(registered.indexOf(this), 1);
  },
});
