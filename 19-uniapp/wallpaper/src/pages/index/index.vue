<template>
	<view class="homeLayou pageBg">
		<customNavbar :title="'推荐'" />
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#fff" autoplay circular>
				<swiper-item v-for="banner in bannerList" :key="banner._id">
					<navigator
						class="link"
						:url="banner.url"
						open-type="navigate"
						target="miniProgram"
						:app-id="banner.appid"
						@click="goClassList(banner)"
						v-if="banner.target == 'miniProgram'">
						<image :src="banner.picurl" mode="aspectFill" />
					</navigator>

					<navigator
						class="link"
						:url="`/pages/classlist/classlist?${banner.url}`"
						open-type="navigate"
						@click="goClassList(banner)"
						v-else>
						<image :src="banner.picurl" mode="aspectFill" />
					</navigator>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="notice-text">公告</text>
			</view>

			<view class="center">
				<swiper vertical autoplay circular interval="1500" duration="300">
					<swiper-item v-for="wallNew in wallNewList" :key="wallNew._id" @click="goNoticeDetail">
						<navigator :url="`/pages/notice/detail?id=${wallNew._id}`">
							{{ wallNew.title }}
						</navigator>
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
						<uni-icons type="calendar" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd"></uni-dateformat>
							日
						</view>
					</view>
				</template>
			</commonTitle>

			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="wallpaper in wallpaperList" :key="wallpaper._id" @click="goPreview(wallpaper._id)">
						<image :src="wallpaper.smallPicurl" mode="aspectFill" />
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<commonTitle>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</commonTitle>

			<view class="content">
				<themeItem v-for="classify in classifyList" :key="classify._id" :classify="classify"></themeItem>
				<themeItem :isMore="true"></themeItem>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
	import { getBanner, getwallNews, getWallpaper, getClassify } from '@/apis/api';

	import commonTitle from '@/components/commonTitle/commonTitle.vue';
	import customNavbar from '@/components/customNavbar/customNavbar.vue';

	import { useWellListStore } from '@/stores/wellList';
	const wellListStore = useWellListStore();

	// 跳转分类列表
	const goClassList = (banner) => {
		console.log(banner);
		// if (banner.target == 'miniProgram') {
		// 	uni.navigateTo({
		// 		url: `/pages/classlist/classlist?${banner.url}`,
		// 	});
		// } else {
		// 	uni.navigateTo({
		// 		url: `/pages/classlist/classlist?${banner.url}`,
		// 	});
		// }
		// console.log(banner.target);
	};

	// 跳转到照片全屏
	const goPreview = (id) => {
		wellListStore.wallNewList = wallpaperList.value;
		uni.navigateTo({
			url: `/pages/preview/preview?id=${id}`,
		});
	};

	// 跳转到公告
	const goNoticeDetail = () => {
		uni.navigateTo({
			url: '/pages/notice/detail',
		});
	};

	// 首页海报列表
	const bannerList = ref([]);
	const Banner = async () => {
		const res = await getBanner();
		bannerList.value = res.data;
	};

	// 壁纸资讯公告列表
	const wallNewList = ref([]);
	const wallNew = async () => {
		const res = await getwallNews({
			select: true,
		});
		wallNewList.value = res.data;
	};

	// 随机9张壁纸
	const wallpaperList = ref([]);
	const Wallpaper = async () => {
		const res = await getWallpaper();
		wallpaperList.value = res.data;
	};

	// 壁纸大分类
	const classifyList = ref([]);
	const Classify = async () => {
		const res = await getClassify({
			select: true,
		});
		classifyList.value = res.data;
	};

	onLoad(() => {
		Banner();
		wallNew();
		Wallpaper();
		Classify();
	});

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: '咸虾米壁纸',
			path: '/pages/index/index',
		};
	});

	// 分享朋友圈
	onShareTimeline(() => {
		return {
			title: '咸虾米壁纸',
			imageUrl: '/static/images/xxmLogo.png',
		};
	});
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
					.link {
						width: 100%;
						height: 100%;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
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
					color: $brand-theme-color;
					font-size: 600;
				}
				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
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
				color: $brand-theme-color;
				display: flex;
				align-items: center;
				margin-left: 5rpx;
				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}
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
						&:last-child {
							margin-right: 55rpx;
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
