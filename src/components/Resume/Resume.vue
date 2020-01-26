<template>
  <div class="fill-page resume-container container-fluid">
    <div class="row text-center">
      <div class="col-lg-12 embed-responsive">
        <iframe
          class="embed-responsive-item"
          id="resume"
          src="http://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Resume',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Resume.scss" lang="scss">
</style>
