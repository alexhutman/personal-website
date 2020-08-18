<template>
  <header-page :page-title="title">
    <div class="contact-container">
      <div class="text-container d-flex justify-content-center">
        <!-- I think instead of text at all, I just want to have clickable icons that link to
        respective ways to contact me: i.e. email, linkedin, etc. -->
        <div class="contact-text text-center row">
          <a href="mailto:alex@alexhutman.com" class="col-md-6 contact-link mail py-3"
          target="_blank">
            <div class="text-center">
              <img
              src="../../../public/assets/icons/spinking/email.svg"
              class="align-middle icon email-icon black-icon">
                <span class="contact-title">
                  alex@<span class="pretentious">alex</span>hutman.com</span>
            </div>
          </a>

          <a href="mailto:alex@alexhutman.com?subject=Phone%20Number
&body=Hi%20Alex,%20please%20give%20me%20your%20phone%20number!"
          class="col-md-6 contact-link phone py-3"
          target="_blank">
            <div>
              <img
              src="../../../public/assets/icons/Dave_Gandy/phone.svg"
              class="align-middle icon">
                <span class="contact-title">Please email for phone number</span>
            </div>
          </a>

          <a href="https://github.com/alexhutman" class="col-md-6 contact-link github py-3" target="_blank">
            <div>
              <img
              src="../../../public/assets/icons/PixelBazaar/github.svg"
              class="align-middle icon black-icon">
                <span class="contact-title"><span class="pretentious">alex</span>hutman</span>
            </div>
          </a>

          <a href="https://linkedin.com/in/alexhutman" class="col-md-6 contact-link linkedin py-3" target="_blank">
            <div>
              <img
              src="../../../public/assets/icons/PixelBazaar/linkedin.svg"
              class="align-middle icon">
                <span class="contact-title"><span class="pretentious">alex</span>hutman</span>
            </div>
          </a>

        </div>
      </div>
    </div>
  </header-page>
</template>

<script lang="ts">
import HeaderPage from '../HeaderPage/HeaderPage.vue';

export default {
  name: 'Contact',
  data() {
    return {
      title: 'Contact',
    };
  },
  components: {
    HeaderPage,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Contact.scss" lang="scss"></style>
