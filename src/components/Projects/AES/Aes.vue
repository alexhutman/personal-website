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
              <div class="input">
                  <div class="row message text-center">
                    <div class="col text-center">
                        Msg
                    </div>
                  </div>

                  <div class="row key">
                    <div class="col text-center">
                        Key
                    </div>
                  </div>
              </div>

              <div class="row state">
                <div class="col text-center">
                    <div class="state-grid">
                        <div class="cell-00 hbb hrb">00</div>
                        <div class="cell-01 hbb hrb hlb">01</div>
                        <div class="cell-02 hbb hrb hlb">02</div>
                        <div class="cell-03 hbb hlb">03</div>
                        <div class="cell-10 htb hbb hrb">10</div>
                        <div class="cell-11 htb hbb hrb hlb">11</div>
                        <div class="cell-12 htb hbb hrb hlb">12</div>
                        <div class="cell-13 htb hbb hlb">13</div>
                        <div class="cell-20 htb hbb hrb">20</div>
                        <div class="cell-21 htb hbb hrb hlb">21</div>
                        <div class="cell-22 htb hbb hrb hlb">22</div>
                        <div class="cell-23 htb hbb hlb">23</div>
                        <div class="cell-30 htb hrb">30</div>
                        <div class="cell-31 htb hrb hlb">31</div>
                        <div class="cell-32 htb hrb hlb">32</div>
                        <div class="cell-33 htb hlb">33</div>
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
export default {
  name: 'AES',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Aes.scss" lang="scss">
</style>
