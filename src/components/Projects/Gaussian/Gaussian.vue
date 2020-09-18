<template>
  <header-page :page-title="title">
    <div class="container-fluid">
      <div class="row">
        <!-- <div class="explanation col-md-4 text-center"> -->
        <div class="explanation col-12 col-md-4">
          <vueper-slides class="no-shadow" fixed-height="100%" :gap="100">
            <vueper-slide
              v-for="slide in slides"
              :key="slide.id"
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
import 'vueperslides/dist/vueperslides.css';

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
          id: 'slide-1',
          title: '<h2>How does it work?</h2>',
          content:
            `
            <img src="assets/gaussian/matrix.png" class="img-fluid" style="width: 50vmin; height: auto" alt="...">
            <p>
              First we start with a RADIUSxRADIUS matrix. For example, the above is a
              matrix where the radius is equal to 3. The middle entry is the current pixel
              that we're looking at. We then plug each of these (x,y) values into the
              following equation to get a weighted matrix:
            </p>
            `,
        },
        {
          id: 'slide-2',
          title: 'Slide <b style="font-size: 1.3em;color: yellow">#2</b>',
          content:
            'lol',
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
