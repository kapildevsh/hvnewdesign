declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'murphyjs' {
  export default {
    play: Function,
  };
}

declare module 'marked' {
  export default Function;
}

declare module 'gauge-chart' {
  export default {
    gaugeChart: any,
  };
}
