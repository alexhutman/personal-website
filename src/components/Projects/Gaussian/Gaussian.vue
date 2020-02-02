<template>
  <div class="fill-page">
    <div class="page-container gaussian-container">
      <div class="container-fluid">
        <div class="row welcome text-center">
          <div class="col-12">
            <h1 class="display-4">Gaussian Blur</h1>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="explanation col-md-4 text-center">
              Explanation
          </div>

          <div class="interactive col-md-8 text-center">

            <div id="canvas-col">
              <!--
                The canvas gets injected here on page load.
              -->
            </div>

            <div>
              <input id="sigma-slider" type="range" min="1" max="15"
                value="1" step="0.5" class="slider">
            </div>

            <div>
              <input id="kernel-slider" type="range" min="1" max="51"
                value="1" step="2" class="slider">
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import P5 from 'p5';
import GaussianBlur from './GaussianBlur';


export default Vue.extend({
  name: 'Gaussian',
  data() {
    return {
      gb: GaussianBlur.prototype,
    };
  },
  mounted() {
    this.gb = new GaussianBlur();
  },
  methods: {
    blur(): void {
      // TODO: Add methods such as these in the class
      // this.gb.gaussianBlur(canvas);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Gaussian.scss" lang="scss">
</style>
