<template>
	<van-swipe :autoplay="3000" lazy-render>
		<van-swipe-item v-for="image in homeBanner" class="aaa">
			<van-image width="100%" :src="image.i" />
		</van-swipe-item>
	</van-swipe>

	<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		<div class="list-card">
			<div class="item-card" v-for="item in homeRecommend" :key="item.id">
				<RecipeCard v-if="item.type === 1" :r="item" />
				<NoteCard v-if="item.type === 3" :note="item" />
				<AdvertisementCard v-if="item.type === 300" :dsp="item" />
			</div>
		</div>
	</van-list>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { getHomeRecommend } from '@/apis/api';
import RecipeCard from '@/components/RecipeCard.vue';
import NoteCard from '@/components/NoteCard.vue';
import AdvertisementCard from '@/components/AdvertisementCard.vue';

// 初始化获取数据
// banner推荐轮播图列表
const homeBanner = ref([]);
// 推荐列表
let homeRecommend = ref([]);
// 更新偏移量
let offset = ref(0);

// vant列表组件加载更多
const loading = ref(true);
const finished = ref(false);

const recommendList = async () =>
	await getHomeRecommend({ offset: offset.value * 10 })
		.then((res) => {
			homeBanner.value = res.data.result.banner;
			homeRecommend.value = [...homeRecommend.value, ...res.data.result.list];

			//
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

// 组件创建的时候调用
onMounted(() => {
	recommendList();
});

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	recommendList();
};
</script>

<style lang="scss" scoped>
.list-card {
	background-color: #9e9e9e40;
	padding: 0 0.8rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 0.8rem;
	justify-content: space-evenly;
	.item-card {
		width: 100%;
		aspect-ratio: 1/2;
		display: flex;
		flex-direction: column;
		// 四角变圆滑
		border-radius: 0.8rem;
		background-color: #fff;
		margin: 2rem 0;
	}
}
</style>
