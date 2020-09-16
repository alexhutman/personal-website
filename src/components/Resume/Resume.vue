<template>
  <div class="resume-container">
    <div class="mobile-warning col-12 text-center">
      If the links aren't clickable, please click
      <a href="alex_hutman_resume_sept_16_2020.pdf" target="_blank">here</a>
      to open my resume in a new tab and they will be clickable.
    </div>

    <div class="container">
      <div class="embed-responsive pdf-aspect">
        <object class="embed-responsive-item"
        data="alex_hutman_resume_sept_16_2020.pdf"
        type="application/pdf">
          <p>
            Your browser doesn't support embedded PDF files. You can download the file
            <a href="alex_hutman_resume_sept_16_2020.pdf">here</a>.
          </p>
        </object>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Resume',
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Resume.scss" lang="scss"></style>
