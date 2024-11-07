<template>
	<view>
		<view class="smart-page-head">
			<view class="smart-page-head-title">input,输入框</view>
		</view>
		<view class="smart-padding-wrap">
			<view class="item">可自动获取焦点的</view>
			<view>
				<input type="text" class="smart-input" confirm-type="search" placeholder="自动获取焦点" />
			</view>

			<view>控制最大输入长度</view>
			<view>
				<input type="text" class="smart-input" maxlength="10" placeholder="控制最大输入长度为10" />
			</view>

			<view
				>同步获取输入值
				<text style="color: #007aff">{{ inputValue }}</text>
			</view>
			<view>
				<input type="text" class="smart-input" @input="onKeyInput" placeholder="同步获取输入值" />
			</view>

			<view>数字输入</view>
			<view>
				<input class="smart-input" type="number" placeholder="这是一个数字输入框" />
			</view>

			<view>密码输入</view>
			<view>
				<input class="smart-input" type="text" password="true" placeholder="这是一个密码输入框" />
			</view>

			<view>带小数点输入输出</view>
			<view>
				<input class="smart-input" type="digit" placeholder="这是一个带小数点输入框" />
			</view>

			<view>身份证输入</view>
			<view>
				<input class="smart-input" type="idcard" placeholder="这是一个身份证输入框" />
			</view>

			<view>带清除按钮</view>
			<view class="wrapepr">
				<input
					class="smart-input"
					:value="clearinputValue"
					@input="clearInput"
					placeholder="这是一个带清除按钮输入框" />
				<text v-if="showClearIcon" @click="clearIcon" class="uni-icon">&#xe434;</text>
			</view>

			<view>可查看密码输入框</view>
			<view class="wrapper">
				<input class="smart-input" placeholder="请输入密码" :password="showPassword" />
				<text class="uni-icon" :class="!showPassword ? 'eye-active' : ''" @click="changePassword">&#xe568;</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';

	const inputValue = ref('');
	const showPassword = ref(true);
	const clearinputValue = ref('');
	const showClearIcon = ref(false);

	const onKeyInput = (e) => {
		inputValue.value = e.detail.value;
	};

	const clearInput = (e) => {
		clearinputValue.value = e.detail.value;
		e.detail.value.length > 0 ? (showClearIcon.value = true) : (showClearIcon.value = false);
	};

	const clearIcon = () => {
		clearinputValue.value = '';
		showClearIcon.value = false;
	};

	const changePassword = () => {
		showPassword.value = !showPassword.value;
	};
</script>

<style lang="scss" scoped>
	.item {
		margin-bottom: 40rpx;
	}
	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-size: normal;
		width: 24px;
		height: 24px;
		line-height: 24px;
		color: #999;
		margin-top: 5px;
	}
	.wrapper {
		display: flex;
		font-display: row;
		flex-wrap: nowrap;
		background-color: #d8d8d8;
	}
	.eye-active {
		color: #007aff;
	}
	.smart-input {
		height: 28px;
		line-height: 28px;
		font-style: 15px;
		flex: 1;
		background-color: #d8d8d8;
		padding: 3px;
	}
</style>
