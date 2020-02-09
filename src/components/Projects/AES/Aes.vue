<template>
  <div class="fill-page">
    <div class="page-container aes-container">
      <div class="container-fluid">
        <div class="row welcome text-center">
          <div class="col-12">
            <h1 class="display-4">Advanced Encryption Standard (AES)</h1>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="explanation col-md-6 text-center vertical-center">
            <div class="container-fluid">
              <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel"
                data-interval="false">
                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                  <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                  <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                  <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                  <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
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
                        \(a \ne 0\)
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
                <a class="carousel-control-prev" href="#carouselExampleCaptions"
                  role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleCaptions"
                  role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>

          <div class="interactive col-md-6">
              <div class="input col-lg-6 no-padding">
                <form class="needs-validation" novalidate>
                  <label for="messageInputBox">Message:</label>
                  <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <font-awesome-icon :icon="[ 'fas', 'comment-dots' ]"/>
                      </div>
                    </div>
                    <input type="text"
                           class="form-control"
                           :class="{ 'is-invalid': msg.isInvalid }"
                           id="messageInputBox"
                           placeholder="The message you'd like to encrypt"
                           v-model="msg.text"
                           v-on:input="onMsgChange()">
                    <div class="invalid-feedback">
                      Please ensure that the message is a maximum of 16 ASCII characters.
                      Support for more than 1 block will be added!
                    </div>
                  </div>

                  <label for="keyInputBox">Key:</label>
                  <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <font-awesome-icon :icon="[ 'fas', 'key' ]"/>
                      </div>
                    </div>
                    <input type="text"
                           class="form-control"
                           :class="{ 'is-invalid': key.isInvalid }"
                           id="keyInputBox"
                           placeholder="The key to encrypt the message with"
                           v-model="key.text"
                           v-on:input="onKeyChange()">
                    <div class="invalid-feedback">
                      Please ensure that the key is a maximum of 16 ASCII characters.
                      192/256 bit key sizes will be added!
                    </div>
                  </div>
                </form>
              </div>

              <div class="row state">
                <div class="col text-center">
                    <div class="state-grid">
                        <div class="cell-00 hbb hrb">{{ padNumber(blocks[0][0][0]) }}</div>
                        <div class="cell-01 hbb hrb hlb">{{ padNumber(blocks[0][0][1]) }}</div>
                        <div class="cell-02 hbb hrb hlb">{{ padNumber(blocks[0][0][2]) }}</div>
                        <div class="cell-03 hbb hlb">{{ padNumber(blocks[0][0][3]) }}</div>
                        <div class="cell-10 hbb htb hrb">{{ padNumber(blocks[0][1][0]) }}</div>
                        <div class="cell-11 hbb htb hrb hlb">{{ padNumber(blocks[0][1][1]) }}</div>
                        <div class="cell-12 hbb htb hrb hlb">{{ padNumber(blocks[0][1][2]) }}</div>
                        <div class="cell-13 hbb htb hlb">{{ padNumber(blocks[0][1][3]) }}</div>
                        <div class="cell-20 hbb htb hrb">{{ padNumber(blocks[0][2][0]) }}</div>
                        <div class="cell-21 hbb htb hrb hlb">{{ padNumber(blocks[0][2][1]) }}</div>
                        <div class="cell-22 hbb htb hrb hlb">{{ padNumber(blocks[0][2][2]) }}</div>
                        <div class="cell-23 hbb htb hlb">{{ padNumber(blocks[0][2][3]) }}</div>
                        <div class="cell-30 htb hrb">{{ padNumber(blocks[0][3][0]) }}</div>
                        <div class="cell-31 htb hrb hlb">{{ padNumber(blocks[0][3][1]) }}</div>
                        <div class="cell-32 htb hrb hlb">{{ padNumber(blocks[0][3][2]) }}</div>
                        <div class="cell-33 htb hlb">{{ padNumber(blocks[0][3][3]) }}</div>
                    </div>
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
import AES from './AES';

export default Vue.extend({
  name: 'AES',
  data() {
    return {
      msg: {
        text: '',
        isInvalid: false,
      },
      key: {
        text: '',
        isInvalid: false,
      },
      blocks: [
        [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11],
          [12, 13, 14, 15],
        ],
      ],
    };
  },
  mounted() {
    const block1 = [
      [0x00, 0x11, 0x22, 0x33],
      [0x44, 0x55, 0x66, 0x77],
      [0x88, 0x99, 0xaa, 0xbb],
      [0xcc, 0xdd, 0xee, 0xff],
    ];

    const key = [0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8,
      0x9, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf];
    const a = new AES(128);
    console.log(a.encrypt([block1], key));
  },
  methods: {
    onMsgChange(): void {
      this.msg.isInvalid = !(this.isASCII(this.msg.text) && this.isInputLengthValid(this.msg.text));

      if (this.msg.isInvalid) {
        const vals = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

        this.populateState(0, vals);
      }
      console.log(this.msg.text);
    },
    onKeyChange():void {
      this.key.isInvalid = !(this.isASCII(this.key.text) && this.isInputLengthValid(this.key.text));

      if (this.key.isInvalid) {
        const vals = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

        this.populateState(0, vals);
      }
      console.log(this.key.text);
    },
    padNumber(n: number): string {
      return n.toString().padStart(2, '0');
    },
    isASCII(str: string): boolean {
      return (/^[\x32-\xFF]*$/).test(str);
    },
    isInputLengthValid(msg: string): boolean {
      return msg.length <= 16;
    },
    populateState(n: number, vals: number[][]): void {
      this.blocks[n] = vals;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Aes.scss" lang="scss">
</style>
