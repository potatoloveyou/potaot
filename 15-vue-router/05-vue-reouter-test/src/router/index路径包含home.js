import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../music/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // 路由重定向，当访问/时，会自动访问到/home路由
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'recom',
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
    path: '/playlist',
    name: 'PlayList',
    component: () => import('@/music/PlayListView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
