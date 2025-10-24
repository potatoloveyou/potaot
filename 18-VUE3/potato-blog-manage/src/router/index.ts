import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const router = createRouter({
	// 历史模式		http://localhost:5173/
	// history: createWebHistory(import.meta.env.BASE_URL),
	// hash模式(哈希)		http://localhost:5173/#/
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'DefaultLayout',
			component: () => import('@/layout/DefaultLayout.vue'),
			children: [
				{
					path: '',
					name: 'Overview',
					component: () => import('@/views/Overview.vue'),
				},
			],
		},
	],
});

export default router;
