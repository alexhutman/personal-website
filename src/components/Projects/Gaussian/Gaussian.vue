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

          <div id="canvas-col" class="interactive col-md-8 text-center">

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import P5 from 'p5';

const path = require('../../../../public/assets/img/papabiceps.jpg');

export default Vue.extend({
  name: 'Gaussian',
  mounted() {
    const sketch = (p5: P5) => {
      let img: P5.Image;
      p5.preload = () => {
        img = p5.loadImage(path);
      };
      /* eslint no-param-reassign: ["error", { "props": false }] */

      p5.setup = () => {
        console.log(img);
        const canvas = p5.createCanvas(img.width, img.height);
        canvas.parent('canvas-col');
        canvas.style('height', '100%');
        canvas.style('width', 'auto');
      };

      p5.draw = () => {
        p5.image(img, 0, 0);
      };
    };

    const p5 = new P5(sketch);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Gaussian.scss" lang="scss">
</style>
