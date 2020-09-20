<template>
  <header-page :page-title="title">
    <div class="container-fluid">
      <div class="row">
        <div class="explanation col-12 col-md-4">
          <vueper-slides
            :arrows="false"
            :dragging-distance="70"
            class="no-shadow"
            fixed-height="100%"
            :gap="100"
          >
            <vueper-slide
              v-for="(slide, i) in slides"
              :key="i"
              :title="slide.title"
              :content="slide.content"
            />
          </vueper-slides>
        </div>

        <div class="interactive col-12 col-md-8 text-center">
          <div id="canvas-col">
            <img id="dom-image" class="img-fluid" />
            <!--
                The canvas gets injected here on page load.
              -->
          </div>

          <div class="row">
            <div class="col-6">
              <div>σ = {{ gb.sigma }}</div>
              <input
                id="sigma-slider"
                type="range"
                min="1"
                max="15"
                value="1"
                step="0.5"
                class="slider"
                v-model="gb.sigma"
              />
            </div>

            <div class="col-6">
              <div>Radius = {{ gb.getKernelSize() }}</div>
              <input
                id="kernel-slider"
                type="range"
                min="1"
                max="51"
                v-model="kernelSliderValue"
                value="1"
                step="2"
                class="slider"
                @input="gb.setKernelSize(kernelSliderValue)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header-page>
</template>

<script lang="ts">
import Vue from 'vue';

// @ts-ignore
import { VueperSlides, VueperSlide } from 'vueperslides';

import P5 from 'p5';
import GaussianBlur from './GaussianBlur';

import HeaderPage from '../../HeaderPage/HeaderPage.vue';

export default Vue.extend({
  name: 'Gaussian',
  data() {
    return {
      title: 'Gaussian',
      gb: GaussianBlur.prototype,
      kernelSliderValue: 1,

      slides: [
        {
          title: '<h2>How does it work?</h2>',
          content: `
            <img src="assets/gaussian/matrix.png" class="img-fluid my-3 no-select" style="width: 45vmin; height: auto" alt="...">
            <p>
              First we start with a RADIUSxRADIUS matrix. For example, the above is a
              matrix where the radius is equal to 3. The middle entry is the current pixel
              that we're looking at, and the other entries are the distances away from said pixel.
              We then plug each of these (x,y) values into the following equation to get a weighted matrix:
            </p>
            `,
        },
        {
          title: '',
          content: `
            <img src="assets/gaussian/equation.png" class="img-fluid mb-3 no-select" alt="...">
                <p>
                  This is the 3D version of a normalized bell curve that has a standard
                  deviation of σ. First, picture a 2D bell curve. If we make it have a large
                  standard deviation, it will become shorter but wider. The same applies for
                  the 3D version -- the larger we make σ, the more the pixels around the
                  center one will be weighted, giving a blurrier image. We will apply this
                  function to the (x,y) coordinate of each entry in the matrix to get a new
                  weighted matrix. If we pick σ = 1.5 we get the following...
                </p>
          `,
        },
        {
          title: '',
          content: `
            <img src="assets/gaussian/matrix2.png" class="img-fluid mb-3 no-select" alt="..." style="width: 45vmin; height: auto">
            <p>
              We are almost done! We must now normalize the matrix by calculating the sum
              of every value and then divide each entry by this sum. If we did not do
              this, we would get a darker image if the sum was less than 1 and a brighter
              image if the sum was greater than 1.
            </p>
          `,
        },
        {
          title: '',
          content: `
            <img src="assets/gaussian/matrix3.png" class="img-fluid mb-3 no-select" alt="..." style="width: 45vmin; height: auto">
            <p>
              Now we must weigh each pixel according to this matrix. This means the
              center pixel's new R value is (top-left pixel's R value)*(0.0947416) +
              (top-center pixel's R value)*(0.118318) + ... We do this for the G,B, and A
              values of each pixel as well.
            </p>
          `,
        },
        {
          title: '',
          content: `
            <img src="assets/gaussian/matrix3.png" class="img-fluid mb-3 no-select" alt="..." style="width: 45vmin; height: auto">
            <p>
              We're done! Each pixel is averaged according to the pixels around it,
              producing a Gaussian blur. Try changing σ = 1.5 and a radius size of 3!
              As you can see, it does not produce a very intense blur.
              Play around with the values to find a blur that you like! Please be aware
              that large radius values can take a couple seconds to finish.
              <!--
                You can also upload your own picture and blur it by hitting the Choose
                File button!
              -->
            </p>
          `,
        },
      ],
    };
  },
  mounted() {
    this.gb = new GaussianBlur(this.kernelSliderValue);
  },
  methods: {},
  components: {
    HeaderPage,
    VueperSlides,
    VueperSlide,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Gaussian.scss" lang="scss"></style>
