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
          <div class="explanation col-md-4 text-center" style="border: 1px solid red">
              Explanation
          </div>

          <div class="interactive col-md-8 text-center" style="border: 1px solid red">
            Canvas
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Gaussian',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Gaussian.scss" lang="scss">
</style>
