<template>
	<div ref="pie"></div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, computed } from 'vue';
import type { EChartsOption } from '@/utils/echarts';
import echarts from '@/utils/echarts';

interface PieDataItem {
	key: string;
	name: string;
	value: number;
}

interface Props {
	data?: PieDataItem[];
	title: string;
}
const { data, title } = defineProps<Props>();

const total = computed<number>(() => data.reduce((sum, item) => sum + item.value, 0));

const generateChartOption = (): EChartsOption => {
	return {
		color: ['#2B5AED', '#FA5247', '#1CCBB6', '#F625AF', '#FFB435'],
		grid: {
			top: 0, // 移除上边距
			left: 0, // 移除左边距
			right: 0, // 移除右边距
			bottom: 0, // 移除下边距
			containLabel: false,
		},
		title: {
			text: `${total.value}`, // 主标题文本
			subtext: title, // 副标题文本
			top: '40%', // 主标题距离容器顶部距离
			left: '46%',
			textAlign: 'center',
			textStyle: {
				fontSize: '2rem',
				color: '#686B73',
				align: 'center',
			},
			subtextStyle: {
				fontSize: '1rem',
				color: '#686B73',
			},
		},
		tooltip: {
			trigger: 'item',
		},
		legend: {
			show: false,
			bottom: 0,
			icon: 'circle',
		},
		series: [
			{
				// name: '设备总数',
				type: 'pie',
				radius: ['50%', '80%'], // 饼图半径(内半径，外半径)
				// center: ['48%', '50%'], // 饼图中心位置(x,y)
				center: ['47%', '50%'], // 饼图中心位置(x,y)
				avoidLabelOverlap: true, // 避免标签重叠
				itemStyle: {
					borderRadius: 5, // 圆角设计
					borderColor: '#fff', // 白色边框分隔
					borderWidth: 2, // 2px边框宽度
				},
				label: {
					show: true, // 显示标签
					formatter: '{b}:\n{d}%', // b: 标签名称, d: 标签百分百
					fontStyle: 'oblique',
					// position: 'insideRight',
					distanceToLabelLine: -10,
				},
				// emphasis: {
				// 	label: {
				// 		show: true,// 悬停时显示标签
				// 		fontSize: 40,// 大字号强调
				// 		fontWeight: 'bold',// 粗体突出
				// 	},
				// },
				labelLine: {
					show: true, // 标签线
					length: 10, // 标签线长度
					smooth: true, // 平滑的引导线
				},
				data: data,
			},
		],
	};
};

const myPie = ref<echarts.ECharts>();
// 更新图表数据和配置
const updatePieChart = (): void => {
	if (!myPie.value) return;
	const option = generateChartOption();
	myPie.value.setOption(option, true);
};

const pie = useTemplateRef('pie');
// 初始化图表
const initChart = async (): Promise<void> => {
	await nextTick(); // 等待DOM更新
	if (!pie.value) return;

	if (!myPie.value) {
		myPie.value = echarts.init(pie.value, null, {
			renderer: 'canvas',
			// useDirtyRect: true,
		});
	}

	// 更新配置
	updatePieChart();
};

onMounted(() => {
	initChart();
});

onUnmounted(() => {
	// 清理资源
	if (myPie.value) {
		myPie.value.dispose();
	}
});

// 监听数据变化
watch(
	() => data,
	(newData) => {
		if (newData && newData.length > 0) {
			updatePieChart();
		}
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
