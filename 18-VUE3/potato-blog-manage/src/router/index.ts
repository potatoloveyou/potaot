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
			// 重定向到Overview
			redirect: '/Overview',
			component: () => import('@/layout/DefaultLayout.vue'),
			children: [
				{
					path: '/Overview',
					name: 'Overview',
					component: () => import('@/views/Overview.vue'),
				},
				{
					path: '/LocalFiles',
					name: 'LocalFiles',
					component: () => import('@/views/LocalFilesView.vue'),
				},
				{
					path: '/BlogPosts',
					name: 'BlogPosts',
					component: () => import('@/views/BlogPostsView.vue'),
				},
				{
					path: '/PhotoGallery',
					name: 'PhotoGallery',
					component: () => import('@/views/PhotoGalleryView.vue'),
				},
				{
					path: '/HandwrittenNotes',
					name: 'HandwrittenNotes',
					component: () => import('@/views/HandwrittenNotesView.vue'),
				},
				// {
				// 	path: '/ResourceSharing',
				// 	name: 'ResourceSharing',
				// 	component: () => import('@/views/ResourceSharingView.vue'),
				// },
				// {
				// 	path: '/SystemSettings',
				// 	name: 'SystemSettings',
				// 	component: () => import('@/views/SystemSettingsView.vue'),
				// },
			],
		},
		{
			path: '/HeadLayout',
			name: 'HeadLayout',
			component: () => import('@/layout/HeadLayout.vue'),
			children: [
				{
					path: '/NewBlogPosts',
					name: 'NewBlogPosts',
					component: () => import('@/views/NewBlogPostsView.vue'),
				},
				{
					path: '/NewPhotoGallery',
					name: 'NewPhotoGallery',
					component: () => import('@/views/NewPhotoGalleryView.vue'),
				},
			],
		},
	],
});

export default router;
