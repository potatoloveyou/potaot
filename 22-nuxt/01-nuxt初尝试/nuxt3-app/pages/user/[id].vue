<template>
	<div>命名路由</div>
	<div>访问路径不可去掉/user/(id)</div>
</template>

<script setup>
// 获取路由参数
	const route = useRoute();
	console.log(route.params.id);
</script>

<style lang="scss" scoped></style>
