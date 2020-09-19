<template>
  <div class="resume-container">
    <div class="alert alert-warning text-center" role="alert">
      If the links aren't clickable, please click
      <a class="alert-link" :href="resumeURL" target="_blank">here</a>
      to open my resume in a new tab and they will be clickable.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="container">
      <div class="embed-responsive pdf-aspect">
        <object class="embed-responsive-item"
        :data="resumeURL"
        type="application/pdf">
          <p>
            Your browser doesn't support embedded PDF files. You can download the file
            <a :href="resumeURL">here</a>.
          </p>
        </object>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Resume',
  data() {
    return {
      resumeURL: 'alex_hutman_resume_sept_17_2020.pdf',
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Resume.scss" lang="scss"></style>
