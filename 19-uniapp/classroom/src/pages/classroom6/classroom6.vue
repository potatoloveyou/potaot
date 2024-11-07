<template>
	<view>
		<view class="name">
			<text>用户名</text>
			<input class="uni-input" type="text" @input="onName" placeholder="请输入用户名" />
		</view>
		<view class="pwd">
			<text>密码</text>
			<input class="uni-input" type="password" @input="onPwd" placeholder="请输入密码" />
		</view>
		<view class="btn">
			<button @click="onlogin">登录</button>
		</view>
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	const name = ref('');
	const pwd = ref('');
	const onName = (e) => {
		name.value = e.detail.value;
		console.log(name.value);
	};
	const onPwd = (e) => {
		pwd.value = e.detail.value;
		console.log(pwd.value);
	};

	const onlogin = () => {
		if (name.value == '') {
			uni.showToast({
				title: '请输入用户名',
				icon: 'none',
			});
			return;
		}
		if (pwd.value == '') {
			uni.showToast({
				title: '请输入密码',
				icon: 'none',
			});
			return;
		}
		uni.showToast({
			title: '登录成功',
			icon: 'success',
		});
	};
</script>

<style lang="scss" scoped>
	.uni-input {
		margin: 20rpx;
		padding: 10rpx;
		border: 1px solid #ccc;
	}
</style>
