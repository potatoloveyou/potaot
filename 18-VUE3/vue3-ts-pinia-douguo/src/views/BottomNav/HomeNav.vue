<template>
	<section class="home-top">
		<van-icon name="wap-nav" class="sidebar" />
		<van-search v-model="value" placeholder="请输入搜索关键词" />
	</section>

	<van-sticky>
		<van-tabs :active="active" sticky class="home-nav-top" swipeable>
			<van-tab name="home.attention" title="关注" to="/attention"></van-tab>
			<van-tab name="home.recommend" title="推荐" to="/"></van-tab>
			<van-tab name="home.note" title="笔记" to="/note"></van-tab>
			<van-tab name="home.video" title="视频" to="/video"></van-tab>
			<van-tab name="home.activity" title="活动" to="/activity"></van-tab>
		</van-tabs>
	</van-sticky>
	<div class="padding-top"></div>
	<RouterView />
	<!-- <router-view v-slot="{ Component }">
		<transition name="fade">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</transition>
	</router-view> -->
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 默认显示推荐页索引
const active = ref('');

// 初始化active.value值为当前路由的值
if (route.name) {
	active.value = route.name;
}

// 路由进入前
router.beforeEach((to) => {
	active.value = to.name;
});

const value = ref('');
</script>

<style lang="scss" scoped>
.home-top {
	display: flex;
	// justify-content: center;
	align-items: center;
	.sidebar {
	}
}
</style>
