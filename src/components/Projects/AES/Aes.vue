<template>
    <div class="aes-container">
      <div class="container-fluid">
        <div class="row welcome text-center">
          <div class="col-12">
            <h1 class="display-4">
              {{ isMobile() ? "AES" : "Advanced Encryption Standard (AES)" }}
            </h1>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="explanation col-md-6 text-center vertical-center">
            <div class="container-fluid">
              <div id="aesCarousel" class="carousel slide" data-ride="carousel"
                data-interval="false">
                <ol class="carousel-indicators">
                  <li data-target="#aesCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#aesCarousel" data-slide-to="1"></li>
                  <li data-target="#aesCarousel" data-slide-to="2"></li>
                  <li data-target="#aesCarousel" data-slide-to="3"></li>
                  <li data-target="#aesCarousel" data-slide-to="4"></li>
                  <li data-target="#aesCarousel" data-slide-to="5"></li>
                  <li data-target="#aesCarousel" data-slide-to="6"></li>
                  <li data-target="#aesCarousel" data-slide-to="7"></li>
                </ol>
                <div class="carousel-inner">
                <!-- <div class="carousel-inner" style="height: 500px !important;"> -->
                  <div id="slide-0" class="carousel-item active">
                    <div class="carousel-caption">
                      <h5>What is AES?</h5>
                      <p>
                        AES is a block cipher used to encrypt messages with a given key. A <b>block
                        cipher</b> is a cipher that splits the message up into blocks of a fixed
                        length. In AES' case, each block is 128 bits long. In the standard, keys
                        can have lengths of 128, 192, or 256 bits. We will demonstrate AES128 to
                        get the general idea. Each ASCII character is 8 bits long, so for the
                        purpose of the demonstration, we will only work with 1 message block which
                        is comprised of 16 ASCII characters <code>(8 bits/character * 16 characters
                        = 128 bits)</code>. The same is true for the key.
                      </p>
                    </div>
                  </div>
                  <div id="slide-1" class="carousel-item">
                    <div class="carousel-caption">
                      <!-- <h5>Second slide label</h5> -->
                      <div class="carousel-text">
                      <h3>Summary</h3>
                        <p>
                          {{ isMobile() ? "Below" : "To the right"}} is where you will find the
                          state. The state is where the calculations will be applied to. At first we
                          will populate the state with the binary representation of our message. In
                          our case, each entry in the state matrix will become the hexadecimal ASCII
                          representation of each character entered. There are 4 major
                          transformations of the state as defined by the AES standard:
                        </p>
                        <dl class="dl-horizontal">
                          <dt>AddRoundKey</dt>
                          <dd>
                            AddRoundKey simply adds each element in the state matrix with its
                            corresponding element in the <b>key schedule</b>.
                          </dd>

                          <dt>SubBytes</dt>
                          <dd>
                            This step substitutes bytes of the state matrix with bytes of a
                            substitution table (commonly referred to as an <b>S-box</b>). It is
                            essentially a table that maps (more specifically, <b>affinely
                            transforms</b>) one byte to another (ex. <code>0xC6 -> 0xB4</code>).
                          </dd>

                          <dt>ShiftRows</dt>
                          <dd>
                            ShiftRows is fairly straightforward. For
                            <code>0 &lt; i &lt; 4</code>, this step performs a circular left shift
                            of row <code>i</code> of the state matrix by <code>i</code> positions.
                          </dd>

                          <dt>MixColumns</dt>
                          <dd>
                            MixColumns is arguably the most complex step in AES. It treats
                            each column of the state as a polynomial over a <b>Galois Field of order
                            256 modulo x<sup>4</sup> + 1</b> and multiplies each one by another
                            polynomial.
                          </dd>
                        </dl>
                        <p>
                          Each step will be explained in further detail in upcoming slides.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="slide-2" class="carousel-item">
                    <div class="carousel-caption">
                      <!-- <h5>Third slide label</h5> -->
                      <div class="carousel-text">
                        <h3>Preliminaries:</h3>
                        <p>
                          Most calculations in AES occur in <code>GF(2<sup>8</sup>) /
                          (x<sup>8</sup> + x<sup>4</sup> + x<sup>3</sup> + x + 1)</code>.
                          It would take a fair bit of time to explain everything about Galois
                          Fields, but we will go over what is needed for the algorithm.
                        </p>
                        <dl class="dl-horizontal">
                          <dt>Representation</dt>
                          <dd>
                            We treat each byte like a polynomial in the above Galois Field. For
                            example, <code>C6<sub>16</sub> = 11000110<sub>2</sub></code> represents
                            <br><code> 1*x<sup>7</sup> + 1*x<sup>6</sup> + 0*x<sup>5</sup> +
                            0*x<sup>4</sup> + 0*x<sup>3</sup> + x<sup>2</sup> + x + 0*1</code> =
                            <code>x<sup> 7</sup> + x<sup>6 </sup> + x<sup>2</sup> + x</code>
                          </dd>
                          <dt>Addition (<code>&#8853;</code>)</dt>
                          <dd>
                            You may have seen this symbol before. It is commonly used for the XOR
                            (e<u>x</u>clusive <u>or</u>) operator in Boolean logic. In
                            GF(2<sup>8</sup>), adding is equivalent to XORing. XORing 2 bits,
                            <code>b<sub>1</sub></code> and <code>b<sub>2</sub></code> produces
                            <code>1</code> <u>only if either</u> <code>b<sub>1</sub></code>
                            &nbsp;<u>or</u> <code>b<sub>2</sub></code> are <code>1</code>.
                            Otherwise, the result is <code>0</code>. <br><a href="https://en.wikipedia.org/wiki/Exclusive_or" target="_blank">Click here</a>
                            to learn more about the XOR operator.
                          </dd>
                          <dt>Multiplication (<code>•</code>)</dt>
                          <dd>
                            Multiplication modulo a polynomial is similar to multiplication in
                            &#8484;<sub>n</sub>. In &#8484;<sub>5</sub> for example, if we
                            calculate <code>4*3</code>, we can just take the result in &#8484;
                            and take the remainder modulo <code>5</code>, which would be <code>
                            2</code>, to get a result in &#8484;<sub>5</sub>. The same goes for the
                            above Galois Field. If we took 2 polynomials (which we represent as 2
                            binary numbers) and multiplied them, we would do normal polynomial
                            multiplication, but would then have to do polynomial division (in our
                            case, by <code>x<sup>8</sup> + x<sup>4</sup> + x<sup>3</sup> + x + 1
                            </code>) to get an element in the field.
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div id="slide-3" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>Try it out!</h3>
                      <p class="carousel-text">
                        Enter your own message and key {{ isMobile() ? "below": "to the right" }}!
                      </p>
                    </div>
                  </div>
                  <div id="slide-4" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>AddRoundKey</h3>
                      <p>
                        AddRoundKey simply consists of XORing the state matrix with entries in the
                        key schedule. The key schedule is not really something that deserves going
                        into detail over, as it is just an algorithm that uses some of the concepts
                        that were already explained. Below is Python code to generate the key
                        schedule, <code>w</code>:
                        <pre>
                          <code>
N_b = 4 # Number of columns (32-bit words comprising the state).
# N_b = 4 for AES128, AES192, and AES256

# The following 2 declarations are only true for AES128
N_k = 4   # Number of 32-bit words comprising the key
N_r = 10  # Number of rounds

Rcon = []
for i in range(10):
    if i == 0:
        rc.append(1)
    elif i > 0 and rc[i-1] &lt; 0x80:
        rc.append(2*rc[i-1])
    elif i > 0 and rc[i - 1] >= 0x80:
        rc.append((2*rc[i-1]) ^ 0x1B)

w = []
for i in range(4*(N_r+1)):
    if i &lt; N_k:
        w.append(key[4*i:4*(i+1)])
    elif i >= N_k and i % N_k == 0:
        temp_col = rot_word(w[i - 1], 1) # Circular left shift w[i-1] by 1 position
        temp_col = [s_box[x] for x in temp_col] # Then substitute the bytes
        temp_col[0] = temp_col[0] ^ Rcon[(i // N_k) - 1] # Then XOR first byte with round constant

        w.append(xor_col(w[i - N_k], temp_col)
    elif i >= N_k and N_k > 6 and i % N_k == 4:
        w.append(xor_col(w[i - N_k], [s_box[x] for x in w[i-1]]))
    else:
        w.append(xor_col(w[i - N_k], w[i-1]))

return w
                          </code>
                        </pre>
                        We only need to generate this key schedule once, and can use it throughout
                        the rest of the cipher. AddRoundKey simply consists of element-wise XORing
                        the state with 4 consecutive columns of the key schedule, shifting by 4
                        on each successive round. So for round <code>r</code>, <code>0 &lt; r &le;
                        N<sub>r</sub></code>, we XOR the state with <code>w[r*N_b,
                        (r+1)*N_b-1]</code>.
                      </p>
                    </div>
                  </div>
                  <div id="slide-5" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>SubBytes</h3>
                      <p>
                        SubBytes has only 2 steps. For a number <code>n</code> with bits
                        <code>n<sub>0...7</sub></code>:
                        <ol>
                          <li>
                            Invert <code>n</code> in GF(2<sup>8</sup>).
                            <p>
                              This is similar to inverting a number in &#8484;<sub>n</sub>. In
                              &#8484;<sub>5</sub> for example, to invert <code>4</code>, we must
                              find a number <code>x</code> such that <code>4*x &equiv; 1 mod
                              5</code>. In this case, <code>4</code>'s inverse is itself because
                              <code>4*4 &equiv; 16 &equiv; 1 mod 5</code>. We do the same thing in
                              GF(2<sup>8</sup>). To find the inverse to a polynomial <code>
                              p(x)</code>, we must find <code>q(x)</code> such that <code>p(x)•q(x)
                              &equiv; 1 mod m(x)</code>, where <code>m(x) = x<sup>8</sup> +
                              x<sup>4</sup> + x<sup>3</sup> + x + 1</code>, as described in the
                              "Preliminaries" slide. We won't get into specifically how to find
                              the inverse, but this is the general idea.
                            </p>
                          </li>
                          <li>Apply the following affine transformation:</li>
                          <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf#page=20"
                          target="_blank">
                            <img src="assets/aes/subbytes.png" class="img-fluid fit-carousel-img"
                            alt="affine-transformation">
                          </a>
                          <p>
                            where <code>b<sub>0...7</sub> = (n<sup>-1</sup>)<sub>0...7</sub></code>.
                            &nbsp;&nbsp; <code>b<sup>'</sup><sub style="position: relative; left:
                            -.5em;">0...7</sub></code> will be the value to substitute
                              <code>n</code> by.
                          </p>
                        </ol>
                      </p>
                    </div>
                  </div>
                  <div id="slide-6" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>ShiftRows</h3>
                      <p>
                        To reiterate the "Summary" slide, ShiftRows is fairly straightforward. For
                        <code>0 &lt; i &lt; 4</code>, this step performs a circular left shift
                        of row <code>i</code> of the state matrix by <code>i</code> positions.
                        Here is a graphic from FIPS 197 to help visualize it:
                      </p>
                      <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf#page=21"
                      target="_blank">
                        <img src="assets/aes/shiftrows.png" class="img-fluid fit-carousel-img"
                        alt="shift-rows">
                      </a>
                    </div>
                  </div>
                  <div id="slide-7" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>MixColumns</h3>
                      <p>
                        Oh boy.
                      </p>
                    </div>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#aesCarousel"
                  role="button" v-on:click="onPrevSlide()" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#aesCarousel"
                  role="button" v-on:click="onNextSlide()" data-slide="next">
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
                           :disabled="!onTrySlide()"
                           maxlength="16"
                           class="form-control"
                           :class="{ 'is-invalid': msg.isInvalid }"
                           id="messageInputBox"
                           placeholder="The message you'd like to encrypt"
                           v-model="msg.text"
                           v-on:input="onMsgChange()">
                    <div class="invalid-feedback">
                      Please ensure that the message contains only ASCII characters.
                      Support for other characters will be added!
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
                           :disabled="!onTrySlide()"
                           maxlength="16"
                           class="form-control"
                           :class="{ 'is-invalid': key.isInvalid }"
                           id="keyInputBox"
                           placeholder="The key to encrypt the message with"
                           v-model="key.text"
                           v-on:input="onKeyChange()">
                    <div class="invalid-feedback">
                      Please ensure that the key is 16 ASCII characters long.
                    </div>
                  </div>
                </form>
              </div>

              <div class="row state">
                <div class="col text-center">
                  <h3>State:</h3>
                    <div class="state-grid">
                        <div class="cell-00 hbb hrb">
                          {{ toHex(msg.blocks[0][0][0]) }}
                        </div>
                        <div class="cell-01 hbb hrb hlb">
                          {{ toHex(msg.blocks[0][1][0]) }}
                        </div>
                        <div class="cell-02 hbb hrb hlb">
                          {{ toHex(msg.blocks[0][2][0]) }}
                        </div>
                        <div class="cell-03 hbb hlb">
                          {{ toHex(msg.blocks[0][3][0]) }}
                        </div>
                        <div class="cell-10 hbb htb hrb">
                          {{ toHex(msg.blocks[0][0][1]) }}
                        </div>
                        <div class="cell-11 hbb htb hrb hlb">
                          {{ toHex(msg.blocks[0][1][1]) }}
                        </div>
                        <div class="cell-12 hbb htb hrb hlb">
                          {{ toHex(msg.blocks[0][2][1]) }}
                        </div>
                        <div class="cell-13 hbb htb hlb">
                          {{ toHex(msg.blocks[0][3][1]) }}
                        </div>
                        <div class="cell-20 hbb htb hrb">
                          {{ toHex(msg.blocks[0][0][2]) }}
                        </div>
                        <div class="cell-21 hbb htb hrb hlb">
                          {{ toHex(msg.blocks[0][1][2]) }}
                        </div>
                        <div class="cell-22 hbb htb hrb hlb">
                          {{ toHex(msg.blocks[0][2][2]) }}
                        </div>
                        <div class="cell-23 hbb htb hlb">
                          {{ toHex(msg.blocks[0][3][2]) }}
                        </div>
                        <div class="cell-30 htb hrb">
                          {{ toHex(msg.blocks[0][0][3]) }}
                        </div>
                        <div class="cell-31 htb hrb hlb">
                          {{ toHex(msg.blocks[0][1][3]) }}
                        </div>
                        <div class="cell-32 htb hrb hlb">
                          {{ toHex(msg.blocks[0][2][3]) }}
                        </div>
                        <div class="cell-33 htb hlb">
                          {{ toHex(msg.blocks[0][3][3]) }}
                        </div>
                    </div>
                </div>
              </div>

              <!-- <div class="row key">
                <div class="col text-center">
                  <h3>Key:</h3>
                    <div class="state-grid">
                        <div class="cell-00 hbb hrb">
                          {{ toHex(key.intArr[0]) }}
                        </div>
                        <div class="cell-01 hbb hrb hlb">
                          {{ toHex(key.intArr[4]) }}
                        </div>
                        <div class="cell-02 hbb hrb hlb">
                          {{ toHex(key.intArr[8]) }}
                        </div>
                        <div class="cell-03 hbb hlb">
                          {{ toHex(key.intArr[12]) }}
                        </div>
                        <div class="cell-10 hbb htb hrb">
                          {{ toHex(key.intArr[1]) }}
                        </div>
                        <div class="cell-11 hbb htb hrb hlb">
                          {{ toHex(key.intArr[5]) }}
                        </div>
                        <div class="cell-12 hbb htb hrb hlb">
                          {{ toHex(key.intArr[9]) }}
                        </div>
                        <div class="cell-13 hbb htb hlb">
                          {{ toHex(key.intArr[13]) }}
                        </div>
                        <div class="cell-20 hbb htb hrb">
                          {{ toHex(key.intArr[2]) }}
                        </div>
                        <div class="cell-21 hbb htb hrb hlb">
                          {{ toHex(key.intArr[6]) }}
                        </div>
                        <div class="cell-22 hbb htb hrb hlb">
                          {{ toHex(key.intArr[10]) }}
                        </div>
                        <div class="cell-23 hbb htb hlb">
                          {{ toHex(key.intArr[14]) }}
                        </div>
                        <div class="cell-30 htb hrb">
                          {{ toHex(key.intArr[3]) }}
                        </div>
                        <div class="cell-31 htb hrb hlb">
                          {{ toHex(key.intArr[7]) }}
                        </div>
                        <div class="cell-32 htb hrb hlb">
                          {{ toHex(key.intArr[11]) }}
                        </div>
                        <div class="cell-33 htb hlb">
                          {{ toHex(key.intArr[15]) }}
                        </div>
                    </div>
                </div>
              </div> -->
          </div>

        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AES from './AES';

// const origMsg = [
//   [0x00, 0x11, 0x22, 0x33],
//   [0x44, 0x55, 0x66, 0x77],
//   [0x88, 0x99, 0xaa, 0xbb],
//   [0xcc, 0xdd, 0xee, 0xff],
// ];

const origMsg = [
  [0x00, 0x00, 0x00, 0x00],
  [0x00, 0x00, 0x00, 0x00],
  [0x00, 0x00, 0x00, 0x00],
  [0x00, 0x00, 0x00, 0x00],
];

// const origKey = [
//   0x0, 0x1, 0x2, 0x3,
//   0x4, 0x5, 0x6, 0x7,
//   0x8, 0x9, 0xa, 0xb,
//   0xc, 0xd, 0xe, 0xf,
// ];

const origKey = [
  0x0, 0x0, 0x0, 0x0,
  0x0, 0x0, 0x0, 0x0,
  0x0, 0x0, 0x0, 0x0,
  0x0, 0x0, 0x0, 0x0,
];

export default Vue.extend({
  name: 'AES',
  data() {
    return {
      numSlides: 0,
      curSlide: 0,
      aesInstance: new AES(128),
      msg: {
        text: '',
        isInvalid: false,
        blocks: [
          origMsg,
        ],
      },
      key: {
        text: '',
        isInvalid: false,
        intArr: origKey
        ,
      },
    };
  },
  mounted() {
    this.numSlides = document.getElementsByClassName('carousel-item').length;
    console.log(this.aesInstance.encrypt(this.msg.blocks, this.key.intArr));
  },
  methods: {
    // getCurSlide(): void {
    //   const slides = document.getElementsByClassName('carousel-inner')[0].childNodes;
    //   for (let i = 0; i < slides.length; i += 1) {
    //     const el = slides[i] as HTMLElement;
    //     if (el.classList.contains('active')) {
    //       console.log(i);
    //     }
    //   }
    // },
    onPrevSlide(): void {
      this.curSlide = (((this.curSlide - 1) % this.numSlides) + this.numSlides) % this.numSlides;
    },
    onNextSlide(): void {
      this.curSlide = (((this.curSlide + 1) % this.numSlides) + this.numSlides) % this.numSlides;
    },
    onMsgChange(): void {
      this.msg.isInvalid = !(this.isASCII(this.msg.text) && this.isInputLengthValid(this.msg.text));

      if (this.msg.isInvalid || (!this.msg.text)) {
        this.populateState(0, origMsg);

        // TODO: reset the key to the original value too
      } else {
        this.populateState(0, this.textToMatrix(this.msg.text));
        console.log(this.aesInstance.encrypt(this.msg.blocks, this.key.intArr));
      }
    },
    onKeyChange():void {
      this.key.isInvalid = !(this.isASCII(this.key.text) && this.key.text.length === 16);

      if (this.key.isInvalid || (!this.key.text)) {
        this.populateState(0, origMsg);

        this.key.intArr = origKey;
      } else {
        this.populateState(0, this.textToMatrix(this.msg.text));

        this.key.intArr = this.strToIntArr(this.key.text);
        console.log(this.aesInstance.encrypt(this.msg.blocks, this.key.intArr));
      }
    },
    onTrySlide(): boolean {
      return (this.curSlide === 3);
    },
    toHex(n: number): string {
      return n.toString(16).toUpperCase();
    },
    isASCII(str: string): boolean {
      return (/^[\x20-\x7E]*$/).test(str);
    },
    isInputLengthValid(msg: string): boolean {
      return msg.length <= 16;
    },
    populateState(n: number, vals: number[][]): void {
      this.msg.blocks[n] = vals;
    },
    textToMatrix(txt: string): number[][] {
      const toInts: number[] = [];

      for (let i = 0; i < txt.length; i += 1) {
        toInts.push(txt.charCodeAt(i));
      }

      for (let i = 0; i < (16 - txt.length); i += 1) {
        toInts.push(0);
      }

      return this.arrToMatrix(toInts);
    },
    strToIntArr(str: string): number[] {
      const intArr: number[] = [];
      for (let i = 0; i < str.length; i += 1) {
        intArr.push(str.charCodeAt(i));
      }

      return intArr;
    },
    arrToMatrix(arr: number[]): number[][] {
      const matrixRowLen = 4;

      if (arr.length === (matrixRowLen * matrixRowLen)) {
        const matrix: number[][] = [];
        for (let i = 0; i < (arr.length / matrixRowLen); i += 1) {
          matrix.push(arr.slice(i * matrixRowLen, (i + 1) * matrixRowLen));
        }
        return matrix;
      }

      throw new Error(`Array needs to be ${matrixRowLen * matrixRowLen} (got ${arr.length})`);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Aes.scss" lang="scss">
</style>
