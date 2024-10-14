<template>
	<view class="dome1">
		<view class="common">
			<text class="text">（1）水平垂直居中布局</text>
			<view class="bigBox">
				<view class="box"></view>
			</view>
		</view>

		<view class="common">
			<text class="text">（2）两点水平居中，垂直方向靠近分别靠近两端。</text>
			<view class="bigBox">
				<view class="box"></view>
				<view class="box"></view>
			</view>
		</view>

		<view class="common">
			<text class="text">（3）三色子布局。</text>
			<view class="bigBox">
				<view class="box"></view>
				<view class="box"></view>
				<view class="box"></view>
			</view>
		</view>

		<view class="common">
			<text class="text">（4）4点分别在四个角。</text>
			<view class="bigBox">
				<div class="sbBox">
					<view class="box"></view>
					<view class="box"></view>
				</div>
				<div class="sbBox">
					<view class="box"></view>
					<view class="box"></view>
				</div>
			</view>
		</view>

		<text>内容二：固定大小布局</text>
		<view class="regular">
			<div class="sbBox">
				<view class="box"></view>
				<view class="box"></view>
			</div>
			<view class="box"></view>
		</view>
	</view>

	<text>内容三：网格布局</text>
	<text>1/2、1/3、1/4数字表示该元素所占宽度的固定比例，auto平均分配剩余宽度</text>
	<view class="grid">
		<view class="one">
			<view class="box">1/2</view>
			<view class="box">1/2</view>
		</view>
		<view class="two">
			<view class="box">1/2</view>
			<view class="box">auto</view>
			<view class="box">auto</view>
		</view>

		<view class="three">
			<view class="box">auto</view>
			<view class="box">1/3</view>
		</view>

		<view class="four">
			<view class="box">auto</view>
			<view class="box">auto</view>
			<view class="box">1/4</view>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
	.dome1 {
		& > view {
			margin: 50rpx;
		}
		.common {
			.bigBox {
				width: 400rpx;
				height: 400rpx;
				background-color: bisque;
				display: flex;
				.box {
					width: 100rpx;
					height: 100rpx;
					background-color: aqua;
				}
			}
		}

		& > view:nth-child(1) {
			.bigBox {
				justify-content: center;
				align-items: center;
			}
		}

		& > view:nth-child(2) {
			.bigBox {
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
		}

		& > view:nth-child(3) {
			.bigBox {
				justify-content: space-between;
				.box:nth-child(2) {
					align-self: center;
				}
				.box:nth-child(3) {
					align-self: flex-end;
				}
			}
		}

		& > view:nth-child(4) {
			.bigBox {
				justify-content: space-between;
				.sbBox {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
			}
		}

		.regular {
			width: 500rpx;
			height: 100rpx;
			background-color: bisque;
			display: flex;
			justify-content: space-between;
			.box {
				width: 100rpx;
				height: 100rpx;
				background-color: aqua;
			}
			.sbBox {
				flex: 1;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.grid {
		background-color: bisque;
		padding: 20rpx;
		.one {
			padding: 20rpx 0;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 10px;
			.box {
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: aqua;
			}
		}
		.two {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 10rpx;
			padding: 20rpx 0;
			.box {
				height: 100rpx;
				background-color: aqua;
				display: flex;
				justify-content: center;
				align-items: center;
				&:nth-child(1) {
					grid-column: 1 / 3;
				}
			}
		}
		.three {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 10rpx;
			padding: 20rpx 0;

			.box {
				height: 100rpx;
				background-color: aqua;
				display: flex;
				justify-content: center;
				align-items: center;
				&:nth-child(1) {
					grid-column: 1 / 3;
				}
			}
		}

		.four {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 10rpx;
			padding: 20rpx 0;
			.box {
				height: 100rpx;
				background-color: aqua;
				display: flex;
				justify-content: center;
				align-items: center;
				&:nth-child(1) {
					grid-column: auto;
				}
				&:nth-child(2) {
					grid-column: auto;
				}
				&:nth-child(3) {
					grid-column: 4/5;
				}
			}
		}
	}
</style>
