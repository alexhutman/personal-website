<template>
  <div class="projects-container">
    <div class="container-fluid">
      <div class="row welcome text-center">
        <div class="col-12">
          <h1 class="display-4">Projects</h1>
          <hr />
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <img class="card-img-top" src="assets/img/aes.png" />
            <div class="card-body">
              <h4 class="card-title">AES</h4>
              <p class="card-text">This is the description for AES xd</p>
              <button class="btn btn-outline-secondary">
                <router-link to="/projects/aes">See Project</router-link>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <img
              class="card-img-top"
              src="assets/gaussian/gaussian-main.png"
            />
            <div class="card-body">
              <h4 class="card-title">Gaussian</h4>
              <p class="card-text">This is the description for Gaussian xd</p>
              <button class="btn btn-outline-secondary">
                <router-link to="/projects/gaussian">See Project</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Projects',
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Projects.scss" lang="scss"></style>
