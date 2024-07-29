<template>
	<!-- 首页活动 -->
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

		<div class="Activities">
			<div class="notice">
				<div class="notice-text">公告</div>
				<van-swipe style="height: 1.5rem" :autoplay="3000" vertical :show-indicators="false" class="homeBanner">
					<van-swipe-item v-for="homeBanner in homeBanners" class="homeBanner-item">
						<span class="item-nickname">{{ homeBanner.nickname }}</span>
						<span class="regular-text">刚参加了活动</span>
						<van-text-ellipsis :content="homeBanner.name" class="item-name" />
					</van-swipe-item>
				</van-swipe>
			</div>

			<div class="ongoing">
				<!-- 进行中活动 -->
				<div class="title">热门活动上线中</div>
				<div class="item-card" v-for="ongoing in ongoings" :key="ongoing.id">
					<ActivityCard :events="ongoing" />
				</div>
			</div>

			<div class="ended">
				<div class="title">往期回顾</div>

				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div class="item-card" v-for="ended in endeds" :key="ended.id">
						<ActivityCard :events="ended" />
					</div>
				</van-list>
			</div>
		</div>
	</van-pull-refresh>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

import { getActivities } from '@/apis/api';
import ActivityCard from '@/components/HomeActivity/ActivityCard.vue';

// banner推荐轮播图列表
const homeBanners = ref([]);
const ongoings = ref([]);
const endeds = ref([]);

// 更新偏移量
let offset = ref(0);

// vant列表组件加载更多
const loading = ref(true);
const finished = ref(false);

const ActivitiesList = async () => {
	await getActivities({ offset: offset.value * 20 })
		.then((res) => {
			homeBanners.value = [...homeBanners.value, ...res.data.data.banner];
			ongoings.value = [...ongoings.value, ...res.data.data.ongoing.events];
			endeds.value = [...endeds.value, ...res.data.data.ended.events];

			nextTick(() => {
				offset.value++;
				// console.log(123);
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
};

// 组件创建的时候调用
onMounted(() => {
	ActivitiesList();
});

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	ActivitiesList();
};

const isLoading = ref(false);

// 下拉刷新
const onRefresh = async () => {
	// 生成一个随机整数，范围从0~20
	let random_integer = Math.floor(Math.random() * 15);
	console.log(random_integer);
	offset.value = random_integer;

	// await getHomeRecommend({ offset: offset.value * 10 }).then((res) => {
	// 	homeRecommend.value = res.data.result.list;
	// });
	await getActivities({ offset: offset.value * 20 }).then((res) => {
		homeBanners.value = res.data.data.banner;
		ongoings.value = res.data.data.ongoing.events;
		endeds.value = res.data.data.ended.events;
	});

	isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.Activities {
	padding: 0 0.8rem;

	.notice {
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		padding: 0.6rem 0.6rem;
		.notice-text {
			background-color: #ffc533;
			padding: 0.1rem 0.2rem;
			font-size: 0.8rem;
			font-weight: bolder;
			border-radius: 0 0.5rem 0 0.5rem;
		}
		.homeBanner {
			margin-left: 0.6rem;
			flex: 1;
			.homeBanner-item {
				display: flex;

				.item-nickname {
					// flex: 1;
					font-weight: bolder;
				}
				// .regular-text {
				// }
				.item-name {
					flex: 1;
					font-weight: bolder;
				}
			}
		}
	}
	.title {
		font-size: 1.2rem;
		font-weight: bolder;
		padding: 0.6rem 0;
	}
	.item-card {
		margin: 1rem 0;
	}
}

.loading {
	width: 4rem;
	height: 4rem;
}
</style>
