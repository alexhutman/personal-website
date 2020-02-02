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

const path = require('../../../../public/assets/img/papabiceps.jpg');

export default Vue.extend({
  name: 'Gaussian',
  mounted() {
    const canvasCol = document.getElementById('canvas-col');

    const sketch = (p5: P5) => {
      let img: P5.Image;
      let canvas: any;
      p5.preload = () => {
        img = p5.loadImage(path);
      };
      /* eslint no-param-reassign: ["error", { "props": false }] */

      p5.setup = () => {
        if (canvasCol) {
          const ccx = canvasCol.offsetWidth;
          const ccy = canvasCol.offsetHeight;

          // @TODO Make the column stretch to the bottom of the screen so that
          // we can call this to make it fit the column
          // img.resize(0, ccy);
          canvas = p5.createCanvas(img.width, img.height);
          canvas.parent('canvas-col');
          canvas.style('height', '100%');
          canvas.style('width', 'auto');

          p5.pixelDensity(1);
        }

        p5.noLoop();
      };

      p5.draw = () => {
        const gb = new GaussianBlur(p5);
        p5.image(img, 0, 0);
        gb.gaussianBlur(canvas);
      };
    };

    const p5 = new P5(sketch);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Gaussian.scss" lang="scss">
</style>
