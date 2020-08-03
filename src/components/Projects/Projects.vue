<template>
  <header-page :page-title="title">
    <div class="projects-container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="card text-white mb-5">
              <!--
                This image was taken from
                https://crypto.stackexchange.com/questions/2711/does-the-mixcolumns-step-come-before-or-after-addroundkey-in-aes-decryption
              -->
              <img class="card-img-top" src="assets/img/aes.png" />
              <hr />
              <div class="card-body">
                <h4 class="card-title">AES</h4>
                <hr class="mb-1"/>
                <p class="card-text">
                  Every time you go on a website with the little green padlock in the corner, it is
                  likely that your browser is using AES to secure your data. This interactive
                  project will teach you how each of the steps of AES works, as well as some of the
                  intuition behind the intermediary steps. As much math is explained as possible,
                  but links with further information are also provided.
                  </p>
                <button class="btn btn-outline-secondary">
                  <router-link to="/projects/aes">See Project</router-link>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card text-white mb-5">
              <!--
                This image was taken from https://learnopengl.com/Advanced-Lighting/Bloom
                and modified to fit better on this page
              -->
              <img
                class="card-img-top"
                src="assets/gaussian/gaussian-main.png"
              />
              <hr />
              <div class="card-body">
                <h4 class="card-title">Gaussian</h4>
                <hr class="mb-1"/>
                <p class="card-text">
                  Have you ever wondered exactly how programs like Photoshop blur your images?
                  This interactive project explains how Gaussian blurs are performed, and allows
                  users to submit their own images to perform the blur on. There is
                  not as much math required as in AES, so this is a great project to show students
                  in order to demonstrate a real-world application of mathematics.
                  </p>
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
