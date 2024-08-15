<template>
	<!-- SearchNav -->
	<van-tabs :active="active" class="SearchNav-top" line-width="1.2rem" line-height="0.2rem">
		<van-tab
			v-for="item in searchNav_view"
			:key="item.name"
			:name="item.name"
			:title="item.title"
			:to="item.path"></van-tab>
	</van-tabs>
	<RouterView />
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const searchNav_view = ref([
	{
		name: 'search.recipe',
		title: '菜谱',
		path: '/search/searchNav',
	},
	{
		name: 'search.note',
		title: '笔记',
		path: '/search/searchNav/note',
	},
	{
		name: 'search.user',
		title: '用户',
		path: '/search/searchNav/user',
	},
	{
		name: 'search.product',
		title: '商品',
		path: '/search/searchNav/product',
	},
	{
		name: 'search.course',
		title: '课堂',
		path: '/search/searchNav/course',
	},
]);

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
	border-bottom: 1px solid #b4b4b4;
	padding: 0 0.8rem;

	.van-tabs__line {
		background-color: #ffc533;
	}
}
</style>
