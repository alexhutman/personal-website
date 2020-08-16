<template>
  <header-page :page-title="title">
    <div class="contact-container">
      <div class="text-container d-flex justify-content-center">
        <!-- I think instead of text at all, I just want to have clickable icons that link to
        respective ways to contact me: i.e. email, linkedin, etc. -->
        <div class="contact-text text-center row">
          <a href="mailto:alex@alexhutman.com" class="col-md-6 align-middle contact-link mail pt-3"
          target="_blank">
            <div class="text-center">
                <font-awesome-icon :icon="['fa', 'envelope']" class="fa-3x icon"/>
                alex@alexhutman.com
            </div>
          </a>

          <a href="mailto:alex@alexhutman.com?subject=Phone%20Number
          &body=Hi%20Alex,%20please%20give%20me%20your%20phone%20number!"
          class="col-md-6 contact-link phone pt-3"
          target="_blank">
            <div>
                <font-awesome-icon :icon="['fa', 'phone']" class="fa-3x icon"/>
                Please email for phone number
            </div>
          </a>

          <a href="https://github.com/alexhutman" class="col-md-6 contact-link github pt-3" target="_blank">
            <div>
              <font-awesome-icon :icon="['fab', 'github-square']" class="fa-3x icon"/>
                alexhutman
            </div>
          </a>

          <a href="https://linkedin.com/in/alexhutman" class="col-md-6 contact-link linkedin pt-3" target="_blank">
            <div>
              <font-awesome-icon :icon="['fab', 'linkedin']" class="fa-3x icon"/>
                alexhutman
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
