<template>
  <ul class="nav">
    <div class="nav-links">
      <router-link
        class="nav-item"
        v-for="(link, index) in links"
        :key="index"
        :to="{path: link.link}"
      >{{ link.name }}</router-link>
    </div>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'NavBar',
  data() {
    return {
      links: [
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'About',
          link: '/about',
        },
        {
          name: 'Projects',
          link: '/projects',
        },
        {
          name: 'Resume',
          link: '/resume',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Nav.scss" lang="scss">
</style>
