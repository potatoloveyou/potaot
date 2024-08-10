<template>
	<!-- 菜谱详情 -->
	<!-- <div>菜谱详情</div> -->
	<div class="navbar">
		<van-icon name="arrow-left" @click="onClickLeft" />

		<div class="user">
			<!-- :src="" -->
			<van-image round width="2rem" height="2rem" />
			<div class="attention">关注</div>
		</div>
		<van-icon name="wechat-moments" />
		<van-icon name="wechat" />
		<!-- 底部弹出 -->
		<van-icon name="weapp-nav" @click="showPopup" />
		<van-popup v-model:show="showBottom" position="bottom" :style="{ height: '45%' }" />
	</div>
	<RecipeDetail v-if="recipeData.cook_id" :recipeData="recipeData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRecipeDetail } from '@/apis/api';
import { useRecipeDetailStore } from '@/stores/recipeDetail';
const recipeDetailStore = useRecipeDetailStore();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import RecipeDetail from '@/components/RecipeDetail/RecipeDetail.vue';

// 菜谱资料
const recipeData = ref({});

const recipeDetail = async () => {
	// await getRecipeDetail(recipeDetailStore.recipeId).then((res) => {
	await getRecipeDetail(route.query.recipeId).then((res) => {
		console.log(res.data.result.recipe);
		recipeData.value = res.data.result.recipe;
	});
};

// 组件创建的时候调用
onMounted(() => {
	recipeDetail();
});

// 返回上一级
const onClickLeft = () => history.back();

// 底部栏弹层
const showBottom = ref(false);
const showPopup = () => {
	showBottom.value = true;
};
</script>

<style lang="scss" scoped>
.navbar {
	width: 100%;
	padding: 0.8rem 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	.van-icon {
		font-size: 1.5rem;
	}
	.user {
		display: flex;
		align-items: center;

		.attention {
			margin-left: 1rem;
			padding: 0.5rem 1.4rem;
			border-radius: 1rem;
			font-size: 0.8rem;
			background-color: #ffc533;
		}
	}
}
</style>
