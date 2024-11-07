<template>
	<view>
		<!-- <view class="smart-padding-wrap">
			<button type="primary">页面主操作 normal</button>
			<button type="primary" :loading="true">页面主操作 loading</button>
			<button type="primary" disabled="false">页面主操作 disabled</button>

			<button type="default">页面次操作 normal</button>
			<button type="default" disabled="false">页面次操作 disabled</button>
			<button type="warn">页面警告操作 warn</button>
			<button type="default" disabled="false">页面警告操作</button>

			<button type="primary" size="mini" class="mini-btn">按钮</button>
			<button type="default" size="mini" class="mini-btn">按钮</button>
			<button type="warn" size="mini" class="mini-btn">按钮</button>
		</view> -->
		<!-- <view class="smart-padding-wrap">
			<button type="primary" v-if="isLogin" @click="isLogin = false">登录</button>
			<button type="primary" :loading="true" v-else="false">登录中</button>
		</view> -->

		<!-- <view class="smart-page-head">
			<view class="smart-page-head-title">checkbox，多选按钮</view>
		</view>
		<view class="smart-padding-wrap">
			<view class="item">
				<checkbox :checked="true" />
				选中
			</view>
			<checkbox :checked="false" />
			未选中
		</view> -->

		<!-- <view class="item">
			<checkbox :checked="true" color="#F0AD4E" style="transform: scale(0.7)" />
			选中
			<checkbox color="#F0AD4E" style="transform: scale(0.7)" />
			未选中
		</view> -->

		<!-- <view class="item">
			推荐展示样式：
			<checkbox-group>
				<label class="list">
					<view>
						<checkbox />
						中国
					</view>
				</label>
				<label class="list">
					<view>
						<checkbox />
						美国
					</view>
				</label>
				<label class="list">
					<view>
						<checkbox />
						日本
					</view>
				</label>
			</checkbox-group>
		</view> -->

		<view class="item">
			请选择您的兴趣爱好：
			<checkbox-group @change="handleChange">
				<label class="list">
					<view>
						<checkbox value="阅读" />
						阅读
					</view>
				</label>
				<label class="list">
					<view>
						<checkbox value="旅行" />
						旅行
					</view>
				</label>
				<label class="list">
					<view>
						<checkbox value="编程" />
						编程
					</view>
				</label>
				<label class="list">
					<view>
						<checkbox value="音乐" />
						音乐
					</view>
				</label>
			</checkbox-group>
		</view>

		您选择的兴趣爱好有：
		<view v-if="hobbise.length">{{ hobbise }}</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const isLogin = ref(true);

	const hobbise = ref([]);
	const handleChange = (e) => {
		// console.log(e);
		hobbise.value = e.detail.value;
	};
</script>

<style lang="scss" scoped>
	// button {
	// 	margin-top: 30rpx;
	// 	margin-bottom: 30rpx;
	// }
	// .min-btn {
	// 	margin-right: 30rpx;
	// }
	.item {
		margin-bottom: 30rpx;
	}
	.list {
		justify-content: flex-start;
		padding: 22rpx 30rpx;
	}
	.list view {
		padding-bottom: 20rpx;
		// border-bottom: 1px solid #d8d8d8;
	}
</style>
