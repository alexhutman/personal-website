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
          <!-- <div class="explanation col-md-4 text-center"> -->
          <div class="explanation col-md-4 text-center vertical-center">
            <div class="container-fluid">
              <div id="gaussianCarousel" class="carousel slide" data-ride="carousel"
                data-interval="false">
                <ol class="carousel-indicators">
                  <li data-target="#gaussianCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#gaussianCarousel" data-slide-to="1"></li>
                  <li data-target="#gaussianCarousel" data-slide-to="2"></li>
                  <li data-target="#gaussianCarousel" data-slide-to="3"></li>
                  <li data-target="#gaussianCarousel" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner" style=" width:100%; height: 500px !important;">
                  <div class="carousel-item active">
                    <img src="assets/gaussian/matrix.png" class="img-fluid fit-carousel-img"
                      alt="...">
                    <!--
                      <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                      width="600" height="700" xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                      aria-label="Placeholder: Third slide">
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#555"></rect>
                      <text x="50%" y="50%" fill="#333" dy=".3em">First slide</text>
                    </svg>
                    -->
                    <div class="carousel-caption d-none d-md-block">
                      <h5>How does it work?</h5>
                      <p>
                        First we start with a RADIUSxRADIUS matrix. For example, the above is a
                        matrix where the radius is equal to 3. The middle entry is the current pixel
                        that we're looking at. We then plug each of these (x,y) values into the
                        following equation to get a weighted matrix:
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="assets/gaussian/equation.png" class="img-fluid" alt="...">
                    <!--
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800"
                    height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid
                    slice" focusable="false" role="img" aria-label="Placeholder: Third slide">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#555"></rect>
                    <text x="50%" y="50%" fill="#333" dy=".3em">Second slide</text>
                    </svg>
                    -->
                    <div class="carousel-caption d-none d-md-block">
                      <!-- <h5>Second slide label</h5> -->
                      <p class="carousel-text">
                        This is the 3D version of a normalized bell curve that has a standard
                        deviation of σ. First, picture a 2D bell curve. If we make it have a large
                        standard deviation, it will become shorter but wider. The same applies for
                        the 3D version -- the larger we make σ, the more the pixels around the
                        center one will be weighted, giving a blurrier image. We will apply this
                        unction to the (x,y) coordinate of each entry in the matrix to get a new
                        weighted matrix. If we pick σ = 1.5 we get the following...
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="assets/gaussian/matrix2.png" class="img-fluid fit-carousel-img"
                      alt="...">
                    <!--
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800"
                    height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid
                    slice" focusable="false" role="img" aria-label="Placeholder: Third slide">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#555"></rect>
                    <text x="50%" y="50%" fill="#333" dy=".3em">Third slide</text>
                    </svg>
                    -->
                    <div class="carousel-caption d-none d-md-block">
                      <!-- <h5>Third slide label</h5> -->
                      <p class="carousel-text">
                        We are almost done! We must now normalize the matrix by calculating the sum
                        of every value and then divide each entry by this sum. If we did not do
                        this, we would get a darker image if the sum was less than 1 and a brighter
                        image if the sum was greater than 1.
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="assets/gaussian/matrix3.png" class="img-fluid fit-carousel-img"
                      alt="...">
                    <!--
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800"
                    height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid
                    slice" focusable="false" role="img" aria-label="Placeholder: Third slide">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#555"></rect>
                    <text x="50%" y="50%" fill="#333" dy=".3em">Third slide</text>
                    </svg>
                    -->
                    <div class="carousel-caption d-none d-md-block">
                      <!-- <h5>Third slide label</h5> -->
                      <p class="carousel-text">
                        Now we must weigh each pixel according to this matrix. This means the
                        center pixel's new R value is (top-left pixel's R value)*(0.0947416) +
                        (top-center pixel's R value)*(0.118318) + ... We do this for the G,B, and A
                        values of each pixel as well.
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="assets/gaussian/matrix3.png" class="img-fluid fit-carousel-img"
                      alt="...">
                    <!--
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800"
                    height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid
                    slice" focusable="false" role="img" aria-label="Placeholder: Third slide">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#555"></rect>
                    <text x="50%" y="50%" fill="#333" dy=".3em">Third slide</text>
                    </svg>
                    -->
                    <div class="carousel-caption d-none d-md-block">
                      <!-- <h5>Third slide label</h5> -->
                      <p class="carousel-text">
                        We're done! Each pixel is averaged according to the pixels around it,
                        producing a Gaussian blur. As you can see, σ = 1.5 and a radius size of 3
                        does not produce a very intense blur. Try changing the σ and Radius values
                        to get a blurrier image!
                        <!--
                          You can also upload your own picture and blur it by hitting the Choose
                          File button!
                        -->
                      </p>
                    </div>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#gaussianCarousel"
                  role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#gaussianCarousel"
                  role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>

          <div class="interactive col-md-8 text-center">

            <div id="canvas-col">
              <img id="dom-image" class="img-fluid">
              <!--
                The canvas gets injected here on page load.
              -->
            </div>

            <div class="row">
              <div class="col-6">
                <div>
                  σ = {{ gb.sigma }}
                </div>
                <input id="sigma-slider" type="range" min="1" max="15"
                  value="1" step="0.5" class="slider" v-model="gb.sigma">
                </div>

              <div class="col-6">
                <div>
                  Radius = {{ gb.getKernelSize() }}
                </div>
                <input id="kernel-slider" type="range" min="1" max="51" v-model="kernelSliderValue"
                  value="1" step="2" class="slider" @input="gb.setKernelSize(kernelSliderValue)">
              </div>
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
      kernelSliderValue: 1,
    };
  },
  mounted() {
    this.gb = new GaussianBlur(this.kernelSliderValue);
  },
  methods: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Gaussian.scss" lang="scss">
</style>
