<template>
  <div class="page-container">

    <div class="content-container mt-4 no-select mx-auto">
      <div class="row text-center mx-0">
        <div class="col-12">
          <h1 class="display-4">{{ pageTitle }}</h1>
          <hr class="my-3" />
        </div>
      </div>

      <div class="text-container row justify-content-center">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'About',
  props: ['pageTitle'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./HeaderPage.scss" lang="scss"></style>
