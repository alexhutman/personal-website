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
                        <div class="cell-00">00</div>
                        <div class="cell-01">01</div>
                        <div class="cell-02">02</div>
                        <div class="cell-03">03</div>
                        <div class="cell-10">10</div>
                        <div class="cell-11">11</div>
                        <div class="cell-12">12</div>
                        <div class="cell-13">13</div>
                        <div class="cell-20">20</div>
                        <div class="cell-21">21</div>
                        <div class="cell-22">22</div>
                        <div class="cell-23">23</div>
                        <div class="cell-30">30</div>
                        <div class="cell-31">31</div>
                        <div class="cell-32">32</div>
                        <div class="cell-33">33</div>
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
