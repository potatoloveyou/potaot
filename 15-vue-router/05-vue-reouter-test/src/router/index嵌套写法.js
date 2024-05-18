import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/AboutView',
    name: 'AboutView',
    // route level code-splitting
    // this generates a separate chunk (AboutView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AboutView" */ '@/views/AboutView.vue'),
  },
  {
    path: '/UserView',
    name: 'UserView',
    // route level code-splitting
    // this generates a separate chunk (UserView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UserView" */ '@/views/UserView.vue'),
  },
  {
    path: '/PostView',
    name: 'PostView',
    // route level code-splitting
    // this generates a separate chunk (PostView.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "PostView" */ '@/views/PostView.vue'),
    children: [
      {
        path: '/', 
        name: 'PostHomeView',
        component: () => import('@/views/PostHomeView.vue'),
      },
      {
        path: 'test',
        name: 'PostTestView',
        component: () => import('@/views/PostTestView.vue'),
      },
      {
        path: ':id',
        name: 'PostListView',
        component: () => import('@/views/PostListView.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
