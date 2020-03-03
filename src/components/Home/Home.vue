<template>
  <div class="home-container">
    <div class="logo d-flex flex-row justify-content-center no-select">
      <div class="logo-container no-select">
        <svg class="logo-cover no-select">
          <rect/>
        </svg>

        <div class="logo alex no-select">
          alex
        </div>

        <div class="logo hutman no-select">
          hutman
        </div>
      </div>
    </div>

    <div class="links d-flex flex-row justify-content-center">
      <a href="https://github.com/alexhutman/" target="_blank" rel="noopener" class="company-logo-caption">
        alexhutman
        <font-awesome-icon :icon="['fab', 'github-square']" class="fa-3x company-logo" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Home.scss" lang="scss"></style>
