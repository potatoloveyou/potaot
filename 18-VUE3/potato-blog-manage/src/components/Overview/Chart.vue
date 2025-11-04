<template>
	<!-- <div class="grid grid-rows-[auto_auto] gap-y-4"> -->
	<div class="grid grid-rows-[1fr_1fr] gap-y-4">
		<div class="bg-white rounded-lg !p-4 h-80 grid grid-rows-[auto_1fr]">
			<div class="flex justify-between items-center">
				<span class="!text-[1.2rem]">访问量</span>
				<el-radio-group v-model="visits" size="default" fill="#2B5AED" @change="getVisit">
					<el-radio-button label="近一周" value="week" />
					<el-radio-button label="近一月" value="month" />
				</el-radio-group>
			</div>
			<Line :data="lineData" />
		</div>
		<div class="bg-white rounded-lg !p-4 grid grid-rows-[auto_1fr]">
			<div class="flex justify-between items-center">
				<span class="!text-[1.2rem]">数据监控</span>
				<el-radio-group v-model="monitor" size="default" fill="#2B5AED">
					<el-radio-button label="近一周" value="week" />
					<el-radio-button label="近一月" value="month" />
				</el-radio-group>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { visit } from '@/mock/mock';

import Line from '@/components/Overview/Chart/Line.vue';

const visits = ref('week');
const monitor = ref('week');

const lineData = ref([]);
// 访问量
const getVisit = async (value: string | number | boolean) => {
	let res = await visit.data;
	if (value === 'week') {
		res = res.slice(0, 7);
	}
	lineData.value = res;
};

onMounted(() => {
	getVisit(visits.value);
});
</script>

<style lang="scss" scoped></style>
