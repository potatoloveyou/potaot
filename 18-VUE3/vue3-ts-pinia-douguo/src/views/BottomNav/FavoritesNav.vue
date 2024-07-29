<template>
	<!-- <div>收藏夹</div> -->
	<van-tabs :active="active" class="favorites-p">
		<van-tab name="favorites.grouping" title="分组" to="/favorites/grouping"></van-tab>
		<van-tab name="favorites.recipe" title="菜谱" to="/favorites"></van-tab>
		<van-tab name="favorites.note" title="笔记" to="/favorites/note"></van-tab>
		<van-tab name="favorites.course" title="课程" to="/favorites/course"></van-tab>
	</van-tabs>
	<RouterView class="favorites-p" />
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 默认显示推荐页索引
const active = ref('');
active.value = route.name;
// 路由进入前,更改当前显示的索引
router.beforeEach((to) => {
	active.value = to.name;
});

</script>

<style lang="scss" scoped>
.favorites-p{
	padding: 0 1.2rem;
}
</style>
