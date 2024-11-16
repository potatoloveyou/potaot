<template>
	<view class="shop-list">
		<!-- #ifdef MP-WEIXIN -->
		<view class="search-nav">
			<uni-search-bar
				class="uni-mt-10"
				radius="20"
				placeholder="nike"
				clearButton="auto"
				cancelButton="none"
				v-model="queryParams.keyword"
				@confirm="search" />
			<view class="search-init" @click="goSearchList">筛选</view>
		</view>
		<!-- #endif -->
		<view class="shop-top f-color">
			<view class="shop-item" v-for="(item, index) in shopList.data" :key="index" @click="changTab(index)">
				<view :class="shopList.currentIndex == index ? 'f-active-color' : ''">{{ item.name }}</view>
				<view class="shop-icon">
					<view class="iconfont icon-xialajiantou1 up" :class="item.status == 1 ? 'f-active-color' : ''"></view>
					<view class="iconfont icon-shanglajiantou down" :class="item.status == 2 ? 'f-active-color' : ''"></view>
				</view>
			</view>
		</view>
		<Lines />

		<CommodityList :dataList="dataList" />
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad, onReady } from '@dcloudio/uni-app';
import Lines from '@/components/common/Lines.vue';
import CommodityList from '@/components/common/CommodityList.vue';

import { getGoodsSearch } from '@/api/apis.ts';

const props = defineProps({
	keyword: {
		type: String,
		default: '',
	},
});

//查询参数
const queryParams = ref({
	// 搜索关键词
	keyword: '',
});

const dataList = ref([]);
const getGoodsSearchData = async () => {
	try {
		const res = await getGoodsSearch({ ...queryParams.value, pprice: 1 });
		dataList.value = res.data;
		// console.log(res.data);
	} catch (e) {
		console.log(e);
	}
};

onLoad((event) => {
	let { keyword } = event;
	queryParams.value.keyword = keyword;
	getGoodsSearchData();
});

const search = (res) => {
	console.log(queryParams.value);
};

const goSearchList = () => {
	console.log(123);
};

const shopList = ref({});
shopList.value = {
	currentIndex: 0,
	data: [
		{
			name: '价格',
			status: 1,
		},
		{
			name: '折扣',
			status: 0,
		},
		{
			name: '品牌',
			status: 0,
		},
	],
};

// 点击排序状态切换
const changTab = (index) => {
	// 旧的索引值
	const idx = shopList.value.currentIndex;
	// 旧的索引对应的data
	const item = shopList.value.data[idx];

	if (idx == index) {
		return (item.status = item.status == 1 ? 2 : 1);
	}

	// 新的index对应的data
	const newItem = shopList.value.data[index];
	// 把旧的data的status变回0
	item.status = 0;
	// 修改currentIndex为新的index
	shopList.value.currentIndex = index;
	// 把新的data的status修改为1
	newItem.status = 1;
};
</script>

<style scoped lang="scss">
.df-jcc-aic {
	display: flex;
	justify-content: center;
	align-items: center;
}

.shop-list {
	.search-nav {
		width: 100%;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		@extend .df-jcc-aic;
		.uni-mt-10 {
			flex: 1;
		}
		.search-init {
			font-size: 32rpx;
			padding: 0 40rpx 0 20rpx;
		}
	}
	.shop-top {
		@extend .df-jcc-aic;
		padding: 10rpx 0;
		.shop-item {
			flex: 1;
			@extend .df-jcc-aic;
			height: 80rpx;
			.shop-icon {
				margin-left: 10rpx;
				.iconfont {
					width: 16rpx;
					height: 16rpx;
					font-size: 20rpx;
				}
				.up {
				}
				.down {
				}
			}
		}
	}
}
</style>
