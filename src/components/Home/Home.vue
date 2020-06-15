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

    <div id="about-page" class="about-container mt-5 d-none no-select">
      <div class="row text-center mx-0">
        <div class="col-12">
          <h1 class="display-4">About Me</h1>
          <hr class="my-3" />
        </div>
      </div>

      <div class="text-container d-flex flex-column justify-content-center">
        <div class="p-2">
          <p class="about-text text-center m-0">
          I have been interested in technology since I was very young, but I was originally a
          mechanical engineering major when I entered college. I had a change of heart and graduated
          from Quinnipiac University in 2019 with a B.S. in computer science and a B.A. in
          mathematics. I am currently a software engineer at Cigna in the Data and Analytics group.
            <br>
            <br>
          My favorite
          programming language is Python and I am trying to learn more about functional programming
          because it goes hand-in-hand with math very well.

          In my spare time, I enjoy learning about topics in math and computer science, working out,
          using the Oxford comma, and playing video games.

          <br>
          I also enjoy teaching others whenever I learn something. Below is my first and only
          YouTube
          tutorial, but I hope to do more whenever I get time and find a suitable subject.

          </p>
        </div>

        <div class="p-2">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/wGan6T3b91I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

      </div>

    </div>

  </div>
</template>

<script lang="ts">
export default {
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
    const homePage = document.getElementById('about-page');

    const logoDelayMs = (this as any).logoFadeInDuration * 1000 + 50;
    const homePageDelayMs = (this as any).quoteFadeInDuration * 1000 + 50;

    setTimeout(() => {
      logo!.remove();
      quote!.classList.remove('d-none');
      quote!.classList.add('quote-anim');

      setTimeout(() => {
        quote!.remove();
        homeCont!.classList.remove('center-contents');
        homePage!.classList.remove('d-none');
        homePage!.classList.add('home-page-anim');
      }, homePageDelayMs); //  5s * 1000ms/s + 50 ms to be safe
    }, logoDelayMs); //  5s * 1000ms/s + 50 ms to be safe
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Home.scss" lang="scss"></style>
