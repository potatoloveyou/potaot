<template>
	<view class="classList">
		<view class="loadingLayout" v-if="!wallList.length && !isData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator url="/pages/preview/preview" class="item" v-for="wall in wallList" :key="wall._id">
				<image :src="wall.smallPicurl" mode="scaleToFill" />
			</navigator>
		</view>

		<view class="loadingLayout">
			<uni-load-more :status="isData ? 'noMore' : 'loading' "></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad, onReachBottom } from '@dcloudio/uni-app';
	import { getWallList } from '@/apis/api';

	const isData = ref(false);
	// 分类中壁纸列表（分类详情）
	const wallList = ref([]);
	const getWall = async () => {
		const res = await getWallList(queryparams.value);
		wallList.value = [...wallList.value, ...res.data];
		queryparams.value.pageSize > res.data.length ? (isData.value = true) : '';
		console.log(wallList.value);
	};

	const queryparams = ref({
		classid: null,
		pageNum: 1,
		pageSize: 12,
	});
	onLoad((event) => {
		const { classid = null, name = null } = event;
		queryparams.value.classid = classid;
		getWall();
		uni.setNavigationBarTitle({
			title: name,
		});
	});

	onReachBottom(() => {
		if (isData.value) return;
		queryparams.value.pageNum++;
		getWall();
	});
</script>

<style lang="scss" scoped>
	.classList {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;
			.item {
				height: 440rpx;
				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>
