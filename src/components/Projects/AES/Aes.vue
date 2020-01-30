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
                    State
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
