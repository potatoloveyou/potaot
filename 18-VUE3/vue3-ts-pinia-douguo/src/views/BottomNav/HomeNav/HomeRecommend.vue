<template>
	<!-- home推荐 -->
	<van-pull-refresh v-model="isLoading" :head-height="60" @refresh="onRefresh">
		<template #pulling="props">
			<img src="@/assets/loading/1.svg" class="loading" alt="" />
		</template>
		<template #loosing>
			<img src="@/assets/loading/1.svg" class="loading" alt="" />
		</template>
		<template #loading>
			<img src="@/assets/loading/1.svg" class="loading" alt="" />
		</template>

		<van-swipe :autoplay="3000" lazy-render>
			<van-swipe-item v-for="image in homeBanners">
				<van-image width="100%" :src="image.i" />
			</van-swipe-item>
		</van-swipe>

		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="list-card">
				<div class="item-card" v-for="item in homeRecommend">
					<!-- 1	菜谱 -->
					<RecipeCard v-if="item.type === 1" :r="item" />
					<!-- 3	笔记 -->
					<NoteCard v-if="item.type === 3" :note="item" />
					<!-- 300	广告 -->
					<AdvertisementCard v-if="item.type === 300" :dsp="item" />
				</div>
			</div>
		</van-list>
	</van-pull-refresh>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { getHomeRecommend } from '@/apis/api';
import RecipeCard from '@/components/Home/HomeRecommend/RecipeCard.vue';
import NoteCard from '@/components/Home/HomeRecommend/NoteCard.vue';
import AdvertisementCard from '@/components/Home/HomeRecommend/AdvertisementCard.vue';

// vant列表组件加载更多
const loading = ref(false);
const finished = ref(false);

// 初始化获取数据
// banner推荐轮播图列表S
const homeBanners = ref([]);
// 推荐列表
let homeRecommend = ref([]);
// 更新偏移量
let offset = ref(0);
// 是否无数据
const isData = ref(false);

const recommendList = async () =>
	await getHomeRecommend({ offset: offset.value * 10 })
		.then((res) => {
			homeBanners.value = res.data.result.banner;
			homeRecommend.value = [...homeRecommend.value, ...res.data.result.list];
			if (res.data.result.end == 1) {
				isData.value = true;
			}

			nextTick(() => {
				offset.value++;
			});
		})
		.catch(() => {
			nextTick(() => {
				finished.value = true;
			});
		})
		.finally(() => {
			nextTick(() => {
				loading.value = false;
			});
		});

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	// recommendList();
	if (!isData.value) {
		recommendList();
	}
};

const isLoading = ref(false);
// 下拉刷新
const onRefresh = async () => {
	// 生成一个随机整数，范围从0~20
	let random_integer = Math.floor(Math.random() * 15);
	console.log(random_integer);
	offset.value = random_integer;

	await getHomeRecommend({ offset: offset.value * 10 }).then((res) => {
		homeRecommend.value = res.data.result.list;
	});

	isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.list-card {
	background-color: #9e9e9e15;
	padding: 0 0.8rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 0.8rem;
	.item-card {
		display: flex;
		flex-direction: column;
		// 四角变圆滑
		border-radius: 0.8rem;
		background-color: #fff;
		margin: 0.5rem 0;
	}
}

.loading {
	width: 4rem;
	height: 4rem;
}
</style>
