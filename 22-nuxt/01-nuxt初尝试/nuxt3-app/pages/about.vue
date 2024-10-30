<template>
	<div>about</div>
</template>

<script setup>
	// 路由自定义名称
	// 即访问 /about1 时才会渲染这个页面,访问 /about 时会报错
	// definePageMeta({
	// 	path: '/about1',
	// });

	// 路由守卫（只能用中间件）
	definePageMeta({
		// middleware: [function (to, from) {}],
		// 引入中间件
		middleware: [
			// 'my',
			// 'my-two'
		],
	});
</script>

<style lang="scss" scoped></style>
