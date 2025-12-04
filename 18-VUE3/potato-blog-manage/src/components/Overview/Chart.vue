<template>
	<!-- 总览左侧echarts卡片 -->
	<div class="grid grid-rows-[1fr_1fr] gap-y-4">
		<WhiteContainer class="grid grid-rows-[auto_1fr]">
			<div class="flex justify-between items-center pb-4">
				<span class="text-[1.3rem]">访问量</span>
				<el-radio-group v-model="visits" size="default" fill="#2B5AED" @change="getVisit">
					<el-radio-button label="近一周" value="week" />
					<el-radio-button label="近一月" value="month" />
				</el-radio-group>
			</div>
			<Line :data="lineData" />
		</WhiteContainer>
		<WhiteContainer class="grid grid-rows-[auto_1fr]">
			<div class="p-4 flex justify-between items-center">
				<span class="text-[1.3rem]">数据监控</span>
				<el-radio-group v-model="monitor" size="default" fill="#2B5AED">
					<el-radio-button label="近一周" value="week" />
					<el-radio-button label="近一月" value="month" />
				</el-radio-group>
			</div>
			<div class="grid grid-cols-2">
				<Pie title="设备总数" :data="surveyData.device" />
				<Pie title="访问总数" :data="surveyData.website" />
			</div>
		</WhiteContainer>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { visit, survey } from '@/mock/mock';

import WhiteContainer from '@/components/WhiteContainer.vue';
import Line from '@/components/Overview/Chart/Line.vue';
import Pie from '@/components/Overview/Chart/Pie.vue';

const visits = ref('week');
const monitor = ref('week');

const lineData = ref([]);
// 访问量
const getVisit = async (value: string) => {
	let res = await visit.data;
	if (value === 'week') {
		res = res.slice(0, 7);
	}
	lineData.value = res;
};

interface SurveyData {
	device: [];
	website: [];
}
const surveyData = ref<SurveyData>({
	device: [],
	website: [],
});
const getSurvey = async () => {
	let res = await survey.data;
	surveyData.value = res;
};

onMounted(() => {
	getVisit(visits.value);
	getSurvey();
});
</script>

<style lang="scss" scoped></style>
