<template>
	<!-- 消息中心主页 -->
	<div class="navbar">
		<van-nav-bar title="消息中心" placeholder z-index="999" class="navbar-top" @click-left="onClickLeft">
			<template #left>
				<van-icon name="arrow-left" size="1.5rem" color="#000" />
			</template>
			<template #right>
				<input type="button" class="navbar-right" value="全部已读" />
			</template>
		</van-nav-bar>
	</div>

	<div class="message-center">
		<div class="module">
			<div class="container" @click="toComment">
				<div class="container-icon-big">
					<van-icon class="container-icon" name="comment-o" size="1.8rem" />
				</div>
				<div class="container-text">评论和@</div>
			</div>

			<div class="container" @click="toCollect">
				<div class="container-icon-big">
					<van-icon class="container-icon" name="star-o" size="1.8rem" />
				</div>
				<div class="container-text">收藏和赞</div>
			</div>
			<div class="container" @click="toNewFans">
				<div class="container-icon-big">
					<van-icon class="container-icon" name="contact-o" size="1.8rem" />
				</div>
				<div class="container-text">新的粉丝</div>
			</div>
		</div>

		<div class="ongoing">
			<!-- 热门活动 -->
			<div class="ongoing-top">
				<h2 class="title">热门活动</h2>
				<!-- 全部活动 -->
				<input type="button" class="default" value="全部活动" @click.prevent="toHotActivity" />
			</div>
			<div class="print">
				<div class="print-card" v-for="ongoing in ongoings.slice(0, 2)">
					<van-image :src="ongoing.image" />
				</div>
			</div>
		</div>
		<div class="message">
			<div class="message-top">私信消息</div>
			<div class="end">-- End --</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { getActivities } from '@/apis/api';

// 返回上一级
const onClickLeft = () => history.back();

const ongoings = ref([]);
const recommendList = async () =>
	await getActivities().then((res) => {
		ongoings.value = res.data.data.ongoing.events;
	});

// 组件创建的时候调用
onMounted(() => {
	recommendList();
});

// 跳转到评论和@
const toComment = () => {
	router.push('/messageCenter/commentRemind');
};

// 跳转到收藏和赞
const toCollect = () => {
	router.push('/messageCenter/collectLike');
};

// 跳转到新的粉丝
const toNewFans = () => {
	router.push('/messageCenter/newFans');
};

// 跳转到活动
const toHotActivity = () => {
	router.push('/messageCenter/hotActivity');
};
</script>

<style lang="scss">
.navbar {
	padding: 0.5rem 0;
	.navbar-top {
		.van-nav-bar__content {
			.van-nav-bar__title {
				font-size: 1.2rem;
			}
		}
		.navbar-right {
			background-color: #fff;
			border: 1px solid #ccc;
			padding: 0.15rem 0.6rem;
			border-radius: 1rem;
			font-size: 0.8rem;
		}
	}
}
.message-center {
	.module {
		display: flex;
		justify-content: space-evenly;
		margin: 1.2rem 0;
		padding: 0 1rem;
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			.container-icon-big {
				padding: 1rem;
				background-color: #ffc533;
				border-radius: 50%;
				margin-bottom: 0.4rem;
				.container-icon {
					// color: red;
					font-weight: bold;
				}
			}
		}
	}

	.ongoing {
		padding: 0 1rem;
		.ongoing-top {
			padding: 1rem 0;
			font-size: 1.1rem;
			display: flex;
			justify-content: space-between;
			.title {
				font-size: 0.9rem;
			}
			.default {
				background-color: #fff;
				padding: 0.15rem 0.6rem;
				border-radius: 1rem;
				font-size: 0.8rem;
			}
		}
		.print {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 1rem;
			background-color: #fff;
			.print-card {
				// width: 100%;
				.van-image {
					.van-image__img {
						border-radius: 0.8rem;
					}
				}
			}
		}
	}
	.message {
		padding: 0 1rem;
		.message-top {
			padding: 1rem 0;
			font-size: 0.9rem;
		}
		.end {
			text-align: center;
			font-size: 1.2rem;
			margin: 1rem 0;
			opacity: 0.2;
		}
	}
}
</style>
