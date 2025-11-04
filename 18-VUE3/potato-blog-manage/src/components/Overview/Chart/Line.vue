<template>
	<div ref="line"></div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import type { EChartsOption } from '@/utils/echarts';
import echarts from '@/utils/echarts';

interface ChartDataItem {
	data: string;
	count: number;
}

interface Props {
	data?: ChartDataItem[];
}

const props = withDefaults(defineProps<Props>(), {
	data: () => [],
});

const line = useTemplateRef('line');
const myLine = ref<echarts.ECharts>();
// 初始化图表
const initChart = async (): Promise<void> => {
	await nextTick(); // 等待DOM更新
	if (!line.value) return;

	// 若实例不存在才初始化
	if (!myLine.value) {
		myLine.value = echarts.init(line.value, null, {
			renderer: 'canvas',
			useDirtyRect: true,
		});
	}

	// 更新配置
	updateChart();
};

const xAxisData = ref<string[]>([]);
const seriesData = ref<number[]>([]);
/**
 * 生成图表配置选项
 */
const generateChartOption = (): EChartsOption => {
	return {
		color: ['#2B5AED'],
		// 设置图表距离容器距离
		grid: {
			top: '6%',
			left: '0%',
			right: '0%',
			bottom: '0%',
			// containLabel: true,
			outerBounds: {},
		},
		xAxis: {
			type: 'category',
			data: xAxisData.value,
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: seriesData.value,
				type: 'line',
				smooth: true,
			},
		],
	};
};

const fillData = (data: ChartDataItem[]): void => {
	xAxisData.value = [];
	seriesData.value = [];
	data.forEach((item) => {
		xAxisData.value.push(item.data);
		seriesData.value.push(item.count);
	});
};
// 更新图表数据和配置
const updateChart = (): void => {
	if (!myLine.value) return;

	fillData(props.data);
	const option = generateChartOption();
	myLine.value.setOption(option, true);
};

/**
 * 窗口调整大小处理
 */
const handleResize = (): void => {
	nextTick(() => {
		if (myLine.value) {
			myLine.value.resize();
		}
	});
};

// 监听数据变化
watch(
	() => props.data,
	(newData) => {
		if (newData && newData.length > 0) {
			updateChart();
		}
	},
	{ deep: true },
);

onMounted(() => {
	initChart();
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	// 清理资源
	window.removeEventListener('resize', handleResize);
	if (myLine.value) {
		myLine.value.dispose();
		myLine.value = null;
	}
});

// const lineShow = (): void => {
// 	let option: EChartsOption = {
// 		color: ['#2B5AED'],
// 		// 设置图表距离容器距离
// 		grid: {
// 			top: '6%',
// 			left: '0%',
// 			right: '0%',
// 			bottom: '0%',
// 			containLabel: true,
// 		},
// 		xAxis: {
// 			type: 'category',
// 			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// 		},
// 		yAxis: {
// 			type: 'value',
// 		},
// 		series: [
// 			{
// 				data: [820, 932, 901, 934, 1290, 1330, 1320],
// 				type: 'line',
// 				smooth: true,
// 			},
// 		],
// 	};

// 	// 使用echarts.init初始化一个名为line的DOM元素，并将其赋值给myLine
// 	const myLine = echarts.init(line.value, null, {
// 		renderer: 'canvas',
// 		useDirtyRect: true,
// 	});

// 	myLine.setOption(option);
// };

// onMounted(() => {
// 	lineShow();
// });
</script>

<style lang="scss" scoped></style>
