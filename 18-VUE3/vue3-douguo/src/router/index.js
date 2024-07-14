import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '@/stores/login';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			// 首页根目录进来是bottomNav
			path: '/',
			name: 'bottomNav',
			component: () => import('@/views/BottomNav.vue'),

			children: [
				{
					path: '',
					name: 'homeNav',
					component: () => import('@/views/HomeNav.vue'),
					children: [
						{
							// attention 关注
							path: 'attention',
							name: 'attention',
							component: () => import('@/views/BottomNav/HomeNav/HomeAttention.vue'),
						},
						{
							// recommend 推荐
							path: '',
							name: 'recommend',
							component: () => import('@/views/BottomNav/HomeNav/HomeRecommend.vue'),
						},
						{
							// note 笔记
							path: 'note',
							name: 'note',
							component: () => import('@/views/BottomNav/HomeNav/HomeNote.vue'),
						},
						{
							// video 视频
							path: 'video',
							name: 'video',
							component: () => import('@/views/BottomNav/HomeNav/HomeVideo.vue'),
						},
						{
							// activity 活动
							path: 'activity',
							name: 'activity',
							component: () => import('@/views/BottomNav/HomeNav/HomeActivity.vue'),
						},
					],
				},

				{
					// classify 分类
					path: '/classify',
					name: 'classify',
					// component: classifyView,
					component: () => import('@/views/BottomNav/classifyView.vue'),
				},

				{
					// purchaseList 购物车
					path: '/purchaseList',
					name: 'purchaseList',
					// component: PurchaseListView,
					component: () => import('@/views/BottomNav/PurchaseListView.vue'),
					// meta: {
					// 	// 是否需要登录
					// 	needLogin: true,
					// },
				},

				{
					// Favorites 收藏夹
					path: '/favorites',
					name: 'favorites',
					// component: FavoritesView,
					component: () => import('@/views/BottomNav/FavoritesView.vue'),
					meta: {
						// 是否需要登录
						needLogin: true,
					},
				},

				{
					// me 我的
					path: '/me',
					name: 'me',
					// component: MeView,
					component: () => import('@/views/BottomNav/MeView.vue'),
					meta: {
						// 是否需要登录
						needLogin: true,
					},
				},
			],
		},

		{
			// search 搜索
			path: '/search',
			name: 'search',
			component: () => import('@/views/SearchView.vue'),
		},

		{
			// recipe 菜谱
			path: '/recipe',
			name: 'recipe',
			component: () => import('@/views/RecipeView.vue'),
		},

		{
			// login 登录
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView.vue'),
		},
	],
});

// 全局前置守卫
router.beforeEach((to, from) => {
	const loginStore = useLoginStore();
	to.meta.needLogin && !loginStore.isUserLogin ? router.push('/login?from=' + to.fullPath) : '';
});

export default router;
