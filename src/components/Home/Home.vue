<template>
  <div class="home-container">
    <div id="logo" class="logo-container d-flex flex-row justify-content-center no-select">
        <div class="logo alex no-select">
          alex
        </div>

        <div class="logo hutman no-select">
          hutman
        </div>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
  data() {
    return {
      fadeInDelay: 5, // in seconds
    };
  },
  mounted() {
    const logo = document.getElementById('logo');

    setTimeout(() => {
      logo!.remove();
    }, (this as any).fadeInDelay * 1000 + 50); //  5s * 1000ms/s + 50 ms to be safe
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Home.scss" lang="scss"></style>
