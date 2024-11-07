<template>
	<view class="component-classroom4">
		<div class="content">
			<view class="counter">
				<view class="minus" @click="clickMinus">-</view>
				<view class="count">{{ initialCount }}</view>
				<view class="add" @click="clickAdd">+</view>
			</view>
			<text class="text">数值为:{{ initialCount }}</text>
		</div>
	</view>
</template>

<script setup>
	import { ref } from 'vue';

	const props = defineProps({
		initialCount: Number,
	});

	// 定义 emit，用于发出事件
	const emit = defineEmits(['minus', 'add']);

	const clickMinus = () => {
		emit('minus');
	};

	const clickAdd = () => {
		emit('add');
	};
</script>

<style lang="scss" scoped>
	.component-classroom4 {
		width: 100%;
		height: 100vh;
		background-color: #fdead5;
		display: flex;
		justify-content: center;
		align-items: center;
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			.counter {
				background-color: #34ffd1;
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 0 20rpx;
				.minus {
					background-color: white;
					padding: 20px;
				}
				.count {
				}
				.add {
					background-color: white;
					padding: 20px;
				}
			}
			.text {
			}
		}
	}
</style>
