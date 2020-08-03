<template>
  <header-page :page-title="title">
    <div class="projects-container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="card text-white mb-5">
              <img class="card-img-top" src="assets/img/aes.png" />
              <hr />
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
            <div class="card text-white mb-5">
              <img
                class="card-img-top"
                src="assets/gaussian/gaussian-main.png"
              />
              <hr />
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
  </header-page>
</template>

<script lang="ts">
import HeaderPage from '../HeaderPage/HeaderPage.vue';

export default {
  name: 'Projects',
  data() {
    return {
      title: 'Projects',
    };
  },
  components: {
    HeaderPage,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Projects.scss" lang="scss"></style>
