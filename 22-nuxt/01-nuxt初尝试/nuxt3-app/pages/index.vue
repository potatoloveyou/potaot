<template>
	<div>index</div>
	<div v-if="status === 'pending'">loading...</div>
	<div v-else>请求完成</div>
</template>

<script setup>
	// //	useAsyncData	只在服务端执行一次
	// let res = await useAsyncData('test', () => {
	// 	let r = $fetch('https://api.github.com/users/octocat');
	// 	console.log(11111111111);
	// 	return r;
	// });

	// useFetch 是useAsyncData与$fetch的语法糖
	const { data, status, error, refresh } = await useFetch('https://api.github.com/users/octocat', {
		// 懒加载，只有当组件渲染时才会发送请求
		lazy: true,
	});
	// refresh() 重新发送请求，刷新token，只会在服务端执行一次

	// status 请求状态,会有一个默认值:pending

	// error.value 请求错误信息
	// data.value 请求返回的数据
	console.log(data.value);
	
</script>

<style lang="scss" scoped></style>
