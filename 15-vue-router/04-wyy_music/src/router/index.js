import Vue from 'vue';
import VueRouter from 'vue-router';
// RecommendedMusicViews  推荐音乐路由
// 1. 导入RecommendedMusicViews组件
import RecommendedMusicViews from '../views/RecommendedMusicViews.vue';

Vue.use(VueRouter);

const routes = [
  // 2.在路由配置中添加RecommendedMusicViews组件的路由
  {
    path: '/',
    name: 'RecommendedMusicViews',
    component: RecommendedMusicViews,
  },
  {
    // 这里设置path路径，就是在app.vue中<router-link>标签的to属性中设置的路径
    path: '/HotSongChartViews',
    // 设置组件的名称，在app.vue中<router-view>标签中使用
    name: 'HotSongChartViews',
    // route level code-splitting
    // this generates a separate chunk (HotSongChartViews.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "HotSongChartViews" */ '../views/HotSongChartViews.vue'),
  },
  {
    path: '/SearchViews',
    name: 'SearchViews',
    component: () => import(/* webpackChunkName: "SearchViews" */ '../views/SearchViews.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
