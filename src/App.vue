<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script >
import Vue from 'vue';
import Nav from '@/components/Nav/Nav.vue';

export default {
  name: 'app',
  components: {
    Nav,
  },
};

Vue.mixin({
  methods: {
    isMobile: () => window.innerWidth < 768,
  },
});
</script>

<style src="./App.scss" lang="scss">
</style>
