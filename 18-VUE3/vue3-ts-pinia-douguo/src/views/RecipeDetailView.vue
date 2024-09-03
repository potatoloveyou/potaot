<template>
	<!-- 菜谱详情 -->
	<div class="navTop">
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

	<div class="navBottom">
		<input type="text" placeholder="说点什么" class="write-comment" />

		<div class="read-comment">
			<van-icon name="chat-o" size="1.4rem" />
			{{ flatcomments.cc }}
		</div>

		<div class="collect" @click="addFav({ recipe: recipeData })" v-if="!isInFav({ type: 1, id: recipeData.cook_id })">
			<van-icon name="star-o" size="1.4rem" />
			收藏
		</div>
		<div class="collect" @click="removeFav({ id: recipeData.cook_id })" v-else>
			<van-icon name="star" size="1.4rem" color="#ffce2d" />
			已收藏
		</div>

		<div class="imitate">
			<van-icon name="photograph" size="1.4rem" color="#ffce2d" />
			传学做
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFlatcomments } from '@/apis/api';

import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import RecipeDetail from '@/components/RecipeDetail/RecipeDetail.vue';

// 菜谱资料
const recipeData = ref({});
const recipeDetail = () =>
	favoritesStore.recipeDetail(route.query.recipeId).then((res) => {
		recipeData.value = res.data.result.recipe;
		console.log(recipeData.value);
	});

// 评论
const flatcomments = ref([]);
const flatcommentsShow = async () => {
	await getFlatcomments({ recipeid: route.query.recipeId }).then((res) => {
		flatcomments.value = res.data.result;
	});
};

// 组件创建的时候调用
onMounted(() => {
	recipeDetail();
	flatcommentsShow();
});

// 返回上一级
const onClickLeft = () => history.back();

// 底部栏弹层
const showBottom = ref(false);
const showPopup = () => {
	showBottom.value = true;
};

// 添加收藏
const addFav = ({ recipe }) => (favoritesStore.recipeFav = [...new Set([...favoritesStore.recipeFav, recipe])]);

// 移除收藏
const removeFav = ({ id }) =>
	(favoritesStore.recipeFav = favoritesStore.recipeFav.filter((item) => item.cook_id !== id));

// 是否在收藏中
const isInFav = computed(() => favoritesStore.isInFav);
</script>

<style lang="scss" scoped>
.navTop {
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

.navBottom {
	width: 100%;
	padding: 0.8rem 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	background-color: white;
	padding: 1rem;
	box-sizing: border-box;
	input.write-comment {
		width: 30%;
		background-color: #f2f1f1;
		padding: 0.8rem;
		border-radius: 2rem;
	}
	.read-comment,
	.collect,
	.imitate {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex: 1;
	}
	.collect,
	.imitate {
		flex: 2;
	}
}
</style>
