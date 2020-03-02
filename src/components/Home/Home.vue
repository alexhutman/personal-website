<template>
  <div class="home-container">
    <div class="logo d-flex flex-row justify-content-center">
      <div class="logo-container">
        <svg class="logo-cover">
          <rect/>
        </svg>

        <div class="logo alex">
          alex
        </div>

        <div class="logo hutman">
          hutman
        </div>
      </div>
    </div>

    <div class="links d-flex flex-row justify-content-center">
      <font-awesome-icon :icon="['fab', 'github-square']" class="fa-3x" />
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
