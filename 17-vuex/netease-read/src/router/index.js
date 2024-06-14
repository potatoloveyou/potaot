import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		// name: 'home',
		component: () => import('@/views/HomeView.vue'),

		children: [
			{
				path: 'manChannel',
				name: 'ManChannelView',
				component: () => import('@/views/ManChannelView.vue'),
			},
			{
				path: 'womanChannel',
				name: 'WomanChannelView',
				component: () => import('@/views/WomanChannelView.vue'),
			},
		],
	},
];

const router = new VueRouter({
	routes,
});

export default router;
