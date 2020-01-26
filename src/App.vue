<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script >
import Nav from '@/components/Nav/Nav.vue';

export default {
  name: 'app',
  components: {
    Nav,
  },
};
</script>

<style src="./App.scss" lang="scss">
</style>
