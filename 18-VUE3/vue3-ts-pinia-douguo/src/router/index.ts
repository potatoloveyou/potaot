import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '@/stores/login';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// 首页根目录进来是bottomNav
		{
			path: '/',
			name: 'bottomNav',
			component: () => import('@/views/BottomNav.vue'),

			children: [
				// home 首页
				{
					path: '',
					name: 'homeNav',
					component: () => import('@/views/BottomNav/HomeNav.vue'),
					children: [
						// attention 关注
						{
							path: 'attention',
							name: 'home.attention',
							component: () => import('@/views/BottomNav/HomeNav/HomeAttention.vue'),
						},
						// recommend 推荐
						{
							path: '',
							name: 'home.recommend',
							component: () => import('@/views/BottomNav/HomeNav/HomeRecommend.vue'),
						},
						// note 笔记
						{
							path: 'note',
							name: 'home.note',
							component: () => import('@/views/BottomNav/HomeNav/HomeNote.vue'),
						},
						// video 视频
						{
							path: 'video',
							name: 'home.video',
							component: () => import('@/views/BottomNav/HomeNav/HomeVideo.vue'),
						},
						// activity 活动
						{
							path: 'activity',
							name: 'home.activity',
							component: () => import('@/views/BottomNav/HomeNav/HomeActivity.vue'),
						},
					],
				},

				// classify 分类
				{
					path: '/classify',
					name: 'classify',
					// component: classifyView,
					component: () => import('@/views/BottomNav/classifyView.vue'),
				},

				// purchaseList 购物车
				{
					path: '/purchaseList',
					name: 'purchaseList',
					// component: PurchaseListView,
					component: () => import('@/views/BottomNav/PurchaseListView.vue'),
					// meta: {
					// 	// 是否需要登录
					// 	needLogin: true,
					// },
				},

				// Favorites 收藏夹
				{
					path: '/favorites',
					name: 'favorites',
					// component: FavoritesNav,
					component: () => import('@/views/BottomNav/FavoritesNav.vue'),

					children: [
						// grouping 分组
						{
							path: 'grouping',
							name: 'favorites.grouping',
							// component: () => import('@/views/BottomNav/Favorites/FavoritesGrouping.vue'),
							component: () => import('@/views/BottomNav/FavoritesNav/FavoritesGrouping.vue'),
						},

						// recipe 菜谱
						{
							path: '',
							name: 'favorites.recipe',
							component: () => import('@/views/BottomNav/FavoritesNav/FavoritesRecipe.vue'),
						},

						// note 笔记
						{
							path: 'note',
							name: 'favorites.note',
							component: () => import('@/views/BottomNav/FavoritesNav/FavoritesNote.vue'),
						},
						// course 课程
						{
							path: 'course',
							name: 'favorites.course',
							component: () => import('@/views/BottomNav/FavoritesNav/FavoritesCourse.vue'),
						},
					],

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

		// leftPopup 左侧弹出
		{
			path: '/leftPopup',
			name: 'leftPopup',
			component: () => import('@/views/LeftPopupView.vue'),
			children: [
				{
					// leftPopup.purchase
					path: 'purchase',
					name: 'leftPopup.purchase',
					component: () => import('@/views/LeftPopup/LeftPopupPurchase.vue'),
				},
			],
		},

		// search 搜索
		{
			path: '/search',
			name: 'search',
			component: () => import('@/views/SearchView.vue'),
			children: [
				// search.homepage 搜索主页
				{
					path: '',
					name: 'search.homepage',
					component: () => import('@/views/Search/SearchHomepage.vue'),
				},
				//
				{
					path: 'searchNav',
					name: 'searchNav',
					component: () => import('@/views/Search/SearchNav.vue'),
					children: [
						// recipe 菜谱
						{
							path: '',
							name: 'search.recipe',
							component: () => import('@/views/Search/SearchNav/SearchRecipe.vue'),
						},
						// 笔记
						{
							path: 'note',
							name: 'search.note',
							component: () => import('@/views/Search/SearchNav/SearchNote.vue'),
						},
						// 用户
						{
							path: 'user',
							name: 'search.user',
							component: () => import('@/views/Search/SearchNav/SearchUser.vue'),
						},
						// 商品
						{
							path: 'product',
							name: 'search.product',
							component: () => import('@/views/Search/SearchNav/SearchProduct.vue'),
						},
						// 课堂
						{
							path: 'course',
							name: 'search.course',
							component: () => import('@/views/Search/SearchNav/SearchCourse.vue'),
						},
					],
				},
			],
		},

		// recipeClassify 菜谱分类
		{
			path: '/recipeClassify',
			name: 'recipeClassify',
			component: () => import('@/views/RecipeClassifyView.vue'),
		},

		// messageCenter 消息中心
		{
			path: '/messageCenter',
			name: 'messageCenter',
			component: () => import('@/views/MessageCenterView.vue'),
			children: [
				{
					// messageCenter.homepage 消息中心主页
					path: '',
					name: 'messageCenter.homepage',
					component: () => import('@/views/MessageCenter/MessageHomepage.vue'),
				},
				{
					// commentRemind 评论和@
					path: 'commentRemind',
					name: 'messageCenter.commentRemind',
					component: () => import('@/views/MessageCenter/MessageCommentRemind.vue'),
				},
				{
					// collectLike 收藏点赞
					path: 'collectLike',
					name: 'messageCenter.collectLike',
					component: () => import('@/views/MessageCenter/MessageCollectLike.vue'),
				},
				{
					// newFans 新的粉丝
					path: 'newFans',
					name: 'messageCenter.newFans',
					component: () => import('@/views/MessageCenter/MessageNewFans.vue'),
				},

				{
					// hotActivity 热门活动
					path: 'hotActivity',
					name: 'messageCenter.hotActivity',
					component: () => import('@/views/MessageCenter/HotActivity.vue'),
				},
			],
		},

		// recipeDetail 菜谱详情
		{
			path: '/recipeDetail',
			name: 'recipeDetail',
			component: () => import('@/views/RecipeDetailView.vue'),
		},

		// NoteDetail 笔记详情
		{
			path: '/noteDetail/:noteId',
			name: 'noteDetail',
			component: () => import('@/views/NoteDetailView.vue'),
		},

		// login 登录
		{
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
