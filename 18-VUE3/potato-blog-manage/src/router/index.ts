import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const router = createRouter({
	// history: createWebHistory(import.meta.env.BASE_URL),
	// 改成hash模式
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: '/',
		// 	name: 'home',
		// 	component: () => import('@/views/HomeView.vue'),
		// },
	],
});

router.beforeEach((to, from, next) => {

});

export default router;
