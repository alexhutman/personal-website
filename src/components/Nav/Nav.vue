<template>
  <div class="navContainer">
    <nav id="nav" class="navbar navbar-expand-md navbar-dark bg-dark sticky-top py-3">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <div @click="collapseHamburger()">
            <span class="logo alex">alex</span>
            <span class="logo">hutman</span>
          </div>
        </router-link>
        <button
          :class="hamburgerClasses"
          @click="toggleHamburgerActive()"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"
                v-for="(link, index) in links"
                :key="index"
                @click="toggleHamburgerActive()">
              <router-link
                :data-toggle="isMobile() ? 'collapse' : null"
                :data-target="isMobile() ? '#navbarResponsive' : null"
                class="nav-link"
                :class="{'active': isCurPageActive(link.name)}"
                :to="{path: link.link}"
              >{{ link.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import $ from 'jquery';

export default Vue.extend({
  name: 'NavBar',
  data() {
    return {
      hamburgerClasses: {
        'navbar-toggler': true,
        'active-hamburger': false,
      },
      links: [
        // Ensure that the 'name' property for each link is identical to that of the corresponding
        // entry in router/index.ts (casing can be different here though)
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
        {
          name: 'Contact',
          link: '/contact',
        },
      ],
    };
  },
  methods: {
    isCurPageActive(pageName: string): boolean {
      return this.$route.name === pageName.toLowerCase();
    },
    toggleHamburgerActive(): void {
      this.hamburgerClasses['active-hamburger'] = !this.hamburgerClasses['active-hamburger'];
    },
    collapseHamburger(): void {
      $('.navbar-collapse').collapse('hide');
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Nav.scss" lang="scss">
</style>
