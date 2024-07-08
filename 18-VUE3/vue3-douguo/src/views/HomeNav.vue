<template>
	<div>
		<nav>
			<RouterLink to="/attention">关注</RouterLink>
			<RouterLink to="/">推荐</RouterLink>
			<RouterLink to="/note">笔记</RouterLink>
			<RouterLink to="/video">视频</RouterLink>
			<RouterLink to="/activity">活动</RouterLink>
		</nav>
	</div>
	<RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
	name: 'Homenav',
};
</script>

<style lang="sass" scoped></style>
