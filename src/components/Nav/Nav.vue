<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Hef</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-for="(link, index) in links" :key="index">
            <router-link class="nav-link" :to="{path: link.link}">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
