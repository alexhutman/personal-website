<template>
  <div class="about-container">

    <div id="about-page" class="about-container mt-5 no-select">
      <div class="row text-center mx-0">
        <div class="col-12">
          <h1 class="display-4">About Me</h1>
          <hr class="my-3" />
        </div>
      </div>

      <div class="text-container row justify-content-center mx-auto">
        <div class="p-2">
          <p class="about-text text-center">
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

        <div class="p-2 embed-responsive embed-responsive-16by9" style="width: 30vmax">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/wGan6T3b91I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'About',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./About.scss" lang="scss"></style>
