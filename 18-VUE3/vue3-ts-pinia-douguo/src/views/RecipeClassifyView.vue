<template>
	<!-- 菜谱分类 -->
	<div class="recipeList">
		<van-nav-bar title="菜谱分类" placeholder z-index="999" class="recipe-top" @click-left="onClickLeft">
			<template #left>
				<van-icon name="arrow-left" size="1.5rem" color="#000" />
			</template>
			<template #right>
				<van-icon name="search" size="1.5rem" color="#000" @click="redirectSearch" />
			</template>
		</van-nav-bar>

		<div class="recipeList-content">
			<ul class="content-left">
				<li
					v-for="(item, index) in recipeList"
					:key="item.id"
					class="recipe-item"
					:class="index == active ? 'bgc-w' : ''"
					@click="active = index">
					{{ item.name }}
					<i class="active" v-show="index === active"></i>
				</li>
			</ul>

			<div class="content-right">
				<div class="recipe-classify-card">
					<div class="recipe-type" v-if="recipeList[active]" v-for="list in recipeList[active].cs">
						<van-image width="100%" height="100%" :src="list.image_url" v-if="list.image_url" />
						<ul class="type-details">
							<li v-for="item in list.cs" @click="redirectSearchNav(item.name)">{{ item.name }}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRecipe } from '@/apis/api';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();

import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();

const recipeList = ref([]);
// 左边导航栏的索引
const active = ref(0);

const recipe = async () => {
	await getRecipe().then((res) => {
		recipeList.value = res.data.result.cs;
	});
};

// 组件创建的时候调用
onMounted(() => {
	recipe();
});

// 返回上一级
const onClickLeft = () => history.back();

// 跳转到搜索
const redirectSearch = () => {
	router.push('/search');
};

const redirectSearchNav = (value) => {
	searchStore.searchValue = value;
	router.push('/search/searchNav');
	console.log(value);
};
</script>

<style lang="scss">
.recipeList {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	.recipe-top {
		padding: 0.5rem 0;

		.van-nav-bar__content {
			.van-nav-bar__title {
				font-size: 1.2rem;
			}
		}
	}
}

.active {
	width: 0.3rem;
	height: 50%;
	background-color: #ffc533;
	position: absolute;
	right: 0.25rem;
	top: 50%;
	transform: translateY(-50%);
	border-radius: 0.3rem;
}

.bgc-w {
	background-color: #fff;
}

.recipeList-content {
	display: flex;
	width: 100%;
	overflow: hidden;
	ul.content-left {
		overflow-x: hidden;
		overflow-y: auto;
		// 隐藏滚动条
		scrollbar-width: none;

		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f6f6f6;
		li.recipe-item {
			width: 100%;
			padding: 1rem 0.4rem;
			box-sizing: border-box;
			text-align: center;
			position: relative;
		}
	}
	.content-right {
		flex: 1;
		overflow-x: hidden;
		overflow-y: auto;
		// 隐藏滚动条
		scrollbar-width: none;

		padding: 0.5rem 0.8rem;

		.recipe-classify-card {
			.recipe-type {
				.type-details {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					li {
						min-width: 4rem;
						border: 1px solid #cecece;
						padding: 0.4rem;
						border-radius: 0.5rem;
						font-size: 0.9rem;
						text-align: center;
						margin: 0.4rem 0;
					}
				}
			}
		}
	}
}
</style>
