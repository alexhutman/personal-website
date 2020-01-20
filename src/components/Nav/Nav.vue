<template>
  <div class="nav">
    <router-link
      class="btn btn-lg btn-outline-dark"
      v-for="(link, index) in links"
      :key="index"
      :to="{path: link.link}"
      tag="button"
      active-class="active"
      exact
    >{{ link.name }}</router-link>
  </div>
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

  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Nav.scss" lang="scss">
</style>
