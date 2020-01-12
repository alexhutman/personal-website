import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/About/About.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "about" */ '../components/Projects/Projects.vue'),
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import(/* webpackChunkName: "about" */ '../components/Resume/Resume.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
