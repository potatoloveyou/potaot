import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
	// 是否登录
	const isLogin = ref(localStorage.getItem('userToken') ? true : false);

	// 用户信息和userToken
	const userInfo = ref({});
	const userToken = ref(localStorage.getItem('userToken') || '');

	// 计算属性，判断用户是否登录
	const isUserLogin = computed(() => userToken.value);

	// 登录
	// const login = ({ userInfo = {}, token }) => {
	const login = ({ token }) => {
		isLogin.value = true;
		// 	userInfo.value = data;
		userToken.value = token;
	};

	// 退出登录
	const logout = () => {
		isLogin.value = false;
		// userInfo.value = {};
		userToken.value = '';
	};

	// 监听isLogin的变化
	watch(isLogin, (newVal) => {
		if (newVal) {
			// 登录成功后，将userToken保存到localStorage中
			localStorage.setItem('userToken', userToken.value);
		} else {
			// 退出登录后，清除localStorage中的userToken
			localStorage.removeItem('userToken');
		}
	});

	return { isLogin, userInfo, userToken, isUserLogin, login, logout };
});
