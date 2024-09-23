<template>
	<view class="classList">
		<view class="loadingLayout" v-if="!wellListStore.wallNewList.length && !isData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator
				:url="`/pages/preview/preview?id=${wall._id}`"
				class="item"
				v-for="wall in wellListStore.wallNewList"
				:key="wall._id">
				<image :src="wall.smallPicurl" mode="scaleToFill" />
			</navigator>
		</view>
		<view class="loadingLayout" v-if="wellListStore.wallNewList.length || isData">
			<uni-load-more :status="isData ? 'noMore' : 'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
	import { getWallList } from '@/apis/api';

	import { gotoHome } from '@/utils/common';

	import { useWellListStore } from '@/stores/wellList';
	const wellListStore = useWellListStore();

	const isData = ref(false);
	// 分类中壁纸列表（分类详情）
	// const wallList = ref([]);
	const getWall = async () => {
		const res = await getWallList(queryparams.value);
		wellListStore.wallNewList = [...wellListStore.wallNewList, ...res.data];
		queryparams.value.pageSize > res.data.length ? (isData.value = true) : '';
		console.log(wellListStore.wallNewList);
	};

	const queryparams = ref({
		classid: null,
		pageNum: 1,
		pageSize: 12,
	});
	const pageName = ref('');

	onLoad((event) => {
		const { classid = null, name = null } = event;
		classid ? '' : gotoHome();
		queryparams.value.classid = classid;
		pageName.value = name;
		getWall();
		uni.setNavigationBarTitle({
			title: name,
		});
		console.log(event.name);
	});

	onUnload(() => {
		wellListStore.wallNewList = [];
	});

	onReachBottom(() => {
		if (isData.value) return;
		queryparams.value.pageNum++;
		getWall();
	});

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: `咸虾米壁纸-${pageName.value}`,
			path: `/pages/classlist/classlist?classid=${queryparams.value.classid}&name=${pageName.value}`,
		};
	});

	// 分享朋友圈
	onShareTimeline(() => {
		return {
			title: '咸虾米壁纸',
			imageUrl: '/static/images/xxmLogo.png',
			query: `classid=${queryparams.value.classid}&name=${pageName.value}`,
		};
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
