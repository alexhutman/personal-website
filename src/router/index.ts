import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home/Home.vue';

Vue.use(VueRouter);

const baseTitle = 'Alex Hutman |';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: `${baseTitle} Home`,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/About/About.vue'),
    meta: {
      title: `${baseTitle} About`,
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "projects" */ '../components/Projects/Projects.vue'),
    meta: {
      title: `${baseTitle} Projects`,
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../components/Contact/Contact.vue'),
    meta: {
      title: `${baseTitle} Contact`,
    },
  },
];

const router = new VueRouter({
  routes,
});

// Adapted from https://alligator.io/vuejs/vue-router-modify-head/
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
