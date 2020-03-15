<template>
  <div class="home-container">
    <div id="about" class="card text-white border-light bg-dark mb-3 d-none">
      <div class="card-body">
        <blockquote class="card-text lead blockquote text-center">
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
    const about = document.getElementById('about');

    setTimeout(() => {
      logo!.remove();
      about!.classList.remove('d-none');
      about!.classList.add('about-anim');
    }, (this as any).fadeInDelay * 1000 + 50); //  5s * 1000ms/s + 50 ms to be safe
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Home.scss" lang="scss"></style>
