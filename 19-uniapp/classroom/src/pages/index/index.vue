<template>
	<view class="classRoom">
		<view class="scrollView">
			<scroll-view scroll-x>
				<view class="view1 common">
					<view class="text">李慧</view>
				</view>
				<view class="view2 common">
					<view class="text">221450204</view>
				</view>
				<view class="view3 common">
					<view class="text">21本软件工程(专升本)2班</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
	.classRoom {
		width: 100%;
		height: 100vh;
		.scrollView {
			width: 100%;
			height: 50vh;
			background-color: rgb(253, 218, 218);
			scroll-view {
				width: 100%;
				height: 100%;
				white-space: nowrap;
				.common {
					display: inline-block;
					width: 50%;
					height: 100%;
					border: 1px solid #000;
					box-sizing: border-box;
					position: relative;
					.text {
						position: absolute;7
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}
		}
	}
</style>
