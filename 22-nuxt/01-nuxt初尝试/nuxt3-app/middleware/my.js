export default defineNuxtRouteMiddleware((to, from) => {
	console.log('to', to.path);
	console.log('from', from.path);

	if (to.path === '/about') {
		// return navigateTo('/login');
		return true;
	}
});
