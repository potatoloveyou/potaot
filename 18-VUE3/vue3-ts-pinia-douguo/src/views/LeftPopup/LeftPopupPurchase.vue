<template>
	<!-- 首页左侧弹出框-采购清单 -->
	<div class="left-purchase">
		<van-nav-bar class="purchase-top" title="采购清单" fixed placeholder z-index="999" @click-left="onClickLeft">
			<template #left>
				<van-icon name="arrow-left" size="1.5rem" color="#000" />
			</template>
			<template #right>
				<!-- <div class="reset" @click="onClickRight">清除</div> -->
				<div class="reset" @click="showDialog">清除</div>
			</template>
		</van-nav-bar>
	</div>

	<van-tabs v-model:active="active" swipeable line-width="2rem" line-height="0.2rem" color="#ffc533">
		<van-tab :title="'按菜谱'">
			<div class="recipe-purchase">
				<div class="recipe-purchase-tiem" v-for="item in favoritesStore.purchaseListFav">
					<div class="img">
						<van-image
							width="100%"
							height="6rem"
							fit="cover"
							position="center"
							:src="item.photo_path"
							:lazy-load="true" />

						<div class="title">{{ item.title }}</div>
					</div>
					<div class="foodInventory-content">
						<ul class="food-list">
							<li class="food-item" v-for="food in item.major">
								<span>{{ food.title }}</span>
								<span class="food-num">{{ food.note }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</van-tab>

		<van-tab :title="'全部'">
			<div class="recipe-purchase-tiem" v-for="item in favoritesStore.purchaseListFav">
				<div class="foodInventory-content">
					<ul class="food-list">
						<li class="food-item" v-for="food in item.major">
							<span>{{ food.title }}</span>
							<span class="food-num">{{ food.note }}</span>
						</li>
					</ul>
				</div>
			</div>
		</van-tab>
	</van-tabs>

	<div class="purchase-end" v-if="!favoritesStore.purchaseListFav.length">带着购物单逛超市更方面</div>
</template>

<script setup>
import { ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

console.log(favoritesStore.purchaseListFav);

const active = ref(0);

// 返回上一级
const onClickLeft = () => history.back();

// 清空采购清单
const onClickRight = () => (favoritesStore.purchaseListFav = []);
// 确认清除框
const showDialog = () =>
	showConfirmDialog({
		title: '提示',
		message: '确认清空吗',
		messageAlign: 'left',
		closeOnClickOverlay: true,
	})
		.then(() => {
			onClickRight();
		})
		.catch(() => {
		});
</script>

<style lang="scss">
.left-purchase {
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid #b4b4b4;
	background-color: white;
	// padding: 0.5rem 0;
	.purchase-top {
		.van-nav-bar__content {
			.van-nav-bar__title {
				font-size: 1.2rem;
			}
		}
		.reset {
			color: #51969f;
		}
	}
}

.van-tabs__wrap {
	padding: 0.2rem 0;
	.van-tabs__nav {
		.van-tab {
			font-size: 1.1rem;
		}
	}
}

.recipe-purchase-tiem {
	padding: 0 1rem 2rem;
	.van-image {
		.van-image__img {
			border-radius: 0.8rem 0.8rem 0 0;
		}
	}
	.img {
		position: relative;
		.title {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			color: #fff;
			font-size: 1.4rem;
		}
	}
	.foodInventory-content {
		ul.food-list {
			li.food-item {
				font-size: 1.2rem;
				padding: 0.8rem 0;
				display: flex;
				border-bottom: 2px dashed #b4b4b4;
				&:last-child {
					border-bottom: none;
				}
				span {
					flex: 1;
				}
			}
		}
	}
}
.purchase-end {
	text-align: center;
	font-size: 1.2rem;
	margin: 1rem 0;
	opacity: 0.2;
}
</style>
