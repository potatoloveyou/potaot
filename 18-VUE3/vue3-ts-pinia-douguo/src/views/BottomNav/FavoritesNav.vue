<template>
	<!-- <div>收藏夹</div> -->
	<van-tabs :active="active">
		<van-tab title="分组" to="/favorites/grouping"></van-tab>
		<van-tab title="菜谱" to="/favorites"></van-tab>
		<van-tab title="笔记" to="/favorites/note"></van-tab>
		<van-tab title="课程" to="/favorites/course"></van-tab>
	</van-tabs>
	<RouterView />
</template>

<script setup>
import { ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

// 默认显示推荐页索引
const active = ref(1);
</script>

<style lang="scss" scoped></style>
