<template>
  <div class="fill-page resume-container container-fluid">
    <div class="row text-center">
      <div class="col-lg-12 embed-responsive">
        <iframe class="embed-responsive-item" id="resume" :src="getResumeUrl(true)"></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Resume',
  data() {
    return {
      resumeURL:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    };
  },
  methods: {
    getResumeUrl(googleEmbed: boolean): string {
      return googleEmbed
        ? `http://docs.google.com/gview?url=${this.$data.resumeURL}&embedded=true`
        : this.$data.resumeURL;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Resume.scss" lang="scss">
</style>
