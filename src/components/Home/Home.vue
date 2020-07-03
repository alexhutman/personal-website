<template>
  <div id="home-container" class="background center-contents">
    <div id="logo" class="logo-container d-flex flex-row justify-content-center no-select">
        <div class="logo alex no-select">
          alex
        </div>

        <div class="logo hutman no-select">
          hutman
        </div>
    </div>

    <div id="quote" class="d-none mx-2 no-select">
      <blockquote class="lead text-white blockquote text-center">
        <p class="mb-0">
          There exists in the world a single path along which no one can go except you:
          whither does it lead? Do not ask, go along it.
        </p>
        <footer class="blockquote-footer">
          F. Nietzsche
        </footer>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      logoFadeInDuration: 5, // in seconds
      quoteFadeInDuration: 6, // in seconds
    };
  },
  mounted() {
    const homeCont = document.getElementById('home-container');
    const logo = document.getElementById('logo');
    const quote = document.getElementById('quote');

    const logoDelayMs = (this as any).logoFadeInDuration * 1000 + 50;
    const aboutPageDelayMs = (this as any).quoteFadeInDuration * 1000 + 50;

    setTimeout(() => {
      logo!.remove();
      quote!.classList.remove('d-none');
      quote!.classList.add('quote-anim');

      setTimeout(() => {
        this.$router.push({ name: 'about' });
      }, aboutPageDelayMs); //  5s * 1000ms/s + 50 ms to be safe
    }, logoDelayMs); //  5s * 1000ms/s + 50 ms to be safe
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Home.scss" lang="scss"></style>
