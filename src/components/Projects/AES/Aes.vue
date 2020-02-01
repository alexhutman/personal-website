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
          <div class="explanation col-md-6 text-center">
              Explanation
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
