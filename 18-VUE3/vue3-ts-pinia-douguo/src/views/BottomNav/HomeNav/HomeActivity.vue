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

		<Activity />
	</van-pull-refresh>
</template>

<script setup>
import { ref } from 'vue';
// import { getActivities } from '@/apis/api';

import Activity from '@/components/Home/HomeActivity/Activity.vue';

// 更新偏移量
let offset = ref(0);
const isLoading = ref(false);
// 下拉刷新
const onRefresh = async () => {
	// 生成一个随机整数，范围从0~20
	let random_integer = Math.floor(Math.random() * 15);
	console.log(random_integer);
	offset.value = random_integer;

	isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.loading {
	width: 4rem;
	height: 4rem;
}
</style>
