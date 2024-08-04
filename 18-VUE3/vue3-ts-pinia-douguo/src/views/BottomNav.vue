<template>
	<van-tabbar v-model="active" active-color="#000">
		<van-tabbar-item name="home.recommend" to="/" class="typeface">首页</van-tabbar-item>
		<van-tabbar-item name="classify" to="/classify" class="typeface">分类</van-tabbar-item>
		<van-tabbar-item name="favorites.recipe" to="/favorites" class="typeface">收藏夹</van-tabbar-item>
		<van-tabbar-item name="me" to="/me" class="typeface">我的</van-tabbar-item>
	</van-tabbar>
	<RouterView />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const active = ref('');

// 初始化active.value值为当前路由的值
if (route.name) {
	active.value = route.name as string;
}

// 路由进入前
router.beforeEach((to) => {
	active.value = to.name as string;
});
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	justify-content: space-around;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 3.125rem;
	background-color: #fff;
	a {
		&.router-link-exact-active {
			color: red;
		}
	}
}

.typeface {
	font-size: 1.3rem;
	color: #999999;
}
</style>
