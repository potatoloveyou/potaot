<template>
	<van-tabs v-model:active="active">
		<van-tab title="关注" to="/attention"></van-tab>
		<van-tab title="推荐" to="/"></van-tab>
		<van-tab title="笔记" to="/note"></van-tab>
		<van-tab title="视频" to="/video"></van-tab>
		<van-tab title="活动" to="/activity"></van-tab>
	</van-tabs>
	<RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 默认显示推荐页索引
const active = ref(1);
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	padding: 1.25rem;
	a {
		// padding: 0 .625rem
		height: 3.125rem;
		line-height: 3.125rem;
		text-align: center;
		flex: 1;
		&.router-link-exact-active {
			color: red;
		}
	}
}
</style>
