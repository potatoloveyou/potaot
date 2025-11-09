<template>
	<!-- 私信抽屉 -->
	<el-drawer v-model="localDrawer" @close="close" header-class="pm-header" body-class="pm-body">
		<template #header class="!mb-8">
			<span class="!text-xl">私信 {{ privateMessageDataTotal }}</span>
		</template>

		<DynamicScroller :items="data" :min-item-size="100" :buffer="300" style="height: 100%" @scroll-end="loadMore">
			<template #default="{ item }">
				<DynamicScrollerItem :item="item" active>
					<Reply :data="item" :lineClamp="3" :isShow="false" @deleteReply="deleteReply"
				/></DynamicScrollerItem>
			</template>
		</DynamicScroller>
	</el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CommentItem } from '@/type/index';

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import Reply from '@/components/Overview/Comment/Reply.vue';

interface PrivateMessageProps {
	drawer: boolean;
	data: CommentItem[];
	privateMessageDataTotal: number;
}

const { drawer = false, data = [], privateMessageDataTotal = 0 } = defineProps<PrivateMessageProps>();

const emit = defineEmits<{
	(e: 'update:drawer', value: boolean): void;
}>();

const localDrawer = ref(drawer);
// 当父组件 drawer 改变时，同步更新本地状态
watch(
	() => drawer,
	(val) => {
		localDrawer.value = val;
	},
);

// 当本地状态改变时（例如抽屉关闭），通知父组件
watch(localDrawer, (val) => {
	if (drawer == localDrawer.value) return;
	emit('update:drawer', val);
});

// 关闭抽屉
const close = (): void => {};

// 删除评论
const deleteReply = async (id: number | string) => {
	console.log('我是Comment', id);

	// getComment();
};

// 到底触发
const loadMore = () => {
	console.log('到底了');
};

onMounted(() => {
	// console.log(data);
});
</script>

<style lang="scss">
.pm-header {
	margin-bottom: 0;
	// padding-inline: 0;
	padding-bottom: 1rem;
	// margin-inline: 1rem;
	border-bottom: 1px solid #00000030;
}
.pm-body {
	// padding: 0 1rem;
	padding: 0 0.5rem 0 1rem;
	flex: 1;
	display: flex;
	flex-direction: column;
	height: 100%;

	.vue-recycle-scroller {
		&::-webkit-scrollbar {
			width: 0.5rem; /* 滚动条厚度 */
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(0, 0, 0, 0.4); /* 滑块颜色 */
			border-radius: 0.2rem;
		}

		&::-webkit-scrollbar-thumb:hover {
			background-color: rgba(0, 0, 0, 0.6);
		}

		&::-webkit-scrollbar-track {
			background-color: transparent; /* 滚动条轨道 */
		}
	}
}
</style>
