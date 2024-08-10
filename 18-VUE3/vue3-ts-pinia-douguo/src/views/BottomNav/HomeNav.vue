<template>
	<van-sticky>
		<section class="home-top">
			<!-- 左侧弹出框 -->
			<van-icon name="wap-nav" class="top-wap-nav" @click="showPopup" />
			<van-popup v-model:show="showLeft" position="left" :style="{ width: '50%', height: '100%' }">
				<LeftPopup />
			</van-popup>

			<!-- 搜索框 -->
			<van-search class="top-input" placeholder="请输入搜索关键词" readonly @click.prevent="redirectSearch" />
			<!-- 菜谱分类 -->
			<van-icon name="comment-o" class="top-icon" @click="redirectRecipe" />
			<!-- 消息中心 -->
			<van-icon name="volume-o" class="top-icon" @click="redirectMessageCenter" />
		</section>

		<van-tabs :active="active" class="home-nav-top" line-width="1.2rem" line-height="0.2rem" swipeable>
			<!-- swipeable 开启滑动 -->
			<van-tab
				v-for="item in homeNav_view"
				:name="item.name"
				:key="item.name"
				:title="item.title"
				:to="item.path"></van-tab>
		</van-tabs>
	</van-sticky>
	<div class="padding-top"></div>
	<RouterView />

	<!-- <router-view v-slot="{ Component }">
		<transition name="fade">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</transition>
	</router-view> -->
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LeftPopup from '@/components/Home/HomePopupNav/LeftPopup.vue';

const route = useRoute();
const router = useRouter();

const homeNav_view = ref([
	{
		name: 'home.attention',
		title: '关注',
		path: '/attention',
	},
	{
		name: 'home.recommend',
		title: '推荐',
		path: '/',
	},
	{
		name: 'home.note',
		title: '笔记',
		path: '/note',
	},
	{
		name: 'home.video',
		title: '视频',
		path: '/video',
	},
	{
		name: 'home.activity',
		title: '活动',
		path: '/activity',
	},
]);

// 默认显示推荐页索引
const active = ref('');

// 初始化active.value值为当前路由的值
if (route.name) {
	active.value = route.name;
}

// 路由进入前
router.beforeEach((to, from) => {
	active.value = to.name;
});

// 输入框
// 跳转到搜索
const redirectSearch = (event) => {
	router.push('/search');
};

// 侧边栏弹出
const showLeft = ref(false);
const showPopup = () => {
	showLeft.value = true;
};

// 跳转到食谱
const redirectRecipe = () => {
	router.push('/recipeClassify');
};

// 跳转到消息中心
const redirectMessageCenter = () => {
	router.push('/messageCenter');
};
</script>

<style lang="scss">
.van-tabs__line {
	background-color: #ffc533;
}

.home-top {
	display: flex;
	align-items: center;
	background-color: #fff;
	.top-wap-nav {
		padding: 0 0.6rem;
		font-size: 1.8rem;
	}
	.top-input {
		flex: 1;
		padding-left: 0;
		.van-search__content {
			padding: 0.1rem 0.4rem;
			background-color: rgba(128, 128, 128, 0.1);
			border-radius: 1rem;
			.van-field__left-icon {
				padding-left: 0.5rem;
			}
		}
	}
	.top-icon {
		font-size: 1.4rem;
		padding: 0 0.4rem;
		font-weight: bolder;
	}
}
</style>
