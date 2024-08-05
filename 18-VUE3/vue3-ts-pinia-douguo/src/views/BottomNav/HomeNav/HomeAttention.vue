<template>
	<!-- 关注 -->
	<!-- notice	公告 -->
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

		<div class="notice">
			<h2>豆果美食，会做饭很酷~</h2>
			<p>你关注人的动态会出现在这里</p>
			<p>为你推荐了一些有趣的人，快关注TA们吧</p>
		</div>

		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="item-card" v-for="item in attention" >
				<AttentionCard :item="item" />
			</div>
		</van-list>
	</van-pull-refresh>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { getAttention } from '@/apis/api';
import AttentionCard from '@/components/Home/HomeAttention/AttentionCard.vue';

// attention关注列表
const attention = ref([]);
// 更新偏移量
let offset = ref(0);

// vant列表组件加载更多
const loading = ref(true);
const finished = ref(false);

const attentionList = async () => {
	await getAttention({ offset: offset.value * 10 })
		.then((res) => {
			attention.value = [...attention.value, ...res.data.result.rfs];
			// console.log(res.data.result.rfs);

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
};

// 组件创建的时候调用
onMounted(() => {
	attentionList();
});

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	attentionList();
};

const isLoading = ref(false);

// 下拉刷新
const onRefresh = async () => {
	// 生成一个随机整数，范围从0~20
	let random_integer = Math.floor(Math.random() * 15);
	offset.value = random_integer;

	await getAttention({ offset: offset.value * 10 }).then((res) => {
		attention.value = res.data.result.rfs;
	});

	isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.notice {
	background-color: #9e9e9e15;
	padding: 1rem 0.8rem;
	h2 {
		font-size: 1.2rem;
		font-weight: 600;
		padding-bottom: 0.5rem;
	}
	p {
		font-size: 0.8rem;
		color: #999;
	}
}

.loading {
	width: 4rem;
	height: 4rem;
}
</style>
