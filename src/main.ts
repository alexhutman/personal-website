import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const solidIcons: IconDefinition[] = [faBars];
const brandIcons: IconDefinition[] = [faGithubSquare];

[...solidIcons, ...brandIcons].map(icon => library.add(icon));

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
