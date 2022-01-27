<template>
  <v-tooltip color="primary" bottom>
    <template v-slot:activator="{ on, attrs }">
      <p
        v-bind="attrs"
        v-on="on"
        ref="gaugeWrapper"
        class="pa-1 ma-0 trust-score text-center"
        :class="['trust-score-' + score]"
        :style="{ height: height }"
      ></p>
    </template>
    <span>Trust Score</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GaugeChart = require('gauge-chart'); // does not work with es module

export default Vue.extend({
  name: 'TrustScore',
  props: {
    score: {
      type: Number,
      required: true,
    },
    height: {
      type: String,
      default: '45px',
    },
  },
  mounted() {
    this.update();
  },
  watch: {
    score() {
      this.update();
    },
  },
  methods: {
    update() {
      if (!this.$refs.gaugeWrapper) return;
      const arcColors = ['#dc3545', 'yellow', 'green'];
      let needleColor = arcColors[0];
      if (this.score > 3) needleColor = arcColors[1];
      if (this.score > 6) needleColor = arcColors[2];

      let gaugeOptions = {
        hasNeedle: true,
        outerNeedle: true,
        needleColor,
        needleUpdateSpeed: 1000,
        arcColors,
        arcDelimiters: [35, 65],
        rangeLabelFontSize: 14,
        centralLabel: String(this.score || 0),
      };

      GaugeChart.gaugeChart(this.$refs.gaugeWrapper, 100, gaugeOptions).updateNeedle((this.score || 0) * 10);
    },
  },
});
</script>
