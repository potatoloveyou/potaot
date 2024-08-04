<template>
	<!-- SearchNav -->
	<van-tabs :active="active" class="SearchNav-top" line-width="1.2rem" line-height="0.2rem">
		<van-tab name="search.recipe" title="菜谱" to="/search/searchNav"></van-tab>
		<van-tab name="search.note" title="笔记" to="/search/searchNav/note"></van-tab>
		<van-tab name="search.user" title="用户" to="/search/searchNav/user"></van-tab>
		<van-tab name="search.product" title="商品" to="/search/searchNav/product"></van-tab>
		<van-tab name="search.course" title="课堂" to="/search/searchNav/course"></van-tab>
	</van-tabs>

	<RouterView />
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const active = ref('');

// 初始化active.value值为当前路由的值
if (route.name) {
	active.value = route.name;
}

// 路由进入前
router.beforeEach((to) => {
	active.value = to.name;
});
</script>

<style lang="scss">
.SearchNav-top {
	border-bottom: 1px solid #000;
	padding: 0 0.8rem;

	.van-tabs__line {
		background-color: #ffc533;
	}
}
</style>
