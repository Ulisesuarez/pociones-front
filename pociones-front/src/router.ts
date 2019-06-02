import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PotionView from './views/PotionView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/potion/:id',
      name: 'potion-view',
      component: PotionView,
    },
    {
      path: '/potion/10',
      name: 'potions',
      component: PotionView,
    },
  ],
});
