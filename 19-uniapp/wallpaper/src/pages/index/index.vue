<template>
	<view class="homeLayou">
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#fff" autoplay circular>
				<swiper-item>
					<image src="@/common/images/banner1.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="@/common/images/banner2.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="@/common/images/banner3.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text class="notice-text">公告</text>
			</view>

			<view class="center">
				<swiper vertical autoplay circular interval="1500" duration="300">
					<swiper-item v-for="(item, index) in 4" :key="index">
						文字内容{{ index }}内容内容内容内容内容内容内容内容内容内容内容内容内容
					</swiper-item>
				</swiper>
			</view>

			<view class="right">
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>

		<view class="select">
			<commonTitle>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="data">
						<uni-icons type="calendar" size="18" color="#28b389"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd"></uni-dateformat>
							日
						</view>
					</view>
				</template>
			</commonTitle>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="(item, index) in 8" :key="index">
						<image src="@/common/images/preview_small.webp" mode="aspectFill" />
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<commonTitle>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="" class="more">More+</navigator>
				</template>
			</commonTitle>

			<view class="content">
				<themeItem v-for="(item, index) in 8" :key="index"></themeItem>
				<themeItem :isMore="true"></themeItem>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import commonTitle from '@/components/commonTitle/commonTitle.vue';
</script>

<style lang="scss" scoped>
	.homeLayou {
		.banner {
			padding: 30rpx 0;
			swiper {
				height: 340rpx;
				&-item {
					padding: 0 30rpx;
					box-sizing: border-box;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}

		.notice {
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			background-color: #f9f9f9;
			margin: 0 30rpx;
			border-radius: 40rpx;
			.left {
				display: flex;
				flex-wrap: wrap;
				align-content: center;
				.notice-text {
					color: #28b389;
					font-size: 600;
				}
			}
			.center {
				flex: 1;
				padding-left: 20rpx;
				swiper {
					height: 100%;
					&-item {
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}

		.select {
			padding-top: 50rpx;
			.data {
				color: #28b389;
				display: flex;
				align-items: center;
				margin-left: 5rpx;
			}
			.content {
				width: 100%;
				margin-left: 30rpx;
				margin-top: 30rpx;
				scroll-view {
					white-space: nowrap;
					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
						&::list-child {
							margin-right: 30rpx;
						}
					}
				}
			}
		}

		.theme {
			padding: 50rpx 0;
			.more {
				font-size: 32rpx;
				color: #888;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>
