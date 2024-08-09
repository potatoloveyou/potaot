<template>
	<!-- 首页笔记 -->
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

		<div class="topics">
			<div class="firstArray topics-arr">
				<div v-for="first in noteTopics[0]" :key="first.id">#{{ first.name }}</div>
			</div>
			<div class="secondArray topics-arr">
				<div v-for="second in noteTopics[1]" :key="second.id">#{{ second.name }}</div>
			</div>
		</div>

		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="list-card">
				<div class="item-card" v-for="item in noteList" :key="item.id">
					<NotesCard v-if="item.type === 1" :note="item" />
				</div>
			</div>
		</van-list>
	</van-pull-refresh>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNotes } from '@/apis/api';
import NotesCard from '@/components/Home/HomeNotes/NotesCard.vue';

// vant列表组件加载更多
const loading = ref(true);
const finished = ref(false);

const noteList = ref([]);
const noteTopics = ref([]);
// 更新偏移量
let offset = ref(0);

const notesList = async () => {
	await getNotes().then((res) => {
		noteTopics.value = res.data.result.topics;
		noteList.value = [...noteList.value, ...res.data.result.list];
	});
};

// 组件创建的时候调用
onMounted(() => {
	notesList();
});

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	notesList();
};

const isLoading = ref(false);

// 下拉刷新
const onRefresh = async () => {
	// 生成一个随机整数，范围从0~20
	let random_integer = Math.floor(Math.random() * 15);
	console.log(random_integer);
	offset.value = random_integer;

	await getNotes().then((res) => {
		// homeRecommend.value = res.data.result.list;
		noteList.value = res.data.result.list;
	});

	isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.topics {
	font-size: 0.6rem;
	color: #51969f;
	font-weight: 800;
	padding: 0 0.8rem;
	overflow: hidden;

	.topics-arr {
		white-space: nowrap;
		overflow: hidden;
		display: flex;
		div {
			padding: 0.2rem;
			margin: 0.3rem;
			border-radius: 0.4rem;
			background-color: #51969f20;
		}
	}
}

.list-card {
	background-color: #9e9e9e15;
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
		margin: 0.5rem 0;
	}
}

.loading {
	width: 4rem;
	height: 4rem;
}
</style>
