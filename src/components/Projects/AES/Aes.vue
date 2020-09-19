<!-- eslint-disable max-len --><template>
  <header-page :page-title="title">
    <div class="container-fluid">
      <div class="row">
        <div class="explanation col-12">
          <vueper-slides
            style="height: 75vh !important;"
            :arrows="false"
            :dragging-distance="70"
            class="no-shadow"
            fixed-height="100%"
            :gap="100"
          >
            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">What is AES?</h2>
                  </div>
            <p>
              The <u>A</u>dvanced <u>E</u>ncryption <u>S</u>tandard is a block cipher
              used to encrypt data with a given key. A <b>cipher
              </b> is just an algorithm used for encrypting or decrypting data. A <b>block
              cipher</b> is a cipher that splits the plaintext up into <b>blocks</b> of
              data, and operates on these blocks to turn the plaintext into ciphertext, as
              opposed to <b>stream ciphers</b>, which encrypt one bit or byte of plaintext
              at a time to produce the ciphertext. <br><br>
              Before AES, the United States was using <b>DES</b>, the Data Encryption
              Standard, for protecting sensitive government data. When it was developed,
              DES was adequate for its purpose, but as
              time went on, weaknesses in DES were being discovered and faster hardware
              was making attacks even easier. This was sort of jury-rigged by applying DES
              3 times, spawning an algorithm suitably called Triple DES. Triple DES was
              better, but a new, more secure encryption standard was definitely needed.
              In 1997, the U.S. National Institute of Standards and Technology called
              upon anyone and everyone to submit proposals for the new standard. <br><br>
              There were a few heavyweight contenders but <b>Rijndael</b>, created by
              Belgian cryptographers Vincent Rijmen and Joan Daemen, ended up becoming
              the victor. The NIST chose a subset of the proposed Rijndael specification
              to become AES: each block is 128 bits long and keys
              can have lengths of 128, 192, or 256 bits. We will demonstrate AES128 to
              get the general idea, but the 192 and 256 bit key versions are very similar.
              Each ASCII character is 8 bits long, so for the purpose of the
              demonstration, we will only work with 1 message block which
              is comprised of 16 ASCII characters <code>(8 bits/character * 16 characters
              = 128 bits)</code>. The same is true for the key.
            </p>
                </div>
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">What makes AES so secure?</h2>
                  </div>
            <p>
              A <a href="https://en.wikipedia.org/wiki/Caesar_cipher" target="_blank">
              Caesar Cipher</a> is a cipher that just shifts letters in the alphabet by
              a fixed number of positions.
              For example, a valid Caesar Cipher would be mapping each letter to the
              next one, so A -> B, B -> C, etc. -- "Hello" would become "Ifmmp" in this
              example. This is known as a <b>substitution cipher</b>. This cipher is
              very weak for a couple of reasons.
              <ol class="lol" style="display: inline-block; text-align: left;" >
                <li>
                  It can be brute forced easily. Since there are only 25 possible
                  values to shift by, we can simply try all of them, taking very little
                  time, and then check each one.
                </li>
                <li>
                  Even without brute forcing, we can use other techniques to help us.
                  In the above example, notice how there were 2 consecutive Ms.
                  There are not that many cases (in English at least) where 2
                  consecutive letters occur, so this can give us a great deal of
                  information while trying to decode the ciphertext. We can use
                  this and other techniques of frequency analysis to crack the Caesar
                  Cipher very easily.
                </li>
              </ol>
              Substitution ciphers by themselves are not very secure. Some get a bit
              more complex, but can still be cracked with not very much effort. AES
              solves this by using a <b>substitution-permutation (SP) network</b>. SP
              networks work by taking the plaintext, substituting blocks of it with
              other predefined blocks, permuting them, that is, shifting them around
              in a "random" fashion, and then adding a round key, which is just a mini
              key that is derived from the original given key.
              We do all of these steps multiple times and we call each set of 1.)
              performing the substitution, 2.) permutation, then 3.) round key addition
              a <b>round</b>. Adding the round key is the most important part of SP
              networks. Without adding the round key,
              someone would just be able to look at the implementation details of the
              cipher and just reverse the substitutions and permutations. However by
              adding the round key, we make it so that neither the plaintext nor the
              key are recoverable. <br> Now, there have been some attacks on AES, but
              they are not dependent on the algorithm itself, rather, its
              implementation. These are known as <b>side channel attacks</b>. For
              example, if not implemented correctly, it is possible to look at the heat
              signatures of CPUs to gain information about the code being executed.
              Most CPUs nowadays have AES instructions baked into their instruction
              sets, making computations incredibly fast, and attacks virtually
              impossible. Keep the contents of this slide in mind when looking at the
              next one which describes a brief summary of the subroutines used in AES.
            </p>
                </div>
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">Summary</h2>
                  </div>
            <p>
              All calculations are applied to the <b>state</b> in AES. At first we
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
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">Preliminaries</h2>
                  </div>
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
                0*x<sup>4</sup> + 0*x<sup>3</sup> + 1*x<sup>2</sup> + 1*x + 0*1</code> =
                <code>x<sup>7</sup> + x<sup>6 </sup> + x<sup>2</sup> + x</code>
              </dd>
              <dt>Addition (<code>&#8853;</code>)</dt>
              <dd>
                You may have seen this symbol before. It is commonly used for the XOR
                (e<u>x</u>clusive <u>or</u>) operator in Boolean logic. In
                GF(2<sup>8</sup>), adding is equivalent to XORing. XORing 2 bits,
                <code>b<sub>1</sub></code> and <code>b<sub>2</sub></code> produces
                <code>1</code> <u>only if either</u> <code>b<sub>1</sub></code>
                &nbsp;<u>or</u> <code>b<sub>2</sub></code> are <code>1</code>.
                Otherwise, the result is <code>0</code>. So,
                <br>
                0 &#8853; 0 = 0
                <br>
                0 &#8853; 1 = 1
                <br>
                1 &#8853; 0 = 1
                <br>
                1 &#8853; 1 = 0
                <br>
                <a href="https://en.wikipedia.org/wiki/Exclusive_or" target="_blank">Click here</a>
                to learn more about the XOR operator.
                <br>
                When we talk about addition for our computations, we are referring to
                bitwise XOR, which means you just XOR the corresponding bits in each
                position of the input bitstrings. For example,
                <br>
                10001011
                <br>
                &#8853;
                <br>
                11101001
                <br>
                -----------
                <br>
                01100010
              </dd>
              <dt>Multiplication (<code>•</code>)</dt>
              <dd>
                Multiplication modulo a polynomial is similar to multiplication in
                &#8484;<code><sub>n</sub></code>. In essence, we can just calculate the
                result in &#8484;,
                and then take the remainder modulo <code>n</code>.
                To calculate
                4*3 in &#8484;<sub><code>5</code></sub> for example, we would get 12,
                then reduce
                that modulo <code>5</code>, which is 2. The numbers 12 and 2 are the
                essentially the same thing in &#8484;<sub>5</sub>, but in
                our case,
                we want the smallest nonnegative remainder (called the <b>least residue
                modulo n</b>). The reason we want this is because if the results of one
                of our
                multiplications ended up having an x<sup>9</sup> term in it, then its
                binary representation would become 9 bits long. However, we would like
                to keep our results within 8 bits so that they can be stored as a
                single byte when being computed.
                The same goes for the
                above Galois Field. If we took 2 polynomials (which we represent as 2
                binary numbers) and multiplied them, we would do normal polynomial
                multiplication, but would then have to do polynomial division (in our
                case, by <code>x<sup>8</sup> + x<sup>4</sup> + x<sup>3</sup> + x + 1
                </code>) to get an element in the field.
              </dd>
            </dl>
                </div>
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">Try it out!:</h2>
                  </div>
            <p>
              Enter your own message and key below!
              We will go over each operation using your message and key to make the
              learning more hands-on.
            </p>


            <form class="needs-validation state-form" novalidate>
              <label for="messageInputBox">Message:</label>
              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <font-awesome-icon :icon="[ 'fas', 'comment-dots' ]"/>
                  </div>
                </div>
                <input type="text"
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

            <div class="text-center state-container">
              <h3>State:</h3>
              <div class="state justify-content-center">
                <div class="state-grid">
                    <div class="cell-00 hbb hrb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][0][0]) }}
                    </div>
                    <div class="cell-01 hbb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][1][0]) }}
                    </div>
                    <div class="cell-02 hbb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][2][0]) }}
                    </div>
                    <div class="cell-03 hbb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][3][0]) }}
                    </div>
                    <div class="cell-10 hbb htb hrb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][0][1]) }}
                    </div>
                    <div class="cell-11 hbb htb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][1][1]) }}
                    </div>
                    <div class="cell-12 hbb htb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][2][1]) }}
                    </div>
                    <div class="cell-13 hbb htb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][3][1]) }}
                    </div>
                    <div class="cell-20 hbb htb hrb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][0][2]) }}
                    </div>
                    <div class="cell-21 hbb htb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][1][2]) }}
                    </div>
                    <div class="cell-22 hbb htb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][2][2]) }}
                    </div>
                    <div class="cell-23 hbb htb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][3][2]) }}
                    </div>
                    <div class="cell-30 htb hrb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][0][3]) }}
                    </div>
                    <div class="cell-31 htb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][1][3]) }}
                    </div>
                    <div class="cell-32 htb hrb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][2][3]) }}
                    </div>
                    <div class="cell-33 htb hlb"
                      :class="vhCenter">
                      {{ toHex(msg.blocks[0][3][3]) }}
                    </div>
                </div>
              </div>
                </div>
                </div>
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">AddRoundKey</h2>
                  </div>
            <p>
              AddRoundKey simply consists of XORing the state matrix with entries in the
              key schedule. The key schedule is not really something that deserves going
              into detail over, as it is just an algorithm that uses some of the concepts
              that were already explained. Below is Python code to generate the entire key
              schedule for all rounds, <code>w</code>.
            </p>
<!-- HTML generated using hilite.me --><div class="code-snippet" style="background: #272822; text-align: left !important;overflow:auto !important;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><table><tr><td><pre style="color: #a1a1a1;margin: 0;margin-right: 5px; line-height: 125%">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #75715e"># Number of columns (32-bit words comprising the state).</span>
<span style="color: #75715e"># N_b = 4 for AES128, AES192, and AES256</span>
<span style="color: #f8f8f2">N_b</span> <span style="color: #f92672">=</span> <span style="color: #ae81ff">4</span>

<span style="color: #75715e"># The following 2 declarations are only true for AES128</span>
<span style="color: #f8f8f2">N_k</span> <span style="color: #f92672">=</span> <span style="color: #ae81ff">4</span>   <span style="color: #75715e"># Number of 32-bit words comprising the key</span>
<span style="color: #f8f8f2">N_r</span> <span style="color: #f92672">=</span> <span style="color: #ae81ff">10</span>  <span style="color: #75715e"># Number of rounds</span>

<span style="color: #f8f8f2">Rcon</span> <span style="color: #f92672">=</span> <span style="color: #f8f8f2">[]</span>
<span style="color: #66d9ef">for</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">in</span> <span style="color: #f8f8f2">range(</span><span style="color: #ae81ff">10</span><span style="color: #f8f8f2">):</span>
<span style="color: #66d9ef">&nbsp;&nbsp;if</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">==</span> <span style="color: #ae81ff">0</span><span style="color: #f8f8f2">:</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;rc</span><span style="color: #f92672">.</span><span style="color: #f8f8f2">append(</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">)</span>
<span style="color: #66d9ef">&nbsp;&nbsp;elif</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">&gt;</span> <span style="color: #ae81ff">0</span> <span style="color: #f92672">and</span> <span style="color: #f8f8f2">rc[i</span><span style="color: #f92672">-</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">]</span> <span style="color: #f92672">&lt;</span> <span style="color: #ae81ff">0x80</span><span style="color: #f8f8f2">:</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;rc</span><span style="color: #f92672">.</span><span style="color: #f8f8f2">append(</span><span style="color: #ae81ff">2</span><span style="color: #f92672">*</span><span style="color: #f8f8f2">rc[i</span><span style="color: #f92672">-</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">])</span>
<span style="color: #66d9ef">&nbsp;&nbsp;elif</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">&gt;</span> <span style="color: #ae81ff">0</span> <span style="color: #f92672">and</span> <span style="color: #f8f8f2">rc[i</span> <span style="color: #f92672">-</span> <span style="color: #ae81ff">1</span><span style="color: #f8f8f2">]</span> <span style="color: #f92672">&gt;=</span> <span style="color: #ae81ff">0x80</span><span style="color: #f8f8f2">:</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;rc</span><span style="color: #f92672">.</span><span style="color: #f8f8f2">append((</span><span style="color: #ae81ff">2</span><span style="color: #f92672">*</span><span style="color: #f8f8f2">rc[i</span><span style="color: #f92672">-</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">])</span> <span style="color: #f92672">^</span> <span style="color: #ae81ff">0x1B</span><span style="color: #f8f8f2">)</span>

<span style="color: #f8f8f2">w</span> <span style="color: #f92672">=</span> <span style="color: #f8f8f2">[]</span>
<span style="color: #66d9ef">for</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">in</span> <span style="color: #f8f8f2">range(</span><span style="color: #ae81ff">4</span><span style="color: #f92672">*</span><span style="color: #f8f8f2">(N_r</span><span style="color: #f92672">+</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">)):</span>
<span style="color: #66d9ef">&nbsp;&nbsp;if</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">&lt;</span> <span style="color: #f8f8f2">N_k:</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;w</span><span style="color: #f92672">.</span><span style="color: #f8f8f2">append(key[</span><span style="color: #ae81ff">4</span><span style="color: #f92672">*</span><span style="color: #f8f8f2">i:</span><span style="color: #ae81ff">4</span><span style="color: #f92672">*</span><span style="color: #f8f8f2">(i</span><span style="color: #f92672">+</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">)])</span>
<span style="color: #66d9ef">&nbsp;&nbsp;elif</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">&gt;=</span> <span style="color: #f8f8f2">N_k</span> <span style="color: #f92672">and</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">%</span> <span style="color: #f8f8f2">N_k</span> <span style="color: #f92672">==</span> <span style="color: #ae81ff">0</span><span style="color: #f8f8f2">:</span>
<span style="color: #75715e">&nbsp;&nbsp;&nbsp;&nbsp;# Circular left shift w[i-1] by 1 position</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;temp_col</span> <span style="color: #f92672">=</span> <span style="color: #f8f8f2">rot_word(w[i</span> <span style="color: #f92672">-</span> <span style="color: #ae81ff">1</span><span style="color: #f8f8f2">],</span> <span style="color: #ae81ff">1</span><span style="color: #f8f8f2">)</span>

<span style="color: #75715e">&nbsp;&nbsp;&nbsp;&nbsp;# Then substitute the bytes</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;temp_col</span> <span style="color: #f92672">=</span> <span style="color: #f8f8f2">[s_box[x]</span> <span style="color: #66d9ef">for</span> <span style="color: #f8f8f2">x</span> <span style="color: #f92672">in</span> <span style="color: #f8f8f2">temp_col]</span>

<span style="color: #75715e">&nbsp;&nbsp;&nbsp;&nbsp;# Then XOR first byte with round constant</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;temp_col[</span><span style="color: #ae81ff">0</span><span style="color: #f8f8f2">]</span> <span style="color: #f92672">=</span> <span style="color: #f8f8f2">temp_col[</span><span style="color: #ae81ff">0</span><span style="color: #f8f8f2">]</span> <span style="color: #f92672">^</span> <span style="color: #f8f8f2">Rcon[(i</span> <span style="color: #f92672">//</span> <span style="color: #f8f8f2">N_k)</span> <span style="color: #f92672">-</span> <span style="color: #ae81ff">1</span><span style="color: #f8f8f2">]</span>

<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;w</span><span style="color: #f92672">.</span><span style="color: #f8f8f2">append(xor_col(w[i</span> <span style="color: #f92672">-</span> <span style="color: #f8f8f2">N_k],</span> <span style="color: #f8f8f2">temp_col)</span>
<span style="color: #66d9ef">&nbsp;&nbsp;elif</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">&gt;=</span> <span style="color: #f8f8f2">N_k</span> <span style="color: #f92672">and</span> <span style="color: #f8f8f2">N_k</span> <span style="color: #f92672">&gt;</span> <span style="color: #ae81ff">6</span> <span style="color: #f92672">and</span> <span style="color: #f8f8f2">i</span> <span style="color: #f92672">%</span> <span style="color: #f8f8f2">N_k</span> <span style="color: #f92672">==</span> <span style="color: #ae81ff">4</span><span style="color: #f8f8f2">:</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;w</span><span style="color: #f92672">.</span><span style="color: #f8f8f2">append(xor_col(w[i</span> <span style="color: #f92672">-</span> <span style="color: #f8f8f2">N_k],</span> <span style="color: #f8f8f2">[s_box[x]</span> <span style="color: #66d9ef">for</span> <span style="color: #f8f8f2">x</span> <span style="color: #f92672">in</span> <span style="color: #f8f8f2">w[i</span><span style="color: #f92672">-</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">]]))</span>
<span style="color: #66d9ef">&nbsp;&nbsp;else</span><span style="color: #f8f8f2">:</span>
<span style="color: #f8f8f2">&nbsp;&nbsp;&nbsp;&nbsp;w</span><span style="color: #f92672">.</span><span style="color: #f8f8f2">append(xor_col(w[i</span> <span style="color: #f92672">-</span> <span style="color: #f8f8f2">N_k],</span> <span style="color: #f8f8f2">w[i</span><span style="color: #f92672">-</span><span style="color: #ae81ff">1</span><span style="color: #f8f8f2">]))</span>

<span style="color: #75715e"># w now contains the key schedule for round i</span>
</pre></td></tr></table></div>

            <p>
              We only need to generate this key schedule once, and can use it throughout
              the rest of the cipher. AddRoundKey simply consists of element-wise XORing
              the state with N_b (which is always 4) consecutive columns of the key schedule,
              shifting by N_b (4) on each successive round. So for round <code>r</code>,
              <code>0 &lt; r &le; N<sub>r</sub></code>, we XOR the state with
              <code>w[r*N_b : (r+1)*N_b]</code>.
            </p>
                </div>
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">SubBytes</h2>
                  </div>
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
                  <img src="assets/aes/subbytes.png" class="img-fluid no-select"
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
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">ShiftRows</h2>
                  </div>
            <p>
              To reiterate the "Summary" slide, ShiftRows is fairly straightforward. For
              <code>0 &lt; i &lt; 4</code>, this step performs a circular left shift
              of row <code>i</code> of the state matrix by <code>i</code> positions.
              Here is a graphic from FIPS 197 to help visualize it:
            </p>
            <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf#page=21"
            target="_blank">
              <img src="assets/aes/shiftrows.png" class="img-fluid no-select"
              alt="shift-rows">
            </a>
                </div>
              </template>
            </vueper-slide>

            <vueper-slide class="aes-slide" style="overflow: auto !important;">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper">
                  <div class="vueperslide__title">
<h2 class="mb-3">MixColumns</h2>
                  </div>
            <p>
              MixColumns operates on the state matrix on a column-by-column basis. It
              treats each column as a polynomial over GF(2<sup>8</sup>), and we multiply
              them <code>modulo x<sup>4</sup>+1</code> by <code>3x<sup>3</sup> +
              x<sup>2</sup> + x + 2</code>. Luckily, this transformation simplifies to
              the something easier to comprehend -- for <code>0 &lt; c &lt; 4</code> we
              perform the following transformation to column<sub>c</sub> of the state:
            </p>
            <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf#page=22"
            target="_blank">
              <img src="assets/aes/mixcolumns.png" class="img-fluid no-select"
              alt="mix-columns">
            </a>
            <p>
              The details as to why the simplification works would be too involved to go
              over here,
              but if you'd like to learn more, please click the image above to navigate
              to the standard. The details are located in <b>Section 4.3</b>.
            </p>
                </div>
              </template>
            </vueper-slide>
          </vueper-slides>
          <!--
            <div class="container-fluid">
              <div id="aesCarousel" class="carousel slide" data-ride="carousel"
                data-interval="false">
                <ol class="carousel-indicators">
                  <li data-target="#aesCarousel" data-slide-to="0" @click="curSlide = 0"
                  class="active"></li>
                  <li data-target="#aesCarousel" data-slide-to="1" @click="curSlide = 1"></li>
                  <li data-target="#aesCarousel" data-slide-to="2" @click="curSlide = 2"></li>
                  <li data-target="#aesCarousel" data-slide-to="3" @click="curSlide = 3"></li>
                  <li data-target="#aesCarousel" data-slide-to="4" @click="curSlide = 4"></li>
                  <li data-target="#aesCarousel" data-slide-to="5" @click="curSlide = 5"></li>
                  <li data-target="#aesCarousel" data-slide-to="6" @click="curSlide = 6"></li>
                  <li data-target="#aesCarousel" data-slide-to="7" @click="curSlide = 7"></li>
                  <li data-target="#aesCarousel" data-slide-to="8" @click="curSlide = 8"></li>
                </ol>
                <div class="carousel-inner">
                  <div id="slide-0" class="carousel-item active">
                    <div class="carousel-caption">
                      <h5>What is AES?</h5>
                      <p>
                        The <u>A</u>dvanced <u>E</u>ncryption <u>S</u>tandard is a block cipher
                        used to encrypt data with a given key. A <b>cipher
                        </b> is just an algorithm used for encrypting or decrypting data. A <b>block
                        cipher</b> is a cipher that splits the plaintext up into <b>blocks</b> of
                        data, and operates on these blocks to turn the plaintext into ciphertext, as
                        opposed to <b>stream ciphers</b>, which encrypt one bit or byte of plaintext
                        at a time to produce the ciphertext.
                        Before AES, the United States was using <b>DES</b>, the Data Encryption
                        Standard, for protecting sensitive government data. When it was developed,
                        DES was adequate for its purpose, but as
                        time went on, weaknesses in DES were being discovered and faster hardware
                        was making attacks even easier. This was sort of jury-rigged by applying DES
                        3 times, spawning an algorithm suitably called Triple DES. Triple DES was
                        better, but a new, more secure encryption standard was definitely needed.
                        In 1997, the U.S. National Institute of Standards and Technology called
                        upon anyone and everyone to submit proposals for the new standard. There
                        were a few heavyweight contenders but <b>Rijndael</b>, created by
                        Belgian cryptographers Vincent Rijmen and Joan Daemen, ended up becoming
                        the victor. The NIST chose a subset of the proposed Rijndael specification
                        to become AES: each block is 128 bits long and keys
                        can have lengths of 128, 192, or 256 bits. We will demonstrate AES128 to
                        get the general idea, but the 192 and 256 bit key versions are very similar.
                        Each ASCII character is 8 bits long, so for the purpose of the
                        demonstration, we will only work with 1 message block which
                        is comprised of 16 ASCII characters <code>(8 bits/character * 16 characters
                        = 128 bits)</code>. The same is true for the key.
                      </p>
                    </div>
                  </div>
                  <div id="slide-1" class="carousel-item">
                    <div class="carousel-caption">
                      <div class="carousel-text">
                        <h3>What makes AES so secure?</h3>
                        <p>
                          A <a href="https://en.wikipedia.org/wiki/Caesar_cipher" target="_blank">
                          Caesar Cipher</a> is a cipher that just shifts letters in the alphabet by
                          a fixed number of positions.
                          For example, a valid Caesar Cipher would be mapping each letter to the
                          next one, so A -> B, B -> C, etc. -- "Hello" would become "Ifmmp" in this
                          example. This is known as a <b>substitution cipher</b>. This cipher is
                          very weak for a couple of reasons.
                          <ol>
                            <li>
                              It can be brute forced easily. Since there are only 25 possible
                              values to shift by, we can simply try all of them, taking very little
                              time, and then check each one.
                            </li>
                            <li>
                              Even without brute forcing, we can use other techniques to help us.
                              In the above example, notice how there were 2 consecutive Ms.
                              There are not that many cases (in English at least) where 2
                              consecutive letters occur, so this can give us a great deal of
                              information while trying to decode the ciphertext. We can use
                              this and other techniques of frequency analysis to crack the Caesar
                              Cipher very easily.
                            </li>
                          </ol>
                          Substitution ciphers by themselves are not very secure. Some get a bit
                          more complex, but can still be cracked with not very much effort. AES
                          solves this by using a <b>substitution-permutation (SP) network</b>. SP
                          networks work by taking the plaintext, substituting blocks of it with
                          other predefined blocks, permuting them, that is, shifting them around
                          in a "random" fashion, and then adding a round key, which is just a mini
                          key that is derived from the original given key.
                          We do all of these steps multiple times and we call each set of 1.)
                          performing the substitution, 2.) permutation, then 3.) round key addition
                          a <b>round</b>. Adding the round key is the most important part of SP
                          networks. Without adding the round key,
                          someone would just be able to look at the implementation details of the
                          cipher and just reverse the substitutions and permutations. However by
                          adding the round key, we make it so that neither the plaintext nor the
                          key are recoverable. <br> Now, there have been some attacks on AES, but
                          they are not dependent on the algorithm itself, rather, its
                          implementation. These are known as <b>side channel attacks</b>. For
                          example, if not implemented correctly, it is possible to look at the heat
                          signatures of CPUs to gain information about the code being executed.
                          Most CPUs nowadays have AES instructions baked into their instruction
                          sets, making computations incredibly fast, and attacks virtually
                          impossible. Keep the contents of this slide in mind when looking at the
                          next one which describes a brief summary of the subroutines used in AES.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="slide-2" class="carousel-item">
                    <div class="carousel-caption">
                      <div class="carousel-text">
                      <h3>Summary</h3>
                        <p>
                          All calculations are applied to the <b>state</b> in AES. At first we
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
                  <div id="slide-3" class="carousel-item">
                    <div class="carousel-caption">
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
                            0*x<sup>4</sup> + 0*x<sup>3</sup> + 1*x<sup>2</sup> + 1*x + 0*1</code> =
                            <code>x<sup>7</sup> + x<sup>6 </sup> + x<sup>2</sup> + x</code>
                          </dd>
                          <dt>Addition (<code>&#8853;</code>)</dt>
                          <dd>
                            You may have seen this symbol before. It is commonly used for the XOR
                            (e<u>x</u>clusive <u>or</u>) operator in Boolean logic. In
                            GF(2<sup>8</sup>), adding is equivalent to XORing. XORing 2 bits,
                            <code>b<sub>1</sub></code> and <code>b<sub>2</sub></code> produces
                            <code>1</code> <u>only if either</u> <code>b<sub>1</sub></code>
                            &nbsp;<u>or</u> <code>b<sub>2</sub></code> are <code>1</code>.
                            Otherwise, the result is <code>0</code>. So,
                            <br>
                            0 &#8853; 0 = 0
                            <br>
                            0 &#8853; 1 = 1
                            <br>
                            1 &#8853; 0 = 1
                            <br>
                            1 &#8853; 1 = 0
                            <br>
                            <a href="https://en.wikipedia.org/wiki/Exclusive_or" target="_blank">Click here</a>
                            to learn more about the XOR operator.
                            <br>
                            When we talk about addition for our computations, we are referring to
                            bitwise XOR, which means you just XOR the corresponding bits in each
                            position of the input bitstrings. For example,
                            <br>
                            10001011
                            <br>
                            &#8853;
                            <br>
                            11101001
                            <br>
                            -----------
                            <br>
                            01100010
                          </dd>
                          <dt>Multiplication (<code>•</code>)</dt>
                          <dd>
                            Multiplication modulo a polynomial is similar to multiplication in
                            &#8484;<code><sub>n</sub></code>. In essence, we can just calculate the
                            result in &#8484;,
                            and then take the remainder modulo <code>n</code>.
                            To calculate
                            4*3 in &#8484;<sub><code>5</code></sub> for example, we would get 12,
                            then reduce
                            that modulo <code>5</code>, which is 2. The numbers 12 and 2 are the
                            essentially the same thing in &#8484;<sub>5</sub>, but in
                            our case,
                            we want the smallest nonnegative remainder (called the <b>least residue
                            modulo n</b>). The reason we want this is because if the results of one
                            of our
                            multiplications ended up having an x<sup>9</sup> term in it, then its
                            binary representation would become 9 bits long. However, we would like
                            to keep our results within 8 bits so that they can be stored as a
                            single byte when being computed.
                            The same goes for the
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
                  <div id="slide-4" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>Try it out!</h3>
                      <p class="carousel-text">
                        Enter your own message and key below!
                        We will go over each operation using your message and key to make the
                        learning more hands-on.
                      </p>


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

                      <div class="text-center">
                        <h3>State:</h3>
                        <div class="state justify-content-center">
                          <div class="state-grid">
                              <div class="cell-00 hbb hrb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][0][0]) }}
                              </div>
                              <div class="cell-01 hbb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][1][0]) }}
                              </div>
                              <div class="cell-02 hbb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][2][0]) }}
                              </div>
                              <div class="cell-03 hbb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][3][0]) }}
                              </div>
                              <div class="cell-10 hbb htb hrb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][0][1]) }}
                              </div>
                              <div class="cell-11 hbb htb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][1][1]) }}
                              </div>
                              <div class="cell-12 hbb htb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][2][1]) }}
                              </div>
                              <div class="cell-13 hbb htb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][3][1]) }}
                              </div>
                              <div class="cell-20 hbb htb hrb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][0][2]) }}
                              </div>
                              <div class="cell-21 hbb htb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][1][2]) }}
                              </div>
                              <div class="cell-22 hbb htb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][2][2]) }}
                              </div>
                              <div class="cell-23 hbb htb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][3][2]) }}
                              </div>
                              <div class="cell-30 htb hrb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][0][3]) }}
                              </div>
                              <div class="cell-31 htb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][1][3]) }}
                              </div>
                              <div class="cell-32 htb hrb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][2][3]) }}
                              </div>
                              <div class="cell-33 htb hlb"
                               :class="vhCenter">
                                {{ toHex(msg.blocks[0][3][3]) }}
                              </div>
                          </div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div id="slide-5" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>AddRoundKey</h3>
                      <div>
                        AddRoundKey simply consists of XORing the state matrix with entries in the
                        key schedule. The key schedule is not really something that deserves going
                        into detail over, as it is just an algorithm that uses some of the concepts
                        that were already explained. Below is Python code to generate the key
                        schedule, <code>w</code>:
<div style="background: #000000; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em; text-align: left !important;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #cccccc">N_b</span> <span style="color: #3399cc">=</span> <span style="color: #cd00cd">4</span> <span style="color: #808080"># Number of columns (32-bit words comprising the state).</span>
<span style="color: #808080"># N_b = 4 for AES128, AES192, and AES256</span>

<span style="color: #808080"># The following 2 declarations are only true for AES128</span>
<span style="color: #cccccc">N_k</span> <span style="color: #3399cc">=</span> <span style="color: #cd00cd">4</span>   <span style="color: #808080"># Number of 32-bit words comprising the key</span>
<span style="color: #cccccc">N_r</span> <span style="color: #3399cc">=</span> <span style="color: #cd00cd">10</span>  <span style="color: #808080"># Number of rounds</span>

<span style="color: #cccccc">Rcon</span> <span style="color: #3399cc">=</span> <span style="color: #cccccc">[]</span>
<span style="color: #cdcd00">for</span> <span style="color: #cccccc">i</span> <span style="color: #cdcd00">in</span> <span style="color: #cd00cd">range</span><span style="color: #cccccc">(</span><span style="color: #cd00cd">10</span><span style="color: #cccccc">):</span>
    <span style="color: #cdcd00">if</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">==</span> <span style="color: #cd00cd">0</span><span style="color: #cccccc">:</span>
        <span style="color: #cccccc">rc</span><span style="color: #3399cc">.</span><span style="color: #cccccc">append(</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">)</span>
    <span style="color: #cdcd00">elif</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">&gt;</span> <span style="color: #cd00cd">0</span> <span style="color: #cdcd00">and</span> <span style="color: #cccccc">rc[i</span><span style="color: #3399cc">-</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">]</span> <span style="color: #3399cc">&lt;</span> <span style="color: #cd00cd">0x80</span><span style="color: #cccccc">:</span>
        <span style="color: #cccccc">rc</span><span style="color: #3399cc">.</span><span style="color: #cccccc">append(</span><span style="color: #cd00cd">2</span><span style="color: #3399cc">*</span><span style="color: #cccccc">rc[i</span><span style="color: #3399cc">-</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">])</span>
    <span style="color: #cdcd00">elif</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">&gt;</span> <span style="color: #cd00cd">0</span> <span style="color: #cdcd00">and</span> <span style="color: #cccccc">rc[i</span> <span style="color: #3399cc">-</span> <span style="color: #cd00cd">1</span><span style="color: #cccccc">]</span> <span style="color: #3399cc">&gt;=</span> <span style="color: #cd00cd">0x80</span><span style="color: #cccccc">:</span>
        <span style="color: #cccccc">rc</span><span style="color: #3399cc">.</span><span style="color: #cccccc">append((</span><span style="color: #cd00cd">2</span><span style="color: #3399cc">*</span><span style="color: #cccccc">rc[i</span><span style="color: #3399cc">-</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">])</span> <span style="color: #3399cc">^</span> <span style="color: #cd00cd">0x1B</span><span style="color: #cccccc">)</span>

<span style="color: #cccccc">w</span> <span style="color: #3399cc">=</span> <span style="color: #cccccc">[]</span>
<span style="color: #cdcd00">for</span> <span style="color: #cccccc">i</span> <span style="color: #cdcd00">in</span> <span style="color: #cd00cd">range</span><span style="color: #cccccc">(</span><span style="color: #cd00cd">4</span><span style="color: #3399cc">*</span><span style="color: #cccccc">(N_r</span><span style="color: #3399cc">+</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">)):</span>
    <span style="color: #cdcd00">if</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">&lt;</span> <span style="color: #cccccc">N_k:</span>
        <span style="color: #cccccc">w</span><span style="color: #3399cc">.</span><span style="color: #cccccc">append(key[</span><span style="color: #cd00cd">4</span><span style="color: #3399cc">*</span><span style="color: #cccccc">i:</span><span style="color: #cd00cd">4</span><span style="color: #3399cc">*</span><span style="color: #cccccc">(i</span><span style="color: #3399cc">+</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">)])</span>
    <span style="color: #cdcd00">elif</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">&gt;=</span> <span style="color: #cccccc">N_k</span> <span style="color: #cdcd00">and</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">%</span> <span style="color: #cccccc">N_k</span> <span style="color: #3399cc">==</span> <span style="color: #cd00cd">0</span><span style="color: #cccccc">:</span>
        <span style="color: #cccccc">temp_col</span> <span style="color: #3399cc">=</span> <span style="color: #cccccc">rot_word(w[i</span> <span style="color: #3399cc">-</span> <span style="color: #cd00cd">1</span><span style="color: #cccccc">],</span> <span style="color: #cd00cd">1</span><span style="color: #cccccc">)</span> <span style="color: #808080"># Circular left shift w[i-1] by 1 position</span>
        <span style="color: #cccccc">temp_col</span> <span style="color: #3399cc">=</span> <span style="color: #cccccc">[s_box[x]</span> <span style="color: #cdcd00">for</span> <span style="color: #cccccc">x</span> <span style="color: #cdcd00">in</span> <span style="color: #cccccc">temp_col]</span> <span style="color: #808080"># Then substitute the bytes</span>
        <span style="color: #cccccc">temp_col[</span><span style="color: #cd00cd">0</span><span style="color: #cccccc">]</span> <span style="color: #3399cc">=</span> <span style="color: #cccccc">temp_col[</span><span style="color: #cd00cd">0</span><span style="color: #cccccc">]</span> <span style="color: #3399cc">^</span> <span style="color: #cccccc">Rcon[(i</span> <span style="color: #3399cc">//</span> <span style="color: #cccccc">N_k)</span> <span style="color: #3399cc">-</span> <span style="color: #cd00cd">1</span><span style="color: #cccccc">]</span> <span style="color: #808080"># Then XOR first byte with round constant</span>

        <span style="color: #cccccc">w</span><span style="color: #3399cc">.</span><span style="color: #cccccc">append(xor_col(w[i</span> <span style="color: #3399cc">-</span> <span style="color: #cccccc">N_k],</span> <span style="color: #cccccc">temp_col)</span>
    <span style="color: #cdcd00">elif</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">&gt;=</span> <span style="color: #cccccc">N_k</span> <span style="color: #cdcd00">and</span> <span style="color: #cccccc">N_k</span> <span style="color: #3399cc">&gt;</span> <span style="color: #cd00cd">6</span> <span style="color: #cdcd00">and</span> <span style="color: #cccccc">i</span> <span style="color: #3399cc">%</span> <span style="color: #cccccc">N_k</span> <span style="color: #3399cc">==</span> <span style="color: #cd00cd">4</span><span style="color: #cccccc">:</span>
        <span style="color: #cccccc">w</span><span style="color: #3399cc">.</span><span style="color: #cccccc">append(xor_col(w[i</span> <span style="color: #3399cc">-</span> <span style="color: #cccccc">N_k],</span> <span style="color: #cccccc">[s_box[x]</span> <span style="color: #cdcd00">for</span> <span style="color: #cccccc">x</span> <span style="color: #cdcd00">in</span> <span style="color: #cccccc">w[i</span><span style="color: #3399cc">-</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">]]))</span>
    <span style="color: #cdcd00">else</span><span style="color: #cccccc">:</span>
        <span style="color: #cccccc">w</span><span style="color: #3399cc">.</span><span style="color: #cccccc">append(xor_col(w[i</span> <span style="color: #3399cc">-</span> <span style="color: #cccccc">N_k],</span> <span style="color: #cccccc">w[i</span><span style="color: #3399cc">-</span><span style="color: #cd00cd">1</span><span style="color: #cccccc">]))</span>

<span style="color: #cdcd00">return</span> <span style="color: #cccccc">w</span>
</pre></td></tr></table></div>


                        We only need to generate this key schedule once, and can use it throughout
                        the rest of the cipher. AddRoundKey simply consists of element-wise XORing
                        the state with 4 consecutive columns of the key schedule, shifting by 4
                        on each successive round. So for round <code>r</code>, <code>0 &lt; r &le;
                        N<sub>r</sub></code>, we XOR the state with <code>w[r*N_b,
                        (r+1)*N_b-1]</code>.
                      </div>
                    </div>
                  </div>
                  <div id="slide-6" class="carousel-item">
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
                  <div id="slide-7" class="carousel-item">
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
                  <div id="slide-8" class="carousel-item">
                    <div class="carousel-caption">
                      <h3>MixColumns</h3>
                      <p>
                        MixColumns operates on the state matrix on a column-by-column basis. It
                        treats each column as a polynomial over GF(2<sup>8</sup>), and we multiply
                        them <code>modulo x<sup>4</sup>+1</code> by <code>3x<sup>3</sup> +
                        x<sup>2</sup> + x + 2</code>. Luckily, this transformation simplifies to
                        the something easier to comprehend -- for <code>0 &lt; c &lt; 4</code> we
                        perform the following transformation to column<sub>c</sub> of the state:
                      </p>
                      <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf#page=22"
                      target="_blank">
                        <img src="assets/aes/mixcolumns.png" class="img-fluid fit-carousel-img"
                        alt="mix-columns">
                      </a>
                      <p>
                        The details as to why the simplification works would be too involved to go
                        over here,
                        but if you'd like to learn more, please click the image above to navigate
                        to the standard. The details are located in <b>Section 4.3</b>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            -->
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
  </header-page>
</template>

<script lang="ts">
import Vue from 'vue';

// @ts-ignore
import { VueperSlides, VueperSlide } from 'vueperslides';

import AES from './AES';

import HeaderPage from '../../HeaderPage/HeaderPage.vue';

const slideNumRegex = new RegExp('^slide-([0-9]+)$');
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

const origKey = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];

export default Vue.extend({
  name: 'AES',
  components: {
    HeaderPage,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      title: 'AES',
      aesInstance: new AES(128),
      msg: {
        text: '',
        isInvalid: false,
        blocks: [origMsg],
      },
      key: {
        text: '',
        isInvalid: false,
        intArr: origKey,
      },
      vhCenter: {
        'vertical-center': true,
        'justify-content-center': true,
      },
    };
  },
  mounted() {
    // console.log(this.aesInstance.encrypt(this.msg.blocks, this.key.intArr));
  },
  methods: {
    onMsgChange(): void {
      this.msg.isInvalid = !(this.isASCII(this.msg.text) && this.isInputLengthValid(this.msg.text));

      if (this.msg.isInvalid || !this.msg.text) {
        this.populateState(0, origMsg);

        // TODO: reset the key to the original value too
      } else {
        this.populateState(0, this.textToMatrix(this.msg.text));
        // console.log(this.aesInstance.encrypt(this.msg.blocks, this.key.intArr));
      }
    },
    onKeyChange(): void {
      this.key.isInvalid = !(this.isASCII(this.key.text) && this.key.text.length === 16);

      if (this.key.isInvalid || !this.key.text) {
        this.populateState(0, origMsg);

        this.key.intArr = origKey;
      } else {
        this.populateState(0, this.textToMatrix(this.msg.text));

        this.key.intArr = this.strToIntArr(this.key.text);
        // console.log(this.aesInstance.encrypt(this.msg.blocks, this.key.intArr));
      }
    },
    toHex(n: number): string {
      return n.toString(16).toUpperCase();
    },
    isASCII(str: string): boolean {
      return /^[\x20-\x7E]*$/.test(str);
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

      for (let i = 0; i < 16 - txt.length; i += 1) {
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

      if (arr.length === matrixRowLen * matrixRowLen) {
        const matrix: number[][] = [];
        for (let i = 0; i < arr.length / matrixRowLen; i += 1) {
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
<style scoped src="./Aes.scss" lang="scss"></style>
