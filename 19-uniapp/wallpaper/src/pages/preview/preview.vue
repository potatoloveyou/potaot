<template>
	<view class="preview" v-if="currentInfo">
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
					<view class="text">{{ currentInfo.score }}分</view>
				</view>

				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="28" />
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<uni-popup ref="infoPopup" type="bottom" :safe-area="false">
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
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable class="value">{{ currentInfo._id }}</text>
						</view>

						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{ currentInfo.nickname }}</text>
						</view>
						<view class="row">
							<text class="label">评分：</text>
							<view class="value rateBox">
								<uni-rate readonly touchable :value="currentInfo.score" size="16" />
								<text class="score">{{ currentInfo.score }}分</text>
							</view>
						</view>
						<view class="row">
							<text class="label">摘要：</text>
							<view class="value">
								{{ currentInfo.description }}
							</view>
						</view>
						<view class="row">
							<text class="label">标签：</text>
							<view class="value tabs">
								<view class="tab" v-for="tab in currentInfo.tabs" :key="tab">
									{{ tab }}
								</view>
							</view>
						</view>
						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>

						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="scorePopup" type="center" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{ isScore ? '评分过了' : '壁纸评分' }}</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="=18" color="#999" />
					</view>
				</view>

				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore" disabled-color="#ffca3e" />
					<text class="text">{{ userScore }}分</text>
				</view>
				<view class="footer">
					<button type="default" size="mini" :disabled="!userScore || isScore" @click="submitScore">确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad, onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
	import { getStatusBarHeight } from '@/utils/system';
	import { getSetupScore, getWallDownload, getDetailWall } from '@/apis/api';

	import { useWellListStore } from '@/stores/wellList';
	const wellListStore = useWellListStore();

	const classList = ref([]);
	const wallNewList = wellListStore.wallNewList || [];

	// 给接口获取的对象中添加picurl大图地址
	const addPicurl = (list) =>
		list.map((item) => {
			return {
				...item,
				picurl: item.smallPicurl.replace('_small.webp', '.jpg'),
			};
		});
	classList.value = addPicurl(wallNewList);

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

	// 判断是否有评分
	const isScore = ref(false);

	// 打开评分弹窗
	const scorePopup = ref(null);
	const clickScore = () => {
		if (currentInfo.value.userScore) {
			isScore.value = true;
			userScore.value = currentInfo.value.userScore;
		}
		scorePopup.value.open();
	};

	// 确认评分时的值
	const userScore = ref(0);
	// 关闭评分弹窗
	const clickScoreClose = () => {
		scorePopup.value.close();
		userScore.value = 0;
		isScore.value = false;
	};

	// 提交评分
	const submitScore = async () => {
		uni.showLoading({
			title: '评分中',
		});
		let { classid, _id: wallId } = currentInfo.value;
		let res = await getSetupScore({
			classid,
			wallId,
			userScore: userScore.value,
		});
		uni.hideLoading();
		if (res.errCode === 0) {
			uni.showToast({
				title: '评分成功',
				icon: 'none',
			});
			classList.value[currentIndex.value].userScore = userScore.value;
			wellListStore.wallNewList = classList.value;
			clickScoreClose();
		}
		console.log(userScore.value);
	};

	// 返回上一页
	const goBack = () => {
		uni.navigateBack({
			success: (res) => {},
			fail: (err) => {
				uni.reLaunch({ url: '/pages/index/index' });
			},
		});
	};

	// 存储已看过的图片
	const readImgs = ref([]);
	// 当前壁纸id
	const currentId = ref(null);
	// 当前壁纸索引
	const currentIndex = ref(0);

	// 当前壁纸信息
	const currentInfo = ref(null);

	const readImgsFun = () => {
		readImgs.value.push(
			currentIndex.value <= 0 ? currentIndex.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			currentIndex.value >= currentIndex.value.length - 1 ? 0 : currentIndex.value + 1,
		);
		readImgs.value = [...new Set(readImgs.value)];
	};

	onLoad(async (event) => {
		currentId.value = event.id;
		// event.type=="share"?
		if (event.type == 'share') {
			let res = await getDetailWall({ id: currentId.value });
			console.log(res);
			classList.value = addPicurl(res.data);
		}
		currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
		readImgsFun();
		currentInfo.value = classList.value[currentIndex.value];
	});

	// 滑动时修改当前索引值
	const swiperChange = (e) => {
		currentIndex.value = e.detail.current;
		readImgsFun();
		currentInfo.value = classList.value[currentIndex.value];
	};

	//点击下载
	const clickDownload = async () => {
		// #ifdef H5
		uni.showModal({
			content: '请右键保存壁纸',
			showCancel: false,
		});
		// #endif

		// #ifndef H5
		try {
			uni.showLoading({
				title: '下载中...',
				mask: true,
			});
			let { classid, _id: wallId } = currentInfo.value;
			let res = await getWallDownload({
				classid,
				wallId,
			});
			if (res.errCode != 0) throw res;
			// 获取图片信息
			uni.getImageInfo({
				// 获得图片临时地址
				src: currentInfo.value.picurl,
				success: (res) => {
					// 下载图片
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: (res) => {
							uni.showToast({
								title: '保存成功，请到相册查看',
								icon: 'none',
							});
						},
						fail: (err) => {
							if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title: '保存失败，请重新点击下载',
									icon: 'none',
								});
								return;
							}
							uni.showModal({
								title: '授权提示',
								content: '需要授权保存相册',
								success: (res) => {
									if (res.confirm) {
										uni.openSetting({
											success: (setting) => {
												console.log(setting);
												if (setting.authSetting['scope.writePhotosAlbum']) {
													uni.showToast({
														title: '获取授权成功',
														icon: 'none',
													});
												} else {
													uni.showToast({
														title: '获取权限失败',
														icon: 'none',
													});
												}
											},
										});
									}
								},
							});
						},
						complete: () => {
							uni.hideLoading();
						},
					});
				},
			});
		} catch (err) {
			console.log(err);
			uni.hideLoading();
		}
		// #endif
	};

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: `咸虾米壁纸-`,
			path: `/pages/preview/preview?id=${currentId.value}&type=share`,
		};
	});

	// 分享朋友圈
	onShareTimeline(() => {
		return {
			title: '咸虾米壁纸',
			imageUrl: '/static/images/xxmLogo.png',
			query: `id=${currentId.value}&type=share`,
		};
	});
</script>

<style lang="scss" scoped>
	::v-deep .uni-popup__wrapper-box {
		padding-bottom: 0 !important;
	}

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

					.tabs {
						display: flex;
						flex-wrap: wrap;

						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}

					.class {
						color: $brand-theme-color;
					}
				}

				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #f6f6f6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
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
