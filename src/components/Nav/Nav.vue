<template>
  <ul class="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/resume">Resume</router-link>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Nav.scss" lang="scss">
</style>
