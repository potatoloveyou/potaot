<template>
	<div class="Activities">
		<div class="notice">
			<div class="notice-text">公告</div>
			<van-swipe style="height: 1.5rem" :autoplay="2000" vertical :show-indicators="false" class="homeBanner">
				<van-swipe-item v-for="homeBanner in homeBanners" class="homeBanner-item">
					<!-- <span class="item-nickname">{{ homeBanner.nickname }}</span> -->
					<van-text-ellipsis :content="homeBanner.nickname" class="item-name" />
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
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { getActivities } from '@/apis/api';
import ActivityCard from '@/components/Home/HomeActivity/ActivityCard.vue';

// vant列表组件加载更多
const loading = ref(false);
const finished = ref(false);

// 更新偏移量
let offset = ref(0);
// banner推荐轮播图列表
const homeBanners = ref([]);
const ongoings = ref([]);
const endeds = ref([]);
// 是否无数据
const isData = ref(false);

const ActivitiesList = async () => {
	await getActivities({ offset: offset.value * 20 })
		.then((res) => {
			homeBanners.value = [...homeBanners.value, ...res.data.data.banner];
			ongoings.value = [...ongoings.value, ...res.data.data.ongoing.events];
			endeds.value = [...endeds.value, ...res.data.data.ended.events];
			if (res.data.result.end == 1) {
				isData.value = true;
			}
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

// // 组件创建的时候调用
// onMounted(() => {
// 	ActivitiesList();
// });

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	// ActivitiesList();
	if (!isData.value) {
		ActivitiesList();
	}
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
</style>
