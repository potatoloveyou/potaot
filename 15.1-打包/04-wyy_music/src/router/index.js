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

    // 路由元信息
    // requiresAuth   true表示该路由需要登录才可访问
    meta: { title: 'RecommendedMusicViews', isShowApp: true },
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
    meta: { title: 'HotSongChartViews', isShowApp: true },
  },
  {
    path: '/SearchViews',
    name: 'SearchViews',
    component: () => import(/* webpackChunkName: "SearchViews" */ '../views/SearchViews.vue'),
    meta: { title: 'SearchViews', isShowApp: true },
  },
  {
    path: '/PlayListViews',
    name: 'PlayListViews',
    component: () => import(/* webpackChunkName: "SearchViews" */ '@/views/PlayListViews.vue'),
  },
  {
    path: '/SongPlayViews',
    name: 'SongPlayViews',
    component: () => import(/* webpackChunkName: "SearchViews" */ '@/views/SongPlayViews.vue'),
  },
];

const router = new VueRouter({
  routes,
});

// 全局前置路由守卫
// router.beforeEach((to, from, next) => {
//   console.log('全局 router.beforeEach');
//   console.log("从",to);
//   console.log("到",from);
//   next(); // 必须调用next()才能继续执行
// });

export default router;
