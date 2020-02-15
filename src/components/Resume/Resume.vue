<template>
  <div class="resume-container">
    <iframe
      @load="onResumeLoad"
      v-show="iframeLoaded"
      id="resume-iframe"
      type="application/pdf"
      src="./assets/resume/jeff.pdf#view=FitV&toolbar=0"
      scale="tofit"
    >
    </iframe>
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
  data() {
    return {
      iframeLoaded: false,
    };
  },
  methods: {
    onResumeLoad: function() {
      this.iframeLoaded = true;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Resume.scss" lang="scss"></style>
