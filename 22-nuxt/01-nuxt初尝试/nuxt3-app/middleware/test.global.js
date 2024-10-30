// 全局中间件，后缀名必须为 .global.js
export default defineNuxtRouteMiddleware((to, from) => {
	let passURL = ['/', '/login', '/about', 'index'];
	if (!passURL.includes(to.path)) {
		let token = '';
		if (import.meta.client) {
			token = localStorage.getItem('token');
		}

		if (!token) {
			return navigateTo({
				path: '/login',
				query: {
					code: 401,
					message: '请先登录',
				},
			});
		}
	}
});
