<template>
	<view class="preview">
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="scaleToFill" />
				<!-- <image v-if="(index == currentIndex)" @click="maskChange" :src="item.picurl" mode="scaleToFill" /> -->
			</swiper-item>
		</swiper>

		<view class="mask" v-show="maskCState">
			<view class="goBack" :style="`top: ${getStatusBarHeight}px`" @click="goBack">
				<uni-icons type="back" color="#fff" size="20" />
			</view>
			<view class="count">{{ currentIndex + 1 }} / {{ classList.length }}</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm" />
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日" />
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28" />
					<view class="text">信息</view>
				</view>

				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28" />
					<view class="text">{{ userScore }}</view>
				</view>

				<view class="box">
					<uni-icons type="download" size="28" />
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="=18" color="#999" />
					</view>
				</view>

				<scroll-view scroll-y>
					<view class="content">
						<view class="row" v-for="item in 5">
							<view class="label">壁纸ID: </view>
							<text class="value">1234567890</text>
						</view>
						<view class="row">
							<view class="label">评分: </view>
							<view class="value rateBox">
								<uni-rate readonly :value="userScore" size="16" />
								<text class="score">{{ userScore }}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="scorePopup" type="center" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="=18" color="#999" />
					</view>
				</view>

				<view class="content">
					<uni-rate v-model="userScore" allowHalf />
					<text class="text">{{ userScore }}分</text>
				</view>
				<view class="footer">
					<button type="default" size="mini" :disabled="!userScore" @click="submitScore">确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getStatusBarHeight } from '@/utils/system';

	import { useWellListStore } from '@/stores/wellList';
	const wellListStore = useWellListStore();

	const classList = ref([]);
	const wallNewList = wellListStore.wallNewList || [];
	classList.value = wallNewList.map((item) => {
		return {
			...item,
			picurl: item.smallPicurl.replace('_small.webp', '.jpg'),
		};
	});
	console.log(classList.value);

	const userScore = ref(0);

	// 点击照片全屏
	const maskCState = ref(true);
	const maskChange = () => {
		maskCState.value = !maskCState.value;
	};

	// 打开info弹窗
	const infoPopup = ref(null);
	const clickInfo = () => {
		infoPopup.value.open();
	};
	// 关闭info弹窗
	const clickInfoClose = () => {
		infoPopup.value.close();
	};

	// 打开评分弹窗
	const scorePopup = ref(null);
	const clickScore = () => {
		// console.log('score');
		scorePopup.value.open();
	};
	// 关闭评分弹窗
	const clickScoreClose = () => {
		scorePopup.value.close();
	};

	// 提交评分
	const submitScore = () => {
		// scorePopup.value.close();
		console.log('确认评分');
	};

	// 返回上一页
	const goBack = () => {
		uni.navigateBack();
	};

	// 存储已看过的图片
	const readImgs = ref([]);
	// 当前壁纸id
	const currentId = ref(null);
	// 当前壁纸索引
	const currentIndex = ref(0);

	const readImgsFun = () => {
		readImgs.value.push(
			currentIndex.value <= 0 ? currentIndex.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			currentIndex.value >= currentIndex.value.length - 1 ? 0 : currentIndex.value + 1,
		);
		readImgs.value = [...new Set(readImgs.value)];
	};

	onLoad((event) => {
		currentId.value = event.id;
		currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
		readImgsFun();
	});

	// 滑动时修改当前索引值
	const swiperChange = (e) => {
		currentIndex.value = e.detail.current;
		readImgsFun();
	};
</script>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;
		swiper {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.mask {
			& > view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content;
			}
			.goBack {
				width: 38px;
				height: 38px;
				background-color: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100px;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.count {
				top: 10vh;
				background-color: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}
			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}
			.date {
				font-style: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}
			.footer {
				background-color: rgba(255, 255, 255, 0.8);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(10rpx);
				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rpx 12rpx;
					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
				.box {
					.text {
					}
				}
				.box {
					.text {
					}
				}
			}
		}
	}

	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}
		.close {
			padding: 6rpx;
		}
	}

	.infoPopup {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		.popHeader {
			.title {
			}
			.close {
			}
		}

		.content {
			.row {
				.label {
				}
				.value {
				}
			}
			.row {
				.label {
				}
				.value {
					.score {
					}
				}
				.rateBox {
				}
			}
		}

		scroll-view {
			max-height: 60vh;
			.content {
				.row {
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label {
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value {
						flex: 1;
						width: 0;
					}
					.rateBox {
						display: flex;
						align-items: center;
						.score {
							font-size: 26rpx;
							color: $text-font-color-2;
							padding-left: 10px;
						}
					}
				}
			}
		}
	}
	.scorePopup {
		background-color: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.popHeader {
			.title {
			}
			.close {
			}
		}
		.content {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text {
				color: #ffca3e;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer {
			padding: 10rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			button {
			}
		}
	}
</style>
