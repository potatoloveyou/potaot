<template>
	<view class="noticeLayout">
		<view class="title">
			<!-- v-if="detail.select" -->
			<view class="tag">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<!-- {{ detail.title }} -->
			<view class="font"></view>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss" scoped>
	.noticeLayout {
		padding: 30rpx;
		.title {
			font-size: 40rpx;
			color: #111;
			line-height: 1.6em;
			padding-bottom: 30rpx;
			display: flex;
			.tag {
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;
			}
			.font {
				padding-left: 6rpx;
			}
		}
	}
</style>
