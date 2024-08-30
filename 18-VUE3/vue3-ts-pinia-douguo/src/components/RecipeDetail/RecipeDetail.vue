<template>
	<van-image fit="cover" :src="recipeData.original_photo_path" />
	<div class="recipedetail">
		<!-- 标题 -->
		<h2 class="title">{{ recipeData.title }}</h2>

		<!-- 标题信息 -->
		<div class="record">
			<span class="hq" v-if="recipeData.hq">精品 -</span>
			<span class="ecs" v-if="recipeData.ecs">独家 -</span>
			<span>浏览{{ recipeData.views_count_text }} -</span>
			<span>收藏{{ recipeData.favo_counts_text }}</span>
		</div>

		<!-- 作者 -->
		<div class="author">
			<div class="author-left">
				<van-image round width="2.8rem" height="2.8rem" :src="recipeData.user.user_photo" />
				<div class="author-name">{{ recipeData.user.nickname }}</div>
				<div class="author-vip">Lv.{{ recipeData.user.lvl }}</div>
			</div>
			<div class="attention">关注</div>
		</div>

		<!-- 作品介绍 -->
		<p class="recipeData">{{ recipeData.cookstory }}</p>

		<!-- 时间和难度 -->
		<div class="tiem-difficulty" v-if="recipeData.cook_time && recipeData.cook_difficulty">
			<div class="tiem td">
				<van-image width="1.5rem" height="1.5rem" :src="recipeData.cook_time_image" />
				<div class="tiem-title td-t">{{ recipeData.cook_time }}</div>
			</div>
			<div class="difficulty td">
				<van-image width="1.5rem" height="1.5rem" :src="recipeData.cook_difficulty_image" />
				<div class="difficulty-title td-t">{{ recipeData.cook_difficulty }}</div>
			</div>
		</div>

		<!-- 食材清单 -->
		<div class="foodInventory">
			<div class="foodInventory-top section-top">
				<span class="foodInventory-title section-title">食材清单</span>
				<span class="foodInventory-join section-join" v-if="!isJoinInventory">加入采购清单</span>
				<span class="foodInventory-join section-join" v-else>移除采购清单</span>
			</div>
			<div class="foodInventory-content">
				<ul class="food-list">
					<li class="food-item" v-for="food in recipeData.major">
						<span :class="food.tu ? 'food-name-t' : 'food-name'">{{ food.title }}</span>
						<span class="food-num">{{ food.note }}</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- 营养分析环图 -->
		<div class="nutritional" v-if="recipeData.energy">
			<div class="nutritional-top section-top">
				<span class="foodInventory-title section-title">营养分析</span>
				<span class="foodInventory-join section-join">查看详情</span>
			</div>
			<div class="nutritional-content">
				<div ref="chart" class="chart"></div>
				<ul class="weight">
					<li class="weight-item" v-for="weight in recipeData.nutrition_facts">{{ weight.amount }}</li>
				</ul>
				<div class="energy">
					<div class="energy-content">
						<div class="energy-num">{{ recipeData.energy }}</div>
						<div>千卡</div>
					</div>
				</div>
			</div>
			<p class="nutrition_facts_hint_text">
				{{ recipeData.nutrition_facts_hint_text }}
			</p>
		</div>

		<!-- 烹饪步骤 -->
		<div class="cookingSteps">
			<div class="cookingSteps-top section-top">
				<span class="cookingSteps-title section-title">烹饪步骤</span>
				<span class="cookingSteps-join section-join">点击图片进入烹饪模式</span>
			</div>
			<div class="cookingSteps-content">
				<ul class="steps-list">
					<li class="steps-item" v-for="step in recipeData.cookstep">
						<div class="step">步骤{{ step.position }}/{{ recipeData.cookstep.length }}</div>
						<van-image fit="cover" :src="step.image" />
						<div class="step-content">{{ step.content }}</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- 发布时间 -->
		<div class="release_time">
			{{ recipeData.release_time }}
		</div>

		<!-- 热门评论 -->
		<div class="hotComments">
			<div class="hotComments-top">
				<span class="hotComments-title">热门评论</span>
				<span class="hotComments-num">{{ relatedinfo.first_level_comment_count }}条评论</span>
				<div class="hotComments-prompt">说点什么，让TA也认识爱做饭的你</div>
			</div>

			<div class="hotComments-content">
				<ul class="hotComments-list">
					<li class="hotComments-item" v-for="user in relatedinfo.comments">
						<div class="item-top">
							<div class="author-left">
								<van-image round width="2rem" height="2rem" :src="user.u.p" />
								<div class="author-name">{{ user.u.n }}</div>
								<div class="isAuthor author-name" v-if="recipeData.user.user_id == user.u.id">（作者）</div>
								<div class="author-vip">Lv.{{ user.u.lvl }}</div>
							</div>
							<div class="praise" v-if="!isLike" @click="isLike = !isLike">
								<van-icon name="like-o" size="1.1rem" />
								赞
							</div>
							<div class="praise isPraise" v-else @click="isLike = !isLike">
								<van-icon name="like" size="1.1rem" color="#F00" />
								1
							</div>
						</div>
						<p class="item-bottom" v-for="content in user.content">{{ content.c }}</p>
					</li>
				</ul>
				<div class="allComments">查看全部的{{ relatedinfo.first_level_comment_count }}条评论</div>
			</div>
		</div>

		<div class="imitate">
			<van-icon name="photograph" />
			传学做
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import echarts from '@/echarts';

import { getRecipeRelatedinfo } from '@/apis/api';

const props = defineProps({
	recipeData: Object,
});

// 加入采购清单
const isJoinInventory = ref(false);
// 当前评分值
const isLike = ref(false);

// echarts初始化
const chart = ref();

// 转化格式
const pieDate = computed(() => {
	return props.recipeData.nutrition_facts.map((item) => {
		return {
			value: item.calorie,
			name: item.nutrient,
			itemStyle: { color: item.pie_chart_color },
		};
	});
});

// 初始化一个名为chartShow的函数
const chartShow = () => {
	// 使用echarts.init初始化一个名为chart的DOM元素，并将其赋值给myChart
	const myChart = echarts.init(chart.value, null, {
		renderer: 'svg',
	});
	// 定义一个名为option的对象
	const option = {
		legend: {
			orient: 'vertical',
			top: 'center',
			right: '0',
			icon: 'circle', // 图标形状为圆形
			textStyle: {
				color: '#000', // 文本颜色
				fontSize: 10, // 字体大小
			},
		},
		emphasis: {
			disabled: false,
		},
		series: [
			{
				// 设置图表类型为饼图
				type: 'pie',
				// 设置饼图的半径为屏幕宽度的20%到40%
				radius: ['40%', '75%'],
				// 设置饼图的中心位置为屏幕的中心
				center: ['20%', '50%'],
				avoidLabelOverlap: false,
				silent: 'ture',
				// 设置饼图的标签
				label: {
					show: false,
				},
				data: pieDate.value,
			},
		],
	};
	// 将option对象设置到myChart中
	myChart.setOption(option);
};

const relatedinfo = ref([]);
const relatedinfoShow = () => {
	getRecipeRelatedinfo(props.recipeData.cook_id).then((res) => {
		relatedinfo.value = res.data.result;
	});
};

onMounted(() => {
	props.recipeData.energy ? chartShow() : '';
	relatedinfoShow();
});
</script>

<style lang="scss" scoped>
.recipedetail {
	padding: 0 1rem;
}
// 标题
.title {
	font-weight: bold;
	font-size: 1.5rem;
	margin-top: 0.4rem;
	line-height: 2;
}

// 标题信息
.record {
	span {
		padding-left: 0.2rem;
	}
}
// 作者
.author {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 2rem 0;
	.attention {
		margin-left: 1rem;
		padding: 0.5rem 1.4rem;
		border-radius: 1rem;
		font-size: 0.8rem;
		background-color: #ffc533;
	}
}
.author-left {
	display: flex;
	align-items: center;
	.author-name {
		padding-left: 0.5rem;
		font-size: 0.8rem;
		font-weight: bold;
	}
	.author-vip {
		margin-left: 0.5rem;
		color: #d0a01a;
		font-size: 0.8rem;
		font-weight: bold;
		font-style: italic;
	}
}

// 作品介绍
.recipeData {
	font-size: 1.2rem;
	line-height: 1.6;
}

// 时间和难度
.tiem-difficulty {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 4rem;
	.td {
		display: flex;
		align-items: center;
		.td-t {
			font-weight: bold;
			font-size: 1.2rem;
			padding-left: 0.5rem;
		}
	}
}

.section-top {
	display: flex;
	justify-content: space-between;
	.section-title {
		font-size: 17.6px;
		font-weight: bold;
	}
	.section-join {
		color: #50969f;
	}
}

// 食材清单
.foodInventory {
	margin-top: 2rem;
	.foodInventory-content {
		.food-list {
			.food-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 1.5rem 0;
				.food-name-t {
					color: #50969f;
				}
				.food-num {
					width: 6rem;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
}

// 营养分析环图
.nutritional {
	margin-top: 2rem;

	.nutritional-top {
		margin-bottom: 0.8rem;
	}
	.nutritional-content {
		display: flex;
		.chart {
			flex: 5;

			width: 100%;
			height: 5rem;
		}

		.weight {
			flex: 1.5;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			padding-left: 0.8rem;
			.weight-item {
				font-size: 0.7rem;
				font-weight: 900;
			}
		}

		.energy {
			flex: 3.5;
			display: flex;
			justify-content: center;
			align-items: center;
			.energy-content {
				border-left: 1px solid #ccc;
				padding-left: 2rem;
				text-align: center;
				.energy-num {
					font-size: 1.2rem;
					font-weight: bold;
				}
			}
		}
	}
	.nutrition_facts_hint_text {
		background-color: #cccccc30;
		padding: 1rem;
	}
}

// 烹饪步骤
.cookingSteps {
	.cookingSteps-content {
		.steps-list {
			.steps-item {
				padding: 0.5rem 0;
				.step {
					padding: 0.5rem 0;
					font-weight: bold;
				}
				.van-image {
					img.van-image__img {
						border-radius: 1rem !important;
					}
				}
				.step-content {
					padding: 0.5rem 0;
					font-weight: bold;
				}
			}
		}
	}
}

// 发布时间
.release_time {
	font-size: 0.8;
	color: #ccc;
}

// 热门评论
.hotComments {
	margin-top: 2rem;
	.hotComments-top {
		.hotComments-title {
			font-size: 17.6px;
			font-weight: bold;
		}
		.hotComments-num {
			padding-left: 1rem;
			font-size: 0.9rem;
			color: #50969f;
		}
		.hotComments-prompt {
			margin: 1rem 0;
			padding: 0.5rem 0;
			text-align: center;
			background-color: #cccccc30;
			color: #ccc;
			border-radius: 1.5rem;
		}
	}
	.hotComments-content {
		.hotComments-list {
			.hotComments-item {
				margin-bottom: 2rem;
				.item-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.isPraise {
						color: red;
					}
				}
				.item-bottom {
					padding: 0.8rem;
					padding-left: 2.5rem;
					font-size: 0.8rem;
				}
			}
		}
		.allComments {
			text-align: center;
			padding-left: 1rem;
			color: #50969f;
		}
	}
}

// 传学做
.imitate {
	margin: 2rem 0 5rem;
	padding: 0.5rem 0;
	background-color: #ffc533;
	border-radius: 2rem;
	font-size: 1.2rem;
	text-align: center;
}
</style>
