<template>
	<van-tabbar v-model="active" active-color="#000">
		<van-tabbar-item to="/" class="typeface">首页</van-tabbar-item>
		<van-tabbar-item to="/classify" class="typeface">分类</van-tabbar-item>
		<van-tabbar-item to="/favorites" class="typeface">收藏夹</van-tabbar-item>
		<van-tabbar-item to="/me" class="typeface">我的</van-tabbar-item>
	</van-tabbar>
	<RouterView />
</template>

<script setup>
import { ref } from 'vue';
const active = ref(0);
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
