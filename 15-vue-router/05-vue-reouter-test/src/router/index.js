import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../music/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // name: 'home',
    component: HomeView,


    children: [
      {
        path: '',
        // path: 'recom',
        name: 'RecomView',
        component: () => import('@/music/RecomView.vue'),
      },
      {
        path: 'hot',
        name: 'HotView',
        component: () => import('@/music/HotView.vue'),
      },
      {
        path: 'search',
        name: 'SearchView',
        component: () => import('@/music/SearchView.vue'),
      },
    ],
  },

  {
    path: '/playlist/:id',
    name: 'PlayList',
    component: () => import('@/music/PlayListView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
