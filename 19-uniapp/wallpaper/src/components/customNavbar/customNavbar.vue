<template>
	<view class="layout">
		<view class="navbar">
			<view class="statuBar" :style="`height: ${getStatusBarHeight}px`"></view>
			<view class="titleBar" :style="`height: ${getTitleBarHeight}px`">
				<view class="title">{{ title }}</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons type="search" color="#888" size="18" class="icon" />
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="`height: ${getNavBarHeight}px`"></view>
	</view>
</template>

<script setup>
	import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight } from '@/utils/system';

	const props = defineProps({
		title: String,
	});
</script>

<style lang="scss" scoped>
	.layout {
		.navbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 999;
			background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);
			.statuBar {
			}
			.titleBar {
				padding: 0 30rpx;
				display: flex;
				align-items: center;

				.title {
					font-size: 42rpx;
					font-weight: 700;
					color: $text-font-color-1;
				}
				.search {
					width: 220rpx;
					height: 56rpx;
					border-radius: 60rpx;
					background-color: rgba(255, 255, 255, 0.4);
					border: 1px solid #fff;
					margin-left: 30rpx;
					color: #999;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					.icon {
						margin-left: 5rpx;
					}
					.text {
						padding-left: 10rpx;
					}
				}
			}
		}
		.fill {
		}
	}
</style>
