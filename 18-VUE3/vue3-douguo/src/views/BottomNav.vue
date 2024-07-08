<template>
	<nav>
		<RouterLink to="/">首页</RouterLink>
		<RouterLink to="/classify">分类</RouterLink>
		<RouterLink to="/favorites">收藏夹</RouterLink>
		<RouterLink to="/me">我的</RouterLink>
	</nav>

	<RouterView />
</template>

<script>

export default {
	name: 'BottomNav',
};
</script>

<style lang="sass" scoped></style>
