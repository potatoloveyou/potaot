<template>
	<view class="userLayout">
		<view class="userInfo">
			<view class="avater">
				<image src="@/static/images/xxmLogo.png" mode="scaleToFill" />
			</view>
			<view class="ip">192.168.80.123</view>
			<view class="address">来自于：广州</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>

				<view class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">我的评分</view>
					</view>

					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>

				<view class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">联系客服</view>
					</view>

					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->

					<!-- #ifdef WEB -->
					<button @click="clickContact">电话联系</button>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row" v-for="item in 2" :key="item">
					<view class="left">
						<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">我的下载</view>
					</view>

					<view class="right">
						<view class="text">33 </view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	const clickContact = () => {
		uni.makePhoneCall({
			phoneNumber: '123456789',
			success: () => {
				console.log('成功拨打电话');
			},
		});
	};
</script>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 50rpx 0;
			.avater {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.ip {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}
			.address {
				font-size: 28rpx;
				color: #aaa;
			}
		}

		.section {
			margin: 50rpx 30rpx;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
			.list {
				.row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30rpx;
					height: 100rpx;
					border-bottom: 1px solid #eee;
					position: relative;
					&:last-child {
						border-bottom: none;
					}
					.left {
						display: flex;
						align-items: center;
						.text {
							padding-left: 20rpx;
							color: #666;
						}
					}
					.right {
						display: flex;
						align-items: center;
						.text {
							font-size: 28rpx;
							color: #aaa;
						}
					}
					button {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
				}
			}
		}
	}
</style>
