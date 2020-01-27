<template>
  <div class="fill-page resume-container ">
    <div class="row text-center">
      <div class="col-lg-12 ">
        <iframe id="resume-iframe" src="https://drive.google.com/file/d/1YBn7QiqXOyNBb2_EsCy5d4JeEIJ-d7Po/preview#view=FitBV" width="100%" height="100%"></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/*eslint-disable*/
import Vue from 'vue';

// window.addEventListener('load', (event) => {
//   const theURL = '';
//   window.open(theURL, 'resumeee');
// });

export default Vue.extend({
  name: 'Resume',
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Resume.scss" lang="scss"></style>
