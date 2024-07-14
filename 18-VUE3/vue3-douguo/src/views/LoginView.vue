<template>
	<div>登录</div>
	<div class="login">
		<input type="text" v-model="username" />
		<input type="password" v-model="password" />
		<input type="button" value="登录" @click.prevent="login" />
		<!-- <input type="button" value="退出登录" @click.prevent="loginStore.logout()" /> -->
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLoginStore } from '@/stores/login';
const loginStore = useLoginStore();
import { useRoute } from 'vue-router';
const route = useRoute();
import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref('');
const password = ref('');
const login = () => {
	// 模拟请求

	setTimeout(() => {
		// .then中返回的token
		const userToken = 'MaJ6bKsj';

		// 这个判断写要在.then里
		if (userToken) {
			// 将userToken存储到pinia中
			loginStore.login({ token: userToken });

			// 跳转到登录前的那一页
			router.replace(route.query.from);
		} else {
			alert('用户名或密码错误');
		}
	}, 1000);
};
</script>

<style lang="scss" scoped>
input {
	border: 5px solid #ccc;
}
</style>
