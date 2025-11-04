<template>
	<div ref="line"></div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, computed } from 'vue';
import type { EChartsOption } from '@/utils/echarts';
import echarts from '@/utils/echarts';

interface LineDataItem {
	data: string;
	count: number;
}

interface Props {
	data?: LineDataItem[];
}

const props = withDefaults(defineProps<Props>(), {
	data: () => [],
});

const xAxisData = computed(() => props.data.map((item) => item.data));
const seriesData = computed(() => props.data.map((item) => item.count));

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

const myLine = ref<echarts.ECharts>();
// 更新图表数据和配置
const updateLineChart = (): void => {
	if (!myLine.value) return;
	const option = generateChartOption();
	myLine.value.setOption(option, true);
};

const line = useTemplateRef('line');
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
	updateLineChart();
};

/**
 * 窗口调整大小处理
 */
// const handleResize = (): void => {
// 	if (myLine.value) {
// 		myLine.value.resize();
// 	}
// };

onMounted(() => {
	initChart();
	// nextTick(() => {
	// 	window.addEventListener('resize', handleResize);
	// });
});

onUnmounted(() => {
	// 清理资源
	// 	window.removeEventListener('resize', handleResize);
	if (myLine.value) {
		myLine.value.dispose();
	}
});

// 监听数据变化
watch(
	() => props.data,
	(newData) => {
		if (newData && newData.length > 0) {
			updateLineChart();
		}
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
